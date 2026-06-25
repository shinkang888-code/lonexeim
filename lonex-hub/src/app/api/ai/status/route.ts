import { NextResponse } from "next/server";
import { isHfConfigured } from "@/lib/ai/huggingface";
import { isKaggleConfigured } from "@/lib/ai/kaggle";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    configured: isHfConfigured(),
    kaggle: isKaggleConfigured(),
    provider: "huggingface",
    models: {
      chat: "Bllossom/llama-3.2-Korean-Bllossom-3B",
      legal: "Aniyooo/Qwen3-8B-Legal-Korean",
      whisper: "ghost613/whisper-large-v3-turbo-korean",
      translate: "facebook/nllb-200-distilled-600M",
    },
  });
}
