# LONEX Workforce NSIS 빌드 스크립트
# 사용: powershell -ExecutionPolicy Bypass -File build-nsis.ps1

$root = Split-Path $PSScriptRoot -Parent
$desktop = Join-Path $root "desktop"

Write-Host "=== LONEX Workforce Build ===" -ForegroundColor Cyan

# 아이콘 복사
$iconSrc = Join-Path (Split-Path $root -Parent) "lonexicon.png"
$assets = Join-Path $desktop "assets"
New-Item -ItemType Directory -Force -Path $assets | Out-Null
if (Test-Path $iconSrc) {
  Copy-Item $iconSrc (Join-Path $assets "icon.png") -Force
  Write-Host "[OK] icon.png"
}

Push-Location $desktop
npm install 2>&1 | Out-Null
if (-not (Test-Path "node_modules\electron")) {
  Write-Host "[ERR] npm install failed" -ForegroundColor Red
  exit 1
}

# electron-builder (dir output — NSIS는 icon.ico 필요 시 png 사용)
npm run pack 2>&1
Pop-Location

if (Test-Path (Join-Path $desktop "dist\win-unpacked\LONEX Workforce.exe")) {
  Write-Host "[OK] dist\win-unpacked 생성 완료" -ForegroundColor Green
  Write-Host "설치: installer\Install-LonexWorkforce.ps1 (관리자)" -ForegroundColor Cyan
} else {
  Write-Host "[WARN] electron-builder 출력 확인 필요" -ForegroundColor Yellow
}
