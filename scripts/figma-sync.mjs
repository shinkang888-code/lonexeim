#!/usr/bin/env node
/**
 * Lonex Hub — Figma CLI (REST API)
 *
 *   node scripts/figma-sync.mjs login <figd_...>
 *   node scripts/figma-sync.mjs setup
 *   node scripts/figma-sync.mjs link <figma-url>
 *   node scripts/figma-sync.mjs sync
 *   node scripts/figma-sync.mjs me | projects | files | tokens | exportImages
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const HUB = path.join(ROOT, "lonex-hub");
const ENV_FILE = path.join(__dirname, "figma.env");
const CONFIG_FILE = path.join(__dirname, "figma.config.json");
const CONFIG_EXAMPLE = path.join(__dirname, "figma.config.example.json");
const OUT_TOKENS = path.join(HUB, "src/lib/figma-tokens.generated.json");
const GLOBALS_CSS = path.join(HUB, "src/app/globals.css");
const PUBLIC_IMAGES = path.join(HUB, "public/images");
const LOCAL_TOKENS = path.join(__dirname, "figma-design-tokens.json");

const CSS_MARKER_START = "/* figma-sync:start */";
const CSS_MARKER_END = "/* figma-sync:end */";
const ENV_CANDIDATES = [ENV_FILE, path.join(HUB, ".env.local")];

function loadEnvFile() {
  for (const file of ENV_CANDIDATES) {
    if (!fs.existsSync(file)) continue;
    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
      if (!m || process.env[m[1]]) continue;
      let v = m[2].trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      process.env[m[1]] = v;
    }
  }
}

loadEnvFile();

function normalizeToken(raw) {
  if (!raw) return "";
  let t = String(raw).trim();
  t = t.replace(/^(token|toekn)\s*=\s*/i, "");
  return t.trim();
}

function readEnvMap() {
  const map = {};
  if (!fs.existsSync(ENV_FILE)) return map;
  for (const line of fs.readFileSync(ENV_FILE, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
    if (m) map[m[1]] = m[2].trim();
  }
  return map;
}

function writeEnvMap(updates) {
  const map = readEnvMap();
  Object.assign(map, updates);
  const lines = [
    "# Figma Personal Access Token (커밋 금지 — Pro PAT figd_...)",
    `FIGMA_ACCESS_TOKEN=${map.FIGMA_ACCESS_TOKEN || ""}`,
    `FIGMA_TEAM_ID=${map.FIGMA_TEAM_ID || ""}`,
    `FIGMA_PROJECT_ID=${map.FIGMA_PROJECT_ID || ""}`,
    `FIGMA_FILE_KEY=${map.FIGMA_FILE_KEY || ""}`,
    "",
  ];
  fs.writeFileSync(ENV_FILE, lines.join("\n"));
  for (const [k, v] of Object.entries(updates)) process.env[k] = v;
}

function loadConfig() {
  if (!fs.existsSync(CONFIG_FILE)) {
    if (fs.existsSync(CONFIG_EXAMPLE)) {
      fs.copyFileSync(CONFIG_EXAMPLE, CONFIG_FILE);
    } else {
      return {};
    }
  }
  try {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
  } catch {
    return {};
  }
}

function saveConfig(cfg) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(cfg, null, 2) + "\n");
}

const cfg = loadConfig();

function getToken() {
  return normalizeToken(process.env.FIGMA_ACCESS_TOKEN || process.env.FIGMA_TOKEN);
}

function getTeamId() {
  return process.env.FIGMA_TEAM_ID || cfg.teamId;
}

function getFileKey() {
  return process.env.FIGMA_FILE_KEY || cfg.fileKey;
}

function tokenHint() {
  console.error(`
Pro 계정 PAT 발급 (REST API용, figd_ 접두사):
  1. https://www.figma.com/settings → Security → Personal access tokens
  2. Generate new token
  3. 스코프: current_user:read, file_content:read, file_metadata:read, file_variables:read
  4. 로그인:
     .\\scripts\\figma.ps1 login figd_xxxxxxxx

pat_ 토큰은 Figma REST API에서 사용할 수 없습니다.
`);
}

async function figma(pathname, opts = {}) {
  const TOKEN = getToken();
  const soft = opts.soft === true;
  if (!TOKEN) {
    if (soft) throw new Error("NO_TOKEN");
    console.error("FIGMA_ACCESS_TOKEN이 없습니다.");
    process.exit(1);
  }
  const res = await fetch(`https://api.figma.com/v1${pathname}`, {
    ...opts,
    headers: { "X-Figma-Token": TOKEN, ...(opts.headers || {}) },
  });
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }
  if (!res.ok) {
    const err = data.err || data.message || res.statusText;
    if (soft) throw new Error(`FIGMA_${res.status}: ${err}`);
    console.error(`Figma API ${res.status}: ${err}`);
    process.exit(1);
  }
  return data;
}

