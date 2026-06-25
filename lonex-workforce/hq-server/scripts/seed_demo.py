#!/usr/bin/env python3
"""본사 HQ 데모 시드 — 직원 1명 + API Key 발급"""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.auth import generate_api_key
from app.db import _utcnow, connect, init_db

init_db()

emp_id = "EMP-DEMO0001"
full_key, prefix, key_hash = generate_api_key()

with connect() as conn:
    conn.execute(
        """
        INSERT OR IGNORE INTO employees (id, name, email, dept, endpoint_hostname, status, created_at)
        VALUES (?, ?, ?, ?, ?, 'active', ?)
        """,
        (emp_id, "김준호", "kim.junho@lonex.kr", "재무팀", "FIN-DESK-01", _utcnow()),
    )
    conn.execute(
        """
        INSERT INTO api_keys (id, employee_id, key_prefix, key_hash, scopes, label, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (
            "KEY-DEMO0001",
            emp_id,
            prefix,
            key_hash,
            json.dumps(["ingest:write", "security:write", "sync:read"]),
            "demo-desktop",
            _utcnow(),
        ),
    )

print("=== Lonex Workforce HQ Demo Seed ===")
print(f"Employee ID: {emp_id}")
print(f"API Key:     {full_key}")
print("Admin Secret: lonex-hq-admin-dev-secret")
print("Use this API key in Workforce Desktop enrollment.")
