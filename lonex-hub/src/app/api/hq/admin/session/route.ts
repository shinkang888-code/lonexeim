import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSecret } from "@/lib/hq/auth";
import { ADMIN_SESSION_COOKIE, createAdminSessionToken } from "@/lib/hq/admin-session";

export const dynamic = "force-dynamic";

/** 본사 관리자 세션 — secret 1회 제출 후 httpOnly 쿠키 (브라우저 JS 노출 없음) */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const secret = body.secret as string | undefined;
  if (!secret || !verifyAdminSecret(secret)) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }
  const token = createAdminSessionToken();
  const res = NextResponse.json({ status: "ok" });
  res.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 8 * 60 * 60,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ status: "logged_out" });
  res.cookies.delete(ADMIN_SESSION_COOKIE);
  return res;
}
