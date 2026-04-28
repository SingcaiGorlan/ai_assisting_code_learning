# Wails 桌面应用启动脚本（增强版 - 带可视化工具）

Write-Host "╔════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  AI 辅助代码学习平台 - Wails 桌面应用     ║" -ForegroundColor Cyan
Write-Host "║         可视化开发工具集成版              ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

$scriptPath = $MyInvocation.MyCommand.Path
$projectRoot = Split-Path $scriptPath -Parent
$wailsAppPath = Join-Path $projectRoot "web\wails-app"

if (!(Test-Path $wailsAppPath)) {
    Write-Host "✗ 未找到 wails-app 目录" -ForegroundColor Red
    exit 1
}

Set-Location $wailsAppPath

Write-Host "📦 可用功能:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  [1] 📥 安装依赖 (npm install)" -ForegroundColor White
Write-Host "  [2] 🚀 启动开发模式 (DevTools自动打开)" -ForegroundColor Green
Write-Host "  [3] 🔨 构建生产版本" -ForegroundColor White
Write-Host "  [4] 📖 查看可视化工具文档" -ForegroundColor Cyan
Write-Host "  [5] 🔍 仅检查 Wails 环境" -ForegroundColor White
Write-Host ""

$choice = Read-Host "请选择操作 (1-5)"

switch ($choice) {
    "1" {
        Write-Host "`n📥 正在安装前端依赖..." -ForegroundColor Cyan
        npm install
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ 依赖安装完成" -ForegroundColor Green
        } else {
            Write-Host "✗ 依赖安装失败" -ForegroundColor Red
        }
    }
    "2" {
        Write-Host "`n🚀 启动开发模式..." -ForegroundColor Cyan
        Write-Host "💡 提示: DevTools 会在应用启动时自动打开" -ForegroundColor Yellow
        Write-Host "💡 提示: 也可以按 F12 手动打开" -ForegroundColor Yellow
        Write-Host ""
        wails dev
    }
    "3" {
        Write-Host "`n🔨 开始构建生产版本..." -ForegroundColor Cyan
        wails build
        if ($LASTEXITCODE -eq 0) {
            Write-Host "`n✓ 构建成功！" -ForegroundColor Green
            Write-Host "输出目录: build\bin\" -ForegroundColor White
        } else {
            Write-Host "`n✗ 构建失败" -ForegroundColor Red
        }
    }
    "4" {
        Write-Host "`n📖 打开可视化工具文档..." -ForegroundColor Cyan
        $docPath = ".\WAILS_VISUAL_TOOLS.md"
        if (Test-Path $docPath) {
            Start-Process "code" $docPath
            Write-Host "✓ 文档已打开" -ForegroundColor Green
        } else {
            Write-Host "✗ 文档不存在，请先创建" -ForegroundColor Red
        }
    }
    "5" {
        Write-Host "`n🔍 检查 Wails 环境..." -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Wails 版本:" -ForegroundColor Yellow
        wails version
        Write-Host ""
        Write-Host "Go 版本:" -ForegroundColor Yellow
        go version
        Write-Host ""
        Write-Host "Node.js 版本:" -ForegroundColor Yellow
        node --version
        Write-Host ""
        Write-Host "系统信息:" -ForegroundColor Yellow
        wails doctor
    }
    default {
        Write-Host "`n✗ 无效选项" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "按任意键退出..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
