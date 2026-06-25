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

export function LanguageToggle() {
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);
  const t = useT();

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-neutral-200 bg-white p-0.5 shadow-sm"
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
            className={`min-w-[2rem] rounded-full px-2 py-1 text-[10px] font-semibold transition ${
              active
                ? "bg-neutral-900 text-white"
                : "text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            {TAB_LABELS[code]}
          </button>
        );
      })}
    </div>
  );
}
