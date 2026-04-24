$ErrorActionPreference = "Stop"

if (-not $env:GOPROXY -or $env:GOPROXY -eq "off") {
  $env:GOPROXY = "https://goproxy.cn,direct"
}

$gopath = go env GOPATH
$airPath = Join-Path $gopath "bin/air.exe"

if (Test-Path $airPath) {
  & $airPath -c .air.toml
} else {
  Write-Host "未检测到 air，使用 go run 启动" -ForegroundColor Yellow
  go run ./cmd/server
}
