"use client";

import { useEffect } from "react";
import { useLocaleStore } from "@/store/locale-store";

/** Sync <html lang> with selected locale */
export function LocaleHtmlLang() {
  const locale = useLocaleStore((s) => s.locale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
