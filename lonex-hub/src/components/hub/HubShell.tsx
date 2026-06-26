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
import { LanguageToggle } from "@/components/hub/LanguageToggle";
import { MODULE_REGISTRY, type HubModuleDef } from "@/lib/module-registry";
import { useCategoryLabel, useModuleStrings, useT } from "@/lib/i18n/use-translations";
import type { ModuleCategoryKey } from "@/lib/i18n/types";
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
  const { name } = useModuleStrings(mod.id);
  const Icon = ICONS[mod.icon] ?? Bot;

  return (
    <button
      type="button"
      onClick={() => {
        openModule({
          id: mod.id,
          moduleId: mod.id,
          label: name,
          route: mod.route,
          closable: true,
        });
        router.push(mod.route);
      }}
      className="flex flex-col items-center gap-2 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      <Icon className="h-7 w-7 text-neutral-900" strokeWidth={1.5} />
      <span className="text-center text-xs font-medium text-neutral-800">{name}</span>
    </button>
  );
}

export function HubLauncher() {
  const t = useT();
  const sections: ModuleCategoryKey[] = ["communication", "work", "info", "support"];

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 pb-32 pt-4">
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-neutral-500">★ {t.favorites.title}</h2>
          <button type="button" className="text-xs text-neutral-500 underline">
            {t.favorites.edit}
          </button>
        </div>
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-white/60 p-8 text-center text-sm text-neutral-500">
          {t.favorites.emptyLine1}
          <br />
          {t.favorites.emptyLine2}
        </div>
      </section>

      {sections.map((cat) => {
        const items = MODULE_REGISTRY.filter((m) => m.category === cat);
        if (!items.length) return null;
        return (
          <CategorySection key={cat} category={cat} items={items} />
        );
      })}
    </div>
  );
}

function CategorySection({
  category,
  items,
}: {
  category: ModuleCategoryKey;
  items: HubModuleDef[];
}) {
  const label = useCategoryLabel(category);
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold text-neutral-500">{label}</h2>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
        {items.map((mod) => (
          <AppTile key={mod.id} mod={mod} />
        ))}
      </div>
    </section>
  );
}

export function HubHeader() {
  const t = useT();

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-[#f5f5f5]">
      <div className="flex items-center justify-between px-4 py-3">
        <button type="button" className="rounded-lg p-2 hover:bg-neutral-200" aria-label={t.header.menu}>
          <span className="block h-0.5 w-5 bg-neutral-800" />
          <span className="mt-1 block h-0.5 w-5 bg-neutral-800" />
          <span className="mt-1 block h-0.5 w-5 bg-neutral-800" />
        </button>
        <Link href="/" className="text-lg font-bold tracking-widest text-neutral-900">
          LONEX
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/os_dashboard" className="text-xs text-neutral-600 underline">
            OS Shell
          </Link>
          <Link href="/services" className="text-xs text-neutral-600 underline">
            {t.header.ai}
          </Link>
        </div>
      </div>
      <div className="flex justify-center border-t border-neutral-100 px-4 py-2">
        <LanguageToggle />
      </div>
    </header>
  );
}

export function HubDock() {
  const { tabs, activeTabId, closeTab, setActive } = useHubStore();
  const router = useRouter();
  const t = useT();

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-end gap-1 rounded-full border border-neutral-200 bg-white px-3 py-2 shadow-lg">
      {tabs.map((tab) => (
        <DockTabItem
          key={tab.id}
          tab={tab}
          active={tab.id === activeTabId}
          closeLabel={t.dock.close}
          homeLabel={t.dock.home}
          onActivate={() => {
            setActive(tab.id);
            router.push(tab.route);
          }}
          onClose={() => {
            const wasActive = tab.id === activeTabId;
            closeTab(tab.id);
            if (wasActive) {
              const remaining = useHubStore.getState().tabs;
              const next = remaining.find((x) => x.id === useHubStore.getState().activeTabId);
              router.push(next?.route ?? "/");
            }
          }}
        />
      ))}
    </nav>
  );
}

function DockTabItem({
  tab,
  active,
  closeLabel,
  homeLabel,
  onActivate,
  onClose,
}: {
  tab: { id: string; moduleId: string; label: string; closable: boolean };
  active: boolean;
  closeLabel: string;
  homeLabel: string;
  onActivate: () => void;
  onClose: () => void;
}) {
  const { name } = useModuleStrings(tab.moduleId);
  const label = tab.moduleId === "hub" ? homeLabel : (name || tab.label).slice(0, 6);

  return (
    <DockTabButton
      tab={tab}
      active={active}
      label={label}
      closeLabel={closeLabel}
      onActivate={onActivate}
      onClose={onClose}
    />
  );
}

function DockTabButton({
  tab,
  active,
  label,
  closeLabel,
  onActivate,
  onClose,
}: {
  tab: { id: string; closable: boolean };
  active: boolean;
  label: string;
  closeLabel: string;
  onActivate: () => void;
  onClose: () => void;
}) {
  return (
    <div className="relative">
      {tab.closable && (
        <button
          type="button"
          aria-label={closeLabel}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute -right-1 -top-1 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-300 text-[10px] text-white"
        >
          ×
        </button>
      )}
      <button
        type="button"
        onClick={onActivate}
        className={`flex min-w-[44px] flex-col items-center rounded-xl px-2 py-1 text-[10px] ${
          active ? "bg-neutral-900 text-white" : "text-neutral-700"
        }`}
      >
        <span className="text-base">●</span>
        {label}
      </button>
    </div>
  );
}
