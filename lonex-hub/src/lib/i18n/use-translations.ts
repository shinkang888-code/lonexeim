"use client";

import { useMemo } from "react";
import { MESSAGES } from "@/lib/i18n/messages";
import { useLocaleStore } from "@/store/locale-store";
import type { Locale, Messages, ModuleCategoryKey } from "@/lib/i18n/types";

export function useLocale(): Locale {
  return useLocaleStore((s) => s.locale);
}

export function useT(): Messages {
  const locale = useLocale();
  return useMemo(() => MESSAGES[locale] ?? MESSAGES.ko, [locale]);
}

export function useModuleStrings(moduleId: string) {
  const t = useT();
  const mod = t.modules[moduleId];
  return mod ?? { name: moduleId, description: "" };
}

export function useCategoryLabel(category: ModuleCategoryKey): string {
  const t = useT();
  return t.categories[category] ?? category;
}
