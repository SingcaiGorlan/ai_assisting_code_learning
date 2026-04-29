# AI Learning Platform - Inno Setup 安装包构建脚本
# 用法: .\scripts\build-installer.ps1

param(
    [switch]$Clean = $false,
    [switch]$Test = $false
)

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  AI Learning Platform - 安装包构建工具" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 获取项目根目录
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot

Write-Host "项目目录: $ProjectRoot" -ForegroundColor Gray
Write-Host ""

# 1. 检查 Inno Setup 是否安装
Write-Host "[1/4] 检查 Inno Setup..." -ForegroundColor Yellow

$InnoSetupPaths = @(
    "C:\Program Files (x86)\Inno Setup 6\ISCC.exe",
    "C:\Program Files\Inno Setup 6\ISCC.exe",
    "C:\Program Files (x86)\Inno Setup 5\ISCC.exe",
    "C:\Program Files\Inno Setup 5\ISCC.exe"
)

$ISCC = $null
foreach ($path in $InnoSetupPaths) {
    if (Test-Path $path) {
        $ISCC = $path
        break
    }
}

if (-not $ISCC) {
    Write-Host "✗ 未找到 Inno Setup！" -ForegroundColor Red
    Write-Host ""
    Write-Host "请安装 Inno Setup:" -ForegroundColor Yellow
    Write-Host "  下载地址: https://jrsoftware.org/isdl.php" -ForegroundColor White
    Write-Host "  或使用 Chocolatey: choco install innosetup" -ForegroundColor White
    Write-Host ""
    exit 1
}

Write-Host "✓ Inno Setup 已找到: $ISCC" -ForegroundColor Green
Write-Host ""

# 2. 检查 exe 文件是否存在
Write-Host "[2/4] 检查构建文件..." -ForegroundColor Yellow

$ExePath = "build\bin\ai-learning-platform.exe"
if (-not (Test-Path $ExePath)) {
    Write-Host "✗ 未找到可执行文件: $ExePath" -ForegroundColor Red
    Write-Host ""
    Write-Host "请先运行构建命令:" -ForegroundColor Yellow
    Write-Host "  wails build -platform windows/amd64 -ldflags=`"-s -w`"" -ForegroundColor White
    Write-Host "  或" -ForegroundColor White
    Write-Host "  .\scripts\build.ps1" -ForegroundColor White
    Write-Host ""
    exit 1
}

$ExeSize = [math]::Round((Get-Item $ExePath).Length / 1MB, 2)
Write-Host "✓ 找到可执行文件: $ExePath ($ExeSize MB)" -ForegroundColor Green
Write-Host ""

# 3. 清理旧安装包（可选）
if ($Clean) {
    Write-Host "[3/4] 清理旧安装包..." -ForegroundColor Yellow
    if (Test-Path "installer-output") {
        Remove-Item -Path "installer-output" -Recurse -Force
        Write-Host "  ✓ 已清理 installer-output 目录" -ForegroundColor Green
    }
    Write-Host ""
} else {
    Write-Host "[3/4] 跳过清理（使用 -Clean 参数可清理）" -ForegroundColor Gray
    Write-Host ""
}

# 4. 编译安装包
Write-Host "[4/4] 编译安装包..." -ForegroundColor Yellow
Write-Host ""

$ISSFile = "installer.iss"
if (-not (Test-Path $ISSFile)) {
    Write-Host "✗ 未找到安装脚本: $ISSFile" -ForegroundColor Red
    exit 1
}

Write-Host "正在编译: $ISSFile" -ForegroundColor Cyan
Write-Host ""

# 执行编译
& $ISCC $ISSFile

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "✗ 安装包编译失败！" -ForegroundColor Red
    exit 1
}

Write-Host ""

# 5. 验证输出
Write-Host "验证安装包..." -ForegroundColor Yellow
Write-Host ""

$OutputDir = "installer-output"
if (Test-Path $OutputDir) {
    $InstallerFile = Get-ChildItem -Path $OutputDir -Filter "*.exe" | Select-Object -First 1
    
    if ($InstallerFile) {
        $FileSize = [math]::Round($InstallerFile.Length / 1MB, 2)
        
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "  ✓ 安装包构建成功！" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "安装包信息:" -ForegroundColor Cyan
        Write-Host "  文件名: $($InstallerFile.Name)" -ForegroundColor White
        Write-Host "  路径: $($InstallerFile.FullName)" -ForegroundColor White
        Write-Host "  大小: $FileSize MB" -ForegroundColor White
        Write-Host "  时间: $($InstallerFile.LastWriteTime)" -ForegroundColor White
        Write-Host ""
        
        # 显示目录内容
        Write-Host "输出目录内容:" -ForegroundColor Cyan
        Get-ChildItem -Path $OutputDir | ForEach-Object {
            $size = if ($_.Length -gt 1MB) { "$([math]::Round($_.Length/1MB, 2)) MB" } 
                    elseif ($_.Length -gt 1KB) { "$([math]::Round($_.Length/1KB, 2)) KB" }
                    else { "$($_.Length) B" }
            Write-Host "  📄 $($_.Name) ($size)" -ForegroundColor Gray
        }
        Write-Host ""
        
        # 测试模式
        if ($Test) {
            Write-Host "测试模式：启动安装包..." -ForegroundColor Yellow
            Write-Host "提示: 请在测试完成后手动关闭安装程序" -ForegroundColor Yellow
            Start-Process $InstallerFile.FullName
            Write-Host ""
        }
        
        Write-Host "下一步操作:" -ForegroundColor Cyan
        Write-Host "  1. 测试安装: 双击运行安装包" -ForegroundColor White
        Write-Host "  2. 分发应用: 将安装包复制到其他电脑" -ForegroundColor White
        Write-Host "  3. 创建 Release: 上传到 GitHub Releases" -ForegroundColor White
        Write-Host ""
        
    } else {
        Write-Host "✗ 未找到生成的安装包！" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✗ 输出目录不存在！" -ForegroundColor Red
    exit 1
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
