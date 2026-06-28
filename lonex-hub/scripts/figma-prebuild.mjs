#!/usr/bin/env node
/** Vercel/CI용 — lonex-hub 내부만 사용 (부모 scripts/ 불필요) */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HUB = path.resolve(__dirname, "..");
const SPEC = path.join(__dirname, "figma-design-tokens.json");
const OUT = path.join(HUB, "src/lib/figma-tokens.generated.json");
const GLOBALS = path.join(HUB, "src/app/globals.css");
const START = "/* figma-sync:start */";
const END = "/* figma-sync:end */";

function esc(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const spec = JSON.parse(fs.readFileSync(SPEC, "utf8"));
const tokens = {
  colors: spec.colors,
  textStyles: spec.textStyles,
  gradients: spec.gradients,
  syncedAt: new Date().toISOString(),
  fileName: spec.meta?.name,
  source: "local",
};
fs.writeFileSync(OUT, JSON.stringify(tokens, null, 2) + "\n");

const lines = [];
for (const [k, v] of Object.entries(tokens.colors)) {
  if (k.startsWith("hub-")) lines.push(`  --${k}: ${v};`);
}
if (tokens.gradients["hub-gradient-hero"]) {
  lines.push(`  --hub-hero-overlay: ${tokens.gradients["hub-gradient-hero"]};`);
}
const block = [START, ...lines, END].join("\n");
let css = fs.readFileSync(GLOBALS, "utf8");
const re = new RegExp(`${esc(START)}[\\s\\S]*?${esc(END)}`);
css = css.includes(START) ? css.replace(re, block) : css.replace(/(:root\s*\{)/, `$1\n${block}\n`);
fs.writeFileSync(GLOBALS, css);
console.log(`figma-prebuild: ${Object.keys(tokens.colors).length} colors`);
