#!/usr/bin/env node
/**
 * Sync DATABASE_URL from lonex-hub → lonexeim-hub Vercel production.
 * Usage: node scripts/sync-lonexeim-db-env.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const hub = path.join(root, "lonex-hub");
const srcEnv = path.join(hub, ".env.lonex-hub.tmp");

function parseEnv(content) {
  const map = new Map();
  for (const line of content.split(/\r?\n/)) {
    if (!line || line.startsWith("#")) continue;
    const i = line.indexOf("=");
    if (i <= 0) continue;
    let val = line.slice(i + 1);
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    map.set(line.slice(0, i), val);
  }
  return map;
}

function run(cmd) {
  console.log(">", cmd);
  execSync(cmd, { cwd: hub, stdio: "inherit" });
}

if (!fs.existsSync(srcEnv)) {
  console.error("Run first: cd lonex-hub && vercel link --project lonex-hub && vercel env pull .env.lonex-hub.tmp --environment=production");
  process.exit(1);
}

const vars = parseEnv(fs.readFileSync(srcEnv, "utf8"));
const keys = ["DATABASE_URL", "POSTGRES_URL", "NEON_PROJECT_ID", "LONEX_HQ_ADMIN_SECRET", "LONEX_HQ_KEY_PEPPER"];

run("vercel link --project lonexeim-hub --yes");

for (const key of keys) {
  const val = vars.get(key);
  if (!val) {
    console.warn(`skip ${key} (empty)`);
    continue;
  }
  const escaped = val.replace(/"/g, '\\"');
  for (const env of ["production"]) {
    try {
      run(`echo "${escaped}" | vercel env add ${key} ${env} --force --yes`);
    } catch {
      try {
        run(`vercel env rm ${key} ${env} --yes`);
        run(`echo "${escaped}" | vercel env add ${key} ${env} --force --yes`);
      } catch (e) {
        console.warn(`! ${key}:`, e.message?.slice?.(0, 80));
      }
    }
  }
}

console.log("\nDone. Redeploy: cd lonex-hub && vercel deploy --prod");
