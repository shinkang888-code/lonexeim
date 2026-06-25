import { NextRequest, NextResponse } from "next/server";
import { requireSql } from "@/lib/db";
import { verifyAdminSecret } from "@/lib/hq/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!verifyAdminSecret(req.headers.get("x-admin-secret"))) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  try {
    const sql = requireSql();
    const [emp] = await sql`SELECT COUNT(*)::int AS c FROM hub_employees WHERE status = 'active'`;
    const [rec] = await sql`SELECT COUNT(*)::int AS c FROM hub_ingest_records`;
    const [evt] = await sql`SELECT COUNT(*)::int AS c FROM hub_security_events`;
    const [keys] = await sql`SELECT COUNT(*)::int AS c FROM hub_api_keys WHERE revoked_at IS NULL`;
    const byType = await sql`
      SELECT data_type, COUNT(*)::int AS count FROM hub_ingest_records GROUP BY data_type ORDER BY count DESC
    `;

    return NextResponse.json({
      active_employees: emp.c,
      active_api_keys: keys.c,
      ingest_records: rec.c,
      security_events: evt.c,
      records_by_type: byType,
    });
  } catch (e) {
    console.error("[hq/stats]", e);
    return NextResponse.json({ detail: "Stats failed" }, { status: 500 });
  }
}
