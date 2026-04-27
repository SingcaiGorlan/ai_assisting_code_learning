# Wails 桌面应用开发指南

## 📖 目录

- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [核心概念](#核心概念)
- [开发流程](#开发流程)
- [最佳实践](#最佳实践)

## 🚀 快速开始

### 1. 环境准备

确保已安装以下软件:
- Go 1.21+
- Node.js 18+
- Wails CLI (通过 `go install` 安装)

### 2. 安装依赖

```bash
# Linux/macOS
make install

# Windows
powershell -ExecutionPolicy Bypass -File scripts/install.ps1
```

### 3. 启动开发

```bash
# Linux/macOS
make dev

# Windows
powershell -ExecutionPolicy Bypass -File scripts/dev.ps1

# 或直接使用
wails dev
```

## 📁 项目结构

```
wails-app/
├── main.go                 # 应用入口点
├── app.go                  # 应用核心逻辑 (Go)
├── wails.json              # Wails 配置
├── go.mod                  # Go 模块定义
├── Makefile                # Make 命令
├── scripts/                # PowerShell 脚本
│   ├── install.ps1        # 安装依赖
│   ├── dev.ps1            # 启动开发
│   └── build.ps1          # 构建应用
├── frontend/               # 前端代码
│   ├── src/
│   │   ├── components/    # React 组件
│   │   │   └── Navbar.tsx # 导航栏
│   │   ├── pages/         # 页面组件
│   │   │   ├── Login.tsx  # 登录页
│   │   │   ├── Dashboard.tsx # 仪表板
│   │   │   ├── Lessons.tsx # 课程页
│   │   │   └── Chat.tsx   # AI 对话
│   │   ├── wailsjs/       # Wails 桥接代码
│   │   ├── App.tsx        # 主应用
│   │   ├── main.tsx       # 入口文件
│   │   └── styles.css     # 全局样式
│   ├── index.html         # HTML 模板
│   ├── package.json       # 前端依赖
│   ├── vite.config.ts     # Vite 配置
│   └── tailwind.config.js # Tailwind 配置
└── build/                  # 构建输出 (自动生成)
    └── bin/               # 可执行文件
```

## 🔧 核心概念

### Go 与前端通信

Wails 通过绑定 Go 结构体的方法实现前后端通信:

**Go 端 (app.go):**
```go
func (a *App) MyFunction(name string) string {
    return "Hello, " + name
}
```

**前端调用 (TypeScript):**
```typescript
const result = await window.go.main.App.MyFunction("World")
console.log(result) // "Hello, World"
```

### 应用生命周期

1. **main.go** - 创建应用实例并配置选项
2. **app.go** - 定义应用逻辑和暴露的方法
3. **frontend/** - React 前端界面
4. **Wails Bridge** - 自动生成的桥接代码

### 数据流

```
用户操作 → React 组件 → Wails Bridge → Go 方法 → 返回结果 → 更新 UI
```

## 💻 开发流程

### 添加新功能

#### 1. 在 Go 端添加方法

```go
// app.go
func (a *App) GetUserInfo(userID int) map[string]interface{} {
    // 查询数据库或调用 API
    return map[string]interface{}{
        "id":    userID,
        "name":  "张三",
        "email": "zhangsan@example.com",
    }
}
```

#### 2. 在前端调用

```typescript
// 在组件中
const userInfo = await window.go.main.App.GetUserInfo(123)
console.log(userInfo.name) // "张三"
```

#### 3. 更新类型声明

```typescript
// frontend/src/wailsjs/go/main/App.d.ts
GetUserInfo(userID: number): Promise<{
  id: number
  name: string
  email: string
}>
```

### 创建新页面

1. **创建页面组件**
```typescript
// frontend/src/pages/NewPage.tsx
export default function NewPage() {
  return <div>新页面内容</div>
}
```

2. **添加到路由**
```typescript
// frontend/src/App.tsx
import NewPage from './pages/NewPage'

<Routes>
  <Route path="/newpage" element={<NewPage />} />
</Routes>
```

3. **添加到导航栏**
```typescript
// frontend/src/components/Navbar.tsx
{ path: '/newpage', icon: IconComponent, label: '新页面' }
```

## 🎨 UI 设计系统

### 颜色方案

- **主色**: 紫色渐变 (`from-purple-500 to-purple-600`)
- **辅助色**: 蓝色渐变 (`from-blue-500 to-blue-600`)
- **成功**: 绿色 (`text-green-600`)
- **警告**: 黄色 (`text-yellow-600`)
- **错误**: 红色 (`text-red-600`)

### 常用组件样式

```typescript
// 卡片
className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"

// 按钮
className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all"

// 输入框
className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
```

## ⚡ 性能优化

### 避免频繁的 Go-JS 调用

❌ **不好:**
```typescript
for (let i = 0; i < 1000; i++) {
  await window.go.main.App.ProcessItem(i)
}
```

✅ **好:**
```typescript
const items = Array.from({ length: 1000 }, (_, i) => i)
const results = await window.go.main.App.ProcessBatch(items)
```

### 使用缓存

```typescript
const [data, setData] = useState<any>(null)

useEffect(() => {
  if (!data) {
    loadData().then(setData)
  }
}, [])
```

## 🔐 安全考虑

1. **敏感数据处理**: 不要在客户端存储敏感信息
2. **API 密钥**: 在后端管理,不暴露给前端
3. **输入验证**: 前后端都要进行输入验证

## 🐛 调试技巧

### 前端调试

```typescript
console.log('调试信息:', data)
debugger // 断点
```

### Go 端调试

```go
import "fmt"

func (a *App) MyFunction() {
    fmt.Println("调试信息:", variable)
}
```

### 查看日志

```bash
# 开发模式下,日志会显示在终端
wails dev
```

## 📦 构建与发布

### 本地构建

```bash
make build
# 或
wails build
```

### 跨平台构建

```bash
# Windows
wails build -platform windows/amd64

# macOS
wails build -platform darwin/amd64

# Linux
wails build -platform linux/amd64
```

### 优化体积

```bash
# 使用 UPX 压缩 (需先安装 UPX)
wails build -upx
```

## 🤝 常见问题

### Q: 如何访问文件系统?

A: 使用 Wails runtime 提供的 API:
```go
import "github.com/wailsapp/wails/v2/pkg/runtime"

content, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{})
```

### Q: 如何打开外部链接?

A: 
```go
runtime.BrowserOpenURL(a.ctx, "https://example.com")
```

### Q: 如何显示系统托盘?

A: 在 `main.go` 中配置:
```go
err := wails.Run(&options.App{
    // ...
    TrayColour:      &options.RGBA{R: 255, G: 0, B: 0, A: 255},
    TrayIcon:        assets.TrayIcon,
    HideWindowOnClose: false,
})
```

## 📚 更多资源

- [Wails 官方文档](https://wails.io/docs/)
- [Wails GitHub](https://github.com/wailsapp/wails)
- [React 文档](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

有问题? 欢迎提交 Issue!
