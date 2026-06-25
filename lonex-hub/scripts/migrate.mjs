import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL?.replace(/^["']|["']$/g, "");
if (!url) {
  console.error("DATABASE_URL required");
  process.exit(1);
}
const sql = neon(url);

async function main() {
  await sql`
    CREATE TABLE IF NOT EXISTS models (
      id SERIAL PRIMARY KEY,
      repo_id TEXT UNIQUE NOT NULL,
      category TEXT NOT NULL,
      name TEXT NOT NULL,
      downloads BIGINT DEFAULT 0,
      likes INT DEFAULT 0,
      note TEXT
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS hub_employees (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT,
      dept TEXT DEFAULT '미지정',
      endpoint_hostname TEXT,
      status TEXT DEFAULT 'active',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS hub_api_keys (
      id TEXT PRIMARY KEY,
      employee_id TEXT NOT NULL REFERENCES hub_employees(id),
      key_prefix TEXT NOT NULL,
      key_hash TEXT UNIQUE NOT NULL,
      scopes JSONB DEFAULT '[]',
      label TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      revoked_at TIMESTAMPTZ
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS hub_ingest_records (
      id TEXT PRIMARY KEY,
      employee_id TEXT NOT NULL REFERENCES hub_employees(id),
      endpoint_id TEXT,
      data_type TEXT NOT NULL,
      title TEXT,
      body_text TEXT,
      metadata_json JSONB DEFAULT '{}',
      source_module TEXT,
      client_created_at TIMESTAMPTZ,
      ingested_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS hub_security_events (
      id SERIAL PRIMARY KEY,
      employee_id TEXT REFERENCES hub_employees(id),
      endpoint_id TEXT,
      agent_id TEXT,
      event_type TEXT NOT NULL,
      action TEXT,
      detail TEXT,
      severity TEXT DEFAULT 'medium',
      payload_json JSONB DEFAULT '{}',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_hub_ingest_employee ON hub_ingest_records(employee_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_hub_ingest_type ON hub_ingest_records(data_type)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_hub_ingest_ts ON hub_ingest_records(ingested_at DESC)`;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_hub_ingest_fts ON hub_ingest_records
    USING gin(to_tsvector('simple', coalesce(title,'') || ' ' || coalesce(body_text,'')))
  `;
  console.log("Migration complete.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
