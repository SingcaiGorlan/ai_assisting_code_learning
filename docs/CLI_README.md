# AI Learning Platform CLI

## 概述

AI Learning Platform CLI 是一个功能强大的命令行工具，用于管理和操作 AI 辅助代码学习平台。它提供了数据库管理、用户操作、课程管理和 AI 功能等多种命令。

## 特性

- 🔧 **配置管理**: 查看和管理平台配置
- 💾 **数据库操作**: 迁移、填充、状态检查
- 👥 **用户管理**: 创建、删除、列出用户
- 📚 **课程管理**: 管理课程和学习材料
- 🤖 **AI 功能**: 聊天、代码辅助、API 测试
- 📊 **系统监控**: 检查服务状态和连接

## 安装

### 从源码构建

```bash
# 克隆项目
git clone https://github.com/SingcaiGorlan/ai_assisting_code_learning.git

# 进入项目目录
cd ai_assisting_code_learning

# 构建 CLI
make cli

# 运行 CLI
./bin/ai-learning-cli --help
```

## 快速开始

### 1. 检查配置

```bash
./bin/ai-learning-cli config get
```

### 2. 测试数据库连接

```bash
./bin/ai-learning-cli db status
```

### 3. 运行数据库迁移

```bash
./bin/ai-learning-cli db migrate
```

### 4. 启动 AI 聊天

```bash
./bin/ai-learning-cli ai chat
```

## 完整命令列表

| 命令 | 描述 | 示例 |
|------|------|------|
| `version` | 显示版本信息 | `./bin/ai-learning-cli version` |
| `config get` | 查看当前配置 | `./bin/ai-learning-cli config get` |
| `db status` | 检查数据库连接 | `./bin/ai-learning-cli db status` |
| `db migrate` | 运行数据库迁移 | `./bin/ai-learning-cli db migrate` |
| `db seed` | 填充示例数据 | `./bin/ai-learning-cli db seed` |
| `user list` | 列出所有用户 | `./bin/ai-learning-cli user list` |
| `user create` | 创建新用户 | `./bin/ai-learning-cli user create username email -p password` |
| `user delete` | 删除用户 | `./bin/ai-learning-cli user delete user-id -f` |
| `lesson list` | 列出所有课程 | `./bin/ai-learning-cli lesson list` |
| `lesson get` | 获取课程详情 | `./bin/ai-learning-cli lesson get lesson-id` |
| `ai chat` | 启动 AI 聊天 | `./bin/ai-learning-cli ai chat` |
| `ai code` | 请求代码帮助 | `./bin/ai-learning-cli ai code "explain binary search"` |
| `ai test` | 测试 AI API | `./bin/ai-learning-cli ai test` |

## 使用场景

### 开发环境设置

```bash
# 1. 检查配置
./bin/ai-learning-cli config get

# 2. 测试数据库
./bin/ai-learning-cli db status

# 3. 运行迁移
./bin/ai-learning-cli db migrate

# 4. 填充数据
./bin/ai-learning-cli db seed

# 5. 创建测试用户
./bin/ai-learning-cli user create devuser dev@example.com -p "devpass"
```

### 日常维护

```bash
# 检查系统状态
./bin/ai-learning-cli db status
./bin/ai-learning-cli ai test

# 查看用户列表
./bin/ai-learning-cli user list

# 清理旧数据
./bin/ai-learning-cli user delete old-user-id -f
```

### AI 功能测试

```bash
# 测试 API 连接
./bin/ai-learning-cli ai test

# 启动交互式聊天
./bin/ai-learning-cli ai chat

# 快速代码查询
./bin/ai-learning-cli ai code "how to implement a stack in Go"
```

## 开发指南

### 添加新命令

1. 在 `internal/cli/cmd/` 目录下创建新的 Go 文件
2. 使用 [cobra](https://github.com/spf13/cobra) 定义命令
3. 在 `root.go` 中注册命令
4. 重新构建: `make cli`

示例命令结构：

```go
package cmd

import (
    "fmt"
    "github.com/spf13/cobra"
)

var myCmd = &cobra.Command{
    Use:   "mycommand",
    Short: "My custom command",
    Long:  "Detailed description",
    RunE: func(cmd *cobra.Command, args []string) error {
        // 实现命令逻辑
        fmt.Println("Executing my command!")
        return nil
    },
}

func init() {
    rootCmd.AddCommand(myCmd)
}
```

### 项目结构

```
cmd/cli/
└── main.go              # CLI 入口点
internal/cli/cmd/
├── root.go              # 根命令和命令注册
├── config.go            # 配置管理命令
├── db.go                # 数据库操作命令
├── user.go              # 用户管理命令
├── lesson.go            # 课程管理命令
└── ai.go                # AI 功能命令
```

## 依赖

- [cobra](https://github.com/spf13/cobra) - CLI 命令框架
- [viper](https://github.com/spf13/viper) - 配置管理
- [gorm](https://gorm.io/) - 数据库 ORM

## 贡献

欢迎为 CLI 工具贡献代码！请遵循以下步骤：

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证。详见 [LICENSE](../LICENSE) 文件。

## 相关资源

- [项目主 README](../README.md)
- [CLI 详细指南](docs/CLI_GUIDE.md)
- [项目结构说明](docs/PROJECT_STRUCTURE.md)
- [GitHub 仓库](https://github.com/SingcaiGorlan/ai_assisting_code_learning)

## 支持

如遇到问题，请：

1. 查看文档
2. 搜索已有的 Issues
3. 创建新的 Issue

---

**Made with ❤️ by the AI Learning Platform Team**