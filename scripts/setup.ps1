$ErrorActionPreference = "Stop"

Write-Host "[1/5] 配置 GOPROXY..." -ForegroundColor Cyan
if (-not $env:GOPROXY -or $env:GOPROXY -eq "off") {
  $env:GOPROXY = "https://goproxy.cn,direct"
}
Write-Host "GOPROXY=$($env:GOPROXY)"

Write-Host "[2/5] 下载 Go 依赖..." -ForegroundColor Cyan
go mod tidy

Write-Host "[3/5] 安装开发工具..." -ForegroundColor Cyan
go install github.com/air-verse/air@latest
go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
go install github.com/swaggo/swag/cmd/swag@latest

Write-Host "[4/5] 生成本地配置文件..." -ForegroundColor Cyan
if (-not (Test-Path ".env.local")) { Copy-Item ".env.example" ".env.local" }
if (-not (Test-Path "configs/config.local.yaml")) { Copy-Item "configs/config.yaml" "configs/config.local.yaml" }
if (-not (Test-Path "tmp")) { New-Item -ItemType Directory -Path "tmp" | Out-Null }
if (-not (Test-Path "logs")) { New-Item -ItemType Directory -Path "logs" | Out-Null }

Write-Host "[5/5] 初始化完成" -ForegroundColor Green
Write-Host "下一步：先启动依赖服务，再编译运行"
Write-Host "  docker-compose -f docker-compose.dev.yml up -d"
Write-Host "  powershell -ExecutionPolicy Bypass -File scripts/build.ps1"
