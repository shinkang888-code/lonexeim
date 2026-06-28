import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { eimCategory, EIM_TOTAL_PATHS } from "@/lib/eim/category-registry";
import { migratedPathCount } from "@/lib/eim/gateway-routes";
import { resolveTenant } from "@/lib/tenant/resolve-tenant";

/** EIM category stub — all unmigrated /API/{category}/* paths return structured JSON (not raw 501) */
export async function handleEimCategoryStub(
  req: NextRequest,
  normalizedPath: string
): Promise<NextResponse> {
  const prefix = normalizedPath.split("/")[0] ?? "unknown";
  const cat = eimCategory(prefix);
  const tenant = await resolveTenant(req);

  const sql = getSql();
  if (sql) {
    try {
      await sql`
        INSERT INTO eim_api_stub_log (category, eim_path, method, tenant_id)
        VALUES (${prefix}, ${"/API/" + normalizedPath}, ${req.method}, ${tenant.id})
      `;
    } catch {
      /* eim_api_stub_log optional */
    }
  }

  const status = cat.phase === "live" ? 200 : cat.phase === "stub" ? 501 : 501;

  return NextResponse.json(
    {
      status: cat.phase === "live" ? "partial" : "stub",
      category: prefix,
      label: cat.label,
      eim_path: `/API/${normalizedPath}`,
      method: req.method,
      tenant: tenant.slug,
      hub_note: cat.hubNote,
      phase: cat.phase,
      coverage: {
        exact_mapped: migratedPathCount(),
        total_paths: EIM_TOTAL_PATHS,
        gateway: "/api/eim/[...path]",
      },
      docs: "docs/phase2-phase3-status.md",
    },
    { status }
  );
}
