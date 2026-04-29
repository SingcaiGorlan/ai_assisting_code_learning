#!/bin/bash

###############################################################################
# macOS 构建脚本
# AI 辅助代码学习平台
###############################################################################

set -e  # 遇到错误立即退出

# 颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}AI 辅助代码学习平台 - macOS 构建脚本${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 检查系统要求
echo -e "${YELLOW}[1/6] 检查系统要求...${NC}"

# 检查 macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo -e "${RED}错误: 此脚本只能在 macOS 上运行${NC}"
    exit 1
fi

# 检查 Go
if ! command -v go &> /dev/null; then
    echo -e "${RED}错误: 未安装 Go${NC}"
    echo "请从 https://golang.org/dl/ 下载安装 Go 1.21+"
    exit 1
fi
GO_VERSION=$(go version | awk '{print $3}' | sed 's/go//')
echo "✅ Go 版本: $GO_VERSION"

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}错误: 未安装 Node.js${NC}"
    echo "请从 https://nodejs.org/ 下载安装 Node.js 18+"
    exit 1
fi
NODE_VERSION=$(node --version)
echo "✅ Node.js 版本: $NODE_VERSION"

# 检查 npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}错误: 未安装 npm${NC}"
    exit 1
fi

echo ""

# 安装 Wails CLI
echo -e "${YELLOW}[2/6] 安装 Wails CLI...${NC}"
if ! command -v wails &> /dev/null; then
    echo "正在安装 Wails CLI..."
    go install github.com/wailsapp/wails/v2/cmd/wails@latest
    echo "✅ Wails CLI 安装完成"
else
    WAIS_VERSION=$(wails version 2>/dev/null || echo "未知")
    echo "✅ Wails CLI 已安装: $WAIS_VERSION"
fi

# 将 Go bin 目录添加到 PATH（临时）
export PATH="$PATH:$(go env GOPATH)/bin"

echo ""

# 进入项目目录
echo -e "${YELLOW}[3/6] 进入项目目录...${NC}"
cd "$(dirname "$0")"
echo "✅ 当前目录: $(pwd)"

echo ""

# 安装 Go 依赖
echo -e "${YELLOW}[4/6] 安装 Go 依赖...${NC}"
cd ..
go mod download
echo "✅ Go 依赖安装完成"

echo ""

# 安装前端依赖
echo -e "${YELLOW}[5/6] 安装前端依赖...${NC}"
cd frontend
npm install
echo "✅ 前端依赖安装完成"

echo ""

# 编译应用
echo -e "${YELLOW}[6/6] 编译 macOS 应用...${NC}"
cd ..

echo "正在编译 macOS Universal Binary..."
echo "（这将同时支持 Intel 和 Apple Silicon Mac）"
echo ""

wails build -platform darwin/universal -ldflags="-s -w"

echo ""
echo "✅ 编译完成！"

# 检查输出
BUILD_DIR="build/darwin/universal"
APP_NAME="AI辅助代码学习平台.app"

if [ -d "$BUILD_DIR/$APP_NAME" ]; then
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}构建成功！${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo " 应用位置: $BUILD_DIR/$APP_NAME"
    
    # 显示文件大小
    APP_SIZE=$(du -sh "$BUILD_DIR/$APP_NAME" | cut -f1)
    echo "📊 文件大小: $APP_SIZE"
    echo ""
    
    # 创建压缩包
    echo "正在创建压缩包..."
    cd "$BUILD_DIR"
    zip -r "../../../../../AI-Learning-Platform-macOS.zip" "$APP_NAME"
    cd ../../..
    
    echo "✅ 压缩包已创建: AI-Learning-Platform-macOS.zip"
    echo ""
    
    # 显示最终信息
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}下一步${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo "1️⃣  测试应用："
    echo "   open \"$BUILD_DIR/$APP_NAME\""
    echo ""
    echo "2️⃣  分发给用户："
    echo "   发送 AI-Learning-Platform-macOS.zip"
    echo ""
    echo "3️⃣  或者上传到 GitHub Releases"
    echo ""
    
else
    echo ""
    echo -e "${RED}========================================${NC}"
    echo -e "${RED}构建失败！${NC}"
    echo -e "${RED}========================================${NC}"
    echo ""
    echo "请检查错误信息并重试"
    exit 1
fi
