import type { HubModuleDef } from "@/lib/module-registry";
import { moduleMeta } from "@/lib/module-meta";

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

export function matchAppQuery(query: string, mod: HubModuleDef): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return false;
  const name = mod.name.toLowerCase();
  const nameEn = (mod.nameEn ?? "").toLowerCase();
  if (name.includes(q) || nameEn.includes(q)) return true;
  const initials = getInitials(mod.name);
  if (initials.startsWith(q.replace(/\s/g, ""))) return true;
  const keywords = moduleMeta(mod.id).searchKeywords;
  if (keywords.some((k) => k.toLowerCase().includes(q) || q.includes(k.toLowerCase()))) return true;
  if (mod.id.includes(q)) return true;
  return false;
}

export function searchModules(query: string, modules: HubModuleDef[]): HubModuleDef[] {
  const q = query.trim();
  if (!q) return [];
  return modules.filter((m) => matchAppQuery(q, m));
}
