#Requires -Version 5.1
<#
.SYNOPSIS
  LONEX 통합 CLI — GitHub · Vercel · Neon · Docker · Render
.EXAMPLE
  .\scripts\lonex-deploy.ps1 -Action status
  .\scripts\lonex-deploy.ps1 -Action deploy -Message "feat: OSS Docker CLI"
#>
param(
    [ValidateSet("status", "deploy", "migrate", "docker-up")]
    [string]$Action = "deploy",
    [string]$Message = "",
    [switch]$SkipPush,
    [switch]$SkipVercel,
    [switch]$SkipNeon,
    [switch]$SkipDocker,
    [switch]$SkipRender
)

$ErrorActionPreference = "Stop"
$Root = Split-Path $PSScriptRoot -Parent
$Hub = Join-Path $Root "lonex-hub"
$DockerScript = Join-Path $PSScriptRoot "docker-oss.ps1"
$SyncEnvScript = Join-Path $PSScriptRoot "sync-docker-env.mjs"
$RenderYaml = Join-Path $Root "render.yaml"

function Write-Step([string]$Text) { Write-Host "`n==> $Text" -ForegroundColor Cyan }

function Test-Cmd([string]$Name) {
    return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

function Get-RenderCli {
    if (Test-Cmd render) { return "render" }
    $local = Join-Path $env:LOCALAPPDATA "render-cli\render.exe"
    if (Test-Path $local) { return $local }
    return $null
}

function Show-Status {
    Write-Step "CLI status"
    if (Test-Cmd gh) { gh auth status 2>&1 | Write-Host } else { Write-Host "gh: not installed" }
    if (Test-Cmd vercel) { vercel whoami 2>&1 | Write-Host } else { Write-Host "vercel: not installed" }
    if (Test-Cmd docker) {
        docker info 2>&1 | Select-Object -First 2 | Write-Host
    } else { Write-Host "docker: not installed" }
    if (Test-Cmd node) { npx neonctl --version 2>&1 | Write-Host } else { Write-Host "neonctl: node required" }
    $render = Get-RenderCli
    if ($render) { & $render --version 2>&1 | Write-Host } else { Write-Host "render: not installed (optional)" }
    if (Test-Path $RenderYaml) { Write-Host "render.yaml: present" }
}

function Invoke-GitCommitPush {
    param([string]$CommitMessage)
    Push-Location $Root
    try {
        $status = git status --porcelain
        if (-not $status) {
            Write-Host "No git changes — skip commit"
            return $null
        }
        if (-not $CommitMessage) {
            $CommitMessage = "feat: OSS Docker CLI integration and Hub embed wiring"
        }
        git add scripts/docker-compose.oss.yml scripts/docker-oss.ps1 scripts/docker-oss.env `
            scripts/sync-docker-env.mjs scripts/lonex-deploy.ps1 render.yaml `
            docs/oss-integration-plan.md docs/phase0-checklist.md `
            lonex-hub/.env.example lonex-hub/docker-compose.oss.yml `
            lonex-hub/src/modules/EmbedModule.tsx 2>$null
        git add -u scripts docs lonex-hub 2>$null
        git status --short
        git commit -m $CommitMessage -m "Unified deploy script (gh/vercel/neon/docker/render). MediaCMS+RocketChat compose fixes. Hub embed env sync."
        $hash = git rev-parse --short HEAD
        if (-not $SkipPush) {
            git push -u origin HEAD
            git status
        }
        return $hash
    } finally {
        Pop-Location
    }
}

function Invoke-NeonMigrate {
    Push-Location $Hub
    try {
        Write-Step "Neon — link Vercel env + migrate"
        vercel link --project lonexeim-hub --yes 2>&1 | Out-Null
        foreach ($envFile in @(".env.development.local", ".env.deploy")) {
            if (-not (Test-Path $envFile)) {
                vercel env pull $envFile --environment=development --yes 2>&1 | Out-Null
            }
        }
        $pullFile = if (Test-Path ".env.development.local") { ".env.development.local" } else { ".env.deploy" }
        if (-not (Test-Path $pullFile)) {
            Write-Warning "No env file — skip Neon migrate"
            return
        }
        Get-Content $pullFile | ForEach-Object {
            if ($_ -match '^([^=]+)=(.*)$') { Set-Item -Path "env:$($matches[1])" -Value $matches[2].Trim('"') }
        }
        if (-not $env:DATABASE_URL -and $env:POSTGRES_URL) {
            $env:DATABASE_URL = $env:POSTGRES_URL
        }
        if (-not $env:DATABASE_URL) {
            Write-Warning "DATABASE_URL missing — skip migrate"
            return
        }
        npm run db:migrate
        if (Test-Path "scripts/migrate-vector.sql") {
            Write-Host "Vector SQL: run manually if pgvector extension enabled"
        }
    } finally {
        Pop-Location
    }
}

function Invoke-VercelDeploy {
    Push-Location $Hub
    try {
        Write-Step "Vercel — production deploy (lonexeim-hub)"
        vercel link --project lonexeim-hub --yes
        vercel deploy --prod --yes
    } finally {
        Pop-Location
    }
}

function Invoke-RenderValidate {
    $render = Get-RenderCli
    if (-not $render -or $SkipRender) { return }
    if (-not (Test-Path $RenderYaml)) { return }
    Write-Step "Render — blueprint validate + services"
    & $render blueprints validate $RenderYaml 2>&1 | Write-Host
    $createScript = Join-Path $PSScriptRoot "render-create.ps1"
    if (Test-Path $createScript) {
        pwsh -NoProfile -File $createScript 2>&1 | Write-Host
    }
}

function Invoke-DockerCore {
    if ($SkipDocker) { return }
    Write-Step "Docker — core OSS profile"
    & $DockerScript -Action up -Profile core -Wait -SyncEnv
}

switch ($Action) {
    "status" { Show-Status }
    "migrate" { Invoke-NeonMigrate }
    "docker-up" { Invoke-DockerCore }
    "deploy" {
        Show-Status
        $hash = Invoke-GitCommitPush -CommitMessage $Message
        if (-not $SkipNeon) { Invoke-NeonMigrate }
        if (-not $SkipDocker) {
            if (Test-Path $DockerScript) { Invoke-DockerCore }
        }
        Invoke-RenderValidate
        $renderDeploy = Join-Path $PSScriptRoot "render-deploy.ps1"
        if ((Test-Path $renderDeploy) -and -not $SkipRender) {
            pwsh -NoProfile -File $renderDeploy -Action deploy -SkipVercel
        }
        if (-not $SkipVercel) { Invoke-VercelDeploy }
        Write-Step "Done"
        Write-Host "Hub: https://lonexeim-hub.vercel.app"
        if ($hash) { Write-Host "Commit: $hash" }
    }
}
