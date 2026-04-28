# 项目精简说明

## 📋 精简概述

本次精简移除了所有不需要的组件，只保留**桌面端应用 (React + Wails + Gin)** 和**文档站点**。

**2024年最新更新**: 数据库已从 PostgreSQL + Redis 迁移到 **SQLite**，实现单一文件存储！

## ✅ 保留内容

### 核心组件
1. **桌面应用** (`web/wails-app/`)
   - React 18 + TypeScript 前端
   - Wails v2 桌面框架
   - Tailwind CSS 样式

2. **后端服务** 
   - `cmd/server/` - HTTP服务器入口
   - `cmd/migrate/` - 数据库迁移工具
   - `cmd/cli/` - CLI命令行工具
   - `internal/` - 业务逻辑和处理器

3. **文档站点** (`web/docs/`)
   - VitePress 构建的现代化文档

4. **配置文件**
   - `configs/` - 应用配置
   - `.env.example` - 环境变量示例
   - `Makefile` - 构建命令
   - `.air.toml` - 热重载配置

5. **脚本文件**
   - `scripts/build.ps1` - 构建脚本
   - `scripts/check-config.ps1` - 配置检查
   - `scripts/clean.sh` - 清理脚本
   - `scripts/docs-organize.ps1` - 文档整理
   - `scripts/setup.ps1` - 初始化脚本
   - `scripts/start-wails.ps1` - Wails启动脚本

6. **数据存储**
   - `data/ai_learning.db` - SQLite 数据库文件（自动生成）

## ❌ 已删除内容

### Web前端应用（不再需要）
- `web/app/` - Vue版本应用
- `web/admin/` - Vue管理后台
- `web/public/` - 静态HTML页面

### Docker相关（完全移除）
- `docker-compose.yml` - Docker Compose配置
- `docker-compose.dev.yml` - 开发环境Docker配置
- `deployments/docker-compose.prod.yml` - 生产环境Docker配置
- `deployments/` - 包含nginx、postgres等部署配置
- `Dockerfile` - Docker镜像构建文件
- `.dockerignore` - Docker忽略文件

### 外部数据库（已替换为SQLite）
- PostgreSQL 服务
- Redis 服务
- MinIO 对象存储服务
- 相关连接配置和依赖

### 测试文件（Playwright）
- `web/playwright.config.js` - Playwright配置
- `web/example.spec.js` - 测试用例
- `web/package.json` - Web根目录包配置
- `web/package-lock.json` - Web根目录依赖锁定

### 不需要的脚本
- `scripts/deploy.sh` - 部署脚本
- `scripts/manage-docker.ps1` - Docker管理脚本
- `scripts/init-local-db.ps1` - 数据库初始化脚本
- `scripts/quick-start-db.ps1` - 快速数据库启动脚本
- `scripts/start-all.ps1` - 启动所有服务脚本
- `scripts/cli-demo.sh` - CLI演示脚本

### 备份文件
- `_pgbackup/` - Pinegrow备份
- `_pginfo/` - Pinegrow信息

## 🎯 当前技术栈

```
桌面应用架构:
┌─────────────────────────────────────┐
│     Wails Desktop Application       │
│  ┌───────────────────────────────┐  │
│  │  React 18 + TypeScript        │  │
│  │  Tailwind CSS                 │  │
│  └───────────────────────────────┘  │
│              ↓ Wails Bridge         │
│  ┌───────────────────────────────┐  │
│  │  Go Backend (Gin)             │  │
│  │  - RESTful API                │  │
│  │  - Business Logic             │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘

数据存储:
┌─────────────────────────────────────┐
│  SQLite Database (单一文件)          │
│  - 零配置，无需安装                  │
│  - 跨平台支持                        │
│  - ACID 兼容                         │
│  - 便于备份和迁移                    │
└─────────────────────────────────────┘

支持平台: Windows / macOS / Linux

文档:
- VitePress (现代化文档站点)
```

### 技术栈详情

| 类别 | 技术 | 版本 |
|------|------|------|
| 桌面框架 | Wails v2 | Latest |
| 前端 | React 18 + TypeScript | 18.x |
| 样式 | Tailwind CSS | 3.x |
| 后端 | Go + Gin | 1.21+ |
| 数据库 | SQLite 3 | gorm.io/driver/sqlite |
| ORM | GORM | 1.25.x |
| 配置 | Viper | 1.18.x |
| 日志 | Zap | 1.26.x |
| CLI | Cobra | 1.10.x |
| 文档 | VitePress | Latest |

