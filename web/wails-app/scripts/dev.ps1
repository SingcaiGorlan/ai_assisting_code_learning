# AI 辅助代码学习平台 - Wails 桌面应用开发启动脚本

Write-Host "正在启动 Wails 开发模式..." -ForegroundColor Cyan
Write-Host ""

# 检查 wails 是否安装
try {
    $wailsVersion = wails version
    Write-Host "Wails 版本: $wailsVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ 未检测到 Wails,请先运行 scripts/install.ps1" -ForegroundColor Red
    exit 1
}

# 启动开发模式
Write-Host "启动开发服务器..." -ForegroundColor Yellow
Write-Host "按 Ctrl+C 停止服务器" -ForegroundColor Gray
Write-Host ""

wails dev
