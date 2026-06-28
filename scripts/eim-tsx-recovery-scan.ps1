# EIM TSX / source recovery scan (local + asar)
param(
  [string]$RepoRoot = (Split-Path (Split-Path $PSScriptRoot -Parent) -Parent)
)

$ErrorActionPreference = "SilentlyContinue"
$root = if (Test-Path "C:\Users\FORYOUCOM\lonexeim-work") { "C:\Users\FORYOUCOM\lonexeim-work" } else { $RepoRoot }

Write-Host "=== EIM TSX Recovery Scan ===" -ForegroundColor Cyan
Write-Host "Root: $root`n"

# 1. Repo TSX count
$tsx = Get-ChildItem -Path $root -Recurse -Filter "*.tsx" -File 2>$null
Write-Host "[repo] .tsx files: $($tsx.Count) (Hub modules only — no EIM SPA source)"

# 2. asar React chunks
$asar = Join-Path $root "_asar_extract\main\app\assets"
if (Test-Path $asar) {
  $chunks = (Get-ChildItem $asar -Filter "*.js").Count
  $reactHits = Select-String -Path (Join-Path $asar "*.js") -Pattern "createElement|jsx|React" -List 2>$null
  Write-Host "[asar] JS chunks: $chunks | React-like: $($reactHits.Count)"
  Write-Host "  sample: $($reactHits | Select-Object -First 5 -ExpandProperty Path | ForEach-Object { Split-Path $_ -Leaf })"
} else {
  Write-Host "[asar] _asar_extract not found"
}

# 3. sourceMappingURL
if (Test-Path $asar) {
  $maps = Select-String -Path (Join-Path $asar "*.js") -Pattern "sourceMappingURL=" -List 2>$null
  Write-Host "[asar] sourceMappingURL refs: $($maps.Count)"
}

# 4. Local search paths
$searchPaths = @(
  "$env:APPDATA\lonex",
  "$env:LOCALAPPDATA\lonex",
  "$env:USERPROFILE\Documents\lonex",
  "G:\내 드라이브"
)
foreach ($p in $searchPaths) {
  if (Test-Path $p) {
    $found = Get-ChildItem -Path $p -Recurse -Include "*.tsx","*eim*","*lonex*" -File -ErrorAction SilentlyContinue | Select-Object -First 3
    Write-Host "[search] $p → $($found.Count) hits"
    $found | ForEach-Object { Write-Host "  $($_.FullName)" }
  } else {
    Write-Host "[search] skip (missing): $p"
  }
}

# 5. DNS / SSH
Write-Host "`n=== Server access ==="
foreach ($h in @("x.lonex.kr", "x.grend.kr")) {
  try {
    $dns = Resolve-DnsName $h -ErrorAction Stop | Select-Object -First 1
    Write-Host "$h → $($dns.IPAddress)"
  } catch {
    Write-Host "$h → NXDOMAIN / unresolved"
  }
}

Write-Host "`nDone. See docs/eim-tsx-recovery-checklist.md"
