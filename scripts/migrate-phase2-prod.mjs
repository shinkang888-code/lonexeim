#!/usr/bin/env node
/** Trigger Phase2 Neon migration on Vercel production (requires LONEX_HQ_ADMIN_SECRET) */
const hub = process.env.LONEX_HUB_URL || "https://lonexeim-hub.vercel.app";
const secret = process.env.LONEX_HQ_ADMIN_SECRET;
if (!secret) {
  console.error("LONEX_HQ_ADMIN_SECRET required");
  process.exit(1);
}
const res = await fetch(`${hub}/api/admin/migrate-phase2`, {
  method: "POST",
  headers: { "X-Admin-Secret": secret },
});
const text = await res.text();
console.log(res.status, text);
