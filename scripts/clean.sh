#!/bin/bash

# ============================================
# 项目清理脚本
# 用于清理临时文件、日志和构建产物
# ============================================

set -e

echo "🧹 开始清理项目..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 获取脚本所在目录的父目录（项目根目录）
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$PROJECT_ROOT"

echo -e "${YELLOW}📁 项目根目录: $PROJECT_ROOT${NC}"
echo ""

# 1. 清理 Go 编译产物
echo -e "${YELLOW}🔧 清理 Go 编译产物...${NC}"
if [ -d "tmp" ]; then
    rm -rf tmp/*
    echo -e "${GREEN}✓ 已清理 tmp/ 目录${NC}"
else
    echo -e "${GREEN}✓ tmp/ 目录不存在，跳过${NC}"
fi

# 2. 清理日志文件
echo -e "${YELLOW}📝 清理日志文件...${NC}"
if [ -d "logs" ]; then
    rm -rf logs/*
    echo -e "${GREEN}✓ 已清理 logs/ 目录${NC}"
else
    echo -e "${GREEN}✓ logs/ 目录不存在，跳过${NC}"
fi

# 清理根目录的日志文件
find . -maxdepth 1 -name "*.log" -type f -delete 2>/dev/null || true
echo -e "${GREEN}✓ 已清理根目录日志文件${NC}"

# 3. 清理前端构建产物
echo -e "${YELLOW}🌐 清理前端构建产物...${NC}"
for dir in web/*/dist web/*/build; do
    if [ -d "$dir" ]; then
        rm -rf "$dir"
        echo -e "${GREEN}✓ 已清理 $dir${NC}"
    fi
done

# 4. 清理 VitePress 缓存和构建产物
echo -e "${YELLOW}📚 清理 VitePress 缓存...${NC}"
if [ -d "web/docs/.vitepress/dist" ]; then
    rm -rf web/docs/.vitepress/dist
    echo -e "${GREEN}✓ 已清理 VitePress dist/${NC}"
fi
if [ -d "web/docs/.vitepress/cache" ]; then
    rm -rf web/docs/.vitepress/cache
    echo -e "${GREEN}✓ 已清理 VitePress cache/${NC}"
fi

# 5. 清理 Go 测试覆盖文件
echo -e "${YELLOW}🧪 清理测试覆盖文件...${NC}"
find . -name "coverage.out" -o -name "coverage.txt" -o -name "*.test" | while read file; do
    rm -f "$file"
    echo -e "${GREEN}✓ 已清理 $file${NC}"
done

# 6. 清理临时文件
echo -e "${YELLOW}🗑️  清理临时文件...${NC}"
find . -name "*.tmp" -o -name "*.temp" -o -name "*.bak" -o -name "*.cache" | while read file; do
    rm -f "$file"
    echo -e "${GREEN}✓ 已清理 $file${NC}"
done

# 7. 清理操作系统文件
echo -e "${YELLOW}💻 清理操作系统文件...${NC}"
find . -name ".DS_Store" -o -name "Thumbs.db" | while read file; do
    rm -f "$file"
    echo -e "${GREEN}✓ 已清理 $file${NC}"
done

echo ""
echo -e "${GREEN}✅ 清理完成！${NC}"
echo ""
echo -e "${YELLOW}📊 当前项目状态:${NC}"
echo "  - Git 状态:"
git status --short 2>/dev/null | head -5 || echo "    （非 Git 仓库或 Git 未安装）"
echo ""
echo -e "${YELLOW}💡 提示:${NC}"
echo "  - 如需清理 node_modules，请运行: find web -name 'node_modules' -type d -prune -exec rm -rf {} +"
echo "  - 查看忽略的文件: git status --ignored"
