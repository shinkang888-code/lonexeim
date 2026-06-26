#!/usr/bin/env node
/**
 * EIM → EIM batch rebrand
 * EIM = Enterprise Information Management (기업정보관리)
 * Hub content module: cdms → media
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const SKIP_DIRS = new Set(['node_modules', '.git']);
const TEXT_EXT = new Set([
  '.js', '.mjs', '.cjs', '.ts', '.tsx', '.json', '.md', '.txt', '.yml', '.yaml',
  '.ps1', '.py', '.css', '.html', '.svg', '.webmanifest', '.gitattributes',
]);
const SKIP_PATH = [/node_modules/, /LICENSES\.chromium/];

const REPLACEMENTS = [
  ['LONEX EIM', 'LONEX EIM'],
  ['Lonex EIM', 'Lonex EIM'],
  ['Uninstall LONEX EIM', 'Uninstall LONEX EIM'],
  ['LONEX-EIM', 'LONEX-EIM'],
  ['lonex-eim', 'lonex-eim'],
  ['lonexeim', 'lonexeim'],
  ['Enterprise Information Management', 'Enterprise Information Management'],
  ['콘텐츠 제작', '콘텐츠 제작'],
  ['기업정보관리', '기업정보관리'],
  ['MediaModule', 'MediaModule'],
  ['modules/media', 'modules/media'],
  ['syncToHq("media"', 'syncToHq("media"'],
  ["syncToHq('media'", "syncToHq('media'"],
  ['source_module: "media"', 'source_module: "media"'],
  ['id: "media"', 'id: "media"'],
  ["id: 'media'", "id: 'media'"],
  ['moduleId="media"', 'moduleId="media"'],
  ["registerLicenseIpc(ipcMain, 'EIM')", "registerLicenseIpc(ipcMain, 'EIM')"],
  ["ensureLicensedStartup('EIM')", "ensureLicensedStartup('EIM')"],
  ['PRODUCT.EIM', 'PRODUCT.EIM'],
  ["code: 'LONEX-EIM'", "code: 'LONEX-EIM'"],
  ["name: 'LONEX EIM'", "name: 'LONEX EIM'"],
  ["APP_NAME = 'LONEX EIM'", "APP_NAME = 'LONEX EIM'"],
  ['LONEX EIM and LONEX ERP', 'LONEX EIM and LONEX ERP'],
  ['/m/media', '/m/media'],
  ['"/eim"', '"/eim"'],
  ["'/eim'", "'/eim'"],
  ['`/eim`', '`/eim`'],
  ['LONEX-EIM', 'LONEX-EIM'],
  ['"media":', '"media":'],
  ["'media':", "'media':"],
  ['Media 자막', 'Media 자막'],
  ['Media·ERP', 'Media·ERP'],
  ['메일·노트·Media·ERP', '메일·노트·Media·ERP'],
  ['productKind) || PRODUCT.EIM', 'productKind) || PRODUCT.EIM'],
  ['getProductConfig(productKind) {\n  return PRODUCT[productKind] || PRODUCT.EIM', 'getProductConfig(productKind) {\n  return PRODUCT[productKind] || PRODUCT.EIM'],
  ['EIM:', 'EIM:'],
  ['EIM ', 'EIM '],
  [' EIM', ' EIM'],
  ['EIM', 'EIM'],
];

function shouldProcess(fp) {
  const rel = path.relative(ROOT, fp).replace(/\\/g, '/');
  if (SKIP_PATH.some((p) => p.test(rel))) return false;
  return TEXT_EXT.has(path.extname(fp).toLowerCase());
}

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const fp = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (SKIP_DIRS.has(ent.name)) continue;
      walk(fp, out);
    } else if (shouldProcess(fp)) out.push(fp);
  }
  return out;
}

function apply(text) {
  let out = text;
  for (const [from, to] of REPLACEMENTS) out = out.split(from).join(to);
  return out;
}

const changed = [];
for (const fp of walk(ROOT)) {
  try {
    const text = fs.readFileSync(fp, 'utf8');
    const next = apply(text);
    if (next !== text) {
      fs.writeFileSync(fp, next, 'utf8');
      changed.push(path.relative(ROOT, fp));
    }
  } catch { /* skip */ }
}

const moduleSrc = path.join(ROOT, 'lonex-hub/src/modules/media/MediaModule.tsx');
const moduleDst = path.join(ROOT, 'lonex-hub/src/modules/media/MediaModule.tsx');
if (fs.existsSync(moduleSrc)) {
  fs.mkdirSync(path.dirname(moduleDst), { recursive: true });
  let c = apply(fs.readFileSync(moduleSrc, 'utf8'));
  c = c.replace(/export default function MediaModule/g, 'export default function MediaModule');
  fs.writeFileSync(moduleDst, c, 'utf8');
  fs.rmSync(path.join(ROOT, 'lonex-hub/src/modules/media'), { recursive: true, force: true });
  changed.push('RENAMED lonex-hub/src/modules/media → media/MediaModule.tsx');
}

const exeRenames = [
  ['LONEX EIM.exe', 'LONEX EIM.exe'],
  ['LONEX-EIM-Setup_v1.0.1.exe', 'LONEX-EIM-Setup_v1.0.1.exe'],
  ['Uninstall LONEX EIM.exe', 'Uninstall LONEX EIM.exe'],
];
for (const [from, to] of exeRenames) {
  const s = path.join(ROOT, from), d = path.join(ROOT, to);
  if (fs.existsSync(s) && !fs.existsSync(d)) {
    try { fs.renameSync(s, d); changed.push(`RENAMED ${from} → ${to}`); }
    catch (e) { changed.push(`SKIP ${from}: ${e.message}`); }
  }
}

const result = { changed, count: changed.length, at: new Date().toISOString() };
fs.writeFileSync(path.join(ROOT, 'rebrand-cdms-to-eim-result.json'), JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
