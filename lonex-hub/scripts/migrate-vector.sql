-- Phase 1: pgvector POC (Neon Postgres)
-- Run: psql $DATABASE_URL -f lonex-hub/scripts/migrate-vector.sql

CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS ai_embeddings (
  id TEXT PRIMARY KEY,
  domain TEXT NOT NULL DEFAULT 'general',
  title TEXT NOT NULL,
  body_text TEXT NOT NULL DEFAULT '',
  embedding vector(384),
  metadata_json JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ai_embeddings_domain_idx ON ai_embeddings (domain);
CREATE INDEX IF NOT EXISTS ai_embeddings_vector_idx ON ai_embeddings USING ivfflat (embedding vector_cosine_ops) WITH (lists = 32);

-- Seed from HQ ingest (optional backfill)
INSERT INTO ai_embeddings (id, domain, title, body_text, metadata_json)
SELECT id, data_type, title, body_text, metadata_json::jsonb
FROM hub_ingest_records
ON CONFLICT (id) DO NOTHING;
