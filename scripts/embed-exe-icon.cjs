/**
 * Embed LX icon into built Windows exe (rcedit).
 * electron-builder skips this when signAndEditExecutable=false.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const desktop = path.join(root, "lonex-eim-desktop");
const icon = path.join(desktop, "build", "icon.ico");
const unpacked = path.join(desktop, "dist", "win-unpacked", "LONEX EIM.exe");
const portable = path.join(desktop, "dist", "LONEX EIM.exe");

function findRcedit() {
  const candidates = [
    path.join(desktop, "node_modules", "rcedit", "bin", "rcedit-x64.exe"),
    path.join(desktop, "node_modules", "rcedit", "bin", "rcedit.exe"),
  ];
  return candidates.find((p) => fs.existsSync(p)) || null;
}

function embed(exePath) {
  if (!fs.existsSync(exePath)) {
    console.warn("Skip (missing):", exePath);
    return;
  }
  const rcedit = findRcedit();
  if (!rcedit) {
    console.error("rcedit not found in lonex-eim-desktop/node_modules");
    process.exit(1);
  }
  execFileSync(rcedit, [exePath, "--set-icon", icon], { stdio: "inherit" });
  console.log("Icon embedded:", exePath);
}

if (!fs.existsSync(icon)) {
  console.error("Missing icon:", icon);
  process.exit(1);
}

embed(unpacked);
embed(portable);

const src = fs.existsSync(unpacked) ? unpacked : portable;
if (fs.existsSync(src)) {
  fs.copyFileSync(src, path.join(root, "LONEX EIM.exe"));
  console.log("Copied to root: LONEX EIM.exe");
}

const setupGlob = fs.readdirSync(path.join(desktop, "dist")).filter((f) => f.startsWith("LONEX-EIM-Setup_") && f.endsWith(".exe"));
for (const f of setupGlob) {
  const dstName = f.replace("LONEX-EIM-Setup_", "LONEX-EIM-Setup_v").replace(".exe", ".exe");
  fs.copyFileSync(path.join(desktop, "dist", f), path.join(root, dstName));
  console.log("Copied setup:", dstName);
}

console.log("Done.");
