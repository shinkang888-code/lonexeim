#!/usr/bin/env node
/**
 * Push OSS tunnel URLs → Vercel env (production + preview + development).
 * Reads scripts/docker-oss.tunnel.env (preferred) or scripts/docker-oss.env.
 *
 * Usage: node scripts/sync-vercel-oss-env.mjs [--deploy]
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HUB = path.join(ROOT, "lonex-hub");
const TUNNEL_ENV = path.join(ROOT, "scripts", "docker-oss.tunnel.env");
const LOCAL_ENV = path.join(ROOT, "scripts", "docker-oss.env");
const PROJECT = "lonexeim-hub";
const ENV_TARGETS = ["production", "preview", "development"];

function run(cmd) {
  console.log(`> ${cmd.slice(0, 100)}${cmd.length > 100 ? "…" : ""}`);
  execSync(cmd, { cwd: HUB, stdio: "inherit", shell: true });
}

function parseEnv(content) {
  const map = new Map();
  for (const line of content.split(/\r?\n/)) {
    if (!line || line.startsWith("#")) continue;
    const i = line.indexOf("=");
    if (i <= 0) continue;
    map.set(line.slice(0, i), line.slice(i + 1));
  }
  return map;
}

function setVercelEnv(key, value, target) {
  const trimmed = value.trim();
  const escaped = trimmed.replace(/"/g, '\\"');
  run(`vercel env add ${key} ${target} --force --yes --value "${escaped}"`);
  console.log(`  + ${key} (${target})`);
}

function loadOssUrls() {
  const source = fs.existsSync(TUNNEL_ENV) ? TUNNEL_ENV : LOCAL_ENV;
  if (!fs.existsSync(source)) {
    console.error(`Missing ${LOCAL_ENV}. Run docker-oss + oss-tunnel first.`);
    process.exit(1);
  }
  const map = parseEnv(fs.readFileSync(source, "utf8"));
  const keys = [...map.keys()].filter((k) => k.startsWith("NEXT_PUBLIC_"));
  if (keys.length === 0) {
    console.error("No NEXT_PUBLIC_* in env source");
    process.exit(1);
  }
  console.log(`Source: ${source} (${keys.length} keys)`);
  return { map, keys };
}

const deploy = process.argv.includes("--deploy");

run(`vercel link --project ${PROJECT} --yes`);

const { map, keys } = loadOssUrls();

console.log("\nSyncing to Vercel...");
for (const key of keys) {
  const value = map.get(key);
  if (!value || value.startsWith("http://localhost")) {
    console.warn(`  skip ${key} (localhost — run oss-tunnel.mjs start first)`);
    continue;
  }
  for (const target of ENV_TARGETS) {
    setVercelEnv(key, value, target);
  }
}

console.log("\nDone. Redeploy for env to apply:");
console.log("  cd lonex-hub && vercel deploy --prod --yes");

if (deploy) {
  console.log("\nDeploying production...");
  run("vercel deploy --prod --yes");
  console.log("\nHub: https://lonexeim-hub.vercel.app");
}
