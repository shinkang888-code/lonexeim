export const LOCALES = ["ko", "en", "ja", "zh", "id", "vi"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ko";

export type ModuleCategoryKey = "communication" | "work" | "info" | "support";

export interface ModuleStrings {
  name: string;
  description: string;
}

export interface Messages {
  meta: { title: string; description: string };
  header: { menu: string; ai: string };
  language: Record<Locale, string>;
  favorites: {
    title: string;
    edit: string;
    emptyLine1: string;
    emptyLine2: string;
  };
  categories: Record<ModuleCategoryKey, string>;
  modules: Record<string, ModuleStrings>;
  dock: { home: string; close: string };
  oss: { recommended: string; hf: string };
  generic: {
    notFound: string;
    demoPlaceholder: string;
    integration: string;
    openRepo: string;
  };
  embed: {
    syncToHq: string;
    backendHint: string;
    demoUpload: string;
  };
  services: {
    backHub: string;
    title: string;
    subtitle: string;
    openLogshield: string;
  };
}
