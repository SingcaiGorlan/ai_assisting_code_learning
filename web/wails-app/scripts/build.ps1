# AI Learning Platform - Wails 打包脚本
# 用法: .\scripts\build.ps1

param(
    [string]$Platform = "windows/amd64",
    [switch]$WithUPX = $false,
    [switch]$Clean = $false
)

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  AI Learning Platform - 打包工具" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 获取项目根目录
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot

Write-Host "项目目录: $ProjectRoot" -ForegroundColor Gray
Write-Host "目标平台: $Platform" -ForegroundColor Gray
Write-Host ""

# 1. 清理旧构建（可选）
if ($Clean) {
    Write-Host "[1/4] 清理旧构建文件..." -ForegroundColor Yellow
    if (Test-Path "build") {
        Remove-Item -Path "build" -Recurse -Force
        Write-Host "  ✓ 已清理 build 目录" -ForegroundColor Green
    }
    Write-Host ""
}

# 2. 检查依赖
Write-Host "[2/4] 检查构建环境..." -ForegroundColor Yellow

# 检查 Go
try {
    $goVersion = go version
    Write-Host "  ✓ Go: $goVersion" -ForegroundColor Green
} catch {
    Write-Host "  ✗ 错误: 未找到 Go，请先安装 Go 1.21+" -ForegroundColor Red
    exit 1
}

# 检查 Node.js
try {
    $nodeVersion = node --version
    Write-Host "  ✓ Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  ✗ 警告: 未找到 Node.js，前端构建可能失败" -ForegroundColor Yellow
}

# 检查 Wails CLI
try {
    $wailsVersion = wails version
    Write-Host "  ✓ Wails: $wailsVersion" -ForegroundColor Green
} catch {
    Write-Host "  ✗ 错误: 未找到 Wails CLI" -ForegroundColor Red
    Write-Host "  安装命令: go install github.com/wailsapp/wails/v2/cmd/wails@latest" -ForegroundColor Yellow
    exit 1
}

# 检查 UPX（如果使用）
if ($WithUPX) {
    try {
        $upxVersion = upx --version 2>&1 | Select-String "upx"
        Write-Host "  ✓ UPX: 已安装" -ForegroundColor Green
    } catch {
        Write-Host "  ✗ 警告: 未找到 UPX，将跳过压缩步骤" -ForegroundColor Yellow
        Write-Host "  安装命令: choco install upx" -ForegroundColor Yellow
        $WithUPX = $false
    }
}

Write-Host ""

# 3. 执行构建
Write-Host "[3/4] 开始构建..." -ForegroundColor Yellow
Write-Host ""

$buildArgs = @(
    "build",
    "-platform", $Platform,
    "-ldflags=`"-s -w`""
)

if ($WithUPX) {
    $buildArgs += "-upx"
}

# 执行 wails build
& wails $buildArgs

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "✗ 构建失败！" -ForegroundColor Red
    exit 1
}

Write-Host ""

# 4. 验证输出
Write-Host "[4/4] 验证构建结果..." -ForegroundColor Yellow
Write-Host ""

$outputDir = "build\bin"
if (Test-Path $outputDir) {
    $exeFile = Get-ChildItem -Path $outputDir -Filter "*.exe" | Select-Object -First 1
    
    if ($exeFile) {
        $fileSize = [math]::Round($exeFile.Length / 1MB, 2)
        
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "  ✓ 构建成功！" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "输出文件: $($exeFile.FullName)" -ForegroundColor White
        Write-Host "文件大小: $fileSize MB" -ForegroundColor White
        Write-Host "修改时间: $($exeFile.LastWriteTime)" -ForegroundColor White
        Write-Host ""
        Write-Host "目录结构:" -ForegroundColor Cyan
        Get-ChildItem -Path "build" -Recurse | ForEach-Object {
            if ($_.PSIsContainer) {
                Write-Host "  📁 $($_.Name)" -ForegroundColor Yellow
            } else {
                $size = if ($_.Length -gt 1MB) { "$([math]::Round($_.Length/1MB, 2)) MB" } 
                        elseif ($_.Length -gt 1KB) { "$([math]::Round($_.Length/1KB, 2)) KB" }
                        else { "$($_.Length) B" }
                Write-Host "  📄 $($_.Name) ($size)" -ForegroundColor Gray
            }
        }
        Write-Host ""
        Write-Host "测试运行:" -ForegroundColor Cyan
        Write-Host "  .\$($exeFile.Name)" -ForegroundColor White
        Write-Host ""
        
        # 如果使用了 UPX，显示压缩信息
        if ($WithUPX) {
            Write-Host "✓ 已使用 UPX 压缩" -ForegroundColor Green
        }
        
    } else {
        Write-Host "✗ 未找到可执行文件！" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✗ 构建输出目录不存在！" -ForegroundColor Red
    exit 1
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
