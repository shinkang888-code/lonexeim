"use client";

import { getModule } from "@/lib/module-registry";
import { useT } from "@/lib/i18n/use-translations";

export function OssBadge({ moduleId }: { moduleId: string }) {
  const t = useT();
  const mod = getModule(moduleId);
  if (!mod) return null;
  return (
    <details className="mb-4 rounded-xl border border-neutral-200 bg-neutral-50/80">
      <summary className="cursor-pointer px-3 py-2.5 text-xs font-medium text-neutral-600">
        {t.oss.recommended}: {mod.name}
      </summary>
      <div className="border-t border-neutral-200 px-3 py-2 text-xs text-neutral-600">
        <p className="font-medium text-neutral-800">{mod.oss.github}</p>
        <p className="mt-1 text-neutral-500">
          {mod.oss.license} · {mod.oss.integration}
        </p>
        {mod.oss.notes ? <p className="mt-1 text-neutral-500">{mod.oss.notes}</p> : null}
      </div>
    </details>
  );
}

export function ModulePageHeader({
  title,
  action,
  tone = "light",
}: {
  title: string;
  action?: React.ReactNode;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`flex flex-col gap-3 border-b px-4 py-3 sm:flex-row sm:items-center sm:justify-between ${
        dark ? "border-neutral-800 bg-[#0f1419] text-neutral-100" : "border-neutral-200 bg-white"
      }`}
    >
      <h1 className={`text-base font-semibold sm:text-lg ${dark ? "text-neutral-50" : "text-neutral-900"}`}>
        {title}
      </h1>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function HubTabBar({
  tabs,
  active,
  onChange,
}: {
  tabs: { id: string; label: string; count?: number }[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex gap-1 overflow-x-auto border-b border-neutral-200 bg-white px-2 sm:gap-2 sm:px-4">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onChange(t.id)}
          className={`relative shrink-0 min-h-11 px-3 py-2 text-sm transition ${
            active === t.id
              ? "font-semibold text-[var(--hub-color-primary,#4f46e5)]"
              : "text-neutral-500 hover:text-neutral-700"
          }`}
        >
          {t.label}
          {t.count !== undefined && (
            <span
              className={`ml-1.5 rounded-full px-2 py-0.5 text-xs ${
                active === t.id
                  ? "bg-[var(--hub-color-primary,#4f46e5)] text-white"
                  : "bg-neutral-200 text-neutral-700"
              }`}
            >
              {t.count}
            </span>
          )}
          {active === t.id && (
            <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[var(--hub-color-primary,#4f46e5)] sm:left-3 sm:right-3" />
          )}
        </button>
      ))}
    </div>
  );
}
