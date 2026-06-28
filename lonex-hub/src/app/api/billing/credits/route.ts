import { NextRequest, NextResponse } from "next/server";
import { getCreditBalance } from "@/lib/ai/usage-log";
import { verifyAdminSecret } from "@/lib/hq/auth";
import { resolveApiKey } from "@/lib/hq/resolve-api-key";
import { resolveTenant } from "@/lib/tenant/resolve-tenant";
import { requireSql } from "@/lib/db";

export const dynamic = "force-dynamic";

/** GET — 테넌트/직원 크레딧 잔액 (제2발명) */
export async function GET(req: NextRequest) {
  try {
    const tenant = await resolveTenant(req);
    const ctx = await resolveApiKey(req);
    const employeeId = ctx?.employee_id ?? null;
    const balance = await getCreditBalance(tenant.id, employeeId);

    if (balance === null) {
      return NextResponse.json({
        tenant: tenant.slug,
        balance_credits: null,
        mode: "offline",
        note: "Run npm run db:migrate:phase2",
      });
    }

    return NextResponse.json({
      tenant: tenant.slug,
      tenant_id: tenant.id,
      employee_id: employeeId,
      balance_credits: balance,
    });
  } catch (e) {
    console.error("[billing/credits GET]", e);
    return NextResponse.json({ detail: "Server error" }, { status: 500 });
  }
}

/** POST — admin 크레딧 충전 */
export async function POST(req: NextRequest) {
  if (!verifyAdminSecret(req.headers.get("x-admin-secret"))) {
    return NextResponse.json({ detail: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const tenant = await resolveTenant(req);
    const amount = Number(body.amount);
    const employeeId = (body.employee_id as string | undefined) ?? "";

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ detail: "amount required" }, { status: 400 });
    }

    const sql = requireSql();
    await sql`
      INSERT INTO ai_credit_balances (tenant_id, employee_id, balance_credits)
      VALUES (${tenant.id}, ${employeeId || ""}, ${amount})
      ON CONFLICT (tenant_id, employee_id)
      DO UPDATE SET
        balance_credits = ai_credit_balances.balance_credits + ${amount},
        updated_at = NOW()
    `;

    const balance = await getCreditBalance(tenant.id, employeeId);
    return NextResponse.json({ status: "ok", balance_credits: balance });
  } catch (e) {
    console.error("[billing/credits POST]", e);
    return NextResponse.json({ detail: "Server error" }, { status: 500 });
  }
}
