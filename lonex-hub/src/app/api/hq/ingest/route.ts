import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { requireSql } from "@/lib/db";
import { resolveApiKey } from "@/lib/hq/resolve-api-key";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const ctx = await resolveApiKey(req);
    if (!ctx) return NextResponse.json({ detail: "Invalid API key" }, { status: 403 });

    const body = await req.json();
    const items = body.items as {
      data_type: string;
      title: string;
      body_text?: string;
      source_module?: string;
      metadata?: object;
      client_created_at?: string;
    }[];
    if (!Array.isArray(items) || !items.length) {
      return NextResponse.json({ detail: "items required" }, { status: 400 });
    }

    const sql = requireSql();
    const ids: string[] = [];
    for (const item of items.slice(0, 200)) {
      const id = `REC-${randomUUID().replace(/-/g, "").slice(0, 12)}`;
      await sql`
        INSERT INTO hub_ingest_records
        (id, employee_id, endpoint_id, data_type, title, body_text, metadata_json, source_module, client_created_at)
        VALUES (
          ${id}, ${ctx.employee_id}, ${body.endpoint_id ?? null},
          ${item.data_type}, ${item.title}, ${item.body_text ?? ""},
          ${JSON.stringify(item.metadata ?? {})}, ${item.source_module ?? "lonex-hub"},
          ${item.client_created_at ? new Date(item.client_created_at) : new Date()}
        )
      `;
      ids.push(id);
    }

    return NextResponse.json({ status: "accepted", count: ids.length, record_ids: ids });
  } catch (e) {
    console.error("[hq/ingest]", e);
    return NextResponse.json({ detail: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const ctx = await resolveApiKey(req);
    if (!ctx) return NextResponse.json({ detail: "Invalid API key" }, { status: 403 });
    const sql = requireSql();
    const rows = await sql`
      SELECT id, data_type, title, source_module, ingested_at
      FROM hub_ingest_records WHERE employee_id = ${ctx.employee_id}
      ORDER BY ingested_at DESC LIMIT 20
    `;
    return NextResponse.json({ data: rows });
  } catch {
    return NextResponse.json({ detail: "Server error" }, { status: 500 });
  }
}
