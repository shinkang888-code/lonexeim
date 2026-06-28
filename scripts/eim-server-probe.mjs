#!/usr/bin/env node
/**
 * Probe legacy EIM server (x.grend.kr) for /API routes when x.lonex.kr is NXDOMAIN.
 * Usage: node scripts/eim-server-probe.mjs [host]
 */
const host = process.argv[2] || "x.grend.kr";
const base = `https://${host}`;

const probes = [
  "/API/member/session-check",
  "/API/approval/list",
  "/API/attendance/getMyTodayAttendance",
  "/API/grantedleaveRecord/getAllList",
  "/API/ai/vector/status",
];

console.log(`Probing ${base} ...\n`);

for (const path of probes) {
  const url = base + path;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });
    const text = (await res.text()).slice(0, 120);
    console.log(`${res.status} ${path}`);
    console.log(`  ${text.replace(/\s+/g, " ")}\n`);
  } catch (e) {
    console.log(`ERR ${path}: ${e.message}\n`);
  }
}

console.log("SSH fallback: x.lonex.kr NXDOMAIN — use x.grend.kr (180.71.194.246) if legacy access needed.");
console.log("  ssh user@x.grend.kr  # credentials from infra owner");
