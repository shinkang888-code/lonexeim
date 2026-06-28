import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_EMBED_MODEL, embedQuery, vectorLiteral } from "@/lib/ai/embed";
import { hfEmbed, isHfConfigured } from "@/lib/ai/huggingface";
import { getSql } from "@/lib/db";

export const dynamic = "force-dynamic";

/** EIM /API/ai/vector/search — pgvector cosine + FTS fallback */
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

    const queryVec = await embedQuery(query);
    if (queryVec?.length) {
      try {
        const lit = vectorLiteral(queryVec);
        const cosineRows = domain
          ? await sql`
              SELECT id, domain, title, body_text, created_at,
                     1 - (embedding <=> ${lit}::vector) AS score
              FROM ai_embeddings
              WHERE domain = ${domain} AND embedding IS NOT NULL
              ORDER BY embedding <=> ${lit}::vector
              LIMIT ${limit}
            `
          : await sql`
              SELECT id, domain, title, body_text, created_at,
                     1 - (embedding <=> ${lit}::vector) AS score
              FROM ai_embeddings
              WHERE embedding IS NOT NULL
              ORDER BY embedding <=> ${lit}::vector
              LIMIT ${limit}
            `;

        if (cosineRows.length) {
          return NextResponse.json({
            results: cosineRows,
            mode: "pgvector_cosine",
            model: DEFAULT_EMBED_MODEL,
            count: cosineRows.length,
          });
        }
      } catch {
        /* pgvector extension or empty embeddings */
      }
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
        return NextResponse.json({ results: vecRows, mode: "pgvector_ilike", count: vecRows.length });
      }
    } catch {
      /* table missing */
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
      embed_ready: isHfConfigured(),
    });
  } catch (e) {
    console.error("[ai/vector/search]", e);
    return NextResponse.json({ detail: "Search failed" }, { status: 500 });
  }
}

/** EIM /API/ai/vector/bulk-embed subset */
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const items = body.items as { id?: string; domain?: string; title: string; body_text?: string }[];
    if (!Array.isArray(items) || !items.length) {
      return NextResponse.json({ detail: "items required" }, { status: 400 });
    }
    if (!isHfConfigured()) {
      return NextResponse.json({ detail: "HF_TOKEN required for embed" }, { status: 503 });
    }

    const sql = getSql();
    if (!sql) return NextResponse.json({ detail: "DATABASE_URL offline" }, { status: 503 });

    const texts = items.slice(0, 32).map((i) => `${i.title}\n${i.body_text ?? ""}`.trim());
    const vectors = await hfEmbed(DEFAULT_EMBED_MODEL, texts);
    const ids: string[] = [];

    for (let i = 0; i < items.slice(0, 32).length; i++) {
      const item = items[i];
      const id = item.id ?? `EMB-${randomUUID().replace(/-/g, "").slice(0, 12)}`;
      const lit = vectorLiteral(vectors[i] ?? []);
      await sql`
        INSERT INTO ai_embeddings (id, domain, title, body_text, embedding, metadata_json)
        VALUES (
          ${id}, ${item.domain ?? "general"}, ${item.title}, ${item.body_text ?? ""},
          ${lit}::vector, ${JSON.stringify({ source: "bulk-embed" })}
        )
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          body_text = EXCLUDED.body_text,
          embedding = EXCLUDED.embedding
      `;
      ids.push(id);
    }

    return NextResponse.json({ status: "ok", count: ids.length, ids, model: DEFAULT_EMBED_MODEL });
  } catch (e) {
    console.error("[ai/vector/bulk-embed]", e);
    return NextResponse.json({ detail: "Bulk embed failed" }, { status: 500 });
  }
}

export async function GET() {
  const sql = getSql();
  let table = "none";
  let embedCount = 0;
  if (sql) {
    try {
      const rows = await sql`SELECT COUNT(*)::int AS c FROM ai_embeddings WHERE embedding IS NOT NULL`;
      embedCount = rows[0]?.c ?? 0;
      table = "ai_embeddings";
    } catch {
      table = "hub_ingest_records";
    }
  }
  return NextResponse.json({
    status: sql ? "online" : "offline",
    table,
    embedded_count: embedCount,
    cosine: isHfConfigured(),
    endpoint: "/api/ai/vector/search",
  });
}
