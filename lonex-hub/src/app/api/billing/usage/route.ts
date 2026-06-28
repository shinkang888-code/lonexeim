import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSecret } from "@/lib/hq/auth";
import { resolveApiKey } from "@/lib/hq/resolve-api-key";
import { resolveTenant } from "@/lib/tenant/resolve-tenant";
import { getSql } from "@/lib/db";

export const dynamic = "force-dynamic";

/** GET — aiUsageLog 조회 (청구항 10) */
export async function GET(req: NextRequest) {
  try {
    const tenant = await resolveTenant(req);
    const ctx = await resolveApiKey(req);
    const isAdmin = verifyAdminSecret(req.headers.get("x-admin-secret"));
    const limit = Math.min(Number(req.nextUrl.searchParams.get("limit")) || 50, 200);

    const sql = getSql();
    if (!sql) {
      return NextResponse.json({ data: [], mode: "offline" });
    }

    const rows = isAdmin
      ? await sql`
          SELECT id, tenant_id, employee_id, endpoint, model,
                 tokens_in, tokens_out, credits_used, created_at
          FROM ai_usage_log
          WHERE tenant_id = ${tenant.id}
          ORDER BY created_at DESC
          LIMIT ${limit}
        `
      : ctx
        ? await sql`
            SELECT id, endpoint, model, tokens_in, tokens_out, credits_used, created_at
            FROM ai_usage_log
            WHERE tenant_id = ${tenant.id} AND employee_id = ${ctx.employee_id}
            ORDER BY created_at DESC
            LIMIT ${limit}
          `
        : null;

    if (!rows && !isAdmin) {
      return NextResponse.json({ detail: "API key or admin secret required" }, { status: 403 });
    }

    return NextResponse.json({ tenant: tenant.slug, data: rows ?? [] });
  } catch (e) {
    console.error("[billing/usage GET]", e);
    return NextResponse.json({ detail: "Server error" }, { status: 500 });
  }
}
