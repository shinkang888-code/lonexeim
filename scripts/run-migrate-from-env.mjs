#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const envFile = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(root, "lonex-hub", ".env.prod.tmp");

function loadEnv(file) {
  if (!fs.existsSync(file)) {
    console.error("Missing env file:", file);
    process.exit(1);
  }
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    if (!line || line.startsWith("#")) continue;
    const i = line.indexOf("=");
    if (i <= 0) continue;
    const key = line.slice(0, i);
    let val = line.slice(i + 1);
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (val) process.env[key] = val;
  }
}

loadEnv(envFile);
const mode = process.argv[3] || "local";

if (mode === "api") {
  const r = spawnSync("node", ["scripts/migrate-phase2-prod.mjs"], {
    cwd: root,
    stdio: "inherit",
    env: process.env,
  });
  process.exit(r.status ?? 1);
}

const r = spawnSync("node", ["scripts/migrate-phase2.mjs"], {
  cwd: path.join(root, "lonex-hub"),
  stdio: "inherit",
  env: process.env,
});
process.exit(r.status ?? 1);
