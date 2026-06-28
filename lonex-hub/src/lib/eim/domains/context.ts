import { NextRequest } from "next/server";
import { getSql } from "@/lib/db";
import { resolveApiKey } from "@/lib/hq/resolve-api-key";
import { resolveTenant } from "@/lib/tenant/resolve-tenant";

export type EimRequestContext = {
  tenantId: string;
  tenantSlug: string;
  employeeId: string | null;
  employeeName: string | null;
};

export async function buildEimContext(req: NextRequest): Promise<EimRequestContext> {
  const tenant = await resolveTenant(req);
  const apiKey = await resolveApiKey(req);
  let employeeName: string | null = null;

  if (apiKey?.employee_id) {
    const sql = getSql();
    if (sql) {
      try {
        const rows = await sql`
          SELECT name FROM hub_employees WHERE id = ${apiKey.employee_id} LIMIT 1
        `;
        employeeName = (rows[0]?.name as string) ?? null;
      } catch {
        /* optional */
      }
    }
  }

  return {
    tenantId: tenant.id,
    tenantSlug: tenant.slug,
    employeeId: apiKey?.employee_id ?? null,
    employeeName,
  };
}

export async function parseEimBody(req: NextRequest): Promise<Record<string, unknown>> {
  if (req.method === "GET" || req.method === "HEAD") {
    const out: Record<string, unknown> = {};
    req.nextUrl.searchParams.forEach((v, k) => {
      out[k] = v;
    });
    return out;
  }
  try {
    const body = await req.json();
    return body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}
