# EIM API 역추출 스펙 (x.lonex.kr / x.grend.kr)

> 소스: `_asar_extract/main/app/assets/*.js` (LONEX EIM asar 번들)  
> 추출일: 2026-06-27  
> 전체 목록: `docs/eim-api-paths.txt` (896 unique paths)

## 서버 상태

| 호스트 | HTTPS | 비고 |
|--------|-------|------|
| x.grend.kr | 200 OK | GREND ERP 운영 (레거시) |
| x.lonex.kr | DNS 실패 | 2026-06-27 조사 시점 |
| dx.lonex.kr | (dev) | Electron dev API_HOST |

Electron 프록시: `_asar_extract/main/main.js` → `https://${API_HOST}/API/*`

---

## 도메인별 API 그룹 (상위 prefix)

| Prefix | 대략적 기능 | Hub 대응 |
|--------|-------------|----------|
| `/API/member/*` | 로그인·세션 | ❌ 미구현 |
| `/API/ai/*` | 벡터·그래프·LLM·채팅 | `/api/ai/*` BFF subset |
| `/API/approval/*` | 전자결재 | EIM only |
| `/API/attendance/*` | 근태 | EIM only |
| `/API/faceRecogination/*` | 얼굴 출퇴근 (제3발명) | ❌ |
| `/API/contentProject/*` | 콘텐츠 프로젝트 | media module |
| `/API/contentSlide/*` | 슬라이드 편집 | media module |
| `/API/contentTemplate/*` | 디자인 템플릿 (제4발명) | ❌ |
| `/API/cutEditor/*` | 컷편집 | media/borderless |
| `/API/chat/*` | 내부 채팅 | chat module |
| `/API/webDrive/*` | 웹드라이브 | web-drive module |
| `/API/pm*` | 프로젝트관리 | ❌ |
| `/API/hr*` / salary* | 인사·급여 | ❌ |

---

## 인증 API (우선 재구현)

```
POST /API/member/login
GET  /API/member/session-check
GET  /API/member/home-session-check
POST /API/member/logout
POST /API/member/savePassword
```

---

## AI 커널 API (청구항 8~10)

```
GET  /API/ai/vector/status
POST /API/ai/vector/search
POST /API/ai/vector/bulk-embed
GET  /API/ai/graph/schema
POST /API/ai/graph/query
POST /API/ai/graph/sync
POST /API/ai/llm/chat
GET  /API/ai/llm/flows
POST /API/ai/chat/send
GET  /API/ai/chat/conversations
POST /API/ai/contentEmbedding/search
```

Phase 2 BFF: 위 subset을 Neon pgvector + HF로 대체 구현.

---

## HQ / Workforce (Hub 이미 구현)

EIM bundle에는 HQ ingest가 **없음** — 별도 lonex-workforce sync.

Hub BFF:
```
POST /api/hq/ingest      ← sync-client.js ✅
POST /api/hq/security    ← LogShield ✅
GET  /api/hq/admin/search
GET  /api/hq/admin/stats
```

---

## 재구현 우선순위

1. **P0** — member/session (EIM 로그인 without x.lonex.kr)
2. **P1** — ai/vector/search, ai/llm/chat (Hub BFF 확장)
3. **P2** — contentProject/contentSlide (media 연동)
4. **P3** — approval, attendance, hr* (EIM SPA 의존)

---

## 추출 명령 (재현)

```powershell
$apis = @()
Get-ChildItem "_asar_extract\main\app\assets\*.js" | ForEach-Object {
  Select-String -Path $_.FullName -Pattern '"/API/[^"]+"' -AllMatches |
    ForEach-Object { $_.Matches | ForEach-Object { $apis += $_.Value.Trim('"') } }
}
$apis | Sort-Object -Unique | Set-Content docs/eim-api-paths.txt -Encoding utf8
```
