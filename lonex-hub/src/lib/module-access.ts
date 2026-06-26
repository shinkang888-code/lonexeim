import type { HubModuleDef } from "@/lib/module-registry";
import { moduleMeta } from "@/lib/module-meta";

/** 사용자 역할에 따른 앱 가시성 (특허 도 4 — 미지정 roles = 전체 공개) */
export function isModuleVisible(mod: HubModuleDef, userRoles: string[]): boolean {
  const roles = moduleMeta(mod.id).roles;
  if (!roles?.length || roles.includes("all")) return true;
  if (userRoles.includes("admin")) return true;
  return roles.some((r) => userRoles.includes(r));
}

export function visibleModules(modules: HubModuleDef[], userRoles: string[] = ["all"]) {
  return modules.filter((m) => isModuleVisible(m, userRoles));
}
