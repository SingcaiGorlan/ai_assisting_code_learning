# AI 辅助代码学习平台 - Wails 桌面应用构建脚本

Write-Host "正在构建 Wails 桌面应用..." -ForegroundColor Cyan
Write-Host ""

# 检查 wails 是否安装
try {
    $wailsVersion = wails version
    Write-Host "Wails 版本: $wailsVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ 未检测到 Wails,请先运行 scripts/install.ps1" -ForegroundColor Red
    exit 1
}

# 选择平台
Write-Host "`n请选择构建平台:" -ForegroundColor Yellow
Write-Host "1. 当前平台" -ForegroundColor White
Write-Host "2. Windows (amd64)" -ForegroundColor White
Write-Host "3. macOS (amd64)" -ForegroundColor White
Write-Host "4. Linux (amd64)" -ForegroundColor White
Write-Host "5. 所有平台" -ForegroundColor White

$choice = Read-Host "`n请输入选项 (1-5)"

switch ($choice) {
    "1" {
        Write-Host "`n正在构建当前平台版本..." -ForegroundColor Cyan
        wails build
    }
    "2" {
        Write-Host "`n正在构建 Windows 版本..." -ForegroundColor Cyan
        wails build -platform windows/amd64
    }
    "3" {
        Write-Host "`n正在构建 macOS 版本..." -ForegroundColor Cyan
        wails build -platform darwin/amd64
    }
    "4" {
        Write-Host "`n正在构建 Linux 版本..." -ForegroundColor Cyan
        wails build -platform linux/amd64
    }
    "5" {
        Write-Host "`n正在构建所有平台版本..." -ForegroundColor Cyan
        wails build -platform "windows/amd64,darwin/amd64,linux/amd64"
    }
    default {
        Write-Host "✗ 无效选项" -ForegroundColor Red
        exit 1
    }
}

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✓ 构建完成!" -ForegroundColor Green
    Write-Host "输出目录: build/bin/" -ForegroundColor Cyan
} else {
    Write-Host "`n✗ 构建失败" -ForegroundColor Red
    exit 1
}
