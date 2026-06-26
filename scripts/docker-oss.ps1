#Requires -Version 5.1
<#
.SYNOPSIS
  LONEX OSS Docker stack — start/stop/status via Docker CLI
.EXAMPLE
  .\scripts\docker-oss.ps1 up -Profile core -Wait -SyncEnv
  .\scripts\docker-oss.ps1 up -Profile chat,support
  .\scripts\docker-oss.ps1 sync-env
  .\scripts\docker-oss.ps1 status
  .\scripts\docker-oss.ps1 down
#>
param(
    [ValidateSet("up", "down", "status", "logs", "pull", "sync-env")]
    [string]$Action = "status",
    [string]$Profile = "core",
    [switch]$Wait,
    [switch]$SyncEnv
)

$Root = Split-Path $PSScriptRoot -Parent
$Compose = Join-Path $PSScriptRoot "docker-compose.oss.yml"
$EnvFile = Join-Path $PSScriptRoot "docker-oss.env"
$SyncScript = Join-Path $PSScriptRoot "sync-docker-env.mjs"

function Test-DockerDaemon {
    docker info 2>$null | Out-Null
    return $LASTEXITCODE -eq 0
}

function Wait-DockerDaemon {
    param([int]$TimeoutSec = 120)
    $sw = [Diagnostics.Stopwatch]::StartNew()
    while ($sw.Elapsed.TotalSeconds -lt $TimeoutSec) {
        if (Test-DockerDaemon) { return $true }
        Start-Sleep -Seconds 3
    }
    return $false
}

function Invoke-SyncHubEnv {
    if (-not (Test-Path $SyncScript)) {
        Write-Warning "sync-docker-env.mjs not found — copy NEXT_PUBLIC_* manually from docker-oss.env"
        return
    }
    node $SyncScript
}

function Show-EmbedUrls {
    Write-Host ""
    Write-Host "=== Hub embed URLs (lonex-hub/.env.local) ==="
    Get-Content $EnvFile | Select-String "^NEXT_PUBLIC_"
    Write-Host ""
    Write-Host "Sync: .\scripts\docker-oss.ps1 sync-env"
}

if ($Action -ne "sync-env" -and -not (Test-DockerDaemon)) {
    $dd = "${env:ProgramFiles}\Docker\Docker\Docker Desktop.exe"
    if (Test-Path $dd) {
        Write-Host "Docker daemon offline — starting Docker Desktop..."
        Start-Process $dd
        if ($Wait -or $Action -eq "up") {
            if (-not (Wait-DockerDaemon)) {
                Write-Error "Docker Desktop did not start within 120s. Open Docker Desktop manually."
                exit 1
            }
        } else {
            Write-Host "Run with -Wait or use: docker-oss.ps1 up -Wait"
            exit 1
        }
    } else {
        Write-Error "Docker Desktop not installed."
        exit 1
    }
}

$profileArgs = @()
foreach ($p in ($Profile -split ",")) {
    $p = $p.Trim()
    if ($p) { $profileArgs += "--profile"; $profileArgs += $p }
}

$base = @("compose", "-f", $Compose, "--env-file", $EnvFile) + $profileArgs

switch ($Action) {
    "sync-env" {
        Invoke-SyncHubEnv
    }
    "pull" {
        docker @base pull
    }
    "up" {
        Write-Host "Starting profiles: $Profile"
        docker @base up -d
        if ($LASTEXITCODE -eq 0) {
            Show-EmbedUrls
            if ($SyncEnv) { Invoke-SyncHubEnv }
        }
    }
    "down" {
        docker @base down
    }
    "logs" {
        docker @base logs -f --tail 80
    }
    "status" {
        docker @base ps -a
        Write-Host ""
        Write-Host "Profiles: core | chat | support | notes | dify | ai-assistant"
        Write-Host "Example: .\scripts\docker-oss.ps1 up -Profile core -Wait -SyncEnv"
    }
}
