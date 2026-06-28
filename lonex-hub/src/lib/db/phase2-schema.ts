import { NeonQueryFunction } from "@neondatabase/serverless";

/** Phase 2 schema — idempotent, safe to re-run on production */
export async function runPhase2Migration(sql: NeonQueryFunction<false, false>) {
  await sql`
    CREATE TABLE IF NOT EXISTS hub_tenants (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      subdomain TEXT,
      status TEXT DEFAULT 'active',
      settings_json JSONB DEFAULT '{}',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`
    INSERT INTO hub_tenants (id, slug, name, subdomain)
    VALUES ('tenant-default', 'default', 'Default Organization', NULL)
    ON CONFLICT (id) DO NOTHING
  `;
  await sql`ALTER TABLE hub_employees ADD COLUMN IF NOT EXISTS tenant_id TEXT DEFAULT 'tenant-default'`;
  await sql`ALTER TABLE hub_api_keys ADD COLUMN IF NOT EXISTS tenant_id TEXT DEFAULT 'tenant-default'`;

  await sql`
    CREATE TABLE IF NOT EXISTS ai_usage_log (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL REFERENCES hub_tenants(id),
      employee_id TEXT REFERENCES hub_employees(id),
      endpoint TEXT NOT NULL,
      model TEXT,
      tokens_in INT DEFAULT 0,
      tokens_out INT DEFAULT 0,
      credits_used NUMERIC(12,4) DEFAULT 0,
      metadata_json JSONB DEFAULT '{}',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS ai_credit_balances (
      tenant_id TEXT NOT NULL REFERENCES hub_tenants(id),
      employee_id TEXT NOT NULL DEFAULT '',
      balance_credits NUMERIC(12,4) NOT NULL DEFAULT 0,
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      PRIMARY KEY (tenant_id, employee_id)
    )
  `;
  await sql`ALTER TABLE ai_credit_balances ALTER COLUMN employee_id SET DEFAULT ''`;
  await sql`ALTER TABLE ai_credit_balances ALTER COLUMN employee_id DROP NOT NULL`;
  await sql`UPDATE ai_credit_balances SET employee_id = '' WHERE employee_id IS NULL`;
  await sql`ALTER TABLE ai_credit_balances ALTER COLUMN employee_id SET NOT NULL`;
  await sql`
    INSERT INTO ai_credit_balances (tenant_id, employee_id, balance_credits)
    VALUES ('tenant-default', '', 10000)
    ON CONFLICT (tenant_id, employee_id) DO NOTHING
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS ai_prompt_registry (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL REFERENCES hub_tenants(id),
      slug TEXT NOT NULL,
      title TEXT NOT NULL,
      template TEXT NOT NULL,
      version INT DEFAULT 1,
      metadata_json JSONB DEFAULT '{}',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE (tenant_id, slug, version)
    )
  `;
  await sql`
    INSERT INTO ai_prompt_registry (id, tenant_id, slug, title, template, version)
    VALUES (
      'prompt-default-legal-v1',
      'tenant-default',
      'legal-review',
      '법률 검토 시스템 프롬프트',
      '당신은 한국 법률·계약 검토를 돕는 AI 어시스턴트입니다. 조문·판례 인용 시 출처를 명시하고, 법률 자문은 참고용임을 안내하세요.',
      1
    )
    ON CONFLICT (tenant_id, slug, version) DO NOTHING
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_ai_usage_tenant_ts ON ai_usage_log(tenant_id, created_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_ai_usage_employee ON ai_usage_log(employee_id, created_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_prompt_tenant_slug ON ai_prompt_registry(tenant_id, slug)`;
}

/** pgvector extension + ai_embeddings (Phase 2 AI kernel) */
export async function runPgvectorMigration(sql: NeonQueryFunction<false, false>) {
  await sql`CREATE EXTENSION IF NOT EXISTS vector`;
  await sql`
    CREATE TABLE IF NOT EXISTS ai_embeddings (
      id TEXT PRIMARY KEY,
      domain TEXT NOT NULL DEFAULT 'general',
      title TEXT NOT NULL,
      body_text TEXT NOT NULL DEFAULT '',
      embedding vector(384),
      metadata_json JSONB DEFAULT '{}',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS ai_embeddings_domain_idx ON ai_embeddings (domain)`;
  try {
    await sql`
      CREATE INDEX IF NOT EXISTS ai_embeddings_vector_idx ON ai_embeddings
      USING ivfflat (embedding vector_cosine_ops) WITH (lists = 32)
    `;
  } catch {
    /* ivfflat needs rows — optional until data exists */
  }
}

/** EIM category stub registry (approval, attendance, hr …) */
export async function runEimStubMigration(sql: NeonQueryFunction<false, false>) {
  await sql`
    CREATE TABLE IF NOT EXISTS eim_api_stub_log (
      id SERIAL PRIMARY KEY,
      category TEXT NOT NULL,
      eim_path TEXT NOT NULL,
      method TEXT,
      tenant_id TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_eim_stub_cat ON eim_api_stub_log(category, created_at DESC)`;
}

export async function runAllPhase2Migrations(sql: NeonQueryFunction<false, false>) {
  await runPhase2Migration(sql);
  await runPgvectorMigration(sql);
  await runEimStubMigration(sql);
}
