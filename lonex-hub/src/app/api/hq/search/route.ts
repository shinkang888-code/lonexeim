import { NextRequest, NextResponse } from "next/server";
import { requireSql } from "@/lib/db";
import { verifyAdminSecret } from "@/lib/hq/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!verifyAdminSecret(req.headers.get("x-admin-secret"))) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const q = req.nextUrl.searchParams.get("q")?.trim();
  if (!q) return NextResponse.json({ detail: "q required" }, { status: 400 });

  const dataType = req.nextUrl.searchParams.get("data_type");
  const employeeId = req.nextUrl.searchParams.get("employee_id");
  const limit = Math.min(Number(req.nextUrl.searchParams.get("limit") ?? 50), 200);

  try {
    const sql = requireSql();
    let rows;

    if (dataType && employeeId) {
      rows = await sql`
        SELECT r.id, r.employee_id, r.data_type, r.title,
               LEFT(COALESCE(r.body_text,''), 300) AS snippet,
               r.source_module, r.ingested_at,
               e.name AS employee_name, e.dept
        FROM hub_ingest_records r
        JOIN hub_employees e ON e.id = r.employee_id
        WHERE to_tsvector('simple', coalesce(r.title,'') || ' ' || coalesce(r.body_text,''))
              @@ plainto_tsquery('simple', ${q})
          AND r.data_type = ${dataType} AND r.employee_id = ${employeeId}
        ORDER BY r.ingested_at DESC LIMIT ${limit}
      `;
    } else if (dataType) {
      rows = await sql`
        SELECT r.id, r.employee_id, r.data_type, r.title,
               LEFT(COALESCE(r.body_text,''), 300) AS snippet,
               r.source_module, r.ingested_at,
               e.name AS employee_name, e.dept
        FROM hub_ingest_records r
        JOIN hub_employees e ON e.id = r.employee_id
        WHERE to_tsvector('simple', coalesce(r.title,'') || ' ' || coalesce(r.body_text,''))
              @@ plainto_tsquery('simple', ${q})
          AND r.data_type = ${dataType}
        ORDER BY r.ingested_at DESC LIMIT ${limit}
      `;
    } else if (employeeId) {
      rows = await sql`
        SELECT r.id, r.employee_id, r.data_type, r.title,
               LEFT(COALESCE(r.body_text,''), 300) AS snippet,
               r.source_module, r.ingested_at,
               e.name AS employee_name, e.dept
        FROM hub_ingest_records r
        JOIN hub_employees e ON e.id = r.employee_id
        WHERE to_tsvector('simple', coalesce(r.title,'') || ' ' || coalesce(r.body_text,''))
              @@ plainto_tsquery('simple', ${q})
          AND r.employee_id = ${employeeId}
        ORDER BY r.ingested_at DESC LIMIT ${limit}
      `;
    } else {
      rows = await sql`
        SELECT r.id, r.employee_id, r.data_type, r.title,
               LEFT(COALESCE(r.body_text,''), 300) AS snippet,
               r.source_module, r.ingested_at,
               e.name AS employee_name, e.dept
        FROM hub_ingest_records r
        JOIN hub_employees e ON e.id = r.employee_id
        WHERE to_tsvector('simple', coalesce(r.title,'') || ' ' || coalesce(r.body_text,''))
              @@ plainto_tsquery('simple', ${q})
        ORDER BY r.ingested_at DESC LIMIT ${limit}
      `;
    }

    return NextResponse.json({ query: q, total: rows.length, results: rows });
  } catch (e) {
    console.error("[hq/search]", e);
    return NextResponse.json({ detail: "Search failed" }, { status: 500 });
  }
}
