import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { AI_MODELS_SEED } from "@/lib/ai/models-catalog";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sql = getSql();
    if (sql) {
      const rows = await sql`
        SELECT id, repo_id, category, name, downloads, likes, note FROM models ORDER BY downloads DESC
      `;
      if (rows.length) return NextResponse.json({ count: rows.length, models: rows });
    }
    return NextResponse.json({ count: AI_MODELS_SEED.length, models: AI_MODELS_SEED });
  } catch {
    return NextResponse.json({ count: AI_MODELS_SEED.length, models: AI_MODELS_SEED });
  }
}
