import crypto from "crypto";
import { NextRequest } from "next/server";

const COOKIE = "lonex_hq_admin";
const TTL_MS = 8 * 60 * 60 * 1000;

function adminSecret() {
  return process.env.LONEX_HQ_ADMIN_SECRET || "lonex-hq-admin-dev-secret";
}

function sign(payload: string) {
  return crypto.createHmac("sha256", adminSecret()).update(payload).digest("base64url");
}

export function createAdminSessionToken() {
  const exp = Date.now() + TTL_MS;
  const payload = `admin:${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSessionToken(token: string | null | undefined): boolean {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload?.startsWith("admin:") || !sig) return false;
  const exp = Number(payload.slice("admin:".length));
  if (!Number.isFinite(exp) || Date.now() > exp) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(sign(payload)));
  } catch {
    return false;
  }
}

export function verifyAdminRequest(req: NextRequest): boolean {
  const header = req.headers.get("x-admin-secret");
  if (header) {
    try {
      return crypto.timingSafeEqual(Buffer.from(header), Buffer.from(adminSecret()));
    } catch {
      return false;
    }
  }
  const cookie = req.cookies.get(COOKIE)?.value;
  return verifyAdminSessionToken(cookie);
}

export { COOKIE as ADMIN_SESSION_COOKIE };
