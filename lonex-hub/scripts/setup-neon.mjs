#!/usr/bin/env node
/**
 * Neon DB 초기 설정 (1회 실행)
 *
 * 1. npx neonctl auth login
 * 2. npx neonctl projects create --name lonex-hub
 * 3. npx neonctl connection-string --project-name lonex-hub
 * 4. vercel env add DATABASE_URL production  (connection string 붙여넣기)
 * 5. vercel env add LONEX_HQ_ADMIN_SECRET production
 * 6. vercel env add LONEX_HQ_KEY_PEPPER production
 * 7. vercel env add HF_TOKEN production  (HuggingFace Inference API)
 * 8. DATABASE_URL=... npm run db:migrate && npm run db:seed
 */
console.log(`
=== Lonex Hub Neon Setup ===

1) Neon CLI 로그인:
   npx neonctl auth login

2) 프로젝트 생성:
   npx neonctl projects create --name lonex-hub

3) 연결 문자열:
   npx neonctl connection-string --project-name lonex-hub

4) Vercel 환경변수 (lonex-hub 프로젝트):
   vercel env add DATABASE_URL production
   vercel env add LONEX_HQ_ADMIN_SECRET production
   vercel env add LONEX_HQ_KEY_PEPPER production
   vercel env add HF_TOKEN production

5) 마이그레이션 + 시드:
   set DATABASE_URL=postgresql://...
   npm run db:migrate
   npm run db:seed

6) 재배포:
   vercel deploy --prod

Production URL: https://lonex-hub.vercel.app
GitHub: https://github.com/shinkang888-code/lonex-hub
`);
