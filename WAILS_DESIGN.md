# Wails 桌面应用设计方案

## 📋 项目概述

本项目使用 **Wails v2** 为 AI 辅助代码学习平台构建了跨平台桌面应用,提供与 Web 版相同的功能和更优秀的用户体验。

## 🎯 设计目标

1. **跨平台支持**: Windows、macOS、Linux 一套代码全平台运行
2. **原生性能**: 利用系统 WebView,实现低内存占用和高性能
3. **小体积**: 相比 Electron 方案减小 80% 体积
4. **美观 UI**: React + Tailwind CSS 打造现代化界面
5. **功能完整**: 包含登录、课程、AI 对话等全部功能

## 🏗️ 架构设计

```
┌──────────────────────────────────────┐
│          用户界面层 (React)           │
│  ┌──────────┬──────────┬──────────┐  │
│  │  Login   │Dashboard │ Lessons  │  │
│  │  登录页  │ 仪表板   │ 课程页   │  │
│  └──────────┴──────────┴──────────┘  │
└──────────────────┬───────────────────┘
                   │
         Wails Bridge (通信层)
                   │
┌──────────────────▼───────────────────┐
│          业务逻辑层 (Go)             │
│  ┌──────────────────────────────┐   │
│  │   app.go - 应用方法          │   │
│  │   - Login/Register           │   │
│  │   - GetLessons               │   │
│  │   - ChatWithAI               │   │
│  │   - CodeAssist               │   │
│  └──────────────────────────────┘   │
└──────────────────────────────────────┘
```

## 📁 文件结构

```
web/wails-app/
├── main.go                 # Wails 应用入口
├── app.go                  # Go 业务逻辑
├── wails.json              # 项目配置
├── go.mod                  # Go 依赖
├── Makefile                # Make 命令
├── README.md               # 项目说明
├── QUICK_START.md          # 快速入门
├── scripts/                # PowerShell 脚本
│   ├── install.ps1        # 安装依赖
│   ├── dev.ps1            # 启动开发
│   └── build.ps1          # 构建应用
├── frontend/               # React 前端
│   ├── src/
│   │   ├── components/    # UI 组件
│   │   │   └── Navbar.tsx
│   │   ├── pages/         # 页面组件
│   │   │   ├── Login.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Lessons.tsx
│   │   │   └── Chat.tsx
│   │   ├── wailsjs/       # Wails 桥接
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
└── docs/                   # 开发文档
    ├── DEVELOPMENT_GUIDE.md
    └── FEATURES.md
```

## 🎨 UI 设计

### 配色方案
- **主色**: 紫色渐变 (#8B5CF6 → #7C3AED)
- **辅色**: 蓝色渐变 (#3B82F6 → #2563EB)
- **成功**: 绿色 (#10B981)
- **警告**: 黄色 (#F59E0B)
- **错误**: 红色 (#EF4444)

### 页面布局

#### 1. 登录页
- 全屏渐变背景
- 居中卡片布局
- 毛玻璃效果面板
- 图标装饰输入框

#### 2. 仪表板
- 顶部欢迎信息
- 4 个统计卡片网格
- 最近学习列表
- 快捷操作按钮

#### 3. 课程页
- 响应式卡片网格
- 进度条可视化
- 章节完成状态
- 继续学习按钮

#### 4. AI 助手
- 标签页切换 (对话/代码)
- 聊天消息气泡
- 代码编辑区域
- 建议结果展示

## 🔧 技术实现

### Go 后端方法

```go
// 用户认证
Login(username, password string) map[string]interface{}
Register(username, email, password string) map[string]interface{}

// 学习功能
GetLessons() []map[string]interface{}

// AI 功能
ChatWithAI(message string) map[string]interface{}
CodeAssist(code, question string) map[string]interface{}

// 工具方法
GetAppVersion() string
OpenExternalLink(url string) error
```

### 前端调用方式

```typescript
// 调用 Go 方法
const result = await window.go.main.App.Login("username", "password")

// 处理返回数据
if (result.success) {
  localStorage.setItem('token', result.token)
  onLogin(result.user)
}
```

## 📊 功能清单

### ✅ 已实现
- [x] 用户注册与登录界面
- [x] 仪表板数据统计
- [x] 课程列表浏览
- [x] 学习进度展示
- [x] AI 智能对话
- [x] 代码辅助分析
- [x] 响应式设计
- [x] 路由导航
- [x] 本地会话管理

### 🚧 待完善
- [ ] 集成真实后端 API
- [ ] 数据库连接
- [ ] JWT 认证
- [ ] 课程详情学习
- [ ] 习题练习功能
- [ ] 学习记录保存
- [ ] 离线模式
- [ ] 通知提醒

## 🚀 开发流程

### 1. 环境准备
```bash
# 安装 Go
# 安装 Node.js
# 安装 Wails CLI
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

### 2. 启动开发
```bash
cd web/wails-app
make install  # 首次运行
make dev      # 启动开发模式
```

### 3. 添加新功能

**步骤 1**: 在 `app.go` 添加 Go 方法
```go
func (a *App) NewFeature(param string) string {
    // 实现逻辑
    return result
}
```

**步骤 2**: 在前端调用
```typescript
const result = await window.go.main.App.NewFeature(param)
```

**步骤 3**: 创建页面组件并添加到路由

### 4. 测试调试
- F12 打开开发者工具
- 查看控制台日志
- Go 端使用 fmt.Println

### 5. 构建发布
```bash
wails build
```

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

# UPX 压缩 (需安装 UPX)
wails build -upx
```

### 输出位置
```
build/bin/
├── ai-learning-platform.exe  # Windows
├── ai-learning-platform      # macOS/Linux
└── ...
```

## 🎯 优势对比

| 特性 | Wails | Electron | Tauri |
|------|-------|----------|-------|
| 应用体积 | ⭐⭐⭐⭐⭐ 小 | ⭐ 大 | ⭐⭐⭐⭐ 小 |
| 内存占用 | ⭐⭐⭐⭐⭐ 低 | ⭐ 高 | ⭐⭐⭐⭐⭐ 低 |
| 启动速度 | ⭐⭐⭐⭐⭐ 快 | ⭐⭐ 慢 | ⭐⭐⭐⭐⭐ 快 |
| 开发体验 | ⭐⭐⭐⭐ 好 | ⭐⭐⭐⭐⭐ 好 | ⭐⭐⭐ 一般 |
| 生态成熟 | ⭐⭐⭐ 成长中 | ⭐⭐⭐⭐⭐ 成熟 | ⭐⭐⭐⭐ 成长中 |
| 学习曲线 | ⭐⭐⭐⭐ 平缓 | ⭐⭐⭐⭐⭐ 平缓 | ⭐⭐⭐ 陡峭 |

## 📚 相关文档

- [README.md](README.md) - 项目介绍
- [QUICK_START.md](QUICK_START.md) - 5分钟快速入门
- [DEVELOPMENT_GUIDE.md](docs/DEVELOPMENT_GUIDE.md) - 详细开发指南
- [FEATURES.md](docs/FEATURES.md) - 功能特性说明

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request!

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

MIT License

---

**享受现代化的桌面开发体验!** 🎉
