# 🚀 SQLite 版本快速开始指南

## ✨ 欢迎使用简化版 AI 辅助代码学习平台

本项目现已完全基于 **SQLite**，无需安装任何数据库服务！

---

## 📋 前置要求

只需以下工具即可开始：

- ✅ Go 1.21+
- ✅ Node.js 18+（如需开发前端）
- ✅ Wails CLI（可选，用于桌面应用）

**不再需要：**
- ❌ PostgreSQL
- ❌ Redis
- ❌ Docker
- ❌ MinIO

---

## 🎯 5分钟快速启动

### 步骤 1: 克隆项目

```bash
git clone <repository-url>
cd ai_assisting_code_learning
```

### 步骤 2: 安装依赖

```bash
# 安装 Go 依赖
go mod download

# 安装开发工具（可选）
make setup
```

### 步骤 3: 配置环境

```bash
# 复制配置文件
cp .env.example .env.local

# 编辑 .env.local（SQLite 通常无需修改）
# ALP_DB_PATH=./data/ai_learning.db
```

### 步骤 4: 创建数据库目录

```bash
mkdir -p data
```

### 步骤 5: 运行迁移

```bash
make migrate
# 或
go run cmd/migrate/main.go
```

### 步骤 6: 启动应用

#### 选项 A: 启动后端 API

```bash
# 开发模式（热重载）
make dev

# 或直接运行
go run cmd/server/main.go
```

访问: http://localhost:8080

#### 选项 B: 启动桌面应用（推荐）

```bash
cd web/wails-app
wails dev
```

这将打开桌面应用窗口。

---

## 🔧 常用命令

### 开发

```bash
# 启动开发服务器
make dev

# 构建项目
make build

# 运行测试
make test
```

### 数据库

```bash
# 检查数据库状态
./bin/ai-learning-cli db status

# 运行迁移
./bin/ai-learning-cli db migrate

# 填充数据
./bin/ai-learning-cli db seed
```

### CLI 工具

```bash
# 构建 CLI
make cli

# 查看帮助
./bin/ai-learning-cli --help

# 查看配置
./bin/ai-learning-cli config get
```

---

## 📁 项目结构

```
ai_assisting_code_learning/
├── cmd/              # 应用程序入口
│   ├── server/      # HTTP 服务器
│   ├── migrate/     # 数据库迁移
│   └── cli/         # CLI 工具
├── internal/        # 业务逻辑
├── configs/         # 配置文件
├── data/            # SQLite 数据库文件 ⭐
│   └── ai_learning.db
├── web/
│   ├── wails-app/   # Wails 桌面应用
│   └── docs/        # VitePress 文档
└── scripts/         # 工具脚本
```

---

## ⚙️ 配置说明

### 环境变量 (.env.local)

```bash
# 服务器配置
ALP_SERVER_HOST=0.0.0.0
ALP_SERVER_PORT=8080
ALP_SERVER_MODE=debug

# 数据库配置（SQLite）
ALP_DB_PATH=./data/ai_learning.db

# AI 配置
OPENAI_API_KEY=your-openai-api-key

# JWT 配置
ALP_JWT_SECRET=your-secret-key
```

### YAML 配置 (configs/config.yaml)

```yaml
server:
  host: "0.0.0.0"
  port: 8081
  mode: "debug"

database:
  driver: "sqlite"
  path: "./data/ai_learning.db"

ai:
  provider: "openai"
  api_key: "${OPENAI_API_KEY}"
  model: "gpt-3.5-turbo"
```

---

## 💡 SQLite 优势

### 🎉 零配置
- 无需安装数据库服务
- 无需配置用户和权限
- 开箱即用

### 📦 易于部署
- 单一文件存储所有数据
- 备份只需复制文件
- 部署极其简单

### 🚀 高性能
- 读取速度极快
- 支持并发写入（WAL模式）
- 适合中小型应用

### 🔒 可靠
- ACID 兼容
- 事务安全
- 崩溃恢复

---

## 🔍 验证安装

### 检查数据库

```bash
# 查看数据库文件
ls -lh data/

# 使用 SQLite CLI 检查
sqlite3 data/ai_learning.db ".tables"
```

### 测试 API

```bash
# 健康检查
curl http://localhost:8080/health

# 应该返回: {"status":"ok","service":"ai-learning-platform"}
```

---

## ❓ 常见问题

### Q: 如何备份数据库？

A: 直接复制数据库文件：
```bash
cp data/ai_learning.db backups/ai_learning_backup_$(date +%Y%m%d).db
```

### Q: 数据库文件太大怎么办？

A: 
1. 清理无用数据
2. 运行 VACUUM 优化：
```bash
sqlite3 data/ai_learning.db "VACUUM;"
```

### Q: 可以在多台机器上同步吗？

A: 可以，但注意：
- SQLite 是本地数据库，不支持远程连接
- 可以通过文件同步工具（如 Dropbox）同步
- 避免同时写入

### Q: 如何恢复到 PostgreSQL？

A: 参考 [SQLITE_MIGRATION.md](SQLITE_MIGRATION.md) 中的迁移指南。

---

## 📚 下一步

1. 📖 阅读 [完整文档](docs/index.md)
2. 🔧 查看 [配置指南](README.md#-配置说明)
3. 📝 了解 [API 接口](README.md#-api-接口)
4. 🤝 参与 [贡献指南](README.md#-贡献指南)

---

## 🆘 获取帮助

遇到问题？试试：

1. 查看 [PROJECT_CLEANUP.md](PROJECT_CLEANUP.md) 了解项目变更
2. 阅读 [SQLITE_MIGRATION.md](SQLITE_MIGRATION.md) 了解 SQLite
3. 提交 Issue 到 GitHub

---

**祝你使用愉快！** 🎉
