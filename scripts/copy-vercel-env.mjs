#!/usr/bin/env node
/**
 * Copy Vercel env vars from lonex-hub → lonexeim-hub (same team).
 * Usage: node scripts/copy-vercel-env.mjs
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HUB = path.join(ROOT, 'lonex-hub');
const ENV_FILE = path.join(HUB, '.env.vercel-copy');

const KEYS = [
  'DATABASE_URL',
  'LONEX_HQ_ADMIN_SECRET',
  'LONEX_HQ_KEY_PEPPER',
  'HF_TOKEN',
  'KAGGLE_API_TOKEN',
  'NEXT_PUBLIC_LOGSHIELD_CONSOLE_URL',
  'POSTGRES_URL',
  'POSTGRES_URL_NON_POOLING',
  'POSTGRES_PRISMA_URL',
  'POSTGRES_HOST',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
  'PGHOST',
  'PGUSER',
  'PGPASSWORD',
  'PGDATABASE',
  'NEON_PROJECT_ID',
];

function run(cmd, cwd = ROOT) {
  console.log(`> ${cmd}`);
  return execSync(cmd, { cwd, stdio: ['pipe', 'pipe', 'pipe'], encoding: 'utf8' });
}

function parseEnvFile(content) {
  const map = new Map();
  for (const line of content.split(/\r?\n/)) {
    if (!line || line.startsWith('#')) continue;
    const i = line.indexOf('=');
    if (i <= 0) continue;
    const key = line.slice(0, i);
    let val = line.slice(i + 1);
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    map.set(key, val);
  }
  return map;
}

function addEnv(key, value, project) {
  if (!value) return false;
  const escaped = value.replace(/"/g, '\\"');
  for (const env of ['production', 'preview', 'development']) {
    try {
      run(
        `echo "${escaped}" | vercel env add ${key} ${env} --project ${project} --force --yes`,
        HUB
      );
      console.log(`  + ${key} (${env})`);
    } catch (e) {
      const msg = e.stderr || e.message || '';
      if (/already exists|Environment Variable already exists/i.test(msg)) {
        run(`echo "${escaped}" | vercel env rm ${key} ${env} --project ${project} --yes`, HUB).catch?.(() => {});
        run(
          `echo "${escaped}" | vercel env add ${key} ${env} --project ${project} --force --yes`,
          HUB
        );
        console.log(`  ~ ${key} (${env}) updated`);
      } else {
        console.warn(`  ! ${key} (${env}): ${msg.slice(0, 120)}`);
      }
    }
  }
  return true;
}

// Pull from source project
run('vercel link --project lonex-hub --yes', HUB);
run('vercel env pull .env.vercel-copy --environment=production --yes', HUB);

const raw = fs.readFileSync(ENV_FILE, 'utf8');
const vars = parseEnvFile(raw);

console.log('\nLinking lonexeim-hub...');
run('vercel link --project lonexeim-hub --yes', HUB);

const added = [];
for (const key of KEYS) {
  const val = vars.get(key);
  if (val && addEnv(key, val, 'lonexeim-hub')) added.push(key);
}

console.log(`\nDone. Copied ${added.length} keys: ${added.join(', ')}`);
