"""SQLite 영구 저장 — 본사 통합 데이터·API키·검색 인덱스"""
import json
import os
import sqlite3
from contextlib import contextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterator

DB_PATH = Path(os.environ.get("LONEX_HQ_DB", Path(__file__).resolve().parents[1] / "data" / "hq.db"))


def _utcnow() -> str:
    return datetime.now(timezone.utc).isoformat()


def init_db() -> None:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    with connect() as conn:
        conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS employees (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT,
                dept TEXT,
                endpoint_hostname TEXT,
                status TEXT DEFAULT 'active',
                created_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS api_keys (
                id TEXT PRIMARY KEY,
                employee_id TEXT NOT NULL,
                key_prefix TEXT NOT NULL,
                key_hash TEXT NOT NULL UNIQUE,
                scopes TEXT NOT NULL,
                label TEXT,
                created_at TEXT NOT NULL,
                revoked_at TEXT,
                FOREIGN KEY (employee_id) REFERENCES employees(id)
            );

            CREATE TABLE IF NOT EXISTS ingest_records (
                id TEXT PRIMARY KEY,
                employee_id TEXT NOT NULL,
                endpoint_id TEXT,
                data_type TEXT NOT NULL,
                title TEXT,
                body_text TEXT,
                metadata_json TEXT,
                source_module TEXT,
                created_at TEXT NOT NULL,
                ingested_at TEXT NOT NULL,
                FOREIGN KEY (employee_id) REFERENCES employees(id)
            );

            CREATE TABLE IF NOT EXISTS security_events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                employee_id TEXT,
                endpoint_id TEXT,
                agent_id TEXT,
                event_type TEXT NOT NULL,
                action TEXT,
                detail TEXT,
                severity TEXT,
                payload_json TEXT,
                created_at TEXT NOT NULL
            );

            CREATE VIRTUAL TABLE IF NOT EXISTS ingest_fts USING fts5(
                record_id UNINDEXED,
                employee_id UNINDEXED,
                data_type UNINDEXED,
                title,
                body_text,
                tokenize='unicode61'
            );
            """
        )


@contextmanager
def connect() -> Iterator[sqlite3.Connection]:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


def row_to_dict(row: sqlite3.Row | None) -> dict[str, Any] | None:
    if row is None:
        return None
    return dict(row)


def json_dumps(value: Any) -> str:
    return json.dumps(value, ensure_ascii=False)
