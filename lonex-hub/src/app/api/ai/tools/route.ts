import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_EMBED_MODEL, DEFAULT_PII_MODEL } from "@/lib/ai/models-catalog";
import { isHfConfigured, hfEmbed, hfPiiMask } from "@/lib/ai/huggingface";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const action = body.action as string;

  if (!isHfConfigured()) {
    return NextResponse.json({
      demo: true,
      message: "HF_TOKEN 설정 후 BGE-M3 임베딩·PII NER 연동",
    });
  }

  try {
    if (action === "embed") {
      const texts = body.texts as string[];
      if (!texts?.length) return NextResponse.json({ detail: "texts required" }, { status: 400 });
      const vectors = await hfEmbed(body.model ?? DEFAULT_EMBED_MODEL, texts);
      return NextResponse.json({ vectors, model: body.model ?? DEFAULT_EMBED_MODEL });
    }

    if (action === "pii") {
      const text = body.text as string;
      if (!text) return NextResponse.json({ detail: "text required" }, { status: 400 });
      const masked = await hfPiiMask(text, body.model ?? DEFAULT_PII_MODEL);
      return NextResponse.json({ masked, model: body.model ?? DEFAULT_PII_MODEL });
    }

    return NextResponse.json({ detail: "Unknown action" }, { status: 400 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "AI error";
    return NextResponse.json({ detail: msg }, { status: 502 });
  }
}
