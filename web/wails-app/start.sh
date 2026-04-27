#!/bin/bash

# AI 辅助代码学习平台 - Wails 桌面应用快速启动脚本

echo "========================================="
echo "AI 辅助代码学习平台 - Wails 桌面应用"
echo "========================================="
echo ""

# 检查是否在项目根目录
if [ ! -f "web/wails-app/main.go" ]; then
    echo "❌ 错误: 请在项目根目录运行此脚本"
    exit 1
fi

cd web/wails-app

echo "请选择操作:"
echo "1. 安装依赖"
echo "2. 启动开发模式"
echo "3. 构建应用"
echo "4. 查看文档"
echo ""
read -p "请输入选项 (1-4): " choice

case $choice in
    1)
        echo ""
        echo "📦 正在安装依赖..."
        echo ""
        
        # 检查 Go
        if ! command -v go &> /dev/null; then
            echo "❌ 未检测到 Go,请先安装 Go 1.21+"
            exit 1
        fi
        
        # 检查 Node.js
        if ! command -v node &> /dev/null; then
            echo "❌ 未检测到 Node.js,请先安装 Node.js 18+"
            exit 1
        fi
        
        echo "✓ Go 版本: $(go version | cut -d' ' -f3)"
        echo "✓ Node.js 版本: $(node --version)"
        echo ""
        
        # 安装 Wails CLI
        echo "正在安装 Wails CLI..."
        go install github.com/wailsapp/wails/v2/cmd/wails@latest
        
        if [ $? -eq 0 ]; then
            echo "✓ Wails CLI 安装成功"
        else
            echo "❌ Wails CLI 安装失败"
            exit 1
        fi
        
        echo ""
        
        # 安装前端依赖
        echo "正在安装前端依赖..."
        cd frontend
        npm install
        
        if [ $? -eq 0 ]; then
            echo "✓ 前端依赖安装成功"
        else
            echo "❌ 前端依赖安装失败"
            exit 1
        fi
        
        cd ..
        
        echo ""
        echo "✅ 所有依赖安装完成!"
        echo "运行 './start.sh' 并选择选项 2 启动开发模式"
        ;;
        
    2)
        echo ""
        
        # 检查 wails 是否安装
        if ! command -v wails &> /dev/null; then
            echo "❌ 未检测到 Wails,请先运行选项 1 安装依赖"
            exit 1
        fi
        
        echo "🚀 启动开发模式..."
        echo "按 Ctrl+C 停止服务器"
        echo ""
        
        wails dev
        ;;
        
    3)
        echo ""
        
        # 检查 wails 是否安装
        if ! command -v wails &> /dev/null; then
            echo "❌ 未检测到 Wails,请先运行选项 1 安装依赖"
            exit 1
        fi
        
        echo "🔨 正在构建应用..."
        echo ""
        
        echo "请选择构建平台:"
        echo "1. 当前平台"
        echo "2. Windows (amd64)"
        echo "3. macOS (amd64)"
        echo "4. Linux (amd64)"
        echo ""
        read -p "请输入选项 (1-4): " platform_choice
        
        case $platform_choice in
            1)
                wails build
                ;;
            2)
                wails build -platform windows/amd64
                ;;
            3)
                wails build -platform darwin/amd64
                ;;
            4)
                wails build -platform linux/amd64
                ;;
            *)
                echo "❌ 无效选项"
                exit 1
                ;;
        esac
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "✅ 构建完成!"
            echo "输出目录: build/bin/"
        else
            echo ""
            echo "❌ 构建失败"
            exit 1
        fi
        ;;
        
    4)
        echo ""
        if [ -f "README.md" ]; then
            echo "📖 打开 README..."
            if command -v xdg-open &> /dev/null; then
                xdg-open README.md
            elif command -v open &> /dev/null; then
                open README.md
            else
                cat README.md
            fi
        fi
        ;;
        
    *)
        echo "❌ 无效选项"
        exit 1
        ;;
esac
