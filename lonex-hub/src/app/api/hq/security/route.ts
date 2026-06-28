import { NextRequest, NextResponse } from "next/server";
import { requireSql } from "@/lib/db";
import { verifyAdminSecret } from "@/lib/hq/auth";
import { resolveApiKey } from "@/lib/hq/resolve-api-key";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const ctx = await resolveApiKey(req);
    if (!ctx) return NextResponse.json({ detail: "Invalid API key" }, { status: 403 });

    const event = await req.json();
    const sql = requireSql();
    const [row] = await sql`
      INSERT INTO hub_security_events
      (employee_id, endpoint_id, agent_id, event_type, action, detail, severity, payload_json)
      VALUES (
        ${ctx.employee_id}, ${event.endpoint_id ?? null}, ${event.agent_id ?? "logshield"},
        ${event.event_type ?? "FILE"}, ${event.action ?? "detect"},
        ${event.detail ?? ""}, ${event.severity ?? "medium"},
        ${JSON.stringify(event.payload ?? {})}
      )
      RETURNING id
    `;
    return NextResponse.json({ status: "accepted", event_id: row.id });
  } catch (e) {
    console.error("[hq/security POST]", e);
    return NextResponse.json({ detail: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  if (!verifyAdminSecret(req.headers.get("x-admin-secret"))) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const limit = Math.min(Number(req.nextUrl.searchParams.get("limit") ?? 50), 200);
  try {
    const sql = requireSql();
    const rows = await sql`
      SELECT s.*, e.name AS employee_name, e.dept
      FROM hub_security_events s
      LEFT JOIN hub_employees e ON e.id = s.employee_id
      ORDER BY s.created_at DESC LIMIT ${limit}
    `;
    return NextResponse.json({ data: rows });
  } catch {
    return NextResponse.json({ detail: "Server error" }, { status: 500 });
  }
}
