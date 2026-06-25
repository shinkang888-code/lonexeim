"""본사 API Key 발급·회수 — 직원 PC 등록용"""
import json
import uuid
from typing import Annotated, Literal

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app.auth import generate_api_key, require_admin
from app.db import _utcnow, connect, row_to_dict

router = APIRouter()

DEFAULT_SCOPES = ["ingest:write", "security:write", "sync:read"]


class ApiKeyCreate(BaseModel):
    employee_id: str
    label: str = "desktop-default"
    scopes: list[Literal["ingest:write", "security:write", "sync:read"]] = DEFAULT_SCOPES


@router.get("")
async def list_keys(_: Annotated[None, Depends(require_admin)]):
    with connect() as conn:
        rows = conn.execute(
            """
            SELECT k.id, k.employee_id, k.key_prefix, k.scopes, k.label,
                   k.created_at, k.revoked_at, e.name AS employee_name, e.dept
            FROM api_keys k
            JOIN employees e ON e.id = k.employee_id
            ORDER BY k.created_at DESC
            """
        ).fetchall()
    return {"data": [row_to_dict(r) for r in rows]}


@router.post("")
async def issue_key(body: ApiKeyCreate, _: Annotated[None, Depends(require_admin)]):
    with connect() as conn:
        emp = conn.execute(
            "SELECT id FROM employees WHERE id = ? AND status = 'active'",
            (body.employee_id,),
        ).fetchone()
    if not emp:
        raise HTTPException(404, "Active employee not found")

    full_key, prefix, key_hash = generate_api_key()
    key_id = f"KEY-{uuid.uuid4().hex[:8].upper()}"
    with connect() as conn:
        conn.execute(
            """
            INSERT INTO api_keys (id, employee_id, key_prefix, key_hash, scopes, label, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (
                key_id,
                body.employee_id,
                prefix,
                key_hash,
                json.dumps(body.scopes),
                body.label,
                _utcnow(),
            ),
        )
    return {
        "status": "issued",
        "data": {
            "id": key_id,
            "employee_id": body.employee_id,
            "key_prefix": prefix,
            "label": body.label,
            "scopes": body.scopes,
            "api_key": full_key,
            "warning": "이 키는 한 번만 표시됩니다. 직원 PC에 안전하게 전달하세요.",
        },
    }


@router.post("/{key_id}/revoke")
async def revoke_key(key_id: str, _: Annotated[None, Depends(require_admin)]):
    with connect() as conn:
        cur = conn.execute(
            "UPDATE api_keys SET revoked_at = ? WHERE id = ? AND revoked_at IS NULL",
            (_utcnow(), key_id),
        )
        if cur.rowcount == 0:
            raise HTTPException(404, "Key not found or already revoked")
    return {"status": "revoked", "id": key_id}
