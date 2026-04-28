# AI 辅助代码学习平台

基于 Go + Gin + React + Wails 构建的 AI 驱动代码学习桌面应用。

## ✨ 项目简介

这是一个专注于**桌面端**的 AI 辅助代码学习平台，采用现代化的技术栈：

- 🖥️ **桌面应用**: 基于 Wails v2 + React + TypeScript 构建跨平台桌面应用
- ⚙️ **后端服务**: Go + Gin 提供高性能 RESTful API
- 📚 **文档站点**: VitePress 构建的现代化文档
- 🎨 **精美界面**: React + Tailwind CSS 打造流畅用户体验

### 🖥️ 桌面应用特性

- ⚡ 原生性能，内存占用低
- 📦 体积小巧（相比 Electron 减小 80%）
- 🔒 本地运行，数据更安全
- 🎨 现代化渐变背景和玻璃态设计
- 💻 支持 Windows/macOS/Linux

## 📁 项目结构

```
.
├── cmd/                    # 应用入口
│   ├── server/            # HTTP 服务器
│   ├── migrate/           # 数据库迁移工具
│   └── cli/               # CLI 命令行工具
├── internal/              # 私有应用代码
│   ├── app/              # 应用初始化
│   │   ├── handler/      # HTTP 处理器
│   │   ├── middleware/   # 中间件
│   │   └── validator/     # 验证器
│   ├── biz/              # 业务逻辑
│   ├── data/             # 数据访问层
│   ├── pkg/              # 公共包
│   │   └── config/       # 配置管理
│   └── cli/              # CLI 命令
├── configs/               # 配置文件
├── data/                  # SQLite数据库文件 (自动生成)
├── web/                  # 前端代码
│   ├── wails-app/        # Wails 桌面应用
│   │   ├── main.go       # 应用入口
│   │   ├── app.go        # Go 应用逻辑
│   │   ├── frontend/     # React 前端
│   │   └── scripts/      # PowerShell 脚本
│   └── docs/             # VitePress 文档站点
├── docs/                 # 文档
├── tests/                # 测试
├── scripts/              # 脚本
├── go.mod               # Go 模块定义
├── Makefile             # Make 命令
└── README.md             # 项目说明
```

## 🔧 配置说明

### 环境变量 (.env.local)

```bash
# 服务器配置
ALP_SERVER_HOST=0.0.0.0
ALP_SERVER_PORT=8080
ALP_SERVER_MODE=debug

# 数据库配置 (SQLite)
ALP_DB_PATH=./data/ai_learning.db

# AI配置
OPENAI_API_KEY=your-openai-api-key
ALP_AI_MODEL=gpt-3.5-turbo

# JWT配置
ALP_JWT_SECRET=your-jwt-secret-key-change-in-production
```

### 配置文件 (configs/config.yaml)

配置文件支持 YAML 格式，环境变量会覆盖配置文件中的值。

**SQLite 优势：**
- ✅ **零配置**: 无需安装数据库服务
- ✅ **单一文件**: 数据存储在单一文件中，便于备份和迁移
- ✅ **嵌入式**: 直接嵌入应用程序，无网络依赖
- ✅ **跨平台**: 支持 Windows/macOS/Linux
- ✅ **高性能**: 对于中小型应用性能优异

## 📋 功能特性

- ✅ **用户管理**: 用户注册、登录、个人资料管理
- ✅ **学习系统**: 知识点学习、学习进度追踪
- ✅ **AI 辅助**: 智能对话、代码辅助、学习建议
- ✅ **题库系统**: 习题练习、自动评分
- ✅ **对话记录**: 学习对话历史保存与分析

## 🛠️ 技术栈

- **后端**: Go 1.21, Gin, GORM
- **数据库**: SQLite (单一文件)
- **桌面框架**: Wails v2
- **前端**: React 18, TypeScript, Tailwind CSS
- **文档**: VitePress
- **配置管理**: Viper
- **日志**: Zap
- **CLI工具**: Cobra

## 🚀 快速开始

### 环境要求

- Go 1.21+
- Node.js 18+
- Wails CLI (用于桌面应用开发)

### 安装步骤

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd ai_assisting_code_learning
   ```

2. **初始化开发环境**

   - **Windows（PowerShell）**
   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts/setup.ps1
   ```

   - **macOS/Linux**
   ```bash
   make setup
   ```

3. **配置环境变量**
   ```bash
   cp .env.example .env.local
   # 编辑 .env.local 文件，填入必要的配置
   ```

4. **运行数据库迁移**
   ```bash
   make migrate
   # 或
   go run cmd/migrate/main.go
   ```

5. **启动服务**

   ### 🖥️ 桌面应用 (推荐!)
   
   **Windows:**
   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts/start-wails.ps1
   ```
   
   **Linux/macOS:**
   ```bash
   cd web/wails-app
   ./start.sh
   ```
   
   或直接使用:
   ```bash
   cd web/wails-app
   wails dev
   ```

   ### 后端 (Go)
   ```bash
   # 方式一: 使用 air 热重载
   make dev
   
   # 方式二: 直接运行
   go run cmd/server/main.go
   ```
   后端将运行在: http://localhost:8080

   > 💡 **提示**: Wails 桌面应用提供原生性能，体积更小，内存占用更低，推荐使用！