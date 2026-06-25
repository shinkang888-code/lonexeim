import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_CHAT_MODEL,
  DEFAULT_LEGAL_MODEL,
} from "@/lib/ai/models-catalog";
import { demoChatReply, hfChat } from "@/lib/ai/huggingface";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const messages = body.messages as { role: string; content: string }[];
  const mode = body.mode as string | undefined;

  if (!messages?.length) {
    return NextResponse.json({ detail: "messages required" }, { status: 400 });
  }

  const model =
    mode === "legal" ? DEFAULT_LEGAL_MODEL : (body.model as string) || DEFAULT_CHAT_MODEL;
  const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";

  try {
    if (!process.env.HF_TOKEN) {
      return NextResponse.json({
        role: "assistant",
        content: demoChatReply(lastUser),
        model,
        demo: true,
      });
    }

    const content = await hfChat(model, messages);
    return NextResponse.json({ role: "assistant", content, model, demo: false });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "AI error";
    return NextResponse.json({ detail: msg }, { status: 502 });
  }
}
