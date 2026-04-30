@echo off
echo ========================================
echo  AI 辅助代码学习平台 - 完整启动
echo ========================================
echo.

REM 检查 Go 是否安装
where go >nul 2>nul
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Go，请先安装 Go
    pause
    exit /b 1
)

REM 检查 Node.js 是否安装
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Node.js，请先安装 Node.js
    pause
    exit /b 1
)

echo [1/3] 正在启动后端服务器...
cd /d "%~dp0..\.."
start "Backend Server" cmd /k "go run cmd/server/main.go"
timeout /t 3 /nobreak >nul

echo [2/3] 等待后端启动...
timeout /t 5 /nobreak >nul

echo [3/3] 正在启动前端开发服务器...
cd web\wails-app\frontend
start "Frontend Dev Server" cmd /k "npm run dev"

echo.
echo ========================================
echo  启动完成！
echo ========================================
echo.
echo 后端 API: http://localhost:8080/api/v1
echo 前端应用: http://localhost:5173
echo.
echo 按任意键关闭此窗口（不会影响运行的服务）
pause >nul
