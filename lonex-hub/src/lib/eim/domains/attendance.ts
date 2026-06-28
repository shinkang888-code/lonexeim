import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { eimErr, eimList, eimOk } from "@/lib/eim/eim-response";
import { buildEimContext, parseEimBody } from "@/lib/eim/domains/context";

function id(prefix: string) {
  return `${prefix}-${randomUUID().replace(/-/g, "").slice(0, 12)}`;
}

function todayDate() {
  return new Date().toISOString().slice(0, 10);
}

export async function handleAttendanceDomain(
  req: NextRequest,
  action: string
): Promise<NextResponse | null> {
  if (!action.startsWith("attendance/")) return null;
  const sub = action.replace(/^attendance\//, "");
  const sql = getSql();
  if (!sql) return eimErr("DATABASE_URL offline", 503);
  const ctx = await buildEimContext(req);
  const body = await parseEimBody(req);
  const empId = String(body.employee_id ?? ctx.employeeId ?? "");
  const workDate = String(body.work_date ?? body.date ?? todayDate());

  switch (sub) {
    case "getmytodayattendance": {
      if (!empId) return eimOk(null);
      const rows = await sql`
        SELECT * FROM eim_attendance_records
        WHERE tenant_id = ${ctx.tenantId} AND employee_id = ${empId} AND work_date = ${todayDate()}::date
        LIMIT 1
      `;
      return eimOk(rows[0] ?? { work_date: todayDate(), clock_in: null, clock_out: null, status: "none" });
    }

    case "create": {
      if (req.method !== "POST") return eimErr("POST required", 405);
      if (!empId) return eimErr("employee_id required (X-Lonex-Api-Key)");
      const recordId = id("ATT");
      const now = new Date().toISOString();
      const rows = await sql`
        SELECT * FROM eim_attendance_records
        WHERE tenant_id = ${ctx.tenantId} AND employee_id = ${empId} AND work_date = ${workDate}::date
        LIMIT 1
      `;
      if (rows[0]?.clock_in && !rows[0]?.clock_out) {
        await sql`
          UPDATE eim_attendance_records SET clock_out = ${now}::timestamptz, status = 'completed', metadata_json = metadata_json || ${JSON.stringify(body)}::jsonb
          WHERE id = ${rows[0].id}
        `;
        return eimOk({ id: rows[0].id, action: "clock_out", clock_out: now });
      }
      await sql`
        INSERT INTO eim_attendance_records (id, tenant_id, employee_id, work_date, clock_in, status, location_json, metadata_json)
        VALUES (${recordId}, ${ctx.tenantId}, ${empId}, ${workDate}::date, ${now}::timestamptz, 'working', ${JSON.stringify(body.location ?? {})}, ${JSON.stringify(body)})
        ON CONFLICT (tenant_id, employee_id, work_date) DO UPDATE SET
          clock_in = COALESCE(eim_attendance_records.clock_in, EXCLUDED.clock_in),
          status = 'working'
      `;
      return eimOk({ id: recordId, action: "clock_in", clock_in: now });
    }

    case "getattendance":
    case "getrecord":
    case "getworkrecord": {
      if (!empId) return eimList([]);
      const rows = await sql`
        SELECT * FROM eim_attendance_records
        WHERE tenant_id = ${ctx.tenantId} AND employee_id = ${empId}
        ORDER BY work_date DESC LIMIT 60
      `;
      return eimOk(rows);
    }

    case "attendancelist":
    case "getallworkrecord":
    case "getteamattendance": {
      const rows = await sql`
        SELECT a.*, e.name AS employee_name
        FROM eim_attendance_records a
        LEFT JOIN hub_employees e ON e.id = a.employee_id
        WHERE a.tenant_id = ${ctx.tenantId}
        ORDER BY a.work_date DESC, a.clock_in DESC
        LIMIT 100
      `;
      return eimList(rows);
    }

    case "getinfo": {
      return eimOk({
        timezone: "Asia/Seoul",
        today: todayDate(),
        employee_id: empId || null,
        mode: "hub-bff",
      });
    }

    case "locationverify": {
      return eimOk({ verified: true, mode: "hub-bff-stub" });
    }

    case "checkotp": {
      return eimOk({ valid: true });
    }

    default:
      return eimErr(`attendance/${sub} not implemented`, 501);
  }
}
