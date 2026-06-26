# LONEX EIM

**Enterprise Information Management (기업정보관리)** — Lonex.inc 통합 기업 플랫폼 (Beta)

## 제품 구성

| 제품 | 역할 |
|------|------|
| **LONEX EIM** | 직원용 데스크톱 클라이언트 (문서·결재·정보·콘텐츠 통합) |
| **Lonex ERP** | 전사 자원관리 (경영·인사·회계) |
| **Lonex Hub** | 모듈형 웹 허브 (Next.js / Vercel) |
| **Lonex Workforce** | 데스크톱 동기화 에이전트 + HQ 서버 |
| **Media (콘텐츠 제작)** | Hub 하위 모듈 — 워크플로·촬영·편집 |

## Hub 개발

```powershell
cd lonex-hub
npm install
cp .env.example .env.local
npm run db:migrate
npm run dev
```

## 아이콘 재생성

```powershell
python scripts/generate-lonex-icons.py
```

## 라이선스

LONEX PROPRIETARY SOFTWARE LICENSE (Beta) — Copyright (c) 2026 Lonex.inc
