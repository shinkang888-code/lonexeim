import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { resolveTenant } from "@/lib/tenant/resolve-tenant";

export const dynamic = "force-dynamic";

/** GET — 프롬프트-as-데이터 레지스트리 (청구항 10) */
export async function GET(req: NextRequest) {
  try {
    const tenant = await resolveTenant(req);
    const slug = req.nextUrl.searchParams.get("slug");
    const sql = getSql();

    if (!sql) {
      return NextResponse.json({ prompts: [], mode: "offline" });
    }

    const rows = slug
      ? await sql`
          SELECT id, slug, title, template, version, created_at
          FROM ai_prompt_registry
          WHERE tenant_id = ${tenant.id} AND slug = ${slug}
          ORDER BY version DESC
        `
      : await sql`
          SELECT id, slug, title, template, version, created_at
          FROM ai_prompt_registry
          WHERE tenant_id = ${tenant.id}
          ORDER BY slug, version DESC
        `;

    return NextResponse.json({ tenant: tenant.slug, prompts: rows });
  } catch (e) {
    console.error("[ai/prompts GET]", e);
    return NextResponse.json({ detail: "Server error" }, { status: 500 });
  }
}
