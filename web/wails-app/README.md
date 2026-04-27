# Wails 桌面应用

这是 AI 辅助代码学习平台的桌面版本,基于 Wails v2 构建。

## ✨ 特性

- 🖥️ **原生体验**: 真正的跨平台桌面应用
- 🚀 **高性能**: 使用系统 WebView,内存占用低
- 📦 **小体积**: 相比 Electron 减小约 80% 体积
- 🔒 **安全**: 本地运行,数据更安全
- 🎨 **现代化界面**: React + Tailwind CSS 打造美观 UI
- 💡 **AI 集成**: 内置 AI 对话和代码辅助功能

## 🛠️ 技术栈

- **框架**: Wails v2
- **后端**: Go 1.21+
- **前端**: React 18 + TypeScript
- **样式**: Tailwind CSS
- **路由**: React Router v6
- **图标**: Lucide React

## 📋 前置要求

### Windows
- Go 1.21+
- Node.js 18+
- WebView2 (Windows 10/11 默认已安装)

### macOS
- Go 1.21+
- Node.js 18+
- Xcode Command Line Tools

### Linux
- Go 1.21+
- Node.js 18+
- WebKit2GTK (Ubuntu: `libwebkit2gtk-4.0-dev`)

## 🚀 快速开始

### 1. 安装依赖

```bash
# 安装 Wails CLI
go install github.com/wailsapp/wails/v2/cmd/wails@latest

# 安装前端依赖
cd frontend
npm install
```

### 2. 开发模式

```bash
# 在项目根目录运行
wails dev
```

这将启动开发服务器并打开应用窗口。

### 3. 构建生产版本

```bash
# 构建桌面应用
wails build

# 指定平台构建
wails build -platform windows/amd64
wails build -platform darwin/amd64
wails build -platform linux/amd64
```

构建产物将生成在 `build/bin` 目录。

## 📁 项目结构

```
wails-app/
├── main.go              # 应用入口
├── app.go               # 应用逻辑层
├── wails.json           # Wails 配置
├── go.mod               # Go 模块
├── frontend/            # 前端代码
│   ├── src/
│   │   ├── components/  # React 组件
│   │   ├── pages/       # 页面组件
│   │   └── styles.css   # 全局样式
│   ├── package.json
│   └── vite.config.ts
└── build/               # 构建输出
    └── bin/             # 可执行文件
```

## 🎯 核心功能

### 用户认证
- 用户注册与登录
- JWT Token 管理
- 会话持久化

### 学习系统
- 课程列表浏览
- 学习进度追踪
- 知识点学习

### AI 辅助
- 智能对话聊天
- 代码分析与建议
- 个性化学习建议

## 🔧 开发指南

### 添加新的 Go 方法

在 `app.go` 中添加公开方法:

```go
func (a *App) MyNewFunction(param string) string {
    // 实现逻辑
    return result
}
```

在前端调用:

```typescript
const result = await window.go.main.App.MyNewFunction(param)
```

### 前端状态管理

推荐使用 React Context 或 Zustand 进行状态管理。

### 调试技巧

- 使用浏览器开发者工具 (F12)
- Go 端使用 `fmt.Println` 输出日志
- 使用 `wails dev` 查看实时日志

## 📝 构建优化

### 减小体积
- 使用 `-ldflags="-s -w"` 移除调试信息
- 启用 UPX 压缩 (需安装 UPX)

### 性能优化
- 避免频繁的 Go-JS 调用
- 使用批量数据处理
- 合理使用缓存

## 🐛 常见问题

### Linux 编译错误
```bash
# Ubuntu/Debian
sudo apt install libwebkit2gtk-4.0-dev

# Fedora
sudo dnf install gtk3-devel webkit2gtk3-devel
```

### macOS 签名问题
使用 `codesign` 对应用进行签名。

### Windows Defender 误报
添加例外或使用代码签名证书。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request!

## 📄 许可证

MIT License
