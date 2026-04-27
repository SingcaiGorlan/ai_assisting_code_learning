# Wails 桌面应用开发脚本

Write-Host "AI 辅助代码学习平台 - Wails 桌面应用" -ForegroundColor Cyan
Write-Host ""

$scriptPath = $MyInvocation.MyCommand.Path
$projectRoot = Split-Path $scriptPath -Parent
$wailsAppPath = Join-Path $projectRoot "web\wails-app"

if (!(Test-Path $wailsAppPath)) {
    Write-Host "✗ 未找到 wails-app 目录" -ForegroundColor Red
    exit 1
}

Set-Location $wailsAppPath

Write-Host "请选择操作:" -ForegroundColor Yellow
Write-Host "1. 安装依赖" -ForegroundColor White
Write-Host "2. 启动开发模式" -ForegroundColor White
Write-Host "3. 构建应用" -ForegroundColor White
Write-Host "4. 查看帮助文档" -ForegroundColor White

$choice = Read-Host "`n请输入选项 (1-4)"

switch ($choice) {
    "1" {
        & .\scripts\install.ps1
    }
    "2" {
        & .\scripts\dev.ps1
    }
    "3" {
        & .\scripts\build.ps1
    }
    "4" {
        if (Test-Path ".\README.md") {
            Invoke-Item ".\README.md"
        }
        if (Test-Path ".\docs\DEVELOPMENT_GUIDE.md") {
            Start-Process "code" ".\docs\DEVELOPMENT_GUIDE.md"
        }
    }
    default {
        Write-Host "✗ 无效选项" -ForegroundColor Red
    }
}
