# OSS 연동 기획설계 — lonexeim Hub + EIM

> Phase 0 완료 → Phase 1~3 점진 구현  
> 작성일: 2026-06-27

## 1. 아키텍처 목표

```
┌─────────────────────────────────────────────────────────────┐
│  Client Layer                                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Hub (Next.js)│  │ OS Shell POC │  │ EIM Electron     │   │
│  │ Vercel       │  │ /os_dashboard│  │ asar SPA + proxy │   │
│  └──────┬───────┘  └──────┬───────┘  └────────┬─────────┘   │
└─────────┼─────────────────┼───────────────────┼─────────────┘
          │                 │                   │
          ▼                 ▼                   ▼
┌─────────────────────────────────────────────────────────────┐
│  BFF Layer (lonex-hub/src/app/api/*)                         │
│  /api/hq/*  /api/ai/*  /api/media/*  /api/{module}/*         │
└─────────┬───────────────────────────────────────────────────┘
          │
    ┌─────┴─────┬─────────────┬──────────────┐
    ▼           ▼             ▼              ▼
 Neon PG    OSS Docker    HF Inference   x.grend.kr
 (HQ/AI)    (profiles)    (BFF proxy)    (EIM API legacy)
```

**원칙**
1. Hub는 **단일 진입점(BFF)** — OSS는 docker profile 또는 SaaS embed
2. EIM asar API(896 paths)는 **점진적 Neon BFF 재구현** (x.lonex.kr 소스 없음)
3. Milvus+Neo4j+Mongo → **Phase 2 초기 pgvector + Postgres JSONB/ltree**

---

## 2. 모듈별 연동 패턴

| 패턴 | 모듈 | 구현 |
|------|------|------|
| **component** | workforce, logshield, hq-search | Hub React + Neon API ✅ |
| **embed** | ai-assistant, chat, support | OSS Widget + env URL |
| **iframe** | mail, web-drive, notes, billing | OAuth SSO + CSP frame-src |
| **api** | media, borderless, bidding | Hub route → OSS REST / HF |

---

## 3. Phase별 로드맵

### Phase 0 (완료) — 즉시 착수
- [x] workforce sync → `/api/hq/ingest`, `/api/hq/security`
- [x] admin route httpOnly 세션 + HqSearchModule 로그인 UI
- [x] OS Shell POC (`/os_dashboard`, MemoryRouter, z-compaction, 초성검색)
- [x] EIM main.js `/eim` + `LONEX_USE_HUB_SHELL=1` → Hub OS
- [x] 특허 매핑표, OSS 카탈로그, API 역추출 (896 paths)
- [x] module-registry: ai-assistant, media, logshield, hq-search, workforce → `demo: false`

### Phase 1 (2~4주) — OSS Docker 프로필
1. `scripts/docker-compose.oss.yml` — 모듈별 profile ✅
2. `scripts/docker-oss.ps1` — Docker CLI 래퍼 (Desktop 자동 기동, `-SyncEnv`) ✅
3. `scripts/sync-docker-env.mjs` — `docker-oss.env` → `lonex-hub/.env.local` ✅
4. Hub env: `NEXT_PUBLIC_*` (로컬 `.env.local` / Vercel Preview)
5. 각 Module.tsx: demo stub → iframe/embed URL 로드
6. Neon migration: `hq_*` 테이블 프로덕션 검증

### Phase 2 (1~2개월) — AI 커널 경량화
1. pgvector extension on Neon
2. `/api/ai/vector/search` — EIM `/API/ai/vector/search` 호환 subset
3. Dify 또는 자체 RAG BFF
4. aiUsageLog 테이블 (청구항 10)

### Phase 3 — EIM SPA 소스 복구·통합
1. 개발자 PC / Google Drive / CI artifact 검색
2. x.grend.kr Docker compose 역조사 (SSH)
3. Hub OS Shell이 EIM 모듈을 MemoryRouter 윈도우로 embed
4. `/cdms` → `/eim` / `/m/media` 라우트 일관성

---

## 4. 파일 구조 (신규/확장)

```
lonexeim-work/
├── docs/
│   ├── patent-claims-mapping.md
│   ├── module-oss-catalog.txt
│   ├── oss-integration-plan.md      ← 본 문서
│   ├── demo-flag-removal-plan.md
│   ├── eim-api-spec.md
│   └── eim-api-paths.txt            ← 896 endpoints
├── lonex-hub/
│   ├── src/app/api/hq/*             ← Neon BFF ✅
│   ├── src/app/api/ai/*             ← HF BFF 🟡
│   ├── src/app/os_dashboard/        ← OS Shell ✅
│   └── src/lib/module-registry.ts
├── scripts/
│   ├── docker-compose.oss.yml       ← Phase 1
│   └── copy-vercel-env.mjs
└── _asar_extract/main/main.js       ← Electron ✅
```

---

## 5. 환경 변수 매트릭스

| 변수 | 용도 | 설정 위치 |
|------|------|-----------|
| DATABASE_URL | Neon HQ | Vercel ✅ |
| LONEX_HQ_ADMIN_SECRET | admin 세션 | Vercel ✅ |
| HF_TOKEN | AI BFF | Vercel ✅ |
| LONEX_USE_HUB_SHELL | Electron → Hub OS | desktop env |
| LONEX_HUB_OS_URL | OS Shell URL | desktop env |
| DIFY_API_URL | ai-assistant | Phase 1 |
| LIVEKIT_URL/KEY | video-chat | Phase 1 |

---

## 6. 검증 체크리스트

```bash
# Hub 빌드
cd lonex-hub && npm run build

# OSS Docker (로컬)
.\scripts\docker-oss.ps1 up -Profile core -Wait -SyncEnv
.\scripts\docker-oss.ps1 up -Profile chat          # Rocket.Chat
node scripts/sync-docker-env.mjs                   # Hub .env.local 병합
```

# HQ ingest (API key 필요)
curl -X POST https://lonexeim-hub.vercel.app/api/hq/ingest \
  -H "X-Lonex-Api-Key: ..." -H "Content-Type: application/json" \
  -d '{"endpoint_id":"test","items":[]}'

# Admin stats (세션 또는 X-Admin-Secret)
curl https://lonexeim-hub.vercel.app/api/hq/admin/stats \
  -H "X-Admin-Secret: $LONEX_HQ_ADMIN_SECRET"

# OS Shell
open https://lonexeim-hub.vercel.app/os_dashboard
```

---

## 7. 리스크 대응

| 리스크 | 대응 |
|--------|------|
| x.lonex.kr 소스 없음 | eim-api-paths.txt 기반 BFF subset |
| x.lonex.kr DNS down | x.grend.kr 프록시 + dx.lonex.kr dev |
| Milvus/Neo4j 비용 | pgvector + ltree Phase 2 |
| asar only | decompile + Hub OS로 점진 대체 |
| GREND 잔재 | path-alias.js, `/eim`, `/m/media` |
