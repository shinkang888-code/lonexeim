import { NextRequest } from "next/server";
import { getSql } from "@/lib/db";
import { hashApiKey } from "@/lib/hq/auth";
import { resolveTenant, TenantContext } from "@/lib/tenant/resolve-tenant";

export type ApiKeyContext = {
  key_id: string;
  employee_id: string;
  tenant_id: string;
  employee_name: string;
  dept: string;
  tenant: TenantContext;
};

export async function resolveApiKey(req: NextRequest): Promise<ApiKeyContext | null> {
  const key = req.headers.get("x-lonex-api-key");
  if (!key?.startsWith("lnx_sk_")) return null;

  const sql = getSql();
  if (!sql) return null;

  const tenant = await resolveTenant(req);
  const rows = await sql`
    SELECT k.id AS key_id, k.employee_id, k.tenant_id,
           e.name AS employee_name, e.dept
    FROM hub_api_keys k
    JOIN hub_employees e ON e.id = k.employee_id
    WHERE k.key_hash = ${hashApiKey(key)}
      AND k.revoked_at IS NULL
      AND e.status = 'active'
      AND k.tenant_id = ${tenant.id}
      AND e.tenant_id = ${tenant.id}
    LIMIT 1
  `;
  const row = rows[0];
  if (!row) return null;
  return { ...row, tenant } as ApiKeyContext;
}
