import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_CHAT_MODEL, DEFAULT_LEGAL_MODEL } from "@/lib/ai/models-catalog";
import { isHfConfigured, demoChatReply, hfChat } from "@/lib/ai/huggingface";

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

  const chatMessages =
    mode === "legal"
      ? [
          {
            role: "system",
            content:
              "당신은 한국 법률·계약 검토를 돕는 AI 어시스턴트입니다. 조문·판례 인용 시 출처를 명시하고, 법률 자문은 참고용임을 안내하세요.",
          },
          ...messages,
        ]
      : messages;

  try {
    if (!isHfConfigured()) {
      return NextResponse.json({
        role: "assistant",
        content: demoChatReply(lastUser),
        model,
        demo: true,
      });
    }

    const content = await hfChat(model, chatMessages);
    return NextResponse.json({ role: "assistant", content, model, demo: false });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "AI error";
    return NextResponse.json({ detail: msg }, { status: 502 });
  }
}
