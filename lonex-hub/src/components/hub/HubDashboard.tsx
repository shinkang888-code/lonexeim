"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bot,
  LayoutGrid,
  Monitor,
  Search,
  Sparkles,
  Star,
  type LucideIcon,
} from "lucide-react";
import { HUB_DOCK_PAD, HubButton } from "@/components/hub/hub-ui";
import { MODULE_ICONS } from "@/components/hub/module-icons";
import { CATEGORY_TONE } from "@/lib/hub-design-tokens";
import { MODULE_REGISTRY, type HubModuleDef } from "@/lib/module-registry";
import { useCategoryLabel, useLocale, useModuleStrings, useT } from "@/lib/i18n/use-translations";
import { MESSAGES } from "@/lib/i18n/messages";
import type { ModuleCategoryKey } from "@/lib/i18n/types";
import { useHubStore } from "@/store/hub-store";

function AppTile({ mod, category }: { mod: HubModuleDef; category: ModuleCategoryKey }) {
  const router = useRouter();
  const openModule = useHubStore((s) => s.openModule);
  const { name, description } = useModuleStrings(mod.id);
  const Icon = MODULE_ICONS[mod.icon] ?? MODULE_ICONS.Bot;
  const tone = CATEGORY_TONE[category];

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
      className={`group flex min-h-[108px] flex-col items-center gap-2.5 rounded-2xl border border-[var(--hub-color-border,#e2e8f0)] bg-white p-3.5 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md active:scale-[0.98] sm:min-h-[116px] sm:p-4 sm:text-left sm:items-start`}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tone.iconBg} shadow-inner transition group-hover:scale-105`}
      >
        <Icon className={`h-5 w-5 ${tone.iconText}`} strokeWidth={1.75} />
      </span>
      <span className="line-clamp-1 w-full text-sm font-semibold text-neutral-900">{name}</span>
      <span className="line-clamp-2 w-full text-[11px] leading-snug text-neutral-500 sm:text-xs">
        {description}
      </span>
    </button>
  );
}

function QuickAction({
  href,
  icon: Icon,
  label,
  sub,
  gradient,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  sub: string;
  gradient: string;
}) {
  return (
    <Link
      href={href}
      className={`hub-quick-action flex min-h-[72px] flex-1 items-center gap-3 rounded-2xl bg-gradient-to-br ${gradient} px-4 py-3 text-white shadow-md transition hover:brightness-110 active:scale-[0.98] sm:min-h-[80px]`}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold">{label}</span>
        <span className="block truncate text-[11px] text-white/80 sm:text-xs">{sub}</span>
      </span>
    </Link>
  );
}

export function HubDashboard() {
  const t = useT();
  const locale = useLocale();
  const [query, setQuery] = useState("");
  const sections: ModuleCategoryKey[] = ["communication", "work", "info", "support"];
  const moduleCount = MODULE_REGISTRY.filter((m) => !m.demo).length;
  const connectedCount = MODULE_REGISTRY.filter((m) => !m.demo && m.oss.integration !== "demo").length;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    const msgs = MESSAGES[locale] ?? MESSAGES.ko;
    return MODULE_REGISTRY.filter((m) => {
      const s = msgs.modules[m.id];
      const name = s?.name ?? m.name;
      const description = s?.description ?? m.description;
      return (
        name.toLowerCase().includes(q) ||
        description.toLowerCase().includes(q) ||
        m.id.includes(q)
      );
    });
  }, [query, locale]);

  return (
    <div className={`hub-dashboard mx-auto max-w-5xl space-y-6 px-4 pt-2 sm:space-y-8 sm:pt-4 ${HUB_DOCK_PAD}`}>
      <section className="hub-hero relative overflow-hidden rounded-3xl border border-neutral-200/80 shadow-lg">
        <div className="absolute inset-0">
          <Image
            src="/images/hub-hero.png"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 960px"
          />
          <div className="hub-hero-overlay absolute inset-0" aria-hidden />
        </div>
        <div className="relative z-10 flex flex-col gap-4 p-5 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">
                Lonex Hub
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {t.dashboard.greeting}
              </h1>
              <p className="mt-2 max-w-md text-sm text-white/85 sm:text-base">{t.dashboard.subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="hub-stat-pill">
                <LayoutGrid className="h-3.5 w-3.5" />
                {moduleCount} {t.dashboard.modules}
              </span>
              <span className="hub-stat-pill">
                <Sparkles className="h-3.5 w-3.5" />
                {connectedCount} {t.dashboard.connected}
              </span>
            </div>
          </div>
          <div className="relative max-w-xl">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.dashboard.searchPlaceholder}
              className="hub-search-input w-full rounded-2xl py-3 pl-10 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400"
              aria-label={t.dashboard.searchPlaceholder}
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3 sm:flex-row">
        <QuickAction
          href="/os_dashboard"
          icon={Monitor}
          label={t.dashboard.quickOs}
          sub={t.dashboard.quickOsSub}
          gradient="from-slate-800 via-slate-900 to-neutral-950"
        />
        <QuickAction
          href="/services"
          icon={Bot}
          label={t.dashboard.quickAi}
          sub={t.dashboard.quickAiSub}
          gradient="from-indigo-600 via-violet-600 to-purple-800"
        />
      </section>

      {filtered ? (
        <section>
          <h2 className="mb-3 text-sm font-semibold text-neutral-700">
            {t.dashboard.searchResults} ({filtered.length})
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {filtered.map((mod) => (
              <AppTile key={mod.id} mod={mod} category={mod.category as ModuleCategoryKey} />
            ))}
          </div>
          {!filtered.length && (
            <p className="rounded-2xl border border-dashed border-neutral-300 bg-white/80 px-6 py-8 text-center text-sm text-neutral-500">
              {t.dashboard.noResults}
            </p>
          )}
        </section>
      ) : (
        <>
          <section>
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-800">
                <Star className="h-4 w-4 text-amber-500" fill="currentColor" strokeWidth={0} />
                {t.favorites.title}
              </h2>
              <HubButton variant="ghost" size="sm" type="button" disabled className="opacity-50">
                {t.favorites.edit}
              </HubButton>
            </div>
            <div className="hub-favorites-empty rounded-2xl border border-dashed border-neutral-300/90 bg-white/70 px-6 py-8 text-center backdrop-blur-sm sm:py-10">
              <Star className="mx-auto mb-3 h-8 w-8 text-neutral-300" strokeWidth={1.25} />
              <p className="text-sm font-medium text-neutral-700">{t.favorites.emptyLine1}</p>
              <p className="mt-1 text-sm text-neutral-500">{t.favorites.emptyLine2}</p>
            </div>
          </section>

          {sections.map((cat) => {
            const items = MODULE_REGISTRY.filter((m) => m.category === cat);
            if (!items.length) return null;
            const tone = CATEGORY_TONE[cat];
            return (
              <CategorySection key={cat} category={cat} items={items} tone={tone} />
            );
          })}
        </>
      )}
    </div>
  );
}

function CategorySection({
  category,
  items,
  tone,
}: {
  category: ModuleCategoryKey;
  items: HubModuleDef[];
  tone: (typeof CATEGORY_TONE)[ModuleCategoryKey];
}) {
  const label = useCategoryLabel(category);
  const t = useT();
  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--hub-color-border,#e2e8f0)] bg-white/60 shadow-sm backdrop-blur-sm">
      <div
        className={`border-l-4 ${tone.accent} bg-gradient-to-r from-white to-neutral-50/90 px-4 py-3.5 sm:px-5`}
      >
        <h2 className="text-sm font-semibold text-neutral-900">{label}</h2>
        <p className="text-xs text-neutral-500">{t.dashboard.appsCount.replace("{count}", String(items.length))}</p>
      </div>
      <div className="grid grid-cols-2 gap-2.5 p-3 sm:grid-cols-3 sm:gap-3 sm:p-4 md:grid-cols-4 lg:grid-cols-5">
        {items.map((mod) => (
          <AppTile key={mod.id} mod={mod} category={category} />
        ))}
      </div>
    </section>
  );
}
