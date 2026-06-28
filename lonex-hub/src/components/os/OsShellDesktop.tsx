"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { Home, X } from "lucide-react";
import { MODULE_REGISTRY } from "@/lib/module-registry";
import { MODULE_ICONS } from "@/components/hub/module-icons";
import { DOCK_Z, useOsStore, WIN_Z_BASE } from "@/store/os-store";
import { OsWindowRouter } from "./OsWindowRouter";
import { UnifiedSearch } from "./UnifiedSearch";

import { visibleModules } from "@/lib/module-access";

const LAUNCHER_APPS = visibleModules(
  MODULE_REGISTRY.filter((m) => !m.demo),
  ["all"]
).map((m) => m.id);

const IS_DEV = process.env.NODE_ENV === "development";

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
        {LAUNCHER_APPS.map((id) => {
          const mod = MODULE_REGISTRY.find((m) => m.id === id)!;
          const Icon = MODULE_ICONS[mod.icon] ?? MODULE_ICONS.Bot;
          return (
            <button
              key={id}
              type="button"
              onClick={() => launch(id)}
              className="flex min-h-[88px] w-[5.5rem] flex-col items-center gap-2 rounded-2xl p-2 transition hover:bg-white/70"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                <Icon className="h-6 w-6 text-neutral-800" strokeWidth={1.5} />
              </span>
              <span className="line-clamp-2 text-center text-xs font-medium leading-tight text-neutral-800">
                {mod.name}
              </span>
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
            <button
              type="button"
              aria-label="Close window"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white/80 hover:bg-white/10 hover:text-white"
              onClick={() => closeWindow(w.id)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-auto bg-white">
            <OsWindowRouter windowId={w.id} moduleId={w.moduleId} title={w.title} initialPath={w.path} />
          </div>
          {IS_DEV && w.moduleId === "ai-assistant" && (
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
        className="absolute bottom-3 left-1/2 flex max-w-[min(100%,48rem)] -translate-x-1/2 items-center gap-2 overflow-x-auto rounded-2xl border bg-white/90 px-3 py-2 shadow-lg backdrop-blur"
        style={{ zIndex: DOCK_Z }}
      >
        <Link
          href="/"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl hover:bg-neutral-100"
          aria-label="Hub home"
        >
          <Home className="h-5 w-5 text-neutral-700" />
        </Link>
        {windows.map((w) => (
          <button
            key={w.id}
            type="button"
            onClick={() => focusWindow(w.id)}
            className="max-w-[5rem] shrink-0 truncate rounded-xl bg-neutral-900 px-3 py-2 text-xs font-medium text-white"
          >
            {w.title}
          </button>
        ))}
        <UnifiedSearch onOpen={launch} />
      </div>

      {IS_DEV && (
        <p className="absolute bottom-14 left-4 text-[10px] text-neutral-400">
          z-base={WIN_Z_BASE} · apps={LAUNCHER_APPS.length}
        </p>
      )}
    </div>
  );
}
