# Phase 2~3 진행 현황 — 특허/제품 범위

> 갱신: 2026-06-28  
> 기준: `docs/patent-claims-mapping.md`, `docs/oss-integration-plan.md`

## 요약

| 영역 | 이전 | 현재 | 비고 |
|------|------|------|------|
| **크레딧 계량 (제2발명)** | ❌ | 🟡 POC | `ai_usage_log`, `ai_credit_balances`, `/api/billing/*` |
| **멀티테넌트 (제5발명)** | ❌ | 🟡 POC | `hub_tenants`, `X-Tenant-Slug`, Host 서브도메인 |
| **aiUsageLog (청구항 10)** | ❌ | 🟡 | `/api/billing/usage`, chat 연동 |
| **프롬프트 레지스트리 (청10)** | ❌ | 🟡 | `ai_prompt_registry`, `/api/ai/prompts` |
| **EIM 896 API 대체** | 📦 | 🟡 | `/api/eim/[...path]` 게이트웨이 **12 paths** 매핑 |
| **pgvector AI 커널** | 🟡 | 🟡 | `migrate-vector.sql` + FTS fallback |

---

## Phase 2 — 구현됨 (이번 작업)

### DB (`npm run db:migrate:phase2`)

- `hub_tenants` — 테넌트 레지스트리
- `hub_employees.tenant_id`, `hub_api_keys.tenant_id`
- `ai_usage_log` — AI 호출 감사·계량
- `ai_credit_balances` — 테넌트/직원 크레딧 (default 10,000)
- `ai_prompt_registry` — 프롬프트-as-데이터

### API

| 경로 | 기능 |
|------|------|
| `GET/POST /api/billing/credits` | 잔액 조회 / admin 충전 |
| `GET /api/billing/usage` | aiUsageLog 조회 |
| `GET /api/ai/prompts` | 프롬프트 레지스트리 |
| `*/api/eim/[...path]` | EIM → Hub BFF 게이트웨이 |
| `POST /api/ai/chat` | 크레딧 차감 + usage 로깅 |

### EIM 게이트웨이 매핑 (12 / 896)

```
ai/vector/search, ai/vector/status, ai/llm/chat, ai/chat/send
ai/models, ai/status, ai/tools, ai/contentembedding/search
hq/ingest, hq/search, hq/stats
member/session-check, member/home-session-check (stub)
```

미매핑 경로 → `501` + `{ migrated: 12, total: 896 }`

### 멀티테넌트 해석 순서

1. `X-Tenant-Id`
2. `X-Tenant-Slug`
3. Host `{slug}.lonexeim-hub.vercel.app`
4. fallback `default`

---

## Phase 2 — 미완

- [ ] Neon 프로덕션에 `db:migrate:phase2` 실행
- [ ] pgvector 실제 cosine search (현재 ILIKE + FTS)
- [ ] Dify RAG BFF 연동
- [ ] 크레딧 UI (billing 모듈 → `/api/billing/credits` 연동)
- [ ] 테넌트별 Vercel env / Neon schema 분리 (현재 단일 DB)

---

## Phase 3 — 미진행

- [ ] EIM TSX 원본 복구
- [ ] x.lonex.kr SSH / Docker compose
- [ ] EIM API P0 member/login (비밀번호 인증)
- [ ] approval, attendance, hr*, contentProject (800+ paths)
- [ ] 얼굴 출퇴근 (제3발명), 디자인 복제 (제4발명)
- [ ] RN WebView, 모바일 포털 (청구항 6~7)

---

## 검증

```bash
cd lonex-hub
npm run db:migrate
npm run db:migrate:phase2   # DATABASE_URL 필요
npm run build

# EIM 게이트웨이
curl -X POST https://lonexeim-hub.vercel.app/api/eim/ai/vector/search \
  -H "Content-Type: application/json" \
  -d '{"query":"test"}'

# 크레딧
curl https://lonexeim-hub.vercel.app/api/billing/credits \
  -H "X-Tenant-Slug: default"
```

---

## 특허 매핑 갱신 (핵심)

| 청구항 | 변경 |
|--------|------|
| 제2 크레딧 계량 | ❌ → 🟡 |
| 제5 멀티테넌트 | ❌ → 🟡 |
| 청10 aiUsageLog | ❌ → 🟡 |
| 청10 프롬프트 레지스트리 | ❌ → 🟡 |
| P1-EIM-BFF | ❌ → 🟡 (12/896) |
