/**
 * EIM API prefix categories — 896 paths grouped by first segment after /API/
 * Generated from docs/eim-api-paths.txt
 */
export type EimCategoryPhase = "live" | "stub" | "planned";

export type EimCategoryDef = {
  phase: EimCategoryPhase;
  label: string;
  hubNote: string;
};

/** Prefix (lowercase) → migration status */
export const EIM_CATEGORY_REGISTRY: Record<string, EimCategoryDef> = {
  ai: { phase: "live", label: "AI 커널", hubNote: "/api/ai/* BFF + pgvector" },
  member: { phase: "stub", label: "회원·세션", hubNote: "session-check live; login Phase 3" },
  hq: { phase: "live", label: "본사 HQ", hubNote: "/api/hq/* ingest·search" },
  approval: { phase: "live", label: "전자결재", hubNote: "Hub BFF — list/apply/orgChart (Phase 3)" },
  approval_template: { phase: "live", label: "결재 템플릿", hubNote: "Hub BFF create/get" },
  approval_type: { phase: "live", label: "결재 유형", hubNote: "Hub BFF getAll/create" },
  attendance: { phase: "live", label: "근태", hubNote: "Hub BFF — clock in/out, records" },
  facerecogination: { phase: "planned", label: "얼굴 출퇴근", hubNote: "제3발명 — Phase 3" },
  salary_contract: { phase: "live", label: "급여·계약", hubNote: "Hub BFF salary_contract/*" },
  leaverecord: { phase: "live", label: "휴가", hubNote: "Hub BFF grantedleaveRecord/*" },
  grantedleaverecord: { phase: "live", label: "휴가 기록", hubNote: "Hub BFF list/apply/audit" },
  overtime: { phase: "stub", label: "연장근무", hubNote: "Phase 3" },
  remotework: { phase: "stub", label: "재택", hubNote: "Phase 3" },
  expense: { phase: "stub", label: "경비", hubNote: "Phase 3" },
  assetmangements: { phase: "stub", label: "자산관리", hubNote: "Phase 3" },
  contentproject: { phase: "stub", label: "콘텐츠 프로젝트", hubNote: "media module Phase 3" },
  contentslide: { phase: "stub", label: "슬라이드", hubNote: "제4발명 Phase 3" },
  contenttemplate: { phase: "planned", label: "디자인 템플릿", hubNote: "제4발명 Phase 3" },
  cuteditor: { phase: "stub", label: "컷편집", hubNote: "borderless/media Phase 3" },
  webdrive: { phase: "stub", label: "웹드라이브", hubNote: "Nextcloud embed Phase 1" },
  chat: { phase: "stub", label: "채팅", hubNote: "Rocket.Chat embed" },
  pmfile: { phase: "stub", label: "PM 파일", hubNote: "Phase 3" },
  pmtaskdetail: { phase: "stub", label: "PM 태스크", hubNote: "Phase 3" },
  office: { phase: "stub", label: "오피스", hubNote: "Phase 3" },
  privatekey: { phase: "stub", label: "인증키", hubNote: "Phase 3" },
};

export const EIM_TOTAL_PATHS = 896;

export function eimCategory(prefix: string): EimCategoryDef {
  return (
    EIM_CATEGORY_REGISTRY[prefix.toLowerCase()] ?? {
      phase: "planned",
      label: prefix,
      hubNote: "EIM legacy — Hub BFF backlog",
    }
  );
}

export function listEimCategories(): { prefix: string; count?: number }[] {
  return Object.keys(EIM_CATEGORY_REGISTRY).map((prefix) => ({ prefix }));
}
