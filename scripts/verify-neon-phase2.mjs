#!/usr/bin/env node
import fs from "node:fs";
import { neon } from "@neondatabase/serverless";

const envFile = process.argv[2] || "lonex-hub/.env.lonex-hub.tmp";
const raw = fs.readFileSync(envFile, "utf8");
let url = "";
for (const line of raw.split(/\r?\n/)) {
  if (line.startsWith("DATABASE_URL=")) {
    url = line.slice(13).replace(/^"|"$/g, "");
    break;
  }
}
if (!url) {
  console.error("no DATABASE_URL");
  process.exit(1);
}
const sql = neon(url);
const tables = await sql`
  SELECT table_name FROM information_schema.tables
  WHERE table_name IN ('ai_credit_balances','ai_embeddings','hub_tenants','hub_employees')
  ORDER BY 1
`;
console.log("tables", tables.map((r) => r.table_name));
const bal = await sql`
  SELECT tenant_id, employee_id, balance_credits FROM ai_credit_balances LIMIT 3
`;
console.log("balances", bal);
