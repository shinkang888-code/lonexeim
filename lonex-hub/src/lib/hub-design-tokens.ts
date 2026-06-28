import figmaTokens from "./figma-tokens.generated.json";
import type { ModuleCategoryKey } from "@/lib/i18n/types";

type TokenColors = Record<string, string>;

function color(key: string, fallback: string) {
  const colors = (figmaTokens as { colors?: TokenColors }).colors;
  return colors?.[key] ?? fallback;
}

/** Figma hub/* 변수와 동기화된 카테고리 색 */
export const CATEGORY_FIGMA: Record<ModuleCategoryKey, string> = {
  communication: color("hub-color-communication", "#2563eb"),
  work: color("hub-color-work", "#7c3aed"),
  info: color("hub-color-info", "#059669"),
  support: color("hub-color-support", "#d97706"),
};

/** 카테고리별 Hub 대시보드 톤 */
export const CATEGORY_TONE: Record<
  ModuleCategoryKey,
  { gradient: string; iconBg: string; iconText: string; accent: string; ring: string }
> = {
  communication: {
    gradient: "from-blue-600/90 via-blue-700/80 to-indigo-800/90",
    iconBg: "bg-gradient-to-br from-blue-50 to-sky-100",
    iconText: "text-[var(--hub-color-communication,#2563eb)]",
    accent: "border-l-[var(--hub-color-communication,#2563eb)]",
    ring: "ring-blue-100",
  },
  work: {
    gradient: "from-violet-600/90 via-purple-700/80 to-fuchsia-800/90",
    iconBg: "bg-gradient-to-br from-violet-50 to-purple-100",
    iconText: "text-[var(--hub-color-work,#7c3aed)]",
    accent: "border-l-[var(--hub-color-work,#7c3aed)]",
    ring: "ring-violet-100",
  },
  info: {
    gradient: "from-emerald-600/90 via-teal-700/80 to-cyan-800/90",
    iconBg: "bg-gradient-to-br from-emerald-50 to-teal-100",
    iconText: "text-[var(--hub-color-info,#059669)]",
    accent: "border-l-[var(--hub-color-info,#059669)]",
    ring: "ring-emerald-100",
  },
  support: {
    gradient: "from-amber-500/90 via-orange-600/80 to-rose-700/90",
    iconBg: "bg-gradient-to-br from-amber-50 to-orange-100",
    iconText: "text-[var(--hub-color-support,#d97706)]",
    accent: "border-l-[var(--hub-color-support,#d97706)]",
    ring: "ring-amber-100",
  },
};

export const HUB_PRIMARY = color("hub-color-primary", "#4f46e5");
