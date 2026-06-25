export type ModuleCategory = "favorites" | "communication" | "work" | "info" | "support";
export type IntegrationMode = "embed" | "iframe" | "api" | "component" | "demo";

export interface OssStack {
  github: string;
  license: string;
  stars?: string;
  integration: IntegrationMode;
  hfModels?: string[];
  kaggle?: string;
  notes?: string;
}

export interface HubModuleDef {
  id: string;
  name: string;
  nameEn?: string;
  category: ModuleCategory;
  icon: string;
  route: string;
  description: string;
  demo: boolean;
  oss: OssStack;
}

/** Lonex Hub — OSS 선정 (GitHub + HuggingFace + Kaggle 조사, 2026-06) */
export const MODULE_REGISTRY: HubModuleDef[] = [
  {
    id: "ai-assistant",
    name: "AI 비서",
    category: "communication",
    icon: "Bot",
    route: "/m/ai-assistant",
    description: "RAG·워크플로·에이전트 기업 AI",
    demo: true,
    oss: {
      github: "langgenius/dify",
      license: "Dify License",
      stars: "146k",
      integration: "embed",
      hfModels: ["LGAI-EXAONE/EXAONE-4.0-32B", "skt/A.X-4.0-Light"],
      notes: "Dify Embed Widget + vLLM(EXAONE/A.X) 백엔드",
    },
  },
  {
    id: "chat",
    name: "웹채팅",
    category: "communication",
    icon: "MessageCircle",
    route: "/m/chat",
    description: "팀 채팅·라이브챗",
    demo: true,
    oss: {
      github: "RocketChat/Rocket.Chat",
      license: "MIT",
      stars: "45k",
      integration: "embed",
      notes: "Livechat Widget SDK",
    },
  },
  {
    id: "mail",
    name: "웹메일",
    category: "communication",
    icon: "Mail",
    route: "/m/mail",
    description: "IMAP 웹메일",
    demo: true,
    oss: {
      github: "roundcube/roundcubemail",
      license: "GPL-3.0",
      stars: "7k",
      integration: "iframe",
      notes: "Roundcube + OAuth SSO",
    },
  },
  {
    id: "calendar",
    name: "캘린더",
    category: "communication",
    icon: "Calendar",
    route: "/m/calendar",
    description: "일정·예약",
    demo: true,
    oss: {
      github: "calcom/cal.com",
      license: "MIT",
      stars: "45k",
      integration: "component",
      notes: "@calcom/embed-react",
    },
  },
  {
    id: "cdms",
    name: "콘텐츠개발도구",
    category: "communication",
    icon: "Video",
    route: "/m/cdms",
    description: "워크플로·촬영·컷편집·종합편집",
    demo: true,
    oss: {
      github: "mediacms-io/mediacms",
      license: "AGPL-3.0",
      stars: "5k",
      integration: "api",
      hfModels: ["openai/whisper-large-v3", "coqui/XTTS-v2"],
      notes: "MediaCMS API + OpenCut(MIT) 편집 UI 보조",
    },
  },
  {
    id: "borderless",
    name: "borderless",
    nameEn: "borderless",
    category: "communication",
    icon: "Languages",
    route: "/m/borderless",
    description: "오디오→자막 + 다국어 번역",
    demo: true,
    oss: {
      github: "jianchang512/pyvideotrans",
      license: "GPL-3.0",
      stars: "18k",
      integration: "api",
      hfModels: [
        "ghost613/whisper-large-v3-turbo-korean",
        "google/madlad400-3b-mt",
      ],
      kaggle: "google/fleurs (STT 파인튜닝 참고)",
      notes: "faster-whisper(ko) + madlad400 프로덕션 파이프",
    },
  },
  {
    id: "video-chat",
    name: "화상채팅",
    category: "communication",
    icon: "VideoIcon",
    route: "/m/video-chat",
    description: "WebRTC 화상회의",
    demo: true,
    oss: {
      github: "livekit/livekit",
      license: "Apache-2.0",
      stars: "19k",
      integration: "component",
      hfModels: ["fastrtc (gradio-app/fastrtc)"],
      notes: "@livekit/components-react",
    },
  },
  {
    id: "bidding",
    name: "입찰정보",
    category: "work",
    icon: "Gavel",
    route: "/m/bidding",
    description: "나라장터 입찰·낙찰",
    demo: true,
    oss: {
      github: "kyj2294/naramarket-pro-MCP",
      license: "Custom",
      integration: "api",
      kaggle: "data.go.kr 조달청 API (Kaggle 대체)",
      hfModels: ["skt/A.X-4.0-Light (공고문 요약)"],
      notes: "data.go.kr OpenAPI + MCP→REST BFF",
    },
  },
  {
    id: "logshield",
    name: "LogShield",
    category: "work",
    icon: "Shield",
    route: "/m/logshield",
    description: "DLP·EDR 원격보안관제 — USB·네트워크·프린트·UEBA",
    demo: true,
    oss: {
      github: "shinkang888-code/logshield",
      license: "Enterprise Internal",
      integration: "component",
      notes: "Windows Agent + 본사 HQ 보안 이벤트 수집",
    },
  },
  {
    id: "hq-search",
    name: "본사통합검색",
    category: "info",
    icon: "Search",
    route: "/m/hq-search",
    description: "직원 이메일·문서·보안로그 일괄 검색 (본사 전용)",
    demo: true,
    oss: {
      github: "lonex-workforce/hq-server",
      license: "Proprietary",
      integration: "api",
      notes: "SQLite FTS5 + FastAPI — 관리자 X-Admin-Secret",
    },
  },
  {
    id: "web-drive",
    name: "웹드라이브",
    category: "info",
    icon: "HardDrive",
    route: "/m/web-drive",
    description: "파일·동기화",
    demo: true,
    oss: {
      github: "nextcloud/server",
      license: "AGPL-3.0",
      stars: "35k",
      integration: "iframe",
      notes: "OAuth2 + WebDAV",
    },
  },
  {
    id: "notes",
    name: "노트",
    category: "info",
    icon: "PenLine",
    route: "/m/notes",
    description: "팀 위키·노트",
    demo: true,
    oss: {
      github: "outline/outline",
      license: "BSL-1.1",
      stars: "39k",
      integration: "iframe",
      hfModels: ["ONTHEIT/BizOnAI-OCR", "BAAI/bge-m3"],
      notes: "Outline + BizOnAI-OCR 한국 문서",
    },
  },
  {
    id: "support",
    name: "고객센터",
    category: "support",
    icon: "Headphones",
    route: "/m/support",
    description: "라이브챗·티켓",
    demo: true,
    oss: {
      github: "chatwoot/chatwoot",
      license: "MIT",
      stars: "33k",
      integration: "embed",
      notes: "window.$chatwoot SDK",
    },
  },
  {
    id: "billing",
    name: "요금관리",
    category: "support",
    icon: "DollarSign",
    route: "/m/billing",
    description: "청구·수납",
    demo: true,
    oss: {
      github: "akaunting/akaunting",
      license: "BSL-1.1",
      stars: "9k",
      integration: "iframe",
      notes: "Akaunting REST API",
    },
  },
  {
    id: "workforce",
    name: "직원설정",
    category: "support",
    icon: "Settings",
    route: "/m/workforce",
    description: "본사 API Key·동기화·LogShield 연동 상태",
    demo: true,
    oss: {
      github: "lonex-workforce/desktop",
      license: "Proprietary",
      integration: "component",
      notes: "Electron Sync Agent + LogShield Bridge",
    },
  },
];

export const CATEGORY_LABELS: Record<ModuleCategory, string> = {
  favorites: "즐겨찾기",
  communication: "커뮤니케이션",
  work: "근무",
  info: "정보",
  support: "고객센터",
};

export function getModule(id: string) {
  return MODULE_REGISTRY.find((m) => m.id === id);
}

export function modulesByCategory(category: ModuleCategory) {
  return MODULE_REGISTRY.filter((m) => m.category === category);
}
