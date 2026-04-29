@echo off
REM Windows 用户说明
REM 
REM 此项目需要在 macOS 上编译
REM 请将整个项目文件夹发送给有 Mac 的朋友/同事
REM 
REM 在 Mac 上执行：
REM   cd web/wails-app/scripts
REM   chmod +x build-macos.sh
REM   ./build-macos.sh
REM 
REM 或者使用自动安装脚本（推荐）：
REM   在 Mac 终端运行：
REM   curl -sL https://raw.githubusercontent.com/SingcaiGorlan/ai_assisting_code_learning/main/web/wails-app/scripts/install-and-build.sh | bash
REM

echo AI 辅助代码学习平台 - macOS 编译说明
echo ========================================
echo.
echo 此项目需要在 macOS 系统上编译
echo.
echo 编译步骤：
echo 1. 将整个项目复制到 Mac 电脑
echo 2. 打开终端
echo 3. 执行以下命令：
echo    cd web/wails-app/scripts
echo    chmod +x build-macos.sh
echo    ./build-macos.sh
echo.
echo 或使用一键安装脚本（推荐）：
echo curl -sL https://raw.githubusercontent.com/SingcaiGorlan/ai_assisting_code_learning/main/web/wails-app/scripts/install-and-build.sh ^| bash
echo.
echo 编译完成后会生成：
echo - AI辅助代码学习平台.app (应用程序)
echo - AI-Learning-Platform-macOS.zip (压缩包)
echo.
echo 详细说明请查看: docs\MACOS_BUILD_GUIDE.md
echo.
pause
