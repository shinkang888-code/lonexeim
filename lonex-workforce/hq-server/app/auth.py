"""본사 API Key 인증 — 직원 데스크탑·LogShield 에이전트 공통"""
import hashlib
import hmac
import os
import secrets
from typing import Annotated

from fastapi import Depends, Header, HTTPException

from app.db import connect, row_to_dict

ADMIN_SECRET = os.environ.get("LONEX_HQ_ADMIN_SECRET", "lonex-hq-admin-dev-secret")
KEY_PREFIX = "lnx_sk_"


def hash_api_key(raw_key: str) -> str:
    pepper = os.environ.get("LONEX_HQ_KEY_PEPPER", "lonex-pepper-dev")
    return hmac.new(pepper.encode(), raw_key.encode(), hashlib.sha256).hexdigest()


def generate_api_key() -> tuple[str, str, str]:
    """returns (full_key, prefix, hash)"""
    token = secrets.token_urlsafe(32)
    full = f"{KEY_PREFIX}{token}"
    prefix = full[:16]
    return full, prefix, hash_api_key(full)


def require_admin(x_admin_secret: Annotated[str | None, Header()] = None) -> None:
    if not x_admin_secret or not hmac.compare_digest(x_admin_secret, ADMIN_SECRET):
        raise HTTPException(status_code=401, detail="Invalid admin secret")


def require_api_key(x_lonex_api_key: Annotated[str | None, Header()] = None) -> dict:
    if not x_lonex_api_key or not x_lonex_api_key.startswith(KEY_PREFIX):
        raise HTTPException(status_code=401, detail="Missing or invalid API key")

    key_hash = hash_api_key(x_lonex_api_key)
    with connect() as conn:
        row = conn.execute(
            """
            SELECT k.*, e.name AS employee_name, e.dept, e.email
            FROM api_keys k
            JOIN employees e ON e.id = k.employee_id
            WHERE k.key_hash = ? AND k.revoked_at IS NULL AND e.status = 'active'
            """,
            (key_hash,),
        ).fetchone()

    ctx = row_to_dict(row)
    if not ctx:
        raise HTTPException(status_code=403, detail="API key revoked or employee inactive")
    return ctx
