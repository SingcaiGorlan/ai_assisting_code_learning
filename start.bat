@echo off
chcp 65001 >nul
echo ========================================
echo AI 辅助代码学习平台 - 启动脚本
echo ========================================
echo.

REM 检查是否设置了 GOPROXY
echo [1/4] 检查环境变量...
set GOPROXY_TEMP=%GOPROXY%
if "%GOPROXY_TEMP%"=="" (
    echo GOPROXY 未设置，使用国内代理
    set GOPROXY=https://goproxy.cn,direct
) else if "%GOPROXY_TEMP%"=="off" (
    echo GOPROXY 被设置为 off，临时修改为国内代理
    set GOPROXY=https://goproxy.cn,direct
) else (
    echo GOPROXY 已设置: %GOPROXY_TEMP%
)

REM 检查配置文件
echo [2/4] 检查配置文件...
if not exist ".env.local" (
    echo 创建 .env.local 配置文件...
    copy .env.example .env.local >nul
    echo 配置文件已创建，请根据需要修改
)

if not exist "configs\config.local.yaml" (
    echo 创建 configs\config.local.yaml 配置文件...
    copy configs\config.yaml configs\config.local.yaml >nul
    echo 配置文件已创建
)

REM 创建必要的目录
echo [3/4] 创建必要的目录...
if not exist "tmp" mkdir tmp
if not exist "logs" mkdir logs

REM 启动服务器
echo [4/4] 启动开发服务器...
echo.
echo ========================================
echo 服务器将在 http://localhost:8080 启动
echo 按 Ctrl+C 停止服务器
echo ========================================
echo.

set GOPROXY=https://goproxy.cn,direct
if not exist "tmp" mkdir tmp
go run cmd\server\main.go

pause
