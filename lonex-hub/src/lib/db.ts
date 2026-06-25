import { neon, NeonQueryFunction } from "@neondatabase/serverless";

let _sql: NeonQueryFunction<false, false> | null = null;

export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!_sql) _sql = neon(url);
  return _sql;
}

export function requireSql() {
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL is not configured");
  return sql;
}

export type AiModel = {
  id: number;
  repo_id: string;
  category: string;
  name: string;
  downloads: number;
  likes: number;
  note: string | null;
};

export type HubEmployee = {
  id: string;
  name: string;
  email: string | null;
  dept: string;
  endpoint_hostname: string | null;
  status: string;
  created_at: string;
};
