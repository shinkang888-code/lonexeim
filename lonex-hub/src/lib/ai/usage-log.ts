import { randomUUID } from "crypto";
import { getSql } from "@/lib/db";

export type UsageLogInput = {
  tenantId: string;
  employeeId?: string | null;
  endpoint: string;
  model?: string;
  tokensIn?: number;
  tokensOut?: number;
  creditsUsed?: number;
  metadata?: Record<string, unknown>;
};

/** 대략적 토큰 추정 (UTF-8 글자 수 / 4) */
export function estimateTokens(text: string): number {
  return Math.max(1, Math.ceil(text.length / 4));
}

/** 크레딧 = 입·출력 토큰 합 × 0.001 (제2발명 POC) */
export function creditsFromTokens(tokensIn: number, tokensOut: number): number {
  return Math.round((tokensIn + tokensOut) * 0.001 * 10000) / 10000;
}

export async function getCreditBalance(
  tenantId: string,
  employeeId?: string | null
): Promise<number | null> {
  const sql = getSql();
  if (!sql) return null;
  try {
    const empRows = employeeId
      ? await sql`
          SELECT balance_credits FROM ai_credit_balances
          WHERE tenant_id = ${tenantId} AND employee_id = ${employeeId}
          LIMIT 1
        `
      : [];
    if (empRows[0]) return Number(empRows[0].balance_credits);

    const orgRows = await sql`
      SELECT balance_credits FROM ai_credit_balances
      WHERE tenant_id = ${tenantId} AND employee_id IS NULL
      LIMIT 1
    `;
    return orgRows[0] ? Number(orgRows[0].balance_credits) : 0;
  } catch {
    return null;
  }
}

export async function deductCredits(
  tenantId: string,
  amount: number,
  employeeId?: string | null
): Promise<boolean> {
  const sql = getSql();
  if (!sql) return true;
  try {
    if (employeeId) {
      const updated = await sql`
        UPDATE ai_credit_balances
        SET balance_credits = balance_credits - ${amount}, updated_at = NOW()
        WHERE tenant_id = ${tenantId} AND employee_id = ${employeeId}
          AND balance_credits >= ${amount}
        RETURNING balance_credits
      `;
      if (updated.length) return true;
    }
    const orgUpdated = await sql`
      UPDATE ai_credit_balances
      SET balance_credits = balance_credits - ${amount}, updated_at = NOW()
      WHERE tenant_id = ${tenantId} AND employee_id IS NULL
        AND balance_credits >= ${amount}
      RETURNING balance_credits
    `;
    return orgUpdated.length > 0;
  } catch {
    return true;
  }
}

export async function logAiUsage(input: UsageLogInput): Promise<string | null> {
  const sql = getSql();
  if (!sql) return null;
  const id = `USG-${randomUUID().replace(/-/g, "").slice(0, 12)}`;
  try {
    await sql`
      INSERT INTO ai_usage_log
      (id, tenant_id, employee_id, endpoint, model, tokens_in, tokens_out, credits_used, metadata_json)
      VALUES (
        ${id}, ${input.tenantId}, ${input.employeeId ?? null},
        ${input.endpoint}, ${input.model ?? null},
        ${input.tokensIn ?? 0}, ${input.tokensOut ?? 0},
        ${input.creditsUsed ?? 0}, ${JSON.stringify(input.metadata ?? {})}
      )
    `;
    return id;
  } catch {
    return null;
  }
}

export async function checkCreditsAndLog(
  tenantId: string,
  employeeId: string | null | undefined,
  endpoint: string,
  model: string,
  promptText: string,
  responseText: string
): Promise<{ ok: boolean; balance: number | null; creditsUsed: number; usageId: string | null }> {
  const tokensIn = estimateTokens(promptText);
  const tokensOut = estimateTokens(responseText);
  const creditsUsed = creditsFromTokens(tokensIn, tokensOut);
  const balance = await getCreditBalance(tenantId, employeeId);

  if (balance !== null && balance < creditsUsed) {
    return { ok: false, balance, creditsUsed, usageId: null };
  }

  if (balance !== null) {
    const deducted = await deductCredits(tenantId, creditsUsed, employeeId);
    if (!deducted) return { ok: false, balance, creditsUsed, usageId: null };
  }

  const usageId = await logAiUsage({
    tenantId,
    employeeId,
    endpoint,
    model,
    tokensIn,
    tokensOut,
    creditsUsed,
  });

  return {
    ok: true,
    balance: balance !== null ? balance - creditsUsed : null,
    creditsUsed,
    usageId,
  };
}
