import { NextRequest, NextResponse } from "next/server";
import { handleApprovalDomain } from "@/lib/eim/domains/approval";
import { handleAttendanceDomain } from "@/lib/eim/domains/attendance";
import { handleHrDomain } from "@/lib/eim/domains/hr";

const LIVE_PREFIXES = [
  "approval/",
  "approval_template/",
  "approval_type/",
  "attendance/",
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

export function isLiveEimDomain(normalized: string): boolean {
  return LIVE_PREFIXES.some((p) => normalized.startsWith(p) || normalized === p);
}

/** Phase 3 live domains — approval, attendance, HR */
export async function dispatchEimDomain(
  req: NextRequest,
  normalized: string
): Promise<NextResponse | null> {
  if (normalized.startsWith("approval")) {
    return handleApprovalDomain(req, normalized);
  }
  if (normalized.startsWith("attendance/")) {
    return handleAttendanceDomain(req, normalized);
  }
  const hr = await handleHrDomain(req, normalized);
  if (hr) return hr;
  return null;
}
