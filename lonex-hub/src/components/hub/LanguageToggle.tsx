"use client";

import { LOCALES, type Locale } from "@/lib/i18n/types";
import { useLocaleStore } from "@/store/locale-store";
import { useT } from "@/lib/i18n/use-translations";

const TAB_LABELS: Record<Locale, string> = {
  ko: "KO",
  en: "EN",
  ja: "JP",
  zh: "CN",
  id: "ID",
  vi: "VI",
};

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);
  const t = useT();

  return (
    <div
      className={`flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-[var(--hub-color-border,#e2e8f0)] bg-white p-0.5 shadow-sm ${
        compact ? "w-full justify-start sm:w-auto" : ""
      }`}
      role="tablist"
      aria-label={t.language[locale]}
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            role="tab"
            aria-selected={active}
            title={t.language[code]}
            onClick={() => setLocale(code)}
            className={`shrink-0 rounded-full font-semibold transition ${
              compact ? "min-h-9 min-w-[2.5rem] px-2.5 text-[11px]" : "min-h-9 min-w-[2.25rem] px-2.5 text-xs"
            } ${active ? "bg-[var(--hub-color-primary,#4f46e5)] text-white shadow-sm" : "text-neutral-600 hover:bg-neutral-100"}`}
          >
            {TAB_LABELS[code]}
          </button>
        );
      })}
    </div>
  );
}
