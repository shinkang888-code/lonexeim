# Phase 0 즉시 착수 체크리스트 — 완료 현황

> 작성일: 2026-06-27 | 작업 디렉터리: `C:\Users\FORYOUCOM\lonexeim-work`

## 이번 주 (필수)

| # | 항목 | 상태 | 결과 |
|---|------|------|------|
| 1 | x.lonex.kr / x.grend.kr 서버 접근 | 🟡 | x.grend.kr HTTPS 200; x.lonex.kr DNS 미해석; SSH/Docker compose는 접근 권한 필요 |
| 2 | EIM SPA Git 원본 검색 | 🟡 | asar extract `_asar_extract/main` 존재; TSX 원본 미발견 — G드라이브/CI 추가 검색 필요 |
| 3 | 특허 도면 ↔ 코드 매핑표 | ✅ | `docs/patent-claims-mapping.md` |
| 4 | Workforce sync-client flush URL | ✅ | `/api/hq/ingest`, `/api/hq/security` |
| 5 | 데모 플래그 제거 계획 | ✅ | `docs/demo-flag-removal-plan.md` + registry 5모듈 `demo:false` |

## 2~4주

| # | 항목 | 상태 | 결과 |
|---|------|------|------|
| 6 | OS Shell POC | ✅ | `/os_dashboard`, MemoryRouter, z-compaction, 초성검색, `npm run build` OK |
| 7 | Neon 프로덕션 + admin route 인증 | ✅ | admin-session + HqSearchModule 로그인 UI |
| 8 | EIM Electron → Hub OS Shell | ✅ | `LONEX_USE_HUB_SHELL=1`, `LONEX_HUB_OS_URL`, `/eim` entry |

## 추가 (OSS·설계)

| # | 항목 | 상태 | 파일 |
|---|------|------|------|
| 9 | 모듈별 OSS 리스트 | ✅ | `docs/module-oss-catalog.txt` |
| 10 | OSS 연동 기획설계 | ✅ | `docs/oss-integration-plan.md` |
| 11 | EIM API 역추출 | ✅ | 896 paths → `docs/eim-api-paths.txt`, `eim-api-spec.md` |

## 검증

```bash
cd lonex-hub && npm run build          # ✅ 2026-06-27
# Vercel deploy — 커밋/푸시 후 vercel deploy --prod
```

## 미완 / 사용자 입력 필요

- [ ] x.lonex.kr SSH, Docker compose, Mongo/Milvus/Neo4j connection string
- [ ] 개발자 PC / Google Drive / CI artifact 경로 (EIM TSX 원본)
- [ ] x.lonex.kr DNS 또는 API_HOST 프로덕션 전환

## Electron Hub OS Shell 실행

```powershell
# 1) OSS 백엔드 (Docker CLI)
.\scripts\docker-oss.ps1 up -Profile core -Wait -SyncEnv

# 2) Hub 로컬 dev
cd lonex-hub && npm run dev

# 3) Electron OS Shell
$env:LONEX_USE_HUB_SHELL="1"
$env:LONEX_HUB_OS_URL="https://lonexeim-hub.vercel.app/os_dashboard"
# lonex-eim-desktop/dist 또는 LONEX EIM.exe
```

## Phase 1 (진행)

| # | 항목 | 상태 |
|---|------|------|
| 12 | module-meta roles/searchKeywords | ✅ |
| 13 | OS Shell 실모듈 iframe | ✅ |
| 14 | /api/ai/vector/search BFF | ✅ |
| 15 | migrate-vector.sql | ✅ |
| 16 | Vercel 배포 | ✅ b2cbeae 이후 Phase1 커밋 예정 |
| 17 | OSS Docker CLI (`docker-oss.ps1`) | ✅ core profile 기동 + sync-docker-env |

## 미완 (외부 의존)

- [ ] x.lonex.kr SSH / Docker / DB connection string
- [ ] EIM TSX 원본 복구
- [x] OSS docker profile 실기동 — `.\scripts\docker-oss.ps1 up -Profile core -Wait -SyncEnv`
