# 데모 플래그 제거 계획 — module-registry `demo` 필드

> 작성일: 2026-06-27  
> 기준: `lonex-hub/src/lib/module-registry.ts`

## 분류 기준

| demo | integration | 의미 |
|------|-------------|------|
| `false` | component/api | Hub BFF 또는 실 UI 연동 완료 |
| `true` | embed/iframe | OSS URL 미설정 — placeholder UI |
| `true` | demo | 순수 목업, 백엔드 없음 |

---

## 현재 상태 (Phase 0 적용 후)

| moduleId | demo | integration | 실구현 vs embed vs stub |
|----------|------|-------------|-------------------------|
| **ai-assistant** | false | embed | 🟡 BFF `/api/ai/*` (HF) — Dify embed URL Phase 1 |
| chat | true | embed | stub — Rocket.Chat Phase 1 |
| mail | true | iframe | stub — Roundcube Phase 1 |
| calendar | true | component | stub — Cal.com embed Phase 1 |
| **media** | false | api | 🟡 MediaModule + `/api/media/pipeline` — MediaCMS Phase 1 |
| borderless | true | api | stub — pyvideotrans worker Phase 1 |
| video-chat | true | component | stub — LiveKit Phase 1 |
| bidding | true | api | stub — data.go.kr BFF Phase 1 |
| **logshield** | false | component | 🟡 LogShieldModule + security ingest ✅ |
| **hq-search** | false | api | ✅ Neon search/stats + admin auth |
| web-drive | true | iframe | stub — Nextcloud Phase 1 |
| notes | true | iframe | stub — Outline Phase 1 |
| support | true | embed | stub — Chatwoot Phase 1 |
| billing | true | iframe | stub — Akaunting Phase 1 |
| **workforce** | false | component | ✅ WorkforceModule + sync-client |

---

## Phase 1 전환 조건 (demo → false)

각 모듈은 아래 **모두** 충족 시 `demo: false`:

1. Vercel env에 OSS base URL 설정
2. Module.tsx가 stub 대신 embed/iframe/api 호출
3. `npm run build` 통과 + 수동 smoke test
4. (선택) docker-compose profile 기동 확인

---

## UI 표시

- `ModuleChrome` / `OssBadge`: `demo: true` → "Demo" 배지
- HubLauncher: demo 모듈도 실행 가능 (placeholder 안내)
- OS Shell POC: `demo: false` 모듈 우선 런처 확장 (Phase 1)

---

## EIM asar (별도 트랙)

EIM Electron SPA는 Hub registry와 **독립**. asar 내부는 대부분 **실구현** (x.lonex.kr API).
Hub `demo` 플래그와 무관하게 EIM은 `/eim` 로컬 번들 + API 프록시.

| EIM 영역 | 상태 |
|----------|------|
| HR·결재·근태·급여 | 📦 asar + API |
| contentProject/cutEditor | 📦 asar (media) |
| /API/ai/* | 📦 asar |
| Hub 연동 | Phase 3 OS Shell embed |

---

## 액션 아이템

- [ ] Phase 1: chat, mail, calendar → docker profile + env
- [ ] Phase 1: borderless, video-chat, bidding BFF
- [ ] Phase 2: ai-assistant Dify self-host
- [ ] registry에 `roles[]`, `searchKeywords[]` 추가 (청구항 1)
