# Wails 桌面应用 - 安装与启动指南

## 🚀 快速开始

### 第一步:检查环境要求

确保你的系统已安装以下软件:

```bash
# 检查 Go (需要 1.21+)
go version

# 检查 Node.js (需要 18+)
node --version

# 检查 npm
npm --version
```

如果未安装,请先安装:
- [Go 下载](https://go.dev/dl/)
- [Node.js 下载](https://nodejs.org/)

### 第二步:安装依赖

**Windows 用户:**
```powershell
powershell -ExecutionPolicy Bypass -File scripts/install.ps1
```

**Linux/macOS 用户:**
```bash
make install
```

或者手动执行:
```bash
# 安装 Wails CLI
go install github.com/wailsapp/wails/v2/cmd/wails@latest

# 安装前端依赖
cd frontend
npm install
cd ..
```

### 第三步:启动开发模式

**Windows 用户:**
```powershell
powershell -ExecutionPolicy Bypass -File scripts/dev.ps1
```

**Linux/macOS 用户:**
```bash
make dev
```

或者直接运行:
```bash
wails dev
```

这将:
1. 编译 Go 后端代码
2. 启动 Vite 前端开发服务器
3. 自动打开应用窗口

## 📱 使用应用

启动后,你将看到:

1. **登录页面** - 使用测试账号登录
2. **仪表板** - 查看学习统计
3. **课程页面** - 浏览学习内容
4. **AI 助手** - 智能对话和代码辅助

## 🔧 常用命令

### 开发
```bash
# 启动开发模式(热重载)
wails dev

# 清理构建产物
rm -rf build/
```

### 构建生产版本
```bash
# 构建当前平台
wails build

# 跨平台构建
wails build -platform windows/amd64
wails build -platform darwin/amd64
wails build -platform linux/amd64
```

构建产物在 `build/bin/` 目录。

## 🐛 故障排除

### 问题:应用窗口空白
**解决:** 按 F12 打开开发者工具查看错误

### 问题:Go 编译失败
**解决:** 
```bash
go mod tidy
```

### 问题:前端样式不显示
**解决:**
```bash
cd frontend
npm install
```

### 问题:端口被占用
**解决:** 修改 `frontend/vite.config.ts` 中的端口

## 📚 下一步

- 📖 阅读 [快速入门](QUICK_START.md)
- 🎯 查看 [开发指南](docs/DEVELOPMENT_GUIDE.md)
- ✨ 探索 [功能特性](docs/FEATURES.md)

---

开始你的桌面开发之旅吧! 🎉
