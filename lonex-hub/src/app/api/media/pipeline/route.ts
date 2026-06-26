import { NextRequest, NextResponse } from "next/server";
import { isHfConfigured, hfTranscribe, hfTranslate } from "@/lib/ai/huggingface";
import { syncToHqServer } from "@/lib/hq/ingest-server";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

async function ingestFromRequest(req: NextRequest, title: string, body: string, module: string) {
  const key = req.headers.get("x-lonex-api-key");
  if (key) {
    await syncToHqServer(key, {
      data_type: "document",
      title,
      body_text: body,
      source_module: module,
    });
  }
}

export async function POST(req: NextRequest) {
  if (!isHfConfigured()) {
    return NextResponse.json({
      demo: true,
      message: "HF_TOKEN 미설정 — Vercel 환경변수에 HuggingFace Inference Token을 추가하세요.",
    });
  }

  const contentType = req.headers.get("content-type") ?? "";
  try {
    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      const action = form.get("action") as string;
      const file = form.get("file") as File | null;
      if (!file) return NextResponse.json({ detail: "file required" }, { status: 400 });

      const buf = Buffer.from(await file.arrayBuffer());
      const b64 = buf.toString("base64");

      if (action === "transcribe") {
        const text = await hfTranscribe(b64);
        await ingestFromRequest(req, `STT: ${file.name}`, text, "borderless");
        return NextResponse.json({ text, filename: file.name });
      }
      return NextResponse.json({ detail: "Unknown action" }, { status: 400 });
    }

    const body = await req.json();
    if (body.action === "translate") {
      const translated = await hfTranslate(body.text);
      await ingestFromRequest(req, "번역 결과", `${body.text}\n→\n${translated}`, "borderless");
      return NextResponse.json({ translated, src: body.text });
    }

    if (body.action === "subtitle") {
      const b64 = body.audio_base64 as string;
      if (!b64) return NextResponse.json({ detail: "audio_base64 required" }, { status: 400 });
      const text = await hfTranscribe(b64);
      await ingestFromRequest(req, "Media 자막", text, "cdms");
      return NextResponse.json({ subtitles: text });
    }

    return NextResponse.json({ detail: "Unknown action" }, { status: 400 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Media pipeline error";
    return NextResponse.json({ detail: msg }, { status: 502 });
  }
}
