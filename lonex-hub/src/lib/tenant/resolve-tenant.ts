import { NextRequest } from "next/server";
import { getSql } from "@/lib/db";

export type TenantContext = {
  id: string;
  slug: string;
  name: string;
};

const DEFAULT_TENANT: TenantContext = {
  id: "tenant-default",
  slug: "default",
  name: "Default Organization",
};

/** 멀티테넌트 — X-Tenant-Id / X-Tenant-Slug / Host 서브도메인 (제5발명) */
export async function resolveTenant(req: NextRequest): Promise<TenantContext> {
  const headerId = req.headers.get("x-tenant-id")?.trim();
  const headerSlug = req.headers.get("x-tenant-slug")?.trim();
  const host = req.headers.get("host")?.split(":")[0] ?? "";

  let slug: string | null = headerSlug || null;
  if (!slug && headerId) {
    const sql = getSql();
    if (sql) {
      const rows = await sql`
        SELECT id, slug, name FROM hub_tenants
        WHERE id = ${headerId} AND status = 'active' LIMIT 1
      `;
      if (rows[0]) return rows[0] as TenantContext;
    }
  }

  if (!slug && host) {
    const parts = host.split(".");
    if (parts.length >= 3 && parts[0] !== "www" && parts[0] !== "lonexeim-hub") {
      slug = parts[0];
    }
  }

  if (!slug) return DEFAULT_TENANT;

  const sql = getSql();
  if (!sql) return { ...DEFAULT_TENANT, slug };

  const rows = await sql`
    SELECT id, slug, name FROM hub_tenants
    WHERE slug = ${slug} AND status = 'active' LIMIT 1
  `;
  return (rows[0] as TenantContext) ?? DEFAULT_TENANT;
}
