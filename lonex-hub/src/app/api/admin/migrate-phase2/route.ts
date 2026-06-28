import { NextRequest, NextResponse } from "next/server";
import { requireSql } from "@/lib/db";
import { runAllPhase2Migrations } from "@/lib/db/phase2-schema";
import { runPhase3HrMigration } from "@/lib/db/phase3-hr-schema";
import { verifyAdminSecret } from "@/lib/hq/auth";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/** POST — Neon 프로덕션 Phase2+pgvector 마이그레이션 (X-Admin-Secret) */
export async function POST(req: NextRequest) {
  if (!verifyAdminSecret(req.headers.get("x-admin-secret"))) {
    return NextResponse.json({ detail: "Forbidden" }, { status: 403 });
  }
  try {
    const sql = requireSql();
    await runAllPhase2Migrations(sql);
    await runPhase3HrMigration(sql);
    return NextResponse.json({
      status: "ok",
      migrated: [
        "hub_tenants",
        "ai_usage_log",
        "ai_credit_balances",
        "ai_prompt_registry",
        "ai_embeddings",
        "eim_api_stub_log",
        "eim_approvals",
        "eim_attendance_records",
        "eim_leave_records",
        "eim_salary_contracts",
      ],
    });
  } catch (e) {
    console.error("[admin/migrate-phase2]", e);
    return NextResponse.json(
      { detail: e instanceof Error ? e.message : "Migration failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: "/api/admin/migrate-phase2",
    method: "POST",
    header: "X-Admin-Secret",
  });
}
