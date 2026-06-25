"""직원·엔드포인트 등록"""
import uuid
from typing import Annotated, Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app.auth import require_admin
from app.db import _utcnow, connect, row_to_dict

router = APIRouter()


class EmployeeCreate(BaseModel):
    name: str = Field(min_length=1)
    email: Optional[str] = None
    dept: str = "미지정"
    endpoint_hostname: Optional[str] = None


class EmployeeUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    dept: Optional[str] = None
    endpoint_hostname: Optional[str] = None
    status: Optional[str] = None


@router.get("")
async def list_employees(_: Annotated[None, Depends(require_admin)]):
    with connect() as conn:
        rows = conn.execute(
            "SELECT * FROM employees ORDER BY created_at DESC"
        ).fetchall()
    return {"data": [row_to_dict(r) for r in rows], "total": len(rows)}


@router.post("")
async def create_employee(body: EmployeeCreate, _: Annotated[None, Depends(require_admin)]):
    emp_id = f"EMP-{uuid.uuid4().hex[:8].upper()}"
    with connect() as conn:
        conn.execute(
            """
            INSERT INTO employees (id, name, email, dept, endpoint_hostname, status, created_at)
            VALUES (?, ?, ?, ?, ?, 'active', ?)
            """,
            (emp_id, body.name, body.email, body.dept, body.endpoint_hostname, _utcnow()),
        )
        row = conn.execute("SELECT * FROM employees WHERE id = ?", (emp_id,)).fetchone()
    return {"status": "created", "data": row_to_dict(row)}


@router.get("/{employee_id}")
async def get_employee(employee_id: str, _: Annotated[None, Depends(require_admin)]):
    with connect() as conn:
        row = conn.execute("SELECT * FROM employees WHERE id = ?", (employee_id,)).fetchone()
    if not row:
        raise HTTPException(404, "Employee not found")
    return {"data": row_to_dict(row)}


@router.patch("/{employee_id}")
async def update_employee(
    employee_id: str,
    body: EmployeeUpdate,
    _: Annotated[None, Depends(require_admin)],
):
    patch = body.model_dump(exclude_none=True)
    if not patch:
        raise HTTPException(400, "No fields to update")
    sets = ", ".join(f"{k} = ?" for k in patch)
    with connect() as conn:
        cur = conn.execute(
            f"UPDATE employees SET {sets} WHERE id = ?",
            (*patch.values(), employee_id),
        )
        if cur.rowcount == 0:
            raise HTTPException(404, "Employee not found")
        row = conn.execute("SELECT * FROM employees WHERE id = ?", (employee_id,)).fetchone()
    return {"status": "updated", "data": row_to_dict(row)}
