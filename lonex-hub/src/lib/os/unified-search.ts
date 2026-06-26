import type { HubModuleDef } from "@/lib/module-registry";

/** 한글 초성 분해 (특허 도 13 — getInitials) */
const CHO = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

export function getInitials(text: string): string {
  let out = "";
  for (const ch of text) {
    const code = ch.charCodeAt(0);
    if (code >= 0xac00 && code <= 0xd7a3) {
      out += CHO[Math.floor((code - 0xac00) / 588)];
    } else if (/[a-zA-Z0-9]/.test(ch)) {
      out += ch.toLowerCase();
    }
  }
  return out;
}

const ALIASES: Record<string, string[]> = {
  "ai-assistant": ["ai", "bot", "assistant"],
  chat: ["rocket", "message"],
  mail: ["email", "imap"],
  calendar: ["cal", "schedule"],
  media: ["cdms", "video", "content", "eim"],
  borderless: ["translate", "subtitle"],
  "hq-search": ["search", "hq"],
  workforce: ["sync", "employee"],
  logshield: ["security", "dlp"],
};

export function matchAppQuery(query: string, mod: HubModuleDef): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return false;
  const name = mod.name.toLowerCase();
  if (name.includes(q)) return true;
  const initials = getInitials(mod.name);
  if (initials.startsWith(q.replace(/\s/g, ""))) return true;
  const aliases = ALIASES[mod.id] ?? [];
  if (aliases.some((a) => a.includes(q) || q.includes(a))) return true;
  return false;
}
