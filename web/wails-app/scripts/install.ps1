# AI 辅助代码学习平台 - Wails 桌面应用安装脚本

Write-Host "正在安装 Wails 桌面应用依赖..." -ForegroundColor Yellow

# 检查 Go 是否安装
try {
    $goVersion = go version
    Write-Host "✓ Go 已安装: $goVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ 未检测到 Go,请先安装 Go 1.21+" -ForegroundColor Red
    exit 1
}

# 检查 Node.js 是否安装
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js 已安装: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ 未检测到 Node.js,请先安装 Node.js 18+" -ForegroundColor Red
    exit 1
}

# 安装 Wails CLI
Write-Host "`n正在安装 Wails CLI..." -ForegroundColor Cyan
go install github.com/wailsapp/wails/v2/cmd/wails@latest

# 检查安装是否成功
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Wails CLI 安装成功" -ForegroundColor Green
} else {
    Write-Host "✗ Wails CLI 安装失败" -ForegroundColor Red
    exit 1
}

# 安装前端依赖
Write-Host "`n正在安装前端依赖..." -ForegroundColor Cyan
Set-Location frontend
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ 前端依赖安装成功" -ForegroundColor Green
} else {
    Write-Host "✗ 前端依赖安装失败" -ForegroundColor Red
    exit 1
}

Set-Location ..

Write-Host "`n✓ 所有依赖安装完成!" -ForegroundColor Green
Write-Host "运行 'make dev' 或 'wails dev' 启动开发模式" -ForegroundColor Cyan
