import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { verifyAdminRequest } from "@/lib/hq/admin-session";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }
  const limit = Math.min(Number(req.nextUrl.searchParams.get("limit") ?? 30), 100);
  try {
    const sql = getSql();
    if (!sql) return NextResponse.json({ data: [], offline: true });

    const rows = await sql`
      SELECT s.*, e.name AS employee_name, e.dept
      FROM hub_security_events s
      LEFT JOIN hub_employees e ON e.id = s.employee_id
      ORDER BY s.created_at DESC LIMIT ${limit}
    `;
    return NextResponse.json({ data: rows });
  } catch {
    return NextResponse.json({ data: [], offline: true });
  }
}
