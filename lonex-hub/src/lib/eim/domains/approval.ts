import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { eimErr, eimList, eimOk } from "@/lib/eim/eim-response";
import { buildEimContext, parseEimBody } from "@/lib/eim/domains/context";

function id(prefix: string) {
  return `${prefix}-${randomUUID().replace(/-/g, "").slice(0, 12)}`;
}

export async function handleApprovalDomain(
  req: NextRequest,
  action: string
): Promise<NextResponse | null> {
  const prefix = action.split("/")[0];
  if (prefix === "approval_template") return handleApprovalTemplate(req, action.replace(/^approval_template\//, ""));
  if (prefix === "approval_type") return handleApprovalType(req, action.replace(/^approval_type\//, ""));
  if (prefix !== "approval") return null;
  return handleApproval(req, action.replace(/^approval\//, ""));
}

async function handleApprovalType(req: NextRequest, action: string) {
  const sql = getSql();
  if (!sql) return eimErr("DATABASE_URL offline", 503);
  const ctx = await buildEimContext(req);

  if (action === "getall" || action === "getlist" || action === "get") {
    const rows = await sql`
      SELECT id, name, code, status, metadata_json, created_at
      FROM eim_approval_types WHERE tenant_id = ${ctx.tenantId} AND status = 'active'
      ORDER BY name
    `;
    return eimList(rows);
  }

  if (action === "create" && req.method === "POST") {
    const body = await parseEimBody(req);
    const typeId = id("APTY");
    await sql`
      INSERT INTO eim_approval_types (id, tenant_id, name, code, metadata_json)
      VALUES (${typeId}, ${ctx.tenantId}, ${String(body.name ?? body.title ?? "유형")}, ${String(body.code ?? typeId)}, ${JSON.stringify(body)})
    `;
    return eimOk({ id: typeId });
  }

  return eimErr(`approval_type/${action} not implemented`, 501);
}

async function handleApprovalTemplate(req: NextRequest, action: string) {
  const sql = getSql();
  if (!sql) return eimErr("DATABASE_URL offline", 503);
  const ctx = await buildEimContext(req);

  if (action === "get" || action === "getdata") {
    const body = await parseEimBody(req);
    const templateId = String(body.id ?? req.nextUrl.searchParams.get("id") ?? "");
    const rows = templateId
      ? await sql`SELECT * FROM eim_approval_templates WHERE id = ${templateId} AND tenant_id = ${ctx.tenantId}`
      : await sql`SELECT * FROM eim_approval_templates WHERE tenant_id = ${ctx.tenantId} ORDER BY created_at DESC LIMIT 50`;
    return templateId ? eimOk(rows[0] ?? null) : eimList(rows);
  }

  if (action === "create" && req.method === "POST") {
    const body = await parseEimBody(req);
    const tid = id("APTM");
    await sql`
      INSERT INTO eim_approval_templates (id, tenant_id, type_id, title, body_template, metadata_json)
      VALUES (${tid}, ${ctx.tenantId}, ${String(body.approval_type ?? body.type_id ?? "aptype-general")}, ${String(body.title ?? "템플릿")}, ${String(body.body ?? "")}, ${JSON.stringify(body)})
    `;
    return eimOk({ id: tid });
  }

  return eimErr(`approval_template/${action} not implemented`, 501);
}

async function handleApproval(req: NextRequest, action: string) {
  const sql = getSql();
  if (!sql) return eimErr("DATABASE_URL offline", 503);
  const ctx = await buildEimContext(req);
  const body = await parseEimBody(req);

  switch (action) {
    case "list": {
      const page = Math.max(1, Number(body.page ?? req.nextUrl.searchParams.get("page")) || 1);
      const limit = Math.min(100, Number(body.limit ?? req.nextUrl.searchParams.get("limit")) || 30);
      const offset = (page - 1) * limit;
      const rows = await sql`
        SELECT a.*, t.name AS type_name
        FROM eim_approvals a
        LEFT JOIN eim_approval_types t ON t.id = a.type_id
        WHERE a.tenant_id = ${ctx.tenantId}
        ORDER BY a.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      const countRows = await sql`
        SELECT COUNT(*)::int AS c FROM eim_approvals WHERE tenant_id = ${ctx.tenantId}
      `;
      return eimList(rows, countRows[0]?.c ?? rows.length, { page, limit });
    }

    case "getdata": {
      const approvalId = String(body.id ?? req.nextUrl.searchParams.get("id") ?? "");
      if (!approvalId) return eimErr("id required");
      const rows = await sql`
        SELECT a.*, t.name AS type_name FROM eim_approvals a
        LEFT JOIN eim_approval_types t ON t.id = a.type_id
        WHERE a.id = ${approvalId} AND a.tenant_id = ${ctx.tenantId} LIMIT 1
      `;
      return eimOk(rows[0] ?? null);
    }

    case "gettype": {
      const rows = await sql`
        SELECT * FROM eim_approval_types WHERE tenant_id = ${ctx.tenantId} AND status = 'active'
      `;
      return eimOk(rows);
    }

    case "apply":
    case "adminapply": {
      if (req.method !== "POST") return eimErr("POST required", 405);
      const approvalId = id("APPR");
      const title = String(body.title ?? "결재 신청");
      const typeId = String(body.approval_type ?? body.type_id ?? "aptype-general");
      await sql`
        INSERT INTO eim_approvals (id, tenant_id, employee_id, type_id, title, body, status, payload_json)
        VALUES (
          ${approvalId}, ${ctx.tenantId}, ${ctx.employeeId}, ${typeId}, ${title},
          ${String(body.body ?? body.content ?? "")}, 'pending', ${JSON.stringify(body)}
        )
      `;
      return eimOk({ id: approvalId, status: "pending" });
    }

    case "statusupdate": {
      if (req.method !== "POST") return eimErr("POST required", 405);
      const approvalId = String(body.id ?? "");
      const status = String(body.status ?? "approved");
      if (!approvalId) return eimErr("id required");
      await sql`
        UPDATE eim_approvals SET status = ${status}, updated_at = NOW()
        WHERE id = ${approvalId} AND tenant_id = ${ctx.tenantId}
      `;
      return eimOk({ id: approvalId, status });
    }

    case "getorgchart":
    case "getorgcharttree": {
      const rows = await sql`
        SELECT * FROM eim_org_nodes WHERE tenant_id = ${ctx.tenantId} ORDER BY sort_order, title
      `;
      if (action === "getorgcharttree") {
        const byParent = new Map<string | null, typeof rows>();
        for (const row of rows) {
          const pid = (row.parent_id as string | null) ?? null;
          if (!byParent.has(pid)) byParent.set(pid, []);
          byParent.get(pid)!.push(row);
        }
        function buildTree(parentId: string | null): unknown[] {
          return (byParent.get(parentId) ?? []).map((n) => ({
            ...n,
            children: buildTree(n.id as string),
          }));
        }
        return eimOk(buildTree(null));
      }
      return eimList(rows);
    }

    case "addorgchartnode": {
      if (req.method !== "POST") return eimErr("POST required", 405);
      const nodeId = id("ORG");
      await sql`
        INSERT INTO eim_org_nodes (id, tenant_id, parent_id, employee_id, title, department, role, sort_order, metadata_json)
        VALUES (
          ${nodeId}, ${ctx.tenantId}, ${String(body.parent_id ?? "") || null},
          ${String(body.employee_id ?? ctx.employeeId ?? "") || null},
          ${String(body.title ?? "")}, ${String(body.department ?? body.dept ?? "")},
          ${String(body.role ?? "")}, ${Number(body.sort_order) || 0}, ${JSON.stringify(body)}
        )
      `;
      return eimOk({ id: nodeId });
    }

    default:
      return eimErr(`approval/${action} not implemented`, 501);
  }
}
