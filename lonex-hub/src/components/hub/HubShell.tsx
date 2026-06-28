"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Home, X, type LucideIcon } from "lucide-react";
import { HubDashboard } from "@/components/hub/HubDashboard";
import { LanguageToggle } from "@/components/hub/LanguageToggle";
import { HubHeaderLink } from "@/components/hub/hub-ui";
import { MODULE_ICONS } from "@/components/hub/module-icons";
import { MODULE_REGISTRY } from "@/lib/module-registry";
import { useModuleStrings, useT } from "@/lib/i18n/use-translations";
import { useHubStore } from "@/store/hub-store";

export function HubLauncher() {
  return <HubDashboard />;
}

export function HubHeader() {
  const t = useT();

  return (
    <header className="hub-header sticky top-0 z-40 border-b border-[var(--hub-color-border,#e2e8f0)] bg-white/90 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center gap-2 px-3 py-2 sm:gap-3 sm:px-4 sm:py-2.5">
        <Link
          href="/"
          className="flex min-h-10 min-w-10 shrink-0 items-center gap-2 rounded-xl pr-1 sm:min-w-0"
          aria-label="Lonex Hub home"
        >
          <Image
            src="/images/hub-logo.svg"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-lg shadow-sm"
          />
          <span className="hidden text-sm font-bold tracking-[0.16em] text-neutral-900 sm:inline">
            LONEX
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <div className="hidden sm:block">
            <LanguageToggle compact />
          </div>
          <HubHeaderLink href="/os_dashboard" variant="secondary">
            {t.dashboard.quickOs}
          </HubHeaderLink>
          <HubHeaderLink href="/services" variant="primary">
            {t.header.ai}
          </HubHeaderLink>
        </div>
      </div>
      <div className="border-t border-neutral-100/90 px-3 py-2 sm:hidden">
        <LanguageToggle compact />
      </div>
    </header>
  );
}

export function HubDock() {
  const { tabs, activeTabId, closeTab, setActive } = useHubStore();
  const router = useRouter();
  const t = useT();

  return (
    <nav
      className="hub-dock-bar fixed inset-x-0 bottom-0 z-50 border-t border-[var(--hub-color-border,#e2e8f0)] bg-white/95 shadow-[0_-8px_32px_rgba(15,23,42,0.08)] backdrop-blur-lg"
      aria-label={t.dock.home}
    >
      <div className="hub-dock-scroll mx-auto flex max-w-5xl items-end gap-0.5 overflow-x-auto px-2 pt-2 sm:justify-center sm:gap-1 sm:px-4">
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
      </div>
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
  const mod = MODULE_REGISTRY.find((m) => m.id === tab.moduleId);
  const { name } = useModuleStrings(tab.moduleId);
  const label = tab.moduleId === "hub" ? homeLabel : name || tab.label;
  const Icon: LucideIcon =
    tab.moduleId === "hub" ? Home : MODULE_ICONS[mod?.icon ?? "Bot"] ?? Home;
  const shortLabel = label.length > 8 ? `${label.slice(0, 7)}…` : label;

  return (
    <div className="group relative shrink-0 pb-1">
      <button
        type="button"
        onClick={onActivate}
        title={label}
        className={`relative flex min-h-[3.25rem] min-w-[4rem] max-w-[5rem] flex-col items-center justify-center gap-0.5 rounded-2xl px-2.5 py-1.5 text-[11px] font-medium leading-tight transition sm:min-w-[4.5rem] sm:text-xs ${
          active
            ? "bg-[var(--hub-color-primary,#4f46e5)] text-white shadow-md"
            : "text-neutral-600 hover:bg-neutral-100"
        }`}
      >
        {tab.closable && (
          <span
            role="button"
            tabIndex={0}
            aria-label={closeLabel}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }
            }}
            className={`absolute -right-1 -top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full text-white shadow ${
              active ? "bg-neutral-900/80 hover:bg-neutral-900" : "bg-neutral-600 hover:bg-neutral-800"
            }`}
          >
            <X className="h-3 w-3" strokeWidth={2.5} />
          </span>
        )}
        <Icon className="h-5 w-5 shrink-0" strokeWidth={active ? 2 : 1.75} />
        <span className="w-full truncate text-center">{shortLabel}</span>
      </button>
    </div>
  );
}
