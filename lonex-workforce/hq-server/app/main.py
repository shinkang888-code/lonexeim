"""
Lonex Workforce HQ Server
본사 통합 API — API Key 발급, 직원 데이터 수집, LogShield 보안 이벤트, 일괄 검색
"""
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db import init_db
from app.routers import employees, ingest, keys, search, security


@asynccontextmanager
async def lifespan(_app: FastAPI):
    init_db()
    yield


app = FastAPI(
    title="Lonex Workforce HQ API",
    description="직원 데스크탑 데이터 수집·LogShield 보안관제·본사 일괄검색",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(employees.router, prefix="/api/v1/employees", tags=["Employees"])
app.include_router(keys.router, prefix="/api/v1/keys", tags=["API Keys"])
app.include_router(ingest.router, prefix="/api/v1/ingest", tags=["Data Ingest"])
app.include_router(search.router, prefix="/api/v1/search", tags=["Unified Search"])
app.include_router(security.router, prefix="/api/v1/security", tags=["LogShield Security"])


@app.get("/health")
async def health():
    return {"status": "ok", "service": "lonex-workforce-hq"}
