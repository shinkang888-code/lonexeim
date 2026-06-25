import { NextRequest, NextResponse } from "next/server";
import { requireSql } from "@/lib/db";

export const dynamic = "force-dynamic";

/** Hub 관리 UI용 — Admin Secret 브라우저 노출 없음 */
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();
  if (!q) return NextResponse.json({ detail: "q required" }, { status: 400 });

  const dataType = req.nextUrl.searchParams.get("data_type");
  const limit = Math.min(Number(req.nextUrl.searchParams.get("limit") ?? 50), 200);

  try {
    const sql = requireSql();
    const rows = dataType
      ? await sql`
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
        `
      : await sql`
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

    return NextResponse.json({ query: q, total: rows.length, results: rows });
  } catch (e) {
    console.error("[admin/search]", e);
    return NextResponse.json(
      { detail: "DATABASE_URL 미설정 또는 검색 실패", offline: !process.env.DATABASE_URL },
      { status: 503 }
    );
  }
}
