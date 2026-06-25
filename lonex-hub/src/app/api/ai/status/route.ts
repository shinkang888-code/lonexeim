import { NextResponse } from "next/server";
import {
  isHfConfigured,
  ROUTER_CHAT_MODEL,
  ROUTER_TRANSLATE_MODEL,
} from "@/lib/ai/huggingface";
import { isKaggleConfigured } from "@/lib/ai/kaggle";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    configured: isHfConfigured(),
    kaggle: isKaggleConfigured(),
    provider: "huggingface-router",
    endpoint: "router.huggingface.co",
    models: {
      chat: ROUTER_CHAT_MODEL,
      legal: ROUTER_CHAT_MODEL,
      whisper: "openai/whisper-large-v3",
      translate: ROUTER_TRANSLATE_MODEL,
    },
    note: "Bllossom/Qwen Legal 큐레이션 ID는 Router 미지원 → Qwen2.5-7B-Instruct로 자동 매핑",
  });
}
