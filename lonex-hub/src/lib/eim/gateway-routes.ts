/** EIM /API/* → Hub BFF 라우트 매핑 (896 paths 중 우선 subset) */
export type EimGatewayRoute = {
  hubPath: string;
  methods: readonly ("GET" | "POST" | "PUT" | "PATCH" | "DELETE")[];
  /** EIM 요청 body 키 변환 (선택) */
  mapBody?: (body: Record<string, unknown>) => Record<string, unknown>;
};

export const EIM_TOTAL_PATHS = 896;

/** path = "ai/vector/search" (선행 /API/ 제외, 소문자) */
export const EIM_GATEWAY_MAP: Record<string, EimGatewayRoute> = {
  "ai/vector/search": { hubPath: "/api/ai/vector/search", methods: ["GET", "POST"] },
  "ai/vector/status": { hubPath: "/api/ai/vector/search", methods: ["GET"] },
  "ai/llm/chat": {
    hubPath: "/api/ai/chat",
    methods: ["POST"],
    mapBody: (b) => ({
      messages: b.messages ?? [{ role: "user", content: b.message ?? b.prompt ?? "" }],
      model: b.model,
      mode: b.mode,
    }),
  },
  "ai/chat/send": {
    hubPath: "/api/ai/chat",
    methods: ["POST"],
    mapBody: (b) => ({
      messages: b.messages ?? [{ role: "user", content: b.message ?? b.content ?? "" }],
      model: b.model,
    }),
  },
  "ai/models": { hubPath: "/api/ai/models", methods: ["GET"] },
  "ai/status": { hubPath: "/api/ai/status", methods: ["GET"] },
  "ai/tools": { hubPath: "/api/ai/tools", methods: ["POST"] },
  "ai/vector/bulk-embed": { hubPath: "/api/ai/vector/search", methods: ["PUT", "POST"] },
  "ai/contentembedding/search": {
    hubPath: "/api/ai/vector/search",
    methods: ["POST"],
    mapBody: (b) => ({ query: b.query ?? b.q ?? b.text, domain: b.domain, limit: b.limit }),
  },
  "hq/ingest": { hubPath: "/api/hq/ingest", methods: ["GET", "POST"] },
  "hq/search": { hubPath: "/api/hq/search", methods: ["GET"] },
  "hq/stats": { hubPath: "/api/hq/stats", methods: ["GET"] },
};

export function normalizeEimPath(segments: string[]): string {
  return segments.map((s) => s.toLowerCase()).join("/");
}

export function migratedPathCount(): number {
  return Object.keys(EIM_GATEWAY_MAP).length;
}
