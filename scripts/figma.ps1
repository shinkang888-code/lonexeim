#Requires -Version 5.1
<#
.SYNOPSIS
  Lonex Hub Figma CLI

.EXAMPLE
  .\scripts\figma.ps1 login figd_xxxxxxxx
  .\scripts\figma.ps1 setup
  .\scripts\figma.ps1 link "https://www.figma.com/design/ABC123/Lonex-Hub"
  .\scripts\figma.ps1 sync
#>
param(
  [Parameter(Position = 0)]
  [string]$Command = "sync",
  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]]$Rest
)

$ErrorActionPreference = "Stop"
$EnvFile = Join-Path $PSScriptRoot "figma.env"
$Example = Join-Path $PSScriptRoot "figma.env.example"
$ConfigExample = Join-Path $PSScriptRoot "figma.config.example.json"
$ConfigFile = Join-Path $PSScriptRoot "figma.config.json"

if (-not (Test-Path $EnvFile)) {
  if (Test-Path $Example) { Copy-Item $Example $EnvFile }
}
if (-not (Test-Path $ConfigFile) -and (Test-Path $ConfigExample)) {
  Copy-Item $ConfigExample $ConfigFile
}

switch ($Command) {
  "open-token" {
    Start-Process "https://www.figma.com/settings"
    Write-Host "Security → Personal access tokens → Generate (figd_...)" -ForegroundColor Cyan
    exit 0
  }
  default {
    $nodeArgs = @("$PSScriptRoot\figma-sync.mjs", $Command) + $Rest
    & node @nodeArgs
    exit $LASTEXITCODE
  }
}
