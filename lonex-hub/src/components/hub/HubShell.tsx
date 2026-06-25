"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bot,
  Calendar,
  DollarSign,
  Gavel,
  HardDrive,
  Headphones,
  Languages,
  Mail,
  MessageCircle,
  PenLine,
  Search,
  Settings,
  Shield,
  Video,
  VideoIcon,
  type LucideIcon,
} from "lucide-react";
import { MODULE_REGISTRY, CATEGORY_LABELS, type HubModuleDef } from "@/lib/module-registry";
import { useHubStore } from "@/store/hub-store";

const ICONS: Record<string, LucideIcon> = {
  Bot,
  MessageCircle,
  Mail,
  Calendar,
  Video,
  Languages,
  VideoIcon,
  Gavel,
  HardDrive,
  PenLine,
  Headphones,
  DollarSign,
  Shield,
  Search,
  Settings,
};

function AppTile({ mod }: { mod: HubModuleDef }) {
  const router = useRouter();
  const openModule = useHubStore((s) => s.openModule);
  const Icon = ICONS[mod.icon] ?? Bot;

  return (
    <button
      type="button"
      onClick={() => {
        openModule({
          id: mod.id,
          moduleId: mod.id,
          label: mod.name,
          route: mod.route,
          closable: true,
        });
        router.push(mod.route);
      }}
      className="flex flex-col items-center gap-2 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      <Icon className="h-7 w-7 text-neutral-900" strokeWidth={1.5} />
      <span className="text-center text-xs font-medium text-neutral-800">{mod.name}</span>
    </button>
  );
}

export function HubLauncher() {
  const sections = ["communication", "work", "info", "support"] as const;

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 pb-32 pt-4">
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-neutral-500">★ 즐겨찾기</h2>
          <button type="button" className="text-xs text-neutral-500 underline">
            편집하기
          </button>
        </div>
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-white/60 p-8 text-center text-sm text-neutral-500">
          자주 사용하는 앱을 즐겨찾기에 추가해 보세요.
          <br />
          &apos;편집하기&apos;를 눌러 시작하세요.
        </div>
      </section>

      {sections.map((cat) => {
        const items = MODULE_REGISTRY.filter((m) => m.category === cat);
        if (!items.length) return null;
        return (
          <section key={cat}>
            <h2 className="mb-3 text-sm font-semibold text-neutral-500">
              {CATEGORY_LABELS[cat]}
            </h2>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
              {items.map((mod) => (
                <AppTile key={mod.id} mod={mod} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export function HubHeader() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-neutral-200 bg-[#f5f5f5] px-4 py-3">
      <button type="button" className="rounded-lg p-2 hover:bg-neutral-200" aria-label="메뉴">
        <span className="block h-0.5 w-5 bg-neutral-800" />
        <span className="mt-1 block h-0.5 w-5 bg-neutral-800" />
        <span className="mt-1 block h-0.5 w-5 bg-neutral-800" />
      </button>
      <Link href="/" className="text-lg font-bold tracking-widest text-neutral-900">
        LONEX
      </Link>
      <Link href="/services" className="text-xs text-neutral-600 underline">
        AI
      </Link>
    </header>
  );
}

export function HubDock() {
  const { tabs, activeTabId, closeTab, setActive } = useHubStore();
  const router = useRouter();

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-end gap-1 rounded-full border border-neutral-200 bg-white px-3 py-2 shadow-lg">
      {tabs.map((tab) => {
        const active = tab.id === activeTabId;
        return (
          <div key={tab.id} className="relative">
            {tab.closable && (
              <button
                type="button"
                aria-label="닫기"
                onClick={(e) => {
                  e.stopPropagation();
                  const wasActive = tab.id === activeTabId;
                  closeTab(tab.id);
                  if (wasActive) {
                    const remaining = useHubStore.getState().tabs;
                    const next = remaining.find((t) => t.id === useHubStore.getState().activeTabId);
                    router.push(next?.route ?? "/");
                  }
                }}
                className="absolute -right-1 -top-1 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-300 text-[10px] text-white"
              >
                ×
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setActive(tab.id);
                router.push(tab.route);
              }}
              className={`flex min-w-[44px] flex-col items-center rounded-xl px-2 py-1 text-[10px] ${
                active ? "bg-neutral-900 text-white" : "text-neutral-700"
              }`}
            >
              <span className="text-base">●</span>
              {active && tab.id === "hub" ? "Lonex(공개)" : tab.label.slice(0, 4)}
            </button>
          </div>
        );
      })}
    </nav>
  );
}
