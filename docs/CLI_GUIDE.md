# CLI 工具使用指南

AI Learning Platform 提供了一个功能强大的命令行界面（CLI）工具，用于管理和操作平台。

## 🚀 快速开始

### 构建 CLI

```bash
make cli
```

这将在 `bin/ai-learning-cli` 生成可执行文件。

### 运行 CLI

```bash
# 查看帮助
./bin/ai-learning-cli --help

# 或直接运行
make cli-run
```

## 📋 可用命令

### 1. 版本信息

```bash
./bin/ai-learning-cli version
```

显示 CLI 工具的版本号。

### 2. 配置管理

#### 查看当前配置

```bash
./bin/ai-learning-cli config get
```

显示服务器、数据库、Redis 和 AI 服务的配置信息。

### 3. 数据库操作

#### 检查数据库连接

```bash
./bin/ai-learning-cli db status
```

验证数据库连接并显示连接信息。

#### 运行数据库迁移

```bash
./bin/ai-learning-cli db migrate
```

执行数据库 schema 迁移，创建或更新表结构。

#### 填充示例数据

```bash
./bin/ai-learning-cli db seed
```

向数据库中插入示例数据，用于开发和测试。

### 4. 用户管理

#### 列出所有用户

```bash
./bin/ai-learning-cli user list
```

显示系统中所有已注册的用户。

#### 创建新用户

```bash
# 使用默认密码
./bin/ai-learning-cli user create username email@example.com

# 指定密码
./bin/ai-learning-cli user create username email@example.com -p "securepass123"
```

#### 删除用户

```bash
# 需要确认
./bin/ai-learning-cli user delete user-id

# 强制删除，跳过确认
./bin/ai-learning-cli user delete user-id -f
```

### 5. 课程管理

#### 列出所有课程

```bash
./bin/ai-learning-cli lesson list
```

显示所有可用的课程和学习材料。

#### 获取课程详情

```bash
./bin/ai-learning-cli lesson get lesson-id
```

显示特定课程的详细信息。

### 6. AI 功能

#### 启动交互式聊天

```bash
./bin/ai-learning-cli ai chat
```

启动与 AI 助手的交互式聊天会话。输入 `quit` 或 `exit` 结束会话。

#### 代码辅助

```bash
./bin/ai-learning-cli ai code "explain how to implement a binary search tree in Go"
```

请求 AI 协助生成或解释代码。

#### 测试 AI API 连接

```bash
./bin/ai-learning-cli ai test
```

验证 AI 服务配置是否正确并可访问。

## 💡 使用示例

### 完整的工作流示例

```bash
# 1. 检查配置
./bin/ai-learning-cli config get

# 2. 测试数据库连接
./bin/ai-learning-cli db status

# 3. 运行迁移
./bin/ai-learning-cli db migrate

# 4. 填充示例数据
./bin/ai-learning-cli db seed

# 5. 创建测试用户
./bin/ai-learning-cli user create testuser test@example.com -p "testpass"

# 6. 测试 AI 连接
./bin/ai-learning-cli ai test

# 7. 启动 AI 聊天
./bin/ai-learning-cli ai chat
```

### 日常开发

```bash
# 快速检查系统状态
./bin/ai-learning-cli db status
./bin/ai-learning-cli ai test

# 查看当前用户列表
./bin/ai-learning-cli user list
```

## 🔧 全局标志

所有命令都支持以下全局标志：

- `-h, --help`: 显示帮助信息
- `-v, --version`: 显示版本信息

## 📝 配置文件

CLI 工具使用与主应用相同的配置文件：

- `configs/config.yaml`: 默认配置
- `configs/config.local.yaml`: 本地覆盖配置（需手动创建）
- `.env.local`: 环境变量

确保在运行 CLI 之前正确配置了这些文件。

## 🛠️ 开发新命令

要添加新的 CLI 命令，请遵循以下步骤：

1. 在 `internal/cli/cmd/` 目录下创建新的 Go 文件
2. 使用 [cobra](https://github.com/spf13/cobra) 库定义命令
3. 在 `root.go` 中注册新命令
4. 重新构建 CLI: `make cli`

示例：

```go
package cmd

import (
    "fmt"
    "github.com/spf13/cobra"
)

var myCmd = &cobra.Command{
    Use:   "mycommand",
    Short: "My custom command",
    Long:  "Detailed description of my command",
    Run: func(cmd *cobra.Command, args []string) {
        fmt.Println("Hello from my command!")
    },
}

func init() {
    rootCmd.AddCommand(myCmd)
}
```

## 📊 当前状态

⚠️ **注意**: 目前 CLI 框架已搭建完成，但部分命令的具体实现仍在进行中。

**已实现的功能**:
- ✅ 命令框架和结构
- ✅ 配置查看
- ✅ 数据库连接测试
- ✅ 命令帮助文档

**待实现的功能**:
- ⏳ 实际的数据库操作（迁移、填充）
- ⏳ 用户 CRUD 操作
- ⏳ 课程管理
- ⏳ AI 聊天集成
- ⏳ 代码生成功能

## 🤝 贡献

欢迎为 CLI 工具添加新功能和完善现有功能。请参考项目的贡献指南。

## 📖 相关文档

- [项目结构说明](./PROJECT_STRUCTURE.md)
- [主应用 README](../README.md)
- [API 文档](../docs/api/)
