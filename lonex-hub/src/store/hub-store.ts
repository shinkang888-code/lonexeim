import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface DockTab {
  id: string;
  moduleId: string;
  label: string;
  route: string;
  closable: boolean;
}

interface HubStore {
  tabs: DockTab[];
  activeTabId: string;
  favorites: string[];
  openModule: (tab: DockTab) => void;
  closeTab: (id: string) => void;
  setActive: (id: string) => void;
}

const HOME_TAB: DockTab = {
  id: "hub",
  moduleId: "hub",
  label: "Hub",
  route: "/",
  closable: false,
};

export const useHubStore = create<HubStore>()(
  persist(
    (set, get) => ({
      tabs: [HOME_TAB],
      activeTabId: "hub",
      favorites: [],
      openModule: (tab) => {
        const exists = get().tabs.find((t) => t.moduleId === tab.moduleId);
        if (exists) {
          set({ activeTabId: exists.id });
          return;
        }
        set((s) => ({
          tabs: [...s.tabs, tab],
          activeTabId: tab.id,
        }));
      },
      closeTab: (id) => {
        const { tabs, activeTabId } = get();
        const next = tabs.filter((t) => t.id !== id || !t.closable);
        let nextActive = activeTabId;
        if (activeTabId === id) {
          nextActive = next[next.length - 1]?.id ?? "hub";
        }
        set({ tabs: next, activeTabId: nextActive });
      },
      setActive: (id) => set({ activeTabId: id }),
    }),
    { name: "lonex-hub-dock" }
  )
);
