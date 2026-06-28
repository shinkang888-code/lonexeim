#Requires -Version 5.1
<#
.SYNOPSIS
  Docker OSS → Cloudflare Tunnel → Vercel env → production deploy
.EXAMPLE
  .\scripts\docker-vercel.ps1                    # full pipeline
  .\scripts\docker-vercel.ps1 -Action tunnel     # tunnels only
  .\scripts\docker-vercel.ps1 -Action sync       # Vercel env sync + deploy
  .\scripts\docker-vercel.ps1 -Action up         # Docker OSS only
#>
param(
    [ValidateSet("all", "up", "tunnel", "sync", "stop")]
    [string]$Action = "all",
    [switch]$SkipDeploy,
    [switch]$SkipDockerUp
)

$ErrorActionPreference = "Stop"
$Root = Split-Path $PSScriptRoot -Parent
$DockerScript = Join-Path $PSScriptRoot "docker-oss.ps1"
$TunnelScript = Join-Path $PSScriptRoot "oss-tunnel.mjs"
$SyncVercelScript = Join-Path $PSScriptRoot "sync-vercel-oss-env.mjs"
$SyncLocalScript = Join-Path $PSScriptRoot "sync-docker-env.mjs"

function Write-Step([string]$Text) { Write-Host "`n==> $Text" -ForegroundColor Cyan }

function Invoke-DockerUp {
    if ($SkipDockerUp) { return }
    Write-Step "Docker — OSS stack (all profiles)"
    & $DockerScript -Action up -Profile all -Wait -SyncEnv
}

function Invoke-Tunnels {
    Write-Step "Docker — cloudflared HTTPS tunnels"
    Write-Host "Requires OSS containers running on localhost ports."
    node $TunnelScript start
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    node $SyncLocalScript
}

function Invoke-VercelSync {
    Write-Step "Vercel — sync OSS tunnel URLs"
    $args = @()
    if (-not $SkipDeploy) { $args += "--deploy" }
    node $SyncVercelScript @args
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}

function Invoke-Stop {
    Write-Step "Stop cloudflared tunnel containers"
    node $TunnelScript stop
}

switch ($Action) {
    "up"       { Invoke-DockerUp }
    "tunnel"   { Invoke-Tunnels }
    "sync"     { Invoke-VercelSync }
    "stop"     { Invoke-Stop }
    "all" {
        Invoke-DockerUp
        Invoke-Tunnels
        Invoke-VercelSync
        Write-Step "Complete"
        Write-Host "Hub: https://lonexeim-hub.vercel.app"
        Write-Host "Tunnels: node scripts/oss-tunnel.mjs status"
        Write-Host "Note: trycloudflare URLs change when tunnels restart. Re-run docker-vercel.ps1 to refresh Vercel env."
    }
}
