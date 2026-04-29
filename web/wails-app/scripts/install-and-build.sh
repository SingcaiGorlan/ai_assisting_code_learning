#!/bin/bash

###############################################################################
# 一键安装和构建脚本
# 适用于在干净的 macOS 系统上快速编译
###############################################################################

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}AI 辅助代码学习平台${NC}"
echo -e "${BLUE}一键安装和构建脚本${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 检查 Homebrew
echo -e "${YELLOW}检查 Homebrew...${NC}"
if ! command -v brew &> /dev/null; then
    echo "正在安装 Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
    eval "$(/opt/homebrew/bin/brew shellenv)"
fi
echo "✅ Homebrew 已安装"
echo ""

# 安装 Go
echo -e "${YELLOW}安装 Go...${NC}"
if ! command -v go &> /dev/null; then
    brew install go
fi
echo "✅ Go 已安装: $(go version)"
echo ""

# 安装 Node.js
echo -e "${YELLOW}安装 Node.js...${NC}"
if ! command -v node &> /dev/null; then
    brew install node@18
fi
echo "✅ Node.js 已安装: $(node --version)"
echo ""

# 克隆项目
echo -e "${YELLOW}克隆项目...${NC}"
if [ ! -d "ai_assisting_code_learning" ]; then
    git clone https://github.com/SingcaiGorlan/ai_assisting_code_learning.git
fi
cd ai_assisting_code_learning/web/wails-app/scripts
echo "✅ 项目已克隆"
echo ""

# 执行构建
echo -e "${YELLOW}开始构建...${NC}"
chmod +x build-macos.sh
./build-macos.sh
