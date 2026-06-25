import crypto from "crypto";

const KEY_PREFIX = "lnx_sk_";

export function hashApiKey(rawKey: string): string {
  const pepper = process.env.LONEX_HQ_KEY_PEPPER || "lonex-pepper-dev";
  return crypto.createHmac("sha256", pepper).update(rawKey).digest("hex");
}

export function generateApiKey(): { full: string; prefix: string; hash: string } {
  const token = crypto.randomBytes(24).toString("base64url");
  const full = `${KEY_PREFIX}${token}`;
  return { full, prefix: full.slice(0, 16), hash: hashApiKey(full) };
}

export function verifyAdminSecret(header: string | null): boolean {
  const secret = process.env.LONEX_HQ_ADMIN_SECRET || "lonex-hq-admin-dev-secret";
  if (!header) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(header), Buffer.from(secret));
  } catch {
    return false;
  }
}

export { KEY_PREFIX };
