#Requires -Version 5.1
# Create LONEX Render services via Render CLI (non-interactive)
$Render = Join-Path $env:LOCALAPPDATA "render-cli\render.exe"
if (-not (Test-Path $Render)) { throw "Render CLI not found at $Render" }

$Repo = "https://github.com/shinkang888-code/lonexeim"
$CronCmd = 'node -e "fetch(''https://lonexeim-hub.vercel.app/api/cron/sync-health'').then(r=>r.text()).then(console.log)"'

Write-Host "==> Validate render.yaml"
& $Render blueprints validate "$PSScriptRoot\..\render.yaml" -o json

Write-Host "==> Create lonex-hub-sync-health (cron)"
& $Render services create `
  --name lonex-hub-sync-health `
  --type cron_job `
  --repo $Repo `
  --branch master `
  --runtime node `
  --build-command "cd lonex-hub && npm ci" `
  --cron-schedule "*/5 * * * *" `
  --cron-command $CronCmd `
  --region singapore `
  --plan starter `
  --confirm `
  -o json

Write-Host "==> Create lonex-oss-livekit (Blueprint — image web needs Dashboard or repo Dockerfile)"
Write-Host "Open: https://dashboard.render.com/blueprint/new?repo=https://github.com/shinkang888-code/lonexeim"
Write-Host "Or use Docker locally: .\scripts\docker-oss.ps1 up -Profile core"

Write-Host "==> List lonex services"
& $Render services -o json | ConvertFrom-Json | ForEach-Object {
  $_.service | Where-Object { $_.name -like 'lonex*' } | Select-Object name, id, type, dashboardUrl
}
