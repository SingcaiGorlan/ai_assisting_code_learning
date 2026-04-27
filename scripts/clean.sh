#!/bin/bash

# ============================================
# 项目文件清理脚本
# 用于清理编译产物、临时文件和缓存
# ============================================

set -e

echo "🧹 开始清理项目文件..."

# 定义颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 清理编译产物
echo -e "\n${YELLOW}📦 清理编译产物...${NC}"
if [ -d "tmp" ]; then
    rm -rf tmp
    echo -e "${GREEN}✓ 清理 tmp/ 目录${NC}"
fi

if [ -d "bin" ]; then
    rm -rf bin
    echo -e "${GREEN}✓ 清理 bin/ 目录${NC}"
fi

# 清理日志文件
echo -e "\n${YELLOW}📝 清理日志文件...${NC}"
if [ -d "logs" ]; then
    find logs -name "*.log" -type f -delete 2>/dev/null || true
    echo -e "${GREEN}✓ 清理 logs/ 目录中的日志文件${NC}"
fi

# 清理 Vim 临时文件
echo -e "\n${YELLOW}📄 清理编辑器临时文件...${NC}"
find . -name "*.swp" -o -name "*.swo" -o -name "*~" -type f -delete 2>/dev/null || true
echo -e "${GREEN}✓ 清理 Vim 临时文件${NC}"

# 清理前端构建产物
echo -e "\n${YELLOW}🌐 清理前端构建产物...${NC}"
if [ -d "web/app/dist" ]; then
    rm -rf web/app/dist
    echo -e "${GREEN}✓ 清理 web/app/dist/${NC}"
fi

if [ -d "web/admin/dist" ]; then
    rm -rf web/admin/dist
    echo -e "${GREEN}✓ 清理 web/admin/dist/${NC}"
fi

if [ -d "web/docs/.vitepress/dist" ]; then
    rm -rf web/docs/.vitepress/dist
    echo -e "${GREEN}✓ 清理 web/docs/.vitepress/dist/${NC}"
fi

if [ -d "web/docs/.vitepress/cache" ]; then
    rm -rf web/docs/.vitepress/cache
    echo -e "${GREEN}✓ 清理 web/docs/.vitepress/cache/${NC}"
fi

# 清理 Wails 构建产物
echo -e "\n${YELLOW}🖥️ 清理 Wails 构建产物...${NC}"
if [ -d "web/wails-app/build/bin" ]; then
    rm -rf web/wails-app/build/bin
    echo -e "${GREEN}✓ 清理 web/wails-app/build/bin/${NC}"
fi

if [ -d "web/wails-app/frontend/dist" ]; then
    rm -rf web/wails-app/frontend/dist
    echo -e "${GREEN}✓ 清理 web/wails-app/frontend/dist/${NC}"
fi

# 清理 Go 测试覆盖文件
echo -e "\n${YELLOW}🧪 清理测试文件...${NC}"
find . -name "coverage.out" -o -name "coverage.txt" -o -name "*.test" -type f -delete 2>/dev/null || true
echo -e "${GREEN}✓ 清理 Go 测试覆盖文件${NC}"

# 清理数据库文件
echo -e "\n${YELLOW}💾 清理临时数据库文件...${NC}"
find . -name "*.db" -o -name "*.sqlite" -o -name "*.sqlite3" -type f -delete 2>/dev/null || true
echo -e "${GREEN}✓ 清理临时数据库文件${NC}"

# 清理缓存目录
echo -e "\n${YELLOW}🗂️ 清理缓存目录...${NC}"
find . -name ".cache" -type d -exec rm -rf {} + 2>/dev/null || true
find . -name "__pycache__" -type d -exec rm -rf {} + 2>/dev/null || true
echo -e "${GREEN}✓ 清理缓存目录${NC}"

echo -e "\n${GREEN}✅ 清理完成！${NC}"
echo -e "\n${YELLOW}提示：${NC}"
echo -e "  - 使用 'make clean' 可以执行同样的清理操作"
echo -e "  - 如需清理 node_modules，请手动删除各子应用下的 node_modules 目录"
