"""본사 일괄 검색 — 이메일·문서·보안이벤트 통합 FTS"""
from typing import Annotated, Optional

from fastapi import APIRouter, Depends, Query

from app.auth import require_admin
from app.db import connect, row_to_dict

router = APIRouter()


@router.get("")
async def unified_search(
    _: Annotated[None, Depends(require_admin)],
    q: str = Query(min_length=1, max_length=200),
    data_type: Optional[str] = None,
    employee_id: Optional[str] = None,
    limit: int = 50,
):
    limit = min(limit, 200)
    fts_query = " ".join(f'"{part}"' for part in q.split() if part.strip())

    sql = """
        SELECT r.id, r.employee_id, r.data_type, r.title,
               substr(r.body_text, 1, 300) AS snippet,
               r.source_module, r.created_at, r.ingested_at,
               e.name AS employee_name, e.dept
        FROM ingest_fts f
        JOIN ingest_records r ON r.id = f.record_id
        JOIN employees e ON e.id = r.employee_id
        WHERE ingest_fts MATCH ?
    """
    params: list = [fts_query]

    if data_type:
        sql += " AND r.data_type = ?"
        params.append(data_type)
    if employee_id:
        sql += " AND r.employee_id = ?"
        params.append(employee_id)

    sql += " ORDER BY r.ingested_at DESC LIMIT ?"
    params.append(limit)

    with connect() as conn:
        rows = conn.execute(sql, params).fetchall()

    return {
        "query": q,
        "total": len(rows),
        "results": [row_to_dict(r) for r in rows],
    }


@router.get("/security")
async def search_security_events(
    _: Annotated[None, Depends(require_admin)],
    q: str = Query(default="", max_length=200),
    severity: Optional[str] = None,
    limit: int = 50,
):
    limit = min(limit, 200)
    sql = """
        SELECT s.*, e.name AS employee_name, e.dept
        FROM security_events s
        LEFT JOIN employees e ON e.id = s.employee_id
        WHERE 1=1
    """
    params: list = []
    if q.strip():
        sql += " AND (s.detail LIKE ? OR s.event_type LIKE ? OR s.action LIKE ?)"
        like = f"%{q.strip()}%"
        params.extend([like, like, like])
    if severity:
        sql += " AND s.severity = ?"
        params.append(severity)
    sql += " ORDER BY s.created_at DESC LIMIT ?"
    params.append(limit)

    with connect() as conn:
        rows = conn.execute(sql, params).fetchall()

    return {"query": q, "total": len(rows), "results": [row_to_dict(r) for r in rows]}


@router.get("/stats")
async def hq_stats(_: Annotated[None, Depends(require_admin)]):
    with connect() as conn:
        employees = conn.execute(
            "SELECT COUNT(*) AS c FROM employees WHERE status = 'active'"
        ).fetchone()["c"]
        records = conn.execute("SELECT COUNT(*) AS c FROM ingest_records").fetchone()["c"]
        events = conn.execute("SELECT COUNT(*) AS c FROM security_events").fetchone()["c"]
        keys = conn.execute(
            "SELECT COUNT(*) AS c FROM api_keys WHERE revoked_at IS NULL"
        ).fetchone()["c"]
        by_type = conn.execute(
            """
            SELECT data_type, COUNT(*) AS count
            FROM ingest_records GROUP BY data_type ORDER BY count DESC
            """
        ).fetchall()
    return {
        "active_employees": employees,
        "active_api_keys": keys,
        "ingest_records": records,
        "security_events": events,
        "records_by_type": [dict(r) for r in by_type],
    }
