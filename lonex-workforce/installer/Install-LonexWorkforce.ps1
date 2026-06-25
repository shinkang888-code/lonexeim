# Lonex Workforce + LogShield 일괄 설치
# 관리자 PowerShell에서 실행

param(
  [string]$HubUrl = "https://lonex-hub.vercel.app",
  [string]$InstallDir = "$env:ProgramFiles\Lonex\Workforce"
)

$ErrorActionPreference = "Stop"
Write-Host "=== LONEX Workforce 설치 ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force -Path $InstallDir | Out-Null

# 1) Workforce Desktop (electron-builder dist)
$desktopDist = Join-Path $PSScriptRoot "..\desktop\dist\win-unpacked"
if (Test-Path $desktopDist) {
  Copy-Item -Recurse -Force "$desktopDist\*" $InstallDir
  Write-Host "[OK] Workforce Desktop 복사" -ForegroundColor Green
} else {
  Write-Host "[WARN] desktop dist 없음 — 먼저 desktop 폴더에서 npm run pack 실행" -ForegroundColor Yellow
}

# 2) LogShield Agent (GitHub logshield) — ServerUrl/AgentToken 필요
$logshieldScript = Join-Path $PSScriptRoot "..\..\..\logshield\agent\install\Install-LogshieldAgent.ps1"
$logshieldAlt = "C:\Users\FORYOUCOM\logshield\agent\install\Install-LogshieldAgent.ps1"
$lsScript = if (Test-Path $logshieldScript) { $logshieldScript } elseif (Test-Path $logshieldAlt) { $logshieldAlt } else { $null }
if ($lsScript) {
  Write-Host "[INFO] LogShield Agent: $lsScript -ServerUrl $HubUrl -AgentToken <본사발급토큰>" -ForegroundColor Yellow
  Write-Host "       (AgentToken은 Hub 관리자에게 문의 후 수동 실행)" -ForegroundColor Yellow
} else {
  Write-Host "[SKIP] LogShield Agent — logshield 리포 클론 필요" -ForegroundColor Yellow
}

# 3) 바로가기
$desktop = [Environment]::GetFolderPath("Desktop")
$exe = Join-Path $InstallDir "LONEX Workforce.exe"
if (Test-Path $exe) {
  $wsh = New-Object -ComObject WScript.Shell
  $lnk = $wsh.CreateShortcut("$desktop\LONEX Workforce.lnk")
  $lnk.TargetPath = $exe
  $lnk.WorkingDirectory = $InstallDir
  $lnk.Save()
}

# 4) Hub URL 기본값 레지스트리
New-Item -Path "HKLM:\Software\Lonex\Workforce" -Force | Out-Null
Set-ItemProperty -Path "HKLM:\Software\Lonex\Workforce" -Name "HubUrl" -Value $HubUrl

Write-Host ""
Write-Host "설치 완료. LONEX Workforce 실행 후 API Key 등록:" -ForegroundColor Cyan
Write-Host "  본사 URL: $HubUrl"
Write-Host "  Hub > 직원설정 > 테스트 동기화 로 확인"
