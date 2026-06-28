import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { eimErr, eimList, eimOk } from "@/lib/eim/eim-response";
import { buildEimContext, parseEimBody } from "@/lib/eim/domains/context";

function id(prefix: string) {
  return `${prefix}-${randomUUID().replace(/-/g, "").slice(0, 12)}`;
}

const HR_PREFIXES = [
  "grantedleaverecord/",
  "grantedleavetype/",
  "leaverecord/",
  "salary_contract/",
  "salary_contract_template/",
  "salary_contract_type/",
  "overtime/",
  "remotework/",
  "member/getmydata",
  "member/getalluser",
  "member/list",
  "member/userlist",
  "member/getdata",
];

export function isHrDomainPath(normalized: string): boolean {
  return HR_PREFIXES.some((p) => normalized.startsWith(p) || normalized === p.replace(/\/$/, ""));
}

export async function handleHrDomain(
  req: NextRequest,
  normalized: string
): Promise<NextResponse | null> {
  if (!isHrDomainPath(normalized)) return null;

  const sql = getSql();
  if (!sql) return eimErr("DATABASE_URL offline", 503);
  const ctx = await buildEimContext(req);
  const body = await parseEimBody(req);

  if (normalized.startsWith("member/")) {
    return handleMemberHr(req, normalized.replace(/^member\//, ""), sql, ctx, body);
  }
  if (normalized.startsWith("grantedleaverecord/") || normalized.startsWith("leaverecord/")) {
    const sub = normalized.replace(/^grantedleaverecord\//, "").replace(/^leaverecord\//, "");
    return handleLeave(req, sub, sql, ctx, body);
  }
  if (normalized.startsWith("grantedleavetype/")) {
    return eimList([{ id: "annual", name: "연차" }, { id: "sick", name: "병가" }]);
  }
  if (normalized.startsWith("salary_contract/")) {
    return handleSalaryContract(req, normalized.replace(/^salary_contract\//, ""), sql, ctx, body);
  }
  if (normalized.startsWith("salary_contract_template/") || normalized.startsWith("salary_contract_type/")) {
    return eimList([]);
  }
  if (normalized.startsWith("overtime/")) {
    return eimErr(`overtime stub — use leaverecord/apply for POC`, 501);
  }
  if (normalized.startsWith("remotework/")) {
    return eimList([]);
  }

  return null;
}

async function handleMemberHr(
  req: NextRequest,
  action: string,
  sql: NonNullable<ReturnType<typeof getSql>>,
  ctx: Awaited<ReturnType<typeof buildEimContext>>,
  body: Record<string, unknown>
) {
  switch (action) {
    case "getmydata": {
      if (!ctx.employeeId) return eimOk(null);
      const rows = await sql`
        SELECT id, name, email, dept, status, created_at FROM hub_employees
        WHERE id = ${ctx.employeeId} LIMIT 1
      `;
      return eimOk(rows[0] ?? null);
    }
    case "getalluser":
    case "list":
    case "userlist":
    case "getdata": {
      const limit = Math.min(500, Number(body.limit ?? req.nextUrl.searchParams.get("limit")) || 100);
      const rows = await sql`
        SELECT id, name, email, dept, status, created_at FROM hub_employees
        WHERE tenant_id = ${ctx.tenantId} OR tenant_id IS NULL
        ORDER BY name LIMIT ${limit}
      `;
      return eimList(rows);
    }
    default:
      return null;
  }
}

async function handleLeave(
  req: NextRequest,
  action: string,
  sql: NonNullable<ReturnType<typeof getSql>>,
  ctx: Awaited<ReturnType<typeof buildEimContext>>,
  body: Record<string, unknown>
) {
  switch (action) {
    case "list":
    case "mylistall":
    case "getlist":
    case "getalllist":
    case "getallgrantedleaverecord":
    case "getallgranted": {
      const rows = await sql`
        SELECT * FROM eim_leave_records
        WHERE tenant_id = ${ctx.tenantId}
        ${ctx.employeeId ? sql`AND employee_id = ${ctx.employeeId}` : sql``}
        ORDER BY created_at DESC LIMIT 100
      `;
      return eimList(rows);
    }
    case "getdata":
    case "getgranteddata": {
      const leaveId = String(body.id ?? req.nextUrl.searchParams.get("id") ?? "");
      const rows = await sql`
        SELECT * FROM eim_leave_records WHERE id = ${leaveId} AND tenant_id = ${ctx.tenantId} LIMIT 1
      `;
      return eimOk(rows[0] ?? null);
    }
    case "apply":
    case "create": {
      if (req.method !== "POST") return eimErr("POST required", 405);
      if (!ctx.employeeId) return eimErr("X-Lonex-Api-Key required");
      const leaveId = id("LEAV");
      await sql`
        INSERT INTO eim_leave_records (id, tenant_id, employee_id, leave_type, start_date, end_date, days, status, reason, metadata_json)
        VALUES (
          ${leaveId}, ${ctx.tenantId}, ${ctx.employeeId},
          ${String(body.leave_type ?? "annual")},
          ${String(body.start_date ?? body.startDate ?? new Date().toISOString().slice(0, 10))}::date,
          ${String(body.end_date ?? body.endDate ?? new Date().toISOString().slice(0, 10))}::date,
          ${Number(body.days) || 1},
          'pending',
          ${String(body.reason ?? "")},
          ${JSON.stringify(body)}
        )
      `;
      return eimOk({ id: leaveId, status: "pending" });
    }
    case "statusupdate":
    case "audit": {
      const leaveId = String(body.id ?? "");
      const status = String(body.status ?? "approved");
      await sql`
        UPDATE eim_leave_records SET status = ${status}
        WHERE id = ${leaveId} AND tenant_id = ${ctx.tenantId}
      `;
      return eimOk({ id: leaveId, status });
    }
    default:
      return eimErr(`leaverecord/${action} not implemented`, 501);
  }
}

async function handleSalaryContract(
  req: NextRequest,
  action: string,
  sql: NonNullable<ReturnType<typeof getSql>>,
  ctx: Awaited<ReturnType<typeof buildEimContext>>,
  body: Record<string, unknown>
) {
  switch (action) {
    case "getlist":
    case "getdata": {
      const rows = await sql`
        SELECT * FROM eim_salary_contracts
        WHERE tenant_id = ${ctx.tenantId}
        ${ctx.employeeId ? sql`AND employee_id = ${ctx.employeeId}` : sql``}
        ORDER BY created_at DESC LIMIT 50
      `;
      return action === "getdata" && body.id
        ? eimOk(rows.find((r) => r.id === body.id) ?? rows[0] ?? null)
        : eimList(rows);
    }
    case "create": {
      if (req.method !== "POST") return eimErr("POST required", 405);
      const contractId = id("SAL");
      const emp = String(body.employee_id ?? ctx.employeeId ?? "");
      await sql`
        INSERT INTO eim_salary_contracts (id, tenant_id, employee_id, title, contract_type, base_salary, status, payload_json)
        VALUES (
          ${contractId}, ${ctx.tenantId}, ${emp},
          ${String(body.title ?? "근로계약")}, ${String(body.contract_type ?? "regular")},
          ${Number(body.base_salary) || 0}, 'draft', ${JSON.stringify(body)}
        )
      `;
      return eimOk({ id: contractId });
    }
    default:
      return eimErr(`salary_contract/${action} not implemented`, 501);
  }
}
