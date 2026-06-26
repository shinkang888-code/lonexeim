# 특허 청구항 1~12 ↔ 코드 매핑표

> 출원: GREND/KIPO 제1발명 (통합 업무 OS + 온톨로지 AI 커널)  
> 기준 리포: `lonexeim` @ `C:\Users\FORYOUCOM\lonexeim-work`  
> 작성일: 2026-06-27

## 범례

| 상태 | 의미 |
|------|------|
| ✅ | 구현됨 (동작 검증 또는 코드 존재) |
| 🟡 | POC/부분 구현 |
| ❌ | 미구현 |
| 📦 | EIM asar 번들에만 존재 (Hub 미연동) |

---

## 청구항 1 (독립 — 시스템)

| 구성요소 | 대응 파일/경로 | 상태 | 비고 |
|----------|----------------|------|------|
| 앱 레지스트리 (식별키·표시명·분류·진입경로·권한·검색키워드) | `lonex-hub/src/lib/module-registry.ts` | 🟡 | 15모듈 등록, 권한역할·검색키워드 필드 미완 |
| OS 셸 — 부동 윈도우·도크·z-순서 | `lonex-hub/src/components/os/OsShellDesktop.tsx`, `src/store/os-store.ts` | 🟡 | POC 2앱, 리사이즈·가상화면 미구현 |
| 윈도우별 MemoryRouter 격리 | `lonex-hub/src/components/os/OsWindowRouter.tsx` | ✅ | react-router-dom MemoryRouter |
| 크로스플랫폼 렌더링부 (4환경) | Hub Next.js + `_asar_extract/main/main.js` (Electron) | 🟡 | PC브라우저·Electron만; RN WebView ❌ |
| AI 커널 — 벡터+그래프+LLM | `lonex-hub/src/app/api/ai/*`, EIM `/API/ai/*` | 🟡 | Hub=BFF(HF); EIM=풀 AI API 📦 |
| 도메인 분할 벡터 인덱스 | EIM `/API/ai/vector/*` | 📦 | Milvus 대체: pgvector 계획 |
| 지식그래프 | EIM `/API/ai/graph/*` | 📦 | Neo4j 대체: Postgres ltree 계획 |

---

## 청구항 2 (윈도우 경로 영속화·복원)

| 구성 | 파일 | 상태 |
|------|------|------|
| 윈도우 path 필드 + PathSync | `OsWindowRouter.tsx` (PathSync), `os-store.ts` (persist) | ✅ |
| 서버 영속화 (150) | — | ❌ | zustand localStorage만; Neon sync 미구현 |
| 딥라우트 복원 (`/media/editor/:id`) | `OsWindowRouter.tsx` route stub | 🟡 |

---

## 청구항 3 (z-순서 컴팩션)

| 구성 | 파일 | 상태 |
|------|------|------|
| WIN_Z_BASE=10, WIN_Z_CEIL=9000 | `os-store.ts` | ✅ |
| focusWindow 증분 + compactIfNeeded | `os-store.ts` | ✅ |
| DOCK_Z=9990 | `OsShellDesktop.tsx` | ✅ |

---

## 청구항 4 (화면별 도크)

| 구성 | 상태 | 비고 |
|------|------|------|
| 가상화면(128) N개 | ❌ | 단일 데스크톱만 |
| 화면별 독립 도크 | ❌ | |

---

## 청구항 5 (통합검색 — 초성+영문)

| 구성 | 파일 | 상태 |
|------|------|------|
| 한글 초성 분해·접두 매칭 | `lonex-hub/src/lib/os/unified-search.ts` | ✅ |
| 영문 별칭 융합 | `unified-search.ts` + registry keywords (미추가) | 🟡 |
| UnifiedSearch UI | `components/os/UnifiedSearch.tsx` | ✅ |

---

## 청구항 6 (4 실행환경 + 런타임 판별)

| 환경 | 구현 | 상태 |
|------|------|------|
| PC 브라우저 | Hub Vercel | ✅ |
| 모바일 브라우저 | Hub responsive | 🟡 |
| Electron 설치형 | `_asar_extract/main/main.js` | ✅ |
| RN WebView | — | ❌ |
| electronAPI / ReactNativeWebView 판별 | preload.js (electronAPI) | 🟡 |

---

## 청구항 7 (모바일 포털 스태킹 이탈)

| 구성 | 상태 |
|------|------|
| 모바일 홈스크린·플로팅 도크 | ❌ |
| createPortal body 부착 | ❌ |

---

## 청구항 8 (도메인 파티션 벡터)

| 구성 | EIM API | Hub | 상태 |
|------|---------|-----|------|
| 직원·계약·급여·근태·결재 파티션 | `/API/ai/vector/search`, `contentEmbedding/*` | `/api/ai/chat` BFF | 📦/🟡 |

---

## 청구항 9 (단일 에이전트 + convScope/extraContext)

| 구성 | EIM | Hub | 상태 |
|------|-----|-----|------|
| MCP 에이전트 4010 | `/API/ai/llm/*`, `/API/ai/chat/*` | `/api/ai/*` | 📦/🟡 |
| convScope / extraContext | EIM bundle | — | 📦 |

---

## 청구항 10 (관측성 + 프롬프트-as-데이터)

| 구성 | 상태 | 비고 |
|------|------|------|
| aiUsageLog 통합 | ❌ | EIM Mongo 추정 |
| 프롬프트 레지스트리 DB | ❌ | Dify 연동 예정 |

---

## 청구항 11 (독립 — 방법)

청구항 1~10의 **방법 청구** 대응. 위 표의 🟡/❌ 항목과 동일한 커버리지 갭.

| 단계 | Hub 구현 | EIM asar |
|------|----------|----------|
| 앱정의 등록 | module-registry | 내장 라우트 |
| 실행환경 감지·렌더 | Next.js SSR/CSR | Electron UA |
| 역할 필터·윈도우 실행 | OsShell POC | 풀 SPA |
| 경로 영속·복원 | zustand persist | React Router (글로벌) |
| AI 의도분류·하이브리드 검색 | BFF stub | `/API/ai/*` 풀 |

---

## 청구항 12 (기록매체)

| 구성 | 상태 |
|------|------|
| 배포 가능한 컴퓨터 프로그램 | ✅ | lonexeim Git + Electron exe |

---

## 제2~5발명 (참고 — 청구항 13+ 별도 출원)

| 발명 | EIM 대응 API/모듈 | Hub | 상태 |
|------|-------------------|-----|------|
| 제2 크레딧 계량 | (Mongo aiCredit 추정) | billing demo | ❌ |
| 제3 얼굴 출퇴근 | `/API/faceRecogination/*`, `/API/attendance/*` | — | 📦 |
| 제4 디자인 복제 | `/API/contentTemplate/*`, `contentSlide/*` | media demo | 📦 |
| 제5 멀티테넌트 | x.grend.kr 서브도omain | Neon 단일 tenant | ❌ |

---

## 우선 구현 PR 티켓 (Phase 0→1)

1. **P0-REG** — `module-registry.ts`에 `roles[]`, `searchKeywords[]` 추가  
2. **P0-OS** — `/os_dashboard` 프로덕션 링크 + Electron `LONEX_USE_HUB_SHELL=1`  
3. **P0-HQ** — HqSearchModule admin 세션 UI ✅  
4. **P0-SYNC** — workforce `/api/hq/ingest` ✅  
5. **P1-AI** — pgvector + `/api/ai/vector` BFF (Milvus 대체)  
6. **P1-EIM-BFF** — x.lonex.kr API 게이트웨이 (896 endpoints, `docs/eim-api-paths.txt`)
