/** 앱 레지스트리 메타 — 특허 청구항 1·5 (권한·검색키워드) */
export interface ModuleMeta {
  roles?: string[];
  searchKeywords: string[];
}

export const MODULE_META: Record<string, ModuleMeta> = {
  "ai-assistant": {
    roles: ["all"],
    searchKeywords: ["ai", "bot", "assistant", "비서", "에이아이", "챗봇"],
  },
  chat: {
    roles: ["all"],
    searchKeywords: ["chat", "rocket", "message", "채팅", "메신저", "톡"],
  },
  mail: {
    roles: ["all"],
    searchKeywords: ["mail", "email", "imap", "메일", "이메일", "웹메일"],
  },
  calendar: {
    roles: ["all"],
    searchKeywords: ["cal", "calendar", "schedule", "캘린더", "일정", "예약"],
  },
  media: {
    roles: ["all", "content"],
    searchKeywords: ["media", "cdms", "eim", "video", "content", "콘텐츠", "제작", "편집"],
  },
  borderless: {
    roles: ["all", "content"],
    searchKeywords: ["borderless", "translate", "subtitle", "번역", "자막", "다국어"],
  },
  "video-chat": {
    roles: ["all"],
    searchKeywords: ["livekit", "video", "meet", "화상", "회의", "zoom"],
  },
  bidding: {
    roles: ["work", "admin"],
    searchKeywords: ["bid", "g2b", "nara", "입찰", "나라장터", "조달"],
  },
  logshield: {
    roles: ["admin", "security"],
    searchKeywords: ["logshield", "security", "dlp", "edr", "보안", "관제"],
  },
  "hq-search": {
    roles: ["admin", "hq"],
    searchKeywords: ["hq", "search", "본사", "통합검색", "검색"],
  },
  "web-drive": {
    roles: ["all"],
    searchKeywords: ["drive", "nextcloud", "file", "드라이브", "파일", "동기화"],
  },
  notes: {
    roles: ["all"],
    searchKeywords: ["note", "wiki", "outline", "노트", "위키", "문서"],
  },
  support: {
    roles: ["all", "support"],
    searchKeywords: ["support", "chatwoot", "ticket", "고객센터", "티켓", "상담"],
  },
  billing: {
    roles: ["admin", "finance"],
    searchKeywords: ["billing", "invoice", "akaunting", "요금", "청구", "회계"],
  },
  workforce: {
    roles: ["admin", "hq"],
    searchKeywords: ["workforce", "sync", "employee", "직원", "동기화", "설정"],
  },
};

export function moduleMeta(id: string): ModuleMeta {
  return MODULE_META[id] ?? { roles: ["all"], searchKeywords: [id] };
}
