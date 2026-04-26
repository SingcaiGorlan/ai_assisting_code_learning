# 🚀 快速开始

欢迎来到 AI 学习平台！本指南将帮助你快速上手。

## 📋 环境要求

✅ **必需环境**
- Node.js >= 18（用于 VitePress）
- Go 1.21+
- Docker & Docker Compose（用于运行数据库）
- PostgreSQL 15
- Redis 7

## 🔧 安装步骤

### 1. 克隆项目
```bash
git clone https://github.com/SingcaiGorlan/ai_assisting_code_learning.git
cd ai_assisting_code_learning
```

### 2. 安装依赖
```bash
make setup
```

### 3. 启动数据库服务
```bash
make docker-up
```

### 4. 运行应用
```bash
go run ./cmd/server
```

应用将在 `http://localhost:8080` 启动。

## 📚 文档开发

### 本地开发 VitePress

```bash
cd web
npm install
npm run docs:dev
```

然后在浏览器中打开显示的开发服务器 URL。

### 构建静态文档

```bash
cd web
npm run docs:build
```

生成的文件将在 `web/docs/.vitepress/dist` 目录中。

### 生产部署

**方案 A：使用 VitePress 内置服务器**
```bash
cd web
npm run docs:serve
```

**方案 B：使用静态服务器托管**

复制 `docs/.vitepress/dist` 到任何静态服务器（Nginx/S3/CDN）

## 📖 首次使用

1. **访问首页** - 了解平台功能
2. **查看 API 文档** - 理解可用的 API 端点
3. **打开应用** - 访问 `http://localhost:8080` 使用交互界面
4. **开始学习** - 提交代码获取 AI 反馈

## ⚠️ 常见问题

**Q: 数据库连接失败？**
A: 确保 Docker 容器已启动：`docker ps` 查看容器状态

**Q: 端口已被占用？**
A: 修改 `.env.local` 中的 `ALP_SERVER_PORT` 配置

**Q: AI 功能不工作？**
A: 检查 `.env.local` 中是否正确设置了 `OPENAI_API_KEY`

## 🆘 获取帮助

- 📖 [查看完整文档](/guide/api)
- 🐛 [报告问题](https://github.com/SingcaiGorlan/ai_assisting_code_learning/issues)
- 💬 [讨论建议](https://github.com/SingcaiGorlan/ai_assisting_code_learning/discussions)
