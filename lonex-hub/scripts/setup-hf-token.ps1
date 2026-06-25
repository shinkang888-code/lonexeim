# HuggingFace Token → Vercel production
# https://huggingface.co/settings/tokens 에서 Inference 권한 토큰 발급

param(
  [Parameter(Mandatory = $true)]
  [string]$Token
)

Write-Host "Adding HF_TOKEN to Vercel lonex-hub (production)..." -ForegroundColor Cyan
$Token | vercel env add HF_TOKEN production --scope shinkang888-codes-projects --force
Write-Host "Redeploying..." -ForegroundColor Cyan
vercel deploy --prod --scope shinkang888-codes-projects --yes
Write-Host "Done. Test: https://lonex-hub.vercel.app/api/ai/status" -ForegroundColor Green
