#!/usr/bin/env node
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
    let val = line.slice(i + 1).trim();
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

const vars = parseEnv(fs.readFileSync(srcEnv, "utf8"));
const url = vars.get("DATABASE_URL")?.trim();
if (!url) {
  console.error("DATABASE_URL missing in .env.lonex-hub.tmp");
  process.exit(1);
}

execSync("vercel link --project lonexeim-hub --yes", { cwd: hub, stdio: "inherit" });

const tmp = path.join(hub, ".db-url-oneline.txt");
fs.writeFileSync(tmp, url, "utf8");
try {
  execSync(`Get-Content -Raw "${tmp}" | vercel env add DATABASE_URL production --force --yes`, {
    cwd: hub,
    stdio: "inherit",
    shell: "powershell.exe",
  });
  execSync(`Get-Content -Raw "${tmp}" | vercel env add POSTGRES_URL production --force --yes`, {
    cwd: hub,
    stdio: "inherit",
    shell: "powershell.exe",
  });
} finally {
  fs.unlinkSync(tmp);
}

console.log("DATABASE_URL trimmed and synced. Redeploy required.");
