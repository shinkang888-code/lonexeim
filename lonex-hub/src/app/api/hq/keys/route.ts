import { NextRequest, NextResponse } from "next/server";
import { requireSql } from "@/lib/db";
import { generateApiKey, verifyAdminSecret } from "@/lib/hq/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!verifyAdminSecret(req.headers.get("x-admin-secret"))) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  if (!body.employee_id) {
    return NextResponse.json({ detail: "employee_id required" }, { status: 400 });
  }

  try {
    const sql = requireSql();
    const [emp] = await sql`
      SELECT id FROM hub_employees WHERE id = ${body.employee_id} AND status = 'active'
    `;
    if (!emp) return NextResponse.json({ detail: "Employee not found" }, { status: 404 });

    const { full, prefix, hash } = generateApiKey();
    const keyId = `KEY-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    await sql`
      INSERT INTO hub_api_keys (id, employee_id, key_prefix, key_hash, scopes, label)
      VALUES (${keyId}, ${body.employee_id}, ${prefix}, ${hash}, ${JSON.stringify(body.scopes ?? ["ingest:write", "security:write"])}, ${body.label ?? "desktop"})
    `;

    return NextResponse.json({
      status: "issued",
      data: { id: keyId, key_prefix: prefix, api_key: full, warning: "한 번만 표시됩니다" },
    });
  } catch (e) {
    console.error("[hq/keys]", e);
    return NextResponse.json({ detail: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  if (!verifyAdminSecret(req.headers.get("x-admin-secret"))) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  try {
    const sql = requireSql();
    const rows = await sql`
      SELECT k.id, k.employee_id, k.key_prefix, k.label, k.created_at, k.revoked_at,
             e.name AS employee_name, e.dept
      FROM hub_api_keys k JOIN hub_employees e ON e.id = k.employee_id
      ORDER BY k.created_at DESC
    `;
    return NextResponse.json({ data: rows });
  } catch {
    return NextResponse.json({ detail: "Server error" }, { status: 500 });
  }
}
