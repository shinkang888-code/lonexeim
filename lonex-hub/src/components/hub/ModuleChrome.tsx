"use client";

"use client";

import { getModule } from "@/lib/module-registry";
import { useT } from "@/lib/i18n/use-translations";

export function OssBadge({ moduleId }: { moduleId: string }) {
  const t = useT();
  const mod = getModule(moduleId);
  if (!mod) return null;
  return (
    <div className="mb-4 rounded-xl border border-blue-100 bg-blue-50 p-3 text-xs text-blue-900">
      <p className="font-semibold">
        {t.oss.recommended}: {mod.oss.github}
      </p>
      <p className="mt-1 text-blue-800/80">
        {mod.oss.license} · {mod.oss.integration} · {mod.oss.notes}
      </p>
      {mod.oss.hfModels?.length ? (
        <p className="mt-1 text-blue-700/70">
          {t.oss.hf}: {mod.oss.hfModels.join(", ")}
        </p>
      ) : null}
    </div>
  );
}

export function ModulePageHeader({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3">
      <h1 className="text-base font-semibold text-neutral-900">{title}</h1>
      {action}
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
    <div className="flex gap-4 overflow-x-auto border-b border-neutral-200 bg-white px-4">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onChange(t.id)}
          className={`relative shrink-0 py-3 text-sm ${
            active === t.id ? "font-semibold text-neutral-900" : "text-neutral-500"
          }`}
        >
          {t.label}
          {t.count !== undefined && (
            <span
              className={`ml-1 rounded-full px-1.5 text-xs ${
                active === t.id ? "bg-blue-600 text-white" : "bg-neutral-200"
              }`}
            >
              {t.count}
            </span>
          )}
          {active === t.id && (
            <span className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600" />
          )}
        </button>
      ))}
    </div>
  );
}
