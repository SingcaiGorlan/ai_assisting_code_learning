#!/bin/bash

# ============================================
# CLI 工具快速演示脚本
# 展示如何使用 CLI 工具进行日常操作
# ============================================

set -e

echo "=========================================="
echo "AI Learning Platform CLI 快速演示"
echo "=========================================="
echo ""

# 检查CLI是否已构建
if [ ! -f "./bin/ai-learning-cli" ]; then
    echo "📦 首次运行，正在构建 CLI 工具..."
    make cli
fi

CLI="./bin/ai-learning-cli"

# 1. 显示版本
echo "1️⃣  查看版本信息"
echo "-------------------------------------------"
$CLI version
echo ""
read -p "按回车继续..."

# 2. 查看配置
echo "2️⃣  查看当前配置"
echo "-------------------------------------------"
$CLI config get
echo ""
read -p "按回车继续..."

# 3. 测试数据库连接
echo "3️⃣  测试数据库连接"
echo "-------------------------------------------"
$CLI db status || echo "⚠️  数据库未启动（这是正常的）"
echo ""
read -p "按回车继续..."

# 4. 查看可用命令
echo "4️⃣  查看所有可用命令"
echo "-------------------------------------------"
$CLI --help
echo ""
read -p "按回车继续..."

# 5. 查看数据库命令
echo "5️⃣  查看数据库相关命令"
echo "-------------------------------------------"
$CLI db --help
echo ""
read -p "按回车继续..."

# 6. 查看用户管理命令
echo "6️⃣  查看用户管理命令"
echo "-------------------------------------------"
$CLI user --help
echo ""
read -p "按回车继续..."

# 7. 查看AI功能命令
echo "7️⃣  查看AI功能命令"
echo "-------------------------------------------"
$CLI ai --help
echo ""
read -p "按回车继续..."

echo "=========================================="
echo "✅ 演示完成！"
echo "=========================================="
echo ""
echo "下一步："
echo "  1. 启动服务: make dev"
echo "  2. 运行迁移: $CLI db migrate"
echo "  3. 创建用户: $CLI user create admin admin@example.com"
echo "  4. AI聊天: $CLI ai chat"
echo ""
echo "更多详情: cat docs/CLI_GUIDE.md"
echo ""
