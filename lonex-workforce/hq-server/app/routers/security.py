"""LogShield 보안 이벤트 수집 — 에이전트·데스크탑 공통"""
import json
from typing import Annotated, Literal, Optional

from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.auth import require_admin, require_api_key
from app.db import _utcnow, connect, json_dumps, row_to_dict

router = APIRouter()


class SecurityEventIn(BaseModel):
    agent_id: str
    endpoint_id: Optional[str] = None
    endpoint_hostname: str = ""
    user: str = ""
    event_type: Literal["USB", "PRINT", "NETWORK", "FILE", "PROCESS", "RANSOM", "WEB"]
    action: str
    detail: str
    severity: Literal["critical", "high", "medium", "low"] = "medium"
    payload: dict = {}


@router.post("/ingest")
async def ingest_security_event(
    event: SecurityEventIn,
    ctx: Annotated[dict, Depends(require_api_key)],
):
    with connect() as conn:
        cur = conn.execute(
            """
            INSERT INTO security_events
            (employee_id, endpoint_id, agent_id, event_type, action, detail, severity, payload_json, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                ctx["employee_id"],
                event.endpoint_id,
                event.agent_id,
                event.event_type,
                event.action,
                event.detail,
                event.severity,
                json_dumps(event.payload),
                _utcnow(),
            ),
        )
        event_id = cur.lastrowid

    return {"status": "accepted", "event_id": event_id}


@router.get("/recent")
async def recent_events(
    _: Annotated[None, Depends(require_admin)],
    limit: int = 50,
):
    with connect() as conn:
        rows = conn.execute(
            """
            SELECT s.*, e.name AS employee_name, e.dept
            FROM security_events s
            LEFT JOIN employees e ON e.id = s.employee_id
            ORDER BY s.created_at DESC
            LIMIT ?
            """,
            (min(limit, 200),),
        ).fetchall()
    return {"data": [row_to_dict(r) for r in rows]}
