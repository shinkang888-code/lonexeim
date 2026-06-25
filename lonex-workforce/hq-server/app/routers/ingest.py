"""직원 데스크탑 → 본사 데이터 업로드 (이메일·문서·캘린더·ERP 등)"""
import json
import uuid
from typing import Annotated, Literal, Optional

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from app.auth import require_api_key
from app.db import _utcnow, connect, json_dumps

router = APIRouter()

DataType = Literal[
    "email", "document", "calendar", "chat", "note", "drive", "erp", "cdms", "other"
]


class IngestItem(BaseModel):
    data_type: DataType
    title: str = Field(min_length=1, max_length=500)
    body_text: str = ""
    source_module: str = "lonex-hub"
    metadata: dict = Field(default_factory=dict)
    client_created_at: Optional[str] = None


class IngestBatch(BaseModel):
    endpoint_id: Optional[str] = None
    items: list[IngestItem] = Field(min_length=1, max_length=200)


@router.post("")
async def ingest_batch(
    body: IngestBatch,
    ctx: Annotated[dict, Depends(require_api_key)],
):
    employee_id = ctx["employee_id"]
    accepted = []
    now = _utcnow()

    with connect() as conn:
        for item in body.items:
            record_id = f"REC-{uuid.uuid4().hex[:12]}"
            conn.execute(
                """
                INSERT INTO ingest_records
                (id, employee_id, endpoint_id, data_type, title, body_text,
                 metadata_json, source_module, created_at, ingested_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    record_id,
                    employee_id,
                    body.endpoint_id,
                    item.data_type,
                    item.title,
                    item.body_text,
                    json_dumps(item.metadata),
                    item.source_module,
                    item.client_created_at or now,
                    now,
                ),
            )
            conn.execute(
                """
                INSERT INTO ingest_fts (record_id, employee_id, data_type, title, body_text)
                VALUES (?, ?, ?, ?, ?)
                """,
                (record_id, employee_id, item.data_type, item.title, item.body_text),
            )
            accepted.append(record_id)

    return {
        "status": "accepted",
        "count": len(accepted),
        "record_ids": accepted,
        "employee_id": employee_id,
    }


@router.get("/recent")
async def recent_ingest(
    ctx: Annotated[dict, Depends(require_api_key)],
    limit: int = 20,
):
    with connect() as conn:
        rows = conn.execute(
            """
            SELECT id, data_type, title, source_module, created_at, ingested_at
            FROM ingest_records
            WHERE employee_id = ?
            ORDER BY ingested_at DESC
            LIMIT ?
            """,
            (ctx["employee_id"], min(limit, 100)),
        ).fetchall()
    return {"data": [dict(r) for r in rows]}
