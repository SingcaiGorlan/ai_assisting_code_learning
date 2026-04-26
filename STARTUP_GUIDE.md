# AI 学习平台 - 启动指南

## 🎉 前端已升级!

项目前端已使用 **React + Tailwind CSS** 进行了现代化改造,提供更美观、更流畅的用户体验!

## 🚀 快速启动

### 1. 启动前端 (React + Tailwind)

```bash
cd web/react-app
npm run dev
```

前端将运行在: **http://localhost:5173**

### 2. 启动后端服务

#### 方式一: 使用 Docker Compose (推荐)

```bash
# 启动依赖服务 (PostgreSQL, Redis, MinIO)
docker compose -f docker-compose.dev.yml up -d

# 运行数据库迁移
make migrate

# 启动后端服务
make dev
```

#### 方式二: 本地启动

确保已安装并运行:
- PostgreSQL 15 (端口 5432)
- Redis 7 (端口 6379)

然后:

```bash
# 运行数据库迁移
go run cmd/migrate/main.go

# 启动后端
air -c .air.toml
# 或
go run cmd/server/main.go
```

后端将运行在: **http://localhost:8080**

## 📁 项目结构

```
ai_assisting_code_learning/
├── web/
│   ├── react-app/          # ✨ 新的 React + Tailwind 前端
│   │   ├── src/
│   │   │   ├── App.jsx     # 主应用组件
│   │   │   └── index.css   # Tailwind CSS 入口
│   │   ├── tailwind.config.js
│   │   └── package.json
│   └── docs/               # VitePress 文档站点
├── cmd/
│   └── server/             # Go 后端入口
├── internal/               # 业务逻辑
└── configs/                # 配置文件
```

## 🎨 前端特性

- ✨ **渐变背景**: 紫色到蓝色的动态渐变
- 🎯 **响应式设计**: 完美适配各种屏幕尺寸
- 💫 **动画效果**: 悬停缩放、淡入淡出等流畅过渡
- 🌈 **现代化 UI**: 玻璃态效果、圆角卡片、阴影层次
- 📱 **移动端友好**: 自适应布局

## 🔧 开发说明

### 前端开发

```bash
cd web/react-app

# 安装依赖
npm install

# 启动开发服务器 (支持热更新)
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

### 后端开发

```bash
# 安装依赖
go mod download

# 启动开发服务器 (支持热重载)
make dev

# 运行测试
make test

# 代码检查
make lint
```

## 📝 环境变量配置

复制 `.env.example` 为 `.env.local` 并修改配置:

```bash
cp .env.example .env.local
```

需要配置的关键项:
- `OPENAI_API_KEY`: OpenAI API 密钥
- `ALP_JWT_SECRET`: JWT 签名密钥
- 数据库连接信息

## 🐳 Docker 部署

```bash
# 构建镜像
docker build -t ai-learning-platform .

# 运行容器
docker run -p 8080:8080 ai-learning-platform
```

## 🎯 访问地址

- **前端开发**: http://localhost:5173
- **后端 API**: http://localhost:8080
- **健康检查**: http://localhost:8080/health
- **API 文档**: http://localhost:8080/docs

## 💡 技术栈

### 前端
- React 18
- Vite 5
- Tailwind CSS 3
- 现代 JavaScript (ES6+)

### 后端
- Go 1.21
- Gin Framework
- GORM (PostgreSQL ORM)
- Redis 客户端
- JWT 认证

### 基础设施
- PostgreSQL 15
- Redis 7
- MinIO (对象存储)
- Docker & Docker Compose

## 🤝 贡献

欢迎提交 Issue 和 Pull Request!

## 📄 许可证

MIT License
