import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_CHAT_MODEL, DEFAULT_LEGAL_MODEL } from "@/lib/ai/models-catalog";
import { isHfConfigured, demoChatReply, hfChat } from "@/lib/ai/huggingface";
import { checkCreditsAndLog } from "@/lib/ai/usage-log";
import { resolveApiKey } from "@/lib/hq/resolve-api-key";
import { resolveTenant } from "@/lib/tenant/resolve-tenant";
import { getSql } from "@/lib/db";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const messages = body.messages as { role: string; content: string }[];
  const mode = body.mode as string | undefined;

  if (!messages?.length) {
    return NextResponse.json({ detail: "messages required" }, { status: 400 });
  }

  const tenant = await resolveTenant(req);
  const apiCtx = await resolveApiKey(req);
  const model =
    mode === "legal" ? DEFAULT_LEGAL_MODEL : (body.model as string) || DEFAULT_CHAT_MODEL;
  const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";

  let chatMessages = messages;
  if (mode === "legal") {
    const sql = getSql();
    let systemPrompt =
      "당신은 한국 법률·계약 검토를 돕는 AI 어시스턴트입니다. 조문·판례 인용 시 출처를 명시하고, 법률 자문은 참고용임을 안내하세요.";
    if (sql) {
      try {
        const prompts = await sql`
          SELECT template FROM ai_prompt_registry
          WHERE tenant_id = ${tenant.id} AND slug = 'legal-review'
          ORDER BY version DESC LIMIT 1
        `;
        if (prompts[0]?.template) systemPrompt = prompts[0].template as string;
      } catch {
        /* phase2 tables optional */
      }
    }
    chatMessages = [{ role: "system", content: systemPrompt }, ...messages];
  }

  try {
    let content: string;
    let demo = false;

    if (!isHfConfigured()) {
      content = demoChatReply(lastUser);
      demo = true;
    } else {
      content = await hfChat(model, chatMessages);
    }

    const metering = await checkCreditsAndLog(
      tenant.id,
      apiCtx?.employee_id,
      "/api/ai/chat",
      model,
      lastUser,
      content
    );

    if (!metering.ok) {
      return NextResponse.json(
        {
          detail: "Insufficient AI credits",
          balance_credits: metering.balance,
          credits_required: metering.creditsUsed,
          tenant: tenant.slug,
        },
        { status: 402 }
      );
    }

    return NextResponse.json({
      role: "assistant",
      content,
      model,
      demo,
      tenant: tenant.slug,
      usage: {
        credits_used: metering.creditsUsed,
        balance_credits: metering.balance,
        usage_id: metering.usageId,
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "AI error";
    return NextResponse.json({ detail: msg }, { status: 502 });
  }
}
