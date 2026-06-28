import { NextRequest } from "next/server";
import { POST as aiChatPost } from "@/app/api/ai/chat/route";
import { GET as aiModelsGet } from "@/app/api/ai/models/route";
import { GET as aiPromptsGet } from "@/app/api/ai/prompts/route";
import { GET as aiStatusGet } from "@/app/api/ai/status/route";
import { POST as aiToolsPost } from "@/app/api/ai/tools/route";
import { GET as vectorSearchGet, POST as vectorSearchPost } from "@/app/api/ai/vector/search/route";
import { GET as billingCreditsGet, POST as billingCreditsPost } from "@/app/api/billing/credits/route";
import { GET as billingUsageGet } from "@/app/api/billing/usage/route";
import { GET as hqIngestGet, POST as hqIngestPost } from "@/app/api/hq/ingest/route";
import { GET as hqSearchGet } from "@/app/api/hq/search/route";
import { GET as hqStatsGet } from "@/app/api/hq/stats/route";

type Handler = (req: NextRequest, ctx?: unknown) => Promise<Response>;

/** Hub BFF 핸들러 직접 호출 (Vercel self-fetch 회피) */
export const HUB_HANDLERS: Record<string, Partial<Record<string, Handler>>> = {
  "/api/ai/vector/search": { GET: vectorSearchGet, POST: vectorSearchPost },
  "/api/ai/chat": { POST: aiChatPost },
  "/api/ai/models": { GET: aiModelsGet },
  "/api/ai/status": { GET: aiStatusGet },
  "/api/ai/tools": { POST: aiToolsPost },
  "/api/ai/prompts": { GET: aiPromptsGet },
  "/api/billing/credits": { GET: billingCreditsGet, POST: billingCreditsPost },
  "/api/billing/usage": { GET: billingUsageGet },
  "/api/hq/ingest": { GET: hqIngestGet, POST: hqIngestPost },
  "/api/hq/search": { GET: hqSearchGet },
  "/api/hq/stats": { GET: hqStatsGet },
};

export function proxyRequest(req: NextRequest, body?: unknown): NextRequest {
  if (body === undefined) return req;
  const headers = new Headers(req.headers);
  headers.set("content-type", "application/json");
  return new NextRequest(req.url, {
    method: req.method,
    headers,
    body: JSON.stringify(body),
  });
}

export async function invokeHubHandler(
  req: NextRequest,
  hubPath: string,
  body?: unknown
): Promise<Response | null> {
  const handler = HUB_HANDLERS[hubPath]?.[req.method];
  if (!handler) return null;
  return handler(proxyRequest(req, body));
}
