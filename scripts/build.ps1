$ErrorActionPreference = "Stop"

if (-not $env:GOPROXY -or $env:GOPROXY -eq "off") {
  $env:GOPROXY = "https://goproxy.cn,direct"
}

if (-not (Test-Path "tmp")) { New-Item -ItemType Directory -Path "tmp" | Out-Null }
if (-not (Test-Path "bin")) { New-Item -ItemType Directory -Path "bin" | Out-Null }

Write-Host "Build backend..." -ForegroundColor Cyan
go build -o ./bin/server.exe ./cmd/server
Write-Host "Backend build success: bin/server.exe" -ForegroundColor Green

if (Test-Path "web/package.json") {
  Write-Host "Frontend detected, building..." -ForegroundColor Cyan
  Push-Location web
  try {
    if (Test-Path "package-lock.json") {
      npm ci
    } else {
      npm install
    }
    npm run build
  } finally {
    Pop-Location
  }
  Write-Host "Frontend build success" -ForegroundColor Green
} else {
  Write-Host "No web/package.json, skip frontend build" -ForegroundColor Yellow
}
