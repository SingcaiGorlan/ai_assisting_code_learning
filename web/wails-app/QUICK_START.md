# Wails 桌面应用快速入门

## 🚀 5分钟开始使用

本指南将帮助你在 5 分钟内启动 Wails 桌面应用。

## 前置要求

确保你的系统已安装:
- ✅ Go 1.21+
- ✅ Node.js 18+
- ✅ npm (通常随 Node.js 一起安装)

### 检查环境

```bash
# 检查 Go
go version

# 检查 Node.js
node --version

# 检查 npm
npm --version
```

## 一键启动

### Windows 用户

```powershell
powershell -ExecutionPolicy Bypass -File scripts/start-wails.ps1
```

选择选项 `1` 安装依赖,然后选择 `2` 启动开发模式。

### Linux/macOS 用户

```bash
cd web/wails-app
make install
make dev
```

## 详细步骤

### 1. 安装 Wails CLI

```bash
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

验证安装:
```bash
wails version
```

### 2. 进入项目目录

```bash
cd web/wails-app
```

### 3. 安装前端依赖

```bash
cd frontend
npm install
cd ..
```

### 4. 启动开发模式

```bash
wails dev
```

首次启动会自动:
- 编译 Go 后端
- 启动 Vite 开发服务器
- 打开应用窗口

## 界面预览

启动后你将看到:

1. **登录页面** - 渐变背景,美观的表单设计
2. **仪表板** - 显示学习统计和最近课程
3. **课程页面** - 浏览和管理学习课程
4. **AI 助手** - 智能对话和代码辅助

## 常用命令

```bash
# 开发模式 (热重载)
wails dev

# 构建生产版本
wails build

# 清理构建产物
rm -rf build/
```

## 开发工作流

### 修改 Go 代码

1. 编辑 `app.go` 添加新方法
2. 前端自动调用 (通过 `window.go.main.App.MethodName`)
3. 应用自动重启

### 修改前端代码

1. 编辑 `frontend/src/` 下的文件
2. Vite 热模块替换 (HMR) 自动更新
3. 无需刷新页面

### 调试技巧

**前端调试:**
```typescript
console.log('数据:', data)
```

**Go 端调试:**
```go
import "fmt"
fmt.Println("变量:", variable)
```

## 下一步

- 📖 阅读 [开发指南](docs/DEVELOPMENT_GUIDE.md) 了解更多
- 🎨 自定义 UI 组件和样式
- 🔌 集成真实的后端 API
- 📦 构建多平台版本

## 常见问题

### Q: 应用窗口空白?
A: 检查浏览器控制台 (F12) 查看错误信息

### Q: Go 编译失败?
A: 确保 Go 版本 >= 1.21,运行 `go mod tidy`

### Q: 前端样式不显示?
A: 确保 Tailwind CSS 正确安装,检查 `tailwind.config.js`

### Q: 端口被占用?
A: 修改 `frontend/vite.config.ts` 中的端口配置

## 获取帮助

- 💬 [GitHub Issues](https://github.com/your-repo/issues)
- 📚 [Wails 官方文档](https://wails.io/)
- 🎯 [项目 README](README.md)

---

开始编码吧! 🎉
