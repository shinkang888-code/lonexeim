import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { verifyAdminRequest } from "@/lib/hq/admin-session";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }
  try {
    const sql = getSql();
    if (!sql) {
      return NextResponse.json({
        active_employees: 0,
        active_api_keys: 0,
        ingest_records: 0,
        security_events: 0,
        records_by_type: [],
        offline: true,
      });
    }

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
      offline: false,
    });
  } catch {
    return NextResponse.json({ detail: "Stats failed" }, { status: 503 });
  }
}
