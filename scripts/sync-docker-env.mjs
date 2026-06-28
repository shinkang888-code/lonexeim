#!/usr/bin/env node
/**
 * Merge NEXT_PUBLIC_* from scripts/docker-oss.env → lonex-hub/.env.local
 * Usage: node scripts/sync-docker-env.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = path.join(ROOT, "scripts", "docker-oss.env");
const TUNNEL = path.join(ROOT, "scripts", "docker-oss.tunnel.env");
const TARGET = path.join(ROOT, "lonex-hub", ".env.local");

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

function serializeEnv(map) {
  return [...map.entries()].map(([k, v]) => `${k}=${v}`).join("\n") + "\n";
}

if (!fs.existsSync(SOURCE)) {
  console.error(`Missing ${SOURCE}. Run docker-oss setup first.`);
  process.exit(1);
}

const source = parseEnv(fs.readFileSync(SOURCE, "utf8"));
if (fs.existsSync(TUNNEL)) {
  const tunnel = parseEnv(fs.readFileSync(TUNNEL, "utf8"));
  for (const [k, v] of tunnel) {
    if (k.startsWith("NEXT_PUBLIC_")) source.set(k, v);
  }
  console.log(`Merged tunnel URLs from ${TUNNEL}`);
}
const ossKeys = [...source.keys()].filter((k) => k.startsWith("NEXT_PUBLIC_"));

if (ossKeys.length === 0) {
  console.error("No NEXT_PUBLIC_* keys in docker-oss.env");
  process.exit(1);
}

let existing = new Map();
if (fs.existsSync(TARGET)) {
  existing = parseEnv(fs.readFileSync(TARGET, "utf8"));
}

for (const key of ossKeys) {
  existing.set(key, source.get(key));
}

fs.writeFileSync(TARGET, serializeEnv(existing));
console.log(`Updated ${TARGET}`);
console.log(`  merged ${ossKeys.length} OSS URL(s): ${ossKeys.join(", ")}`);
console.log("\nRestart Hub dev server: cd lonex-hub && npm run dev");
