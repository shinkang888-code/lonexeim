import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";

export const dynamic = "force-dynamic";

/** EIM /API/ai/vector/search subset — ai_embeddings or hub_ingest FTS fallback */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = String(body.query ?? body.q ?? "").trim();
    const domain = body.domain as string | undefined;
    const limit = Math.min(Number(body.limit) || 10, 50);

    if (!query) {
      return NextResponse.json({ detail: "query required" }, { status: 400 });
    }

    const sql = getSql();
    if (!sql) {
      return NextResponse.json({ results: [], mode: "offline" });
    }

    const pattern = `%${query}%`;

    try {
      const vecRows = domain
        ? await sql`
            SELECT id, domain, title, body_text, created_at
            FROM ai_embeddings
            WHERE domain = ${domain}
              AND (title ILIKE ${pattern} OR body_text ILIKE ${pattern})
            ORDER BY created_at DESC
            LIMIT ${limit}
          `
        : await sql`
            SELECT id, domain, title, body_text, created_at
            FROM ai_embeddings
            WHERE title ILIKE ${pattern} OR body_text ILIKE ${pattern}
            ORDER BY created_at DESC
            LIMIT ${limit}
          `;

      if (vecRows.length) {
        return NextResponse.json({ results: vecRows, mode: "pgvector_table", count: vecRows.length });
      }
    } catch {
      /* ai_embeddings not migrated */
    }

    const ftsRows = domain
      ? await sql`
          SELECT id, data_type AS domain, title, body_text, ingested_at AS created_at
          FROM hub_ingest_records
          WHERE data_type = ${domain}
            AND (title ILIKE ${pattern} OR body_text ILIKE ${pattern})
          ORDER BY ingested_at DESC
          LIMIT ${limit}
        `
      : await sql`
          SELECT id, data_type AS domain, title, body_text, ingested_at AS created_at
          FROM hub_ingest_records
          WHERE title ILIKE ${pattern} OR body_text ILIKE ${pattern}
          ORDER BY ingested_at DESC
          LIMIT ${limit}
        `;

    return NextResponse.json({
      results: ftsRows,
      mode: "fts_fallback",
      count: ftsRows.length,
      note: "Run lonex-hub/scripts/migrate-vector.sql for pgvector",
    });
  } catch (e) {
    console.error("[ai/vector/search]", e);
    return NextResponse.json({ detail: "Search failed" }, { status: 500 });
  }
}

export async function GET() {
  const sql = getSql();
  let table = "none";
  if (sql) {
    try {
      await sql`SELECT 1 FROM ai_embeddings LIMIT 1`;
      table = "ai_embeddings";
    } catch {
      table = "hub_ingest_records";
    }
  }
  return NextResponse.json({
    status: sql ? "online" : "offline",
    table,
    endpoint: "/api/ai/vector/search",
  });
}
