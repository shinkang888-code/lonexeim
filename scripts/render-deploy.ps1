#Requires -Version 5.1
<#
.SYNOPSIS
  LONEX Render CLI 배포 — Blueprint 검증, Cron/LiveKit 서비스, Vercel env 동기화
.EXAMPLE
  .\scripts\render-deploy.ps1
  .\scripts\render-deploy.ps1 -Action deploy
  .\scripts\render-deploy.ps1 -Action sync-vercel
#>
param(
    [ValidateSet("all", "validate", "deploy", "create", "status", "sync-vercel")]
    [string]$Action = "all",
    [switch]$SkipVercel
)

$ErrorActionPreference = "Stop"
$Root = Split-Path $PSScriptRoot -Parent
$RenderYaml = Join-Path $Root "render.yaml"
$Render = Join-Path $env:LOCALAPPDATA "render-cli\render.exe"
$SyncVercelScript = Join-Path $PSScriptRoot "sync-vercel-render-env.mjs"
$Repo = "https://github.com/shinkang888-code/lonexeim"

$CronId = "crn-d8vg88cm0tmc73cq5300"
$CronName = "lonex-hub-sync-health"
$LiveKitName = "lonex-oss-livekit"
$LiveKitId = "srv-d902mgurnols73e9sdug"

function Get-RenderApiKey {
    $cfg = Join-Path $env:USERPROFILE ".render\cli.yaml"
    if (-not (Test-Path $cfg)) { return $null }
    $line = Get-Content $cfg | Where-Object { $_ -match '^\s*key:\s*' } | Select-Object -First 1
    if ($line -match 'key:\s*(.+)') { return $Matches[1].Trim() }
    return $null
}

function Set-LiveKitDockerCommand {
    $apiKey = Get-RenderApiKey
    if (-not $apiKey) {
        Write-Warning "Render API key not found (~/.render/cli.yaml) — skip LiveKit dockerCommand"
        return
    }
    $body = @{
        envVars = @(
            @{ key = "LIVEKIT_CONFIG"; value = "port: 10000" }
        )
        serviceDetails = @{
            envSpecificDetails = @{
                dockerCommand = "/livekit-server --dev --bind 0.0.0.0"
            }
        }
    } | ConvertTo-Json -Depth 6 -Compress
    $tmp = Join-Path $env:TEMP "render-livekit-patch.json"
    Set-Content -Path $tmp -Value $body -Encoding UTF8
    curl.exe -s -X PATCH "https://api.render.com/v1/services/$LiveKitId" `
        -H "Authorization: Bearer $apiKey" `
        -H "Content-Type: application/json" `
        -H "Accept: application/json" `
        -d "@$tmp" | Out-Null
    Remove-Item $tmp -Force -ErrorAction SilentlyContinue
    Write-Host "LiveKit dockerCommand set (/livekit-server --dev --bind 0.0.0.0 + LIVEKIT_CONFIG port:10000)"
}

function Write-Step([string]$Text) { Write-Host "`n==> $Text" -ForegroundColor Cyan }

function Invoke-Render([string[]]$Args) {
    if (-not (Test-Path $Render)) {
        throw "Render CLI not found. Install: https://github.com/render-oss/cli/releases"
    }
    & $Render @Args
    if ($LASTEXITCODE -ne 0) { throw "render $($Args -join ' ') failed ($LASTEXITCODE)" }
}

function Get-LonexServices {
    $json = & $Render services -o json
    ($json | ConvertFrom-Json) | ForEach-Object { $_.service } | Where-Object { $_.name -like "lonex*" }
}

function Invoke-Validate {
    Write-Step "Render — validate render.yaml"
    Invoke-Render @("blueprints", "validate", $RenderYaml, "-o", "json")
    Write-Host "Blueprint OK. Dashboard apply:"
    Write-Host "  https://dashboard.render.com/blueprint/new?repo=$Repo"
}

function Invoke-CreateMissing {
    Write-Step "Render — create missing lonex services"
    $existing = Get-LonexServices | Select-Object -ExpandProperty name

    if ($existing -notcontains $CronName) {
        Write-Host "Creating $CronName (cron)..."
        $CronCmd = 'node -e "fetch(''https://lonexeim-hub.vercel.app/api/cron/sync-health'').then(r=>r.text()).then(console.log)"'
        Invoke-Render @(
            "services", "create",
            "--name", $CronName,
            "--type", "cron_job",
            "--repo", $Repo,
            "--branch", "master",
            "--runtime", "node",
            "--build-command", "cd lonex-hub && npm ci",
            "--cron-schedule", "*/5 * * * *",
            "--cron-command", $CronCmd,
            "--region", "singapore",
            "--plan", "starter",
            "--confirm",
            "-o", "json"
        )
    } else {
        Write-Host "$CronName already exists"
    }

    if ($existing -notcontains $LiveKitName) {
        Write-Host "Creating $LiveKitName (image web)..."
        Invoke-Render @(
            "services", "create",
            "--name", $LiveKitName,
            "--type", "web_service",
            "--image", "docker.io/livekit/livekit-server:latest",
            "--runtime", "image",
            "--health-check-path", "/",
            "--region", "singapore",
            "--plan", "free",
            "--confirm",
            "-o", "json"
        )
        Write-Host "Set dockerCommand in Dashboard: --dev --bind 0.0.0.0:`$PORT (Blueprint render.yaml)"
    } else {
        Write-Host "$LiveKitName already exists — ensuring dockerCommand..."
        Set-LiveKitDockerCommand
    }
}

function Invoke-Deploy {
    Write-Step "Render — trigger deploys"
    $services = Get-LonexServices
    foreach ($svc in $services) {
        Write-Host "Deploy $($svc.name) ($($svc.id))..."
        Invoke-Render @("deploys", "create", $svc.id, "--wait", "--confirm", "-o", "json")
    }
}

function Show-Status {
    Write-Step "Render — lonex services"
    Get-LonexServices | ForEach-Object {
        $url = $_.serviceDetails.url
        if (-not $url) { $url = $_.dashboardUrl }
        [PSCustomObject]@{
            Name = $_.name
            Id   = $_.id
            Type = $_.type
            Url  = $url
        }
    } | Format-Table -AutoSize
}

function Invoke-SyncVercel {
    if ($SkipVercel) { return }
    Write-Step "Vercel — sync Render OSS URLs"
    if (-not (Test-Path $SyncVercelScript)) {
        Write-Warning "sync-vercel-render-env.mjs not found — skip"
        return
    }
    node $SyncVercelScript --deploy
}

switch ($Action) {
    "validate"    { Invoke-Validate }
    "create"      { Invoke-CreateMissing }
    "deploy"      { Invoke-Deploy }
    "status"      { Show-Status }
    "sync-vercel" { Invoke-SyncVercel }
    "all" {
        Invoke-Validate
        Invoke-CreateMissing
        Invoke-Deploy
        Show-Status
        Invoke-SyncVercel
        Write-Step "Done"
        Write-Host "Hub (Vercel): https://lonexeim-hub.vercel.app"
        Write-Host "Render Dashboard: https://dashboard.render.com"
    }
}
