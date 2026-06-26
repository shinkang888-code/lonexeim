"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { MODULE_REGISTRY } from "@/lib/module-registry";
import { DOCK_Z, useOsStore, WIN_Z_BASE } from "@/store/os-store";
import { OsWindowRouter } from "./OsWindowRouter";
import { UnifiedSearch } from "./UnifiedSearch";

const POC_APPS = ["ai-assistant", "hq-search"] as const;

export function OsShellDesktop() {
  const { windows, openWindow, closeWindow, focusWindow, moveWindow } = useOsStore();
  const [drag, setDrag] = useState<{ id: string; ox: number; oy: number } | null>(null);

  const launch = useCallback(
    (moduleId: string) => {
      const mod = MODULE_REGISTRY.find((m) => m.id === moduleId);
      if (!mod) return;
      openWindow({
        id: `win-${moduleId}`,
        moduleId,
        title: mod.name,
        route: mod.route,
        path: "/",
        x: 80 + windows.length * 24,
        y: 60 + windows.length * 24,
        w: 420,
        h: 320,
      });
    },
    [openWindow, windows.length]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!drag) return;
      const w = windows.find((x) => x.id === drag.id);
      if (!w) return;
      moveWindow(drag.id, e.clientX - drag.ox, e.clientY - drag.oy);
    },
    [drag, moveWindow, windows]
  );

  return (
    <div
      className="relative min-h-[calc(100vh-8rem)] overflow-hidden rounded-2xl border border-neutral-300 bg-gradient-to-br from-slate-100 to-slate-200"
      onPointerMove={onPointerMove}
      onPointerUp={() => setDrag(null)}
    >
      <div className="absolute inset-0 bg-[url('/globe.svg')] bg-center opacity-5" aria-hidden />

      {/* 앱 아이콘 그리드 (122) */}
      <div className="relative z-[1] flex flex-wrap gap-3 p-6 pt-4">
        {POC_APPS.map((id) => {
          const mod = MODULE_REGISTRY.find((m) => m.id === id)!;
          return (
            <button
              key={id}
              type="button"
              onClick={() => launch(id)}
              className="flex w-20 flex-col items-center gap-1 rounded-xl p-2 hover:bg-white/60"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow text-lg font-bold text-neutral-800">
                {mod.name.slice(0, 1)}
              </span>
              <span className="text-center text-[10px] font-medium">{mod.name}</span>
            </button>
          );
        })}
      </div>

      {/* 부동 윈도우 (140) */}
      {windows.map((w) => (
        <div
          key={w.id}
          role="presentation"
          className="absolute flex flex-col overflow-hidden rounded-lg border border-neutral-300 bg-neutral-100 shadow-xl"
          style={{ left: w.x, top: w.y, width: w.w, height: w.h, zIndex: w.z }}
          onPointerDown={() => focusWindow(w.id)}
        >
          <div
            className="flex cursor-grab items-center justify-between bg-neutral-800 px-3 py-1.5 text-xs text-white active:cursor-grabbing"
            onPointerDown={(e) => {
              e.stopPropagation();
              focusWindow(w.id);
              setDrag({ id: w.id, ox: e.clientX - w.x, oy: e.clientY - w.y });
            }}
          >
            <span>{w.title}</span>
            <button type="button" className="text-white/80 hover:text-white" onClick={() => closeWindow(w.id)}>
              ✕
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-auto bg-white">
            <OsWindowRouter windowId={w.id} moduleId={w.moduleId} title={w.title} initialPath={w.path} />
          </div>
          {w.moduleId === "ai-assistant" && (
            <div className="border-t bg-neutral-50 p-2 text-center">
              <button
                type="button"
                className="text-[10px] text-blue-600 underline"
                onClick={() => useOsStore.getState().setPath(w.id, "/chat")}
              >
                /chat 딥라우트 테스트
              </button>
            </div>
          )}
        </div>
      ))}

      {/* 도크 (123) + 통합검색 (124) */}
      <div
        className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-2xl border bg-white/90 px-3 py-2 shadow-lg backdrop-blur"
        style={{ zIndex: DOCK_Z }}
      >
        <Link href="/" className="rounded-lg px-2 py-1 text-xs font-medium hover:bg-neutral-100">
          🏠
        </Link>
        {windows.map((w) => (
          <button
            key={w.id}
            type="button"
            onClick={() => focusWindow(w.id)}
            className="max-w-[72px] truncate rounded-lg bg-neutral-900 px-2 py-1 text-[10px] text-white"
          >
            {w.title}
          </button>
        ))}
        <UnifiedSearch onOpen={launch} />
      </div>

      <p className="absolute bottom-14 left-4 text-[10px] text-neutral-500">
        z-base={WIN_Z_BASE} · POC: {POC_APPS.join(", ")}
      </p>
    </div>
  );
}
