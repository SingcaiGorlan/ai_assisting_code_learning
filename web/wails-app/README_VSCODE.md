# AI 辅助代码学习平台 - VS Code 风格桌面应用

基于 Wails v2 构建的跨平台桌面应用，采用类似 VS Code 的专业界面设计。

## ✨ 新特性：VS Code 风格界面

### 🎨 界面组件

- **活动栏 (Activity Bar)** - 左侧图标导航栏，类似 VS Code
- **侧边栏 (Sidebar)** - 250px 宽的导航菜单
- **标签栏 (Tab Bar)** - 顶部页面标签切换
- **状态栏 (Status Bar)** - 底部蓝色状态信息栏
- **深色主题** - 专业的开发者体验

###  核心组件

```
frontend/src/
├── components/
│   ├── Sidebar.tsx      # VS Code 风格侧边栏
│   ├── TabBar.tsx       # 标签栏
│   ├── StatusBar.tsx    # 状态栏
│   └── Navbar.tsx       # 旧版导航（保留）
└── pages/
    ├── Dashboard.tsx    # 仪表板（VS Code 风格）
    ├── Lessons.tsx      # 课程页
    ├── Chat.tsx         # AI 助手
    └── Login.tsx        # 登录页
```

## 🎨 配色方案

采用 VS Code 经典配色：

| 元素 | 颜色 | 说明 |
|------|------|------|
| 主背景 | `#1e1e1e` | 深灰色 |
| 侧边栏 | `#252526` | 稍浅灰色 |
| 活动栏 | `#333333` | 更浅灰色 |
| 状态栏 | `#007acc` | VS Code 蓝色 |
| 选中项 | `#094771` | 深蓝色高亮 |

##  快速开始

### 1. 安装依赖

```bash
# Windows
cd web/wails-app
powershell -ExecutionPolicy Bypass -File scripts/install.ps1

# Linux/macOS
cd web/wails-app
make install
```

### 2. 启动开发模式

```bash
# Windows
powershell -ExecutionPolicy Bypass -File scripts/dev.ps1

# Linux/macOS
make dev

# 或直接使用
wails dev
```

### 3. 构建生产版本

```bash
# Windows
powershell -ExecutionPolicy Bypass -File scripts/build.ps1

# Linux/macOS
make build

# 或直接使用
wails build
```

##  技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 桌面框架 | Wails | v2.8.0 |
| 后端 | Go | 1.21+ |
| 前端 | React | 18.2.0 |
| 类型 | TypeScript | 5.3.3 |
| 样式 | Tailwind CSS | 3.3.6 |
| 路由 | React Router | 6.20.0 |
| 图标 | Lucide React | 0.294.0 |
| 构建 | Vite | 5.0.8 |

##  项目结构

```
web/wails-app/
├── frontend/               # React 前端
│   ├── src/
│   │   ├── components/    # UI 组件
│   │   │   ├── Sidebar.tsx      # ⭐ 侧边栏
│   │   │   ├── TabBar.tsx       # ⭐ 标签栏
│   │   │   ├── StatusBar.tsx    # ⭐ 状态栏
│   │   │   └── Navbar.tsx       # 旧版导航
│   │   ├── pages/         # 页面组件
│   │   │   ├── Dashboard.tsx    # ⭐ 仪表板
│   │   │   ├── Lessons.tsx      # 课程页
│   │   │   ├── Chat.tsx         # AI 助手
│   │   │   └── Login.tsx        # 登录页
│   │   ├── App.tsx        # 主应用
│   │   ├── styles.css     # 全局样式
│   │   └── wailsjs/       # Wails 桥接
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── app.go                 # Go 业务逻辑
├── main.go                # 应用入口
├── wails.json             # Wails 配置
└── docs/                  # 文档
    ├── VS_CODE_STYLE.md   # ⭐ VS Code 风格文档
    ├── DEVELOPMENT_GUIDE.md
    ── FEATURES.md
```

## 🎯 界面预览

### 登录后主界面

```
┌─────────────────────────────────────────────────────┐
│ 📄  导航菜单    │  仪表板                           │
│ 🔍              │  欢迎回来！👋                     │
│ 🔀              │                                   │
│ 🐛              │  ───┐ ┌───┐ ┌───┐ ┌───┐        │
│ 📦              │  │ 3 │ │24h│ │45%│ │128│        │
│                 │  └─── └───┘ └─── └───┘        │
│               │                                   │
│ 🔌              │  最近学习                         │
│                 │  ┌──────────────────────┐        │
│                 │  │ Go 语言基础    [||||] │        │
│                 │  │ Web 开发实战   [||]   │        │
│                 │  │ 数据库设计     [     ] │        │
│                 │  └──────────────────────┘        │
│                 │                                   │
│                 │  ┌──────────┐ ┌──────────┐       │
│                 │  │ 继续学习 │ │ AI 助手  │       │
│                 │  └──────────┘ └──────────┘       │
─────────────────────────────────────────────────────┤
│  main  ✓ 0 错误  🔔 0 警告  │  Ln 1  UTF-8  TS     │
──────────────────────────────────────────────────────
```

##  开发指南

### 添加新页面

1. 在 `pages/` 目录创建新页面组件
2. 在 `App.tsx` 中添加路由
3. 在 `Sidebar.tsx` 中添加导航项
4. 在 `TabBar.tsx` 中添加标签

### 修改配色

编辑组件中的 Tailwind 类：

```tsx
// 主背景
className="bg-[#1e1e1e]"

// 侧边栏
className="bg-[#252526]"

// 选中状态
className="bg-[#094771]"
```

### 自定义滚动条

在 `styles.css` 中修改：

```css
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-thumb {
  background: #424242;
}
```

## 📚 文档

- [VS Code 风格设计文档](docs/VS_CODE_STYLE.md) - 详细设计说明
- [开发指南](docs/DEVELOPMENT_GUIDE.md) - 完整开发文档
- [功能特性](docs/FEATURES.md) - 功能说明
- [快速入门](QUICK_START.md) - 5 分钟上手

## ️ 前置要求

### Windows
- Go 1.21+
- Node.js 18+
- WebView2（Windows 10/11 默认已安装）

### macOS
- Go 1.21+
- Node.js 18+
- Xcode Command Line Tools

### Linux
- Go 1.21+
- Node.js 18+
- WebKit2GTK (`libwebkit2gtk-4.0-dev`)

## 📦 构建配置

### 单平台构建

```bash
# 当前平台
wails build

# 指定平台
wails build -platform windows/amd64
wails build -platform darwin/amd64
wails build -platform linux/amd64
```

### 优化选项

```bash
# 移除调试信息
wails build -ldflags="-s -w"

# UPX 压缩
wails build -upx
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

MIT License

## 🎉 特色功能

✅ VS Code 风格界面  
✅ 深色主题  
✅ 活动栏导航  
✅ 标签页切换  
✅ 状态栏信息  
✅ 自定义滚动条  
✅ 响应式布局  
✅ 平滑动画  
✅ 用户认证  
✅ AI 对话  
✅ 课程学习  

---

**享受专业的开发者体验！** 🚀