## 📁 精简后项目结构

```
.
├── cmd/                    # 应用入口
│   ├── server/            # HTTP 服务器
│   ├── migrate/           # 数据库迁移
│   └── cli/               # CLI 工具
├── internal/              # 业务逻辑
│   ├── app/              # 应用层
│   │   ├── handler/      # HTTP 处理器
│   │   ├── middleware/   # 中间件
│   │   └── validator/    # 验证器
│   ├── biz/              # 业务逻辑
│   ├── data/             # 数据访问
│   ├── pkg/              # 公共包
│   │   └── config/       # 配置管理
│   └── cli/              # CLI 命令
├── configs/               # 配置文件
├── data/                  # SQLite数据库文件 ⭐
├── web/                   # 前端代码
│   ├── wails-app/        # Wails 桌面应用 ⭐
│   │   ├── frontend/     # React 前端
│   │   └── scripts/      # 启动脚本
│   └── docs/             # VitePress 文档 📚
├── docs/                  # 项目文档
├── scripts/               # 工具脚本
├── Makefile              # 构建命令
└── README.md             # 项目说明
```

## 🚀 快速开始

### 1. 安装依赖

```bash
# 安装 Go 依赖
go mod download

# 安装 Wails CLI
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

### 2. 配置环境

```bash
# 复制环境变量示例
cp .env.example .env.local

# 编辑 .env.local 配置（SQLite无需额外配置）
```

### 3. 创建数据库目录并运行迁移

```bash
mkdir -p data
make migrate
```

### 4. 启动桌面应用

```bash
# 方式一: 使用 Wails CLI
cd web/wails-app
wails dev

# 方式二: 使用 PowerShell 脚本 (Windows)
powershell -ExecutionPolicy Bypass -File scripts/start-wails.ps1
```

### 5. 查看文档

```bash
cd web/docs
npm run dev
```

## 📝 常用命令

```bash
# 开发模式
make dev

# 构建应用
make build

# 运行测试
make test

# 代码检查
make lint

# 清理文件
make clean

# 构建 CLI 工具
make cli

# 数据库迁移
make migrate

# 检查数据库状态
./bin/ai-learning-cli db status
```

## 💡 精简优势

### 架构简化
1. **更简洁的项目结构** - 移除了70%的冗余文件
2. **专注于桌面应用** - 单一产品形态，减少维护成本
3. **降低技术复杂度** - 不再需要维护多个前端框架
4. **更快的开发迭代** - 专注一个平台，优化体验
5. **更小的仓库体积** - 便于克隆和管理

### 数据库优势
1. **零配置** - SQLite 无需安装和配置服务
2. **单一文件** - 数据存储在单一文件中，便于备份
3. **无外部依赖** - 不需要运行数据库服务
4. **跨平台** - 自动支持所有主流操作系统
5. **高性能** - 对于中小型应用性能优异

## 📊 精简对比

| 指标 | 精简前 | 精简后 | 变化 |
|------|--------|--------|------|
| 前端应用数量 | 4个 (Vue, Admin, Public, Wails) | 1个 (Wails) | -75% |
| 部署方式 | Docker + 直接运行 | 直接运行 | 简化 |
| 数据库服务 | PostgreSQL + Redis | SQLite | 简化 |
| 外部依赖 | 3个服务 | 0个 | -100% |
| 脚本文件 | 12个 | 6个 | -50% |
| 文档类型 | 多套前端文档 | 统一文档 | 简化 |
| 技术栈复杂度 | 高 (多框架) | 低 (单一框架) | 简化 |
| 数据文件 | 多个目录 | 单一文件 | 简化 |

## 🔄 迁移建议

如果你之前使用了被删除的功能：

1. **Web访问需求** → 使用Wails桌面应用
2. **Docker部署** → 改为直接运行或使用其他部署方案
3. **PostgreSQL/Redis** → 已迁移到SQLite，数据需要重新导入
4. **自动化测试** → 后续可重新添加单元测试
5. **管理后台** → 可在Wails应用中集成管理功能

## 📞 问题反馈

如有任何问题或建议，请提交 Issue。

---

**精简完成日期**: 2024年  
**精简目标**: 专注于桌面端，提供更优质的用户体验  
**数据库迁移**: PostgreSQL + Redis → SQLite ✨