function parseFigmaUrl(url) {
  const u = String(url).trim();
  const fileKey = u.match(/figma\.com\/(?:file|design|proto|board)\/([a-zA-Z0-9]+)/)?.[1];
  const teamId = u.match(/figma\.com\/files\/team\/(\d+)/)?.[1];
  const nodeId = u.match(/node-id=([\d-]+)/)?.[1]?.replace(/-/g, ":");
  return { fileKey, teamId, nodeId };
}

function walkNodes(node, acc = []) {
  if (!node) return acc;
  acc.push(node);
  for (const child of node.children || []) walkNodes(child, acc);
  return acc;
}

function rgbaToHex({ r, g, b, a = 1 }) {
  const hex =
    "#" +
    [r, g, b]
      .map((c) => Math.round(c * 255).toString(16).padStart(2, "0"))
      .join("");
  if (a < 1) {
    return `rgba(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)},${a.toFixed(2)})`;
  }
  return hex;
}

function extractFromNodes(file) {
  const nodes = walkNodes(file.document);
  const colors = {};
  const textStyles = {};
  const exportNodes = {};

  for (const n of nodes) {
    const name = n.name || "";
    if (name.startsWith("hub/export/") || name === "hub/hero") {
      exportNodes[name] = n.id;
    }
    if (n.type === "RECTANGLE" || n.type === "FRAME" || n.type === "COMPONENT") {
      const fill = n.fills?.find((f) => f.type === "SOLID" && f.visible !== false);
      if (fill && (name.startsWith("color/") || name.startsWith("hub/color"))) {
        colors[name.replace(/\//g, "-")] = rgbaToHex(fill.color);
      }
    }
    if (n.type === "TEXT" && n.style && (name.startsWith("text/") || name.startsWith("hub/text"))) {
      textStyles[name.replace(/\//g, "-")] = {
        fontSize: n.style.fontSize,
        fontWeight: n.style.fontWeight,
        lineHeight: n.style.lineHeightPx,
      };
    }
  }
  return { colors, textStyles, exportNodes };
}

async function extractFromVariables(fileKey) {
  try {
    const data = await figma(`/files/${fileKey}/variables/local`, { soft: true });
    const colors = {};
    const vars = data.variables || {};
    const collections = data.variableCollections || {};
    const modeByCollection = {};
    for (const col of Object.values(collections)) {
      modeByCollection[col.id] = col.defaultModeId;
    }
    for (const v of Object.values(vars)) {
      if (!v.name?.startsWith("hub/")) continue;
      const key = v.name.replace(/\//g, "-");
      if (v.resolvedType === "COLOR") {
        const mode = modeByCollection[v.variableCollectionId];
        const val = v.valuesByMode?.[mode];
        if (val && typeof val === "object" && "r" in val) {
          colors[key] = rgbaToHex(val);
        }
      }
    }
    return colors;
  } catch {
    return {};
  }
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function cssVarName(tokenKey) {
  return `--${tokenKey}`;
}

function applyCssVars(tokens) {
  if (!fs.existsSync(GLOBALS_CSS)) return;
  const cssLines = [];
  for (const [k, v] of Object.entries(tokens.colors || {})) {
    if (k.startsWith("hub-")) cssLines.push(`  ${cssVarName(k)}: ${v};`);
  }
  if (tokens.gradients?.["hub-gradient-hero"]) {
    cssLines.push(`  --hub-hero-overlay: ${tokens.gradients["hub-gradient-hero"]};`);
  }
  if (!cssLines.length) return;
  const block = [CSS_MARKER_START, ...cssLines, CSS_MARKER_END].join("\n");
  let css = fs.readFileSync(GLOBALS_CSS, "utf8");
  const markerRe = new RegExp(
    `${escapeRegExp(CSS_MARKER_START)}[\\s\\S]*?${escapeRegExp(CSS_MARKER_END)}`
  );
  if (css.includes(CSS_MARKER_START)) {
    css = css.replace(markerRe, block);
  } else {
    css = css.replace(/(:root\s*\{)/, `$1\n${block}\n`);
  }
  if (tokens.gradients?.["hub-gradient-mesh"]) {
    css = css.replace(
      /(body\s*\{[^}]*?)background-color:[^;]+;\s*background-color:[^;]+;\s*background-image:[^;]+;/,
      `$1background-color: var(--hub-color-bg, #eef1f6);\n  background-image: ${tokens.gradients["hub-gradient-mesh"]};`
    );
    if (!css.includes("hub-gradient-mesh")) {
      css = css.replace(
        /(body\s*\{[^}]*?)background-image:[^;]+;/,
        `$1background-color: var(--hub-color-bg, #eef1f6);\n  background-image: ${tokens.gradients["hub-gradient-mesh"]};`
      );
    }
  }
  fs.writeFileSync(GLOBALS_CSS, css);
}

function loadLocalDesignTokens() {
  if (!fs.existsSync(LOCAL_TOKENS)) {
    throw new Error(`로컬 토큰 없음: ${LOCAL_TOKENS}`);
  }
  return JSON.parse(fs.readFileSync(LOCAL_TOKENS, "utf8"));
}

async function syncLocal() {
  const spec = loadLocalDesignTokens();
  const tokens = {
    colors: spec.colors || {},
    textStyles: spec.textStyles || {},
    gradients: spec.gradients || {},
    exportNodes: {},
    syncedAt: new Date().toISOString(),
    fileName: spec.meta?.name || "Lonex Hub (local)",
    fileKey: null,
    source: "local",
  };
  fs.mkdirSync(path.dirname(OUT_TOKENS), { recursive: true });
  fs.writeFileSync(OUT_TOKENS, JSON.stringify(tokens, null, 2));
  applyCssVars(tokens);
  const config = loadConfig();
  config.lastSync = tokens.syncedAt;
  config.source = "local";
  saveConfig(config);
  console.log(`✓ Figma local sync (${Object.keys(tokens.colors).length} colors → Hub)`);
  return tokens;
}

async function syncFromApi() {
  const me = await figma("/me", { soft: true });
  const config = loadConfig();
  config.user = { id: me.id, email: me.email, handle: me.handle };
  let key = process.env.FIGMA_FILE_KEY || config.fileKey;

  if (!key && getTeamId()) {
    const projects = await figma(`/teams/${getTeamId()}/projects`, { soft: true });
    const project =
      projects.projects?.find((p) => /lonex|hub|design/i.test(p.name)) ||
      projects.projects?.[0];
    if (project) {
      writeEnvMap({ FIGMA_PROJECT_ID: project.id });
      config.projectId = project.id;
      const files = await figma(`/projects/${project.id}/files`, { soft: true });
      const file = await pickLonexFile(files.files);
      if (file) {
        key = file.key;
        writeEnvMap({ FIGMA_FILE_KEY: key });
        config.fileKey = key;
        config.fileName = file.name;
      }
    }
  }

  if (!key) throw new Error("NO_FILE_KEY");

  const file = await figma(`/files/${key}`, { soft: true });
  const fromNodes = extractFromNodes(file);
  const fromVars = await extractFromVariables(key);
  const tokens = {
    colors: { ...fromNodes.colors, ...fromVars },
    textStyles: fromNodes.textStyles,
    gradients: {},
    exportNodes: fromNodes.exportNodes,
    syncedAt: new Date().toISOString(),
    fileName: file.name,
    fileKey: key,
    source: "figma-api",
  };
  fs.mkdirSync(path.dirname(OUT_TOKENS), { recursive: true });
  fs.writeFileSync(OUT_TOKENS, JSON.stringify(tokens, null, 2));
  applyCssVars(tokens);

  const heroId =
    fromNodes.exportNodes["hub/hero"] ||
    fromNodes.exportNodes["hub/export/hero"] ||
    config.heroNodeId;
  if (heroId) {
    await downloadImage(key, heroId, path.join(PUBLIC_IMAGES, "hub-hero.png"));
  }

  config.lastSync = tokens.syncedAt;
  config.source = "figma-api";
  saveConfig(config);
  console.log(`✓ Figma API sync (${Object.keys(tokens.colors).length} colors)`);
  return tokens;
}

async function downloadImage(fileKey, nodeId, outPath) {
  const ids = encodeURIComponent(nodeId.replace(/-/g, ":"));
  const data = await figma(`/images/${fileKey}?ids=${ids}&format=png&scale=2`);
  const url = data.images?.[nodeId.replace(/-/g, ":")] || data.images?.[nodeId];
  if (!url) {
    console.warn(`이미지 export 실패: node ${nodeId}`);
    return false;
  }
  const img = await fetch(url);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, Buffer.from(await img.arrayBuffer()));
  console.log(`저장: ${outPath}`);
  return true;
}

async function pickLonexFile(files) {
  const list = files || [];
  const hit =
    list.find((f) => /lonex|hub/i.test(f.name)) ||
    list.find((f) => /design system|dashboard/i.test(f.name));
  return hit || list[0];
}

const commands = {
  async login() {
    const raw = process.argv[3];
    if (!raw) {
      console.error("사용: node scripts/figma-sync.mjs login figd_...");
      process.exit(1);
    }
    const token = normalizeToken(raw);
    writeEnvMap({ FIGMA_ACCESS_TOKEN: token });
    process.env.FIGMA_ACCESS_TOKEN = token;
    console.log("토큰 저장됨 → scripts/figma.env");
    await commands.setup();
  },

  async setup() {
    loadEnvFile();
    const token = normalizeToken(process.env.FIGMA_ACCESS_TOKEN);
    if (!token) {
      console.error("토큰 없음. .\\scripts\\figma.ps1 login figd_...");
      tokenHint();
      process.exit(1);
    }
    const me = await figma("/me");
    const config = loadConfig();
    config.user = { id: me.id, email: me.email, handle: me.handle };
    config.syncedAt = new Date().toISOString();
    saveConfig(config);
    console.log("✓ Figma 연결 OK");
    console.log(JSON.stringify({ email: me.email, handle: me.handle }, null, 2));
    if (!getTeamId()) {
      console.log("\n다음: Figma 팀 URL에서 team ID 확인 후 figma.config.json 또는 figma.env에 설정");
      console.log("  예: https://www.figma.com/files/team/1234567890/... → FIGMA_TEAM_ID=1234567890");
    }
    if (!getFileKey()) {
      console.log("\n또는 Hub 디자인 파일 URL 연결:");
      console.log("  .\\scripts\\figma.ps1 link \"https://www.figma.com/design/XXXX/Lonex-Hub\"");
    }
  },

  async link() {
    const url = process.argv[3];
    if (!url) {
      console.error("사용: node scripts/figma-sync.mjs link <figma-url>");
      process.exit(1);
    }
    const { fileKey, teamId, nodeId } = parseFigmaUrl(url);
    const updates = {};
    const config = loadConfig();
    if (fileKey) {
      updates.FIGMA_FILE_KEY = fileKey;
      config.fileKey = fileKey;
    }
    if (teamId) {
      updates.FIGMA_TEAM_ID = teamId;
      config.teamId = teamId;
    }
    if (nodeId) config.heroNodeId = nodeId;
    config.linkedUrl = url;
    writeEnvMap(updates);
    saveConfig(config);
    console.log("연결됨:", { fileKey, teamId, nodeId });
    if (fileKey) {
      const meta = await figma(`/files/${fileKey}/meta`);
      config.fileName = meta.file?.name;
      saveConfig(config);
      console.log("파일:", meta.file?.name);
    }
  },

  async sync() {
    loadEnvFile();
    const token = getToken();
    if (token?.startsWith("figd_")) {
      try {
        await syncFromApi();
        return;
      } catch {
        /* API 실패 시 로컬 폴백 */
      }
    }
    await syncLocal();
  },

  async local() {
    await syncLocal();
  },

  async me() {
    console.log(JSON.stringify(await figma("/me"), null, 2));
  },

  async projects() {
    if (!getTeamId()) {
      console.error("FIGMA_TEAM_ID 필요");
      process.exit(1);
    }
    console.log(JSON.stringify(await figma(`/teams/${getTeamId()}/projects`), null, 2));
  },

  async files() {
    const projectId = process.argv[3] || process.env.FIGMA_PROJECT_ID || cfg.projectId;
    if (!projectId) {
      console.error("사용: figma-sync.mjs files <projectId>");
      process.exit(1);
    }
    console.log(JSON.stringify(await figma(`/projects/${projectId}/files`), null, 2));
  },

  async file() {
    const key = process.argv[3] || getFileKey();
    if (!key) process.exit(1);
    const data = await figma(`/files/${key}?depth=1`);
    console.log(JSON.stringify({ name: data.name, lastModified: data.lastModified, version: data.version }, null, 2));
  },

  async tokens() {
    await commands.sync();
  },

  async exportImages() {
    const key = process.argv[3] || getFileKey();
    const nodeId = process.argv[4];
    if (!key || !nodeId) process.exit(1);
    await downloadImage(key, nodeId, path.join(PUBLIC_IMAGES, "figma-export.png"));
  },

  help() {
    console.log(`Lonex Hub Figma CLI

  login <figd_token>   PAT 저장 + 연결 확인
  setup                /v1/me 검증
  link <figma-url>     fileKey·teamId 파싱
  sync                 API 우선 → 로컬 디자인 토큰 폴백
  local                로컬 hub/* 토큰만 적용
  me | projects | files | tokens | exportImages

PowerShell: .\\scripts\\figma.ps1 <command> [args]
`);
  },
};

const cmd = process.argv[2] || "sync";
if (commands[cmd]) {
  await commands[cmd]();
} else {
  console.error(`알 수 없는 명령: ${cmd}`);
  commands.help();
  process.exit(1);
}
