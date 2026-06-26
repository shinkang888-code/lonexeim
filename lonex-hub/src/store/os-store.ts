"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const WIN_Z_BASE = 10;
export const WIN_Z_CEIL = 9000;
export const DOCK_Z = 9990;

export interface OsWindowState {
  id: string;
  moduleId: string;
  title: string;
  route: string;
  path: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
}

interface OsStore {
  windows: OsWindowState[];
  topZ: number;
  openWindow: (w: Omit<OsWindowState, "z" | "minimized">) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  setPath: (id: string, path: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  compactIfNeeded: () => void;
}

export const useOsStore = create<OsStore>()(
  persist(
    (set, get) => ({
      windows: [],
      topZ: WIN_Z_BASE,
      openWindow: (w) => {
        const { topZ, windows, compactIfNeeded } = get();
        let nextZ = topZ + 1;
        if (nextZ >= WIN_Z_CEIL) {
          compactIfNeeded();
          nextZ = get().topZ + 1;
        }
        const exists = windows.find((x) => x.id === w.id);
        if (exists) {
          get().focusWindow(w.id);
          return;
        }
        set({
          topZ: nextZ,
          windows: [
            ...windows.map((x) => ({ ...x, z: x.z })),
            { ...w, z: nextZ, minimized: false },
          ],
        });
      },
      closeWindow: (id) => set({ windows: get().windows.filter((w) => w.id !== id) }),
      focusWindow: (id) => {
        let nextZ = get().topZ + 1;
        if (nextZ >= WIN_Z_CEIL) {
          get().compactIfNeeded();
          nextZ = get().topZ + 1;
        }
        set({
          topZ: nextZ,
          windows: get().windows.map((w) => (w.id === id ? { ...w, z: nextZ, minimized: false } : w)),
        });
      },
      setPath: (id, path) =>
        set({ windows: get().windows.map((w) => (w.id === id ? { ...w, path } : w)) }),
      moveWindow: (id, x, y) =>
        set({ windows: get().windows.map((w) => (w.id === id ? { ...w, x, y } : w)) }),
      compactIfNeeded: () => {
        const sorted = [...get().windows].sort((a, b) => a.z - b.z);
        let z = WIN_Z_BASE + 1;
        const remapped = sorted.map((w) => ({ ...w, z: z++ }));
        set({ windows: remapped, topZ: z - 1 });
      },
    }),
    { name: "lonex-os-windows-v1", partialize: (s) => ({ windows: s.windows, topZ: s.topZ }) }
  )
);
