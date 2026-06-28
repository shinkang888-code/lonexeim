# EIM TSX 원본 복구 · x.lonex.kr 접근 체크리스트

> 갱신: 2026-06-28

## 현재 상태

| 항목 | 상태 | 비고 |
|------|------|------|
| EIM asar 번들 | ✅ | `_asar_extract/main/` |
| EIM TSX/React 원본 | ❌ | `.tsx` 파일 리포 내 0건 |
| x.grend.kr HTTPS | ✅ | 200 (2026-06-28) |
| x.lonex.kr DNS | ❌ | NXDOMAIN (2026-06-28 재확인) |
| x.lonex.kr SSH | ❌ | DNS 선행 필요 |
| x.grend.kr (레거시) | ✅ | 180.71.194.246 — `scripts/eim-server-probe.mjs` |
| Hub BFF approval/attendance/HR | 🟡 | Phase 3 live handlers (`src/lib/eim/domains/*`) |
| EIM API 역추출 | ✅ | 896 paths → `docs/eim-api-paths.txt` |

## TSX 원본 검색 경로 (수동)

1. **개발자 PC** — `LONEX EIM.exe` 설치 디렉터리, `%APPDATA%/lonex`, Electron userData
2. **Google Drive** — `G:\내 드라이ve\`, `로이고개발일지`, EIM/ERP 백업 폴더
3. **GitHub** — `shinkang888-code` org 내 `eim`, `lonex-eim`, `grend` 리포
4. **CI artifact** — GitHub Actions / Jenkins 빌드 산출물 (source map)
5. **asar extract 심화** — `_asar_extract/main/app/assets/*.js`에서 sourceMappingURL 추적

```powershell
# 자동 스캔
.\scripts\eim-tsx-recovery-scan.ps1

# asar 내 React 컴포넌트 흔적 검색
rg "createElement|jsx|\.tsx" _asar_extract/main/app --glob "*.js" -l | Select-Object -First 20
```

## x.lonex.kr SSH (DNS 복구 후)

```powershell
# DNS 확인
Resolve-DnsName x.lonex.kr

# SSH (키·호스트는 인프라 담당자 입력)
ssh user@x.lonex.kr
# Docker compose
docker ps
docker compose -f /path/to/compose.yml config
```

**복구 시 수집할 것:** Mongo connection string, Milvus/Neo4j, `/API/*` nginx 라우트, EIM SPA 배포 경로

## Hub 대체 전략 (소스 없을 때)

1. `/api/eim/[...path]` 게이트웨이 — 896 paths 중 exact 13 + **category stub** (approval, attendance, hr …)
2. Neon BFF 점진 재구현 — `docs/eim-api-spec.md` 우선순위
3. OS Shell MemoryRouter — EIM iframe 대신 Hub `/m/*` 모듈

## 프로덕션 DB 마이그레이션

Vercel에 `DATABASE_URL` 설정된 상태에서:

```powershell
curl -X POST https://lonexeim-hub.vercel.app/api/admin/migrate-phase2 `
  -H "X-Admin-Secret: $env:LONEX_HQ_ADMIN_SECRET"
```

또는 Neon SQL Editor에서 `lonex-hub/scripts/migrate-phase2.mjs` SQL 실행.
