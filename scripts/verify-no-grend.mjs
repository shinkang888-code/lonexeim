#!/usr/bin/env node
/**
 * Fail if legacy Grend brand strings remain in text sources (excluding false positives).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { containsLegacyGrendBrand, replaceLegacyGrendPaths } = require('./path-alias.js');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKIP_DIRS = new Set(['.git', 'node_modules', '.next', 'dist', '__pycache__']);
const SKIP_EXT = new Set([
  '.exe', '.dll', '.pak', '.asar', '.bin', '.png', '.jpg', '.ico', '.woff', '.woff2',
  '.ttf', '.mp4', '.webm', '.zip', '.7z', '.pdf', '.map', '.dat', '.wasm',
]);
const MAX_BYTES = 5_000_000;

const hits = [];

function isAllowedLegacyReference(line, relFile) {
  const normalized = relFile.replace(/\\/g, '/');
  if (normalized.endsWith('path-alias.js')) return true;
  if (normalized.endsWith('verify-no-grend.mjs')) return true;
  if (
    /replaceLegacyGrend|GREND_REPLACEMENTS|migrateLegacy|_migratedFromGrend|Legacy Grend|legacy Grend|Migrated grend|grend-workforce-config\.json|grend-license\.dat|Fail if legacy Grend|verify-no-grend/.test(
      line
    )
  ) {
    return true;
  }
  return false;
}

function walk(dir) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(name.name)) continue;
    const fp = path.join(dir, name.name);
    if (name.isDirectory()) {
      walk(fp);
      continue;
    }
    const ext = path.extname(name.name).toLowerCase();
    if (SKIP_EXT.has(ext)) continue;
    let stat;
    try {
      stat = fs.statSync(fp);
    } catch {
      continue;
    }
    if (stat.size > MAX_BYTES) continue;

    let text;
    try {
      text = fs.readFileSync(fp, 'utf8');
    } catch {
      try {
        text = fs.readFileSync(fp, 'latin1');
      } catch {
        continue;
      }
    }

    if (!containsLegacyGrendBrand(text)) continue;

    const lines = text.split(/\r?\n/);
    lines.forEach((line, i) => {
      if (containsLegacyGrendBrand(line) && !isAllowedLegacyReference(line, path.relative(ROOT, fp))) {
        hits.push({ file: path.relative(ROOT, fp), line: i + 1, sample: line.trim().slice(0, 120) });
      }
    });
  }
}

walk(ROOT);

if (hits.length) {
  console.error(`[verify-no-grend] FAILED — ${hits.length} hit(s):`);
  for (const h of hits.slice(0, 50)) {
    console.error(`  ${h.file}:${h.line}  ${h.sample}`);
  }
  process.exit(1);
}

// Self-test path alias
const sample = replaceLegacyGrendPaths('https://x.grend.kr/persist:grenderp/grend-license.dat');
if (sample !== 'https://x.lonex.kr/persist:lonexerp/lonex-license.dat') {
  console.error('[verify-no-grend] path-alias self-test failed:', sample);
  process.exit(1);
}

console.log('[verify-no-grend] OK — no legacy Grend brand strings in text sources');
process.exit(0);
