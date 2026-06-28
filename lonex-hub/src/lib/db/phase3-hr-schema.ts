import { NeonQueryFunction } from "@neondatabase/serverless";

/** Phase 3 — approval, attendance, HR (EIM BFF) */
export async function runPhase3HrMigration(sql: NeonQueryFunction<false, false>) {
  await sql`
    CREATE TABLE IF NOT EXISTS eim_approval_types (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      name TEXT NOT NULL,
      code TEXT NOT NULL,
      metadata_json JSONB DEFAULT '{}',
      status TEXT DEFAULT 'active',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE (tenant_id, code)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS eim_approval_templates (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      type_id TEXT REFERENCES eim_approval_types(id),
      title TEXT NOT NULL,
      body_template TEXT DEFAULT '',
      metadata_json JSONB DEFAULT '{}',
      status TEXT DEFAULT 'active',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS eim_approvals (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      employee_id TEXT,
      type_id TEXT REFERENCES eim_approval_types(id),
      title TEXT NOT NULL,
      body TEXT DEFAULT '',
      status TEXT DEFAULT 'draft',
      payload_json JSONB DEFAULT '{}',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS eim_org_nodes (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      parent_id TEXT,
      employee_id TEXT,
      title TEXT,
      department TEXT,
      role TEXT,
      sort_order INT DEFAULT 0,
      metadata_json JSONB DEFAULT '{}',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS eim_attendance_records (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      employee_id TEXT NOT NULL,
      work_date DATE NOT NULL,
      clock_in TIMESTAMPTZ,
      clock_out TIMESTAMPTZ,
      status TEXT DEFAULT 'normal',
      location_json JSONB DEFAULT '{}',
      metadata_json JSONB DEFAULT '{}',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE (tenant_id, employee_id, work_date)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS eim_leave_records (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      employee_id TEXT NOT NULL,
      leave_type TEXT NOT NULL DEFAULT 'annual',
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      days NUMERIC(5,2) DEFAULT 1,
      status TEXT DEFAULT 'pending',
      reason TEXT DEFAULT '',
      metadata_json JSONB DEFAULT '{}',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS eim_salary_contracts (
      id TEXT PRIMARY KEY,
      tenant_id TEXT NOT NULL,
      employee_id TEXT NOT NULL,
      title TEXT NOT NULL,
      contract_type TEXT DEFAULT 'regular',
      base_salary NUMERIC(14,2) DEFAULT 0,
      status TEXT DEFAULT 'draft',
      payload_json JSONB DEFAULT '{}',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`CREATE INDEX IF NOT EXISTS idx_eim_approval_tenant ON eim_approvals(tenant_id, created_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_eim_attendance_emp_date ON eim_attendance_records(tenant_id, employee_id, work_date DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_eim_leave_tenant ON eim_leave_records(tenant_id, created_at DESC)`;

  await sql`
    INSERT INTO eim_approval_types (id, tenant_id, name, code)
    VALUES
      ('aptype-general', 'tenant-default', '일반 결재', 'general'),
      ('aptype-expense', 'tenant-default', '경비 결재', 'expense'),
      ('aptype-leave', 'tenant-default', '휴가 결재', 'leave')
    ON CONFLICT (id) DO NOTHING
  `;
}
