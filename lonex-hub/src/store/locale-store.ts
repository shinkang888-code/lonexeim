import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/lib/i18n/types";

interface LocaleStore {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleStore>()(
  persist(
    (set) => ({
      locale: DEFAULT_LOCALE,
      setLocale: (locale) => {
        if (!LOCALES.includes(locale)) return;
        set({ locale });
      },
    }),
    { name: "lonex-hub-locale" }
  )
);
