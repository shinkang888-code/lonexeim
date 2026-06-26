import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL?.replace(/^["']|["']$/g, "");
if (!url) {
  console.error("DATABASE_URL required");
  process.exit(1);
}
const sql = neon(url);
const rows = await sql`
  SELECT table_name FROM information_schema.tables
  WHERE table_schema = 'public' AND table_name LIKE 'hub_%'
  ORDER BY table_name
`;
console.log(rows.length ? rows.map((r) => r.table_name).join(", ") : "no hub_* tables");
