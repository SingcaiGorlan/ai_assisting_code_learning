# 🎨 Wails 可视化工具安装与使用指南

## 📋 概述

Wails 提供了多种可视化工具来帮助你开发和调试桌面应用。本指南将介绍所有可用的工具及其安装使用方法。

---

## 🔧 1. Wails DevTools (内置开发者工具)

### ✅ 状态：已启用

DevTools 已集成到 Wails 应用中，无需额外安装。

### 使用方法

**方式一：快捷键**
- 在运行的应用中按 `F12`
- 或按 `Ctrl+Shift+I` (Windows/Linux) / `Cmd+Option+I` (macOS)

**方式二：右键菜单**
- 在应用界面右键点击
- 选择"检查元素"或"Inspect Element"

**方式三：自动打开（已配置）**
- 应用启动时会自动打开 Inspector
- 在 `main.go` 中配置：`Debug.OpenInspectorOnStartup: true`

### 功能特性

- 🔍 **Elements**: 查看和编辑 DOM
- 📜 **Console**: JavaScript 控制台
- 🌐 **Network**: 网络请求监控
- ⚡ **Performance**: 性能分析
- 💾 **Storage**: 本地存储查看
- 🎨 **Sources**: 源代码调试

---

## 🛠️ 2. Wails CLI 工具

### ✅ 状态：已安装

Wails CLI 提供了强大的命令行工具。

### 常用命令

```bash
# 查看 Wails 版本
wails version

# 开发模式（热重载 + DevTools）
cd web/wails-app
wails dev

# 构建生产版本
wails build

# 生成项目信息
wails doctor

# 更新 Wails
wails update
```

### 开发模式特性

运行 `wails dev` 时：
- ✅ 自动开启前端开发服务器
- ✅ 支持热重载（HMR）
- ✅ Go 后端代码变更自动重启
- ✅ DevTools 可用

---

## 📊 3. Wails Runtime API 可视化

Wails 提供了运行时 API，可以在浏览器控制台中使用。

### 在浏览器控制台中使用

打开 DevTools Console，可以使用以下 API：

```javascript
// 查看 Wails 运行时信息
console.log(window.runtime)

// 获取应用信息
window.runtime.Environment()

// 日志记录
window.runtime.LogInfo("信息消息")
window.runtime.LogWarning("警告消息")
window.runtime.LogError("错误消息")

// 窗口操作
window.runtime.WindowSetTitle("新标题")
window.runtime.WindowGetSize()
window.runtime.WindowSetSize(1400, 900)
```

### 在前端代码中使用

```typescript
import { runtime } from './wailsjs/runtime'

// 日志记录
runtime.LogInfo('用户点击了按钮')
runtime.LogError('发生错误')

// 窗口操作
runtime.WindowSetTitle('AI 辅助代码学习平台')

// 获取环境信息
const env = await runtime.Environment()
console.log(env)
```

---

## 🔍 4. Wails Inspector (Go 方法检查器)

### 功能

Inspector 可以可视化地查看和调用 Go 后端暴露的方法。

### 使用方法

1. 启动应用：`wails dev`
2. DevTools 会自动打开
3. 切换到 "Wails" 标签页
4. 查看所有绑定的 Go 方法
5. 可以直接在 UI 中调用方法并查看结果

### 示例

在你的应用中，`app.go` 中的方法会被自动列出：

```go
// app.go 中的这些方法会在 Inspector 中显示
func (a *App) Greet(name string) string {
    return fmt.Sprintf("Hello %s!", name)
}

func (a *App) GetLessons() []Lesson {
    // ...
}
```

---

## 🎯 5. 推荐的开发工作流

### 开发阶段

```bash
# 1. 启动开发模式
cd web/wails-app
wails dev

# 2. DevTools 会自动打开
# 3. 使用 Elements 面板调试 UI
# 4. 使用 Console 调试 JavaScript
# 5. 使用 Wails Inspector 调试 Go 方法
```

### 调试技巧

**前端调试：**
```typescript
// 在 React 组件中
console.log('Component state:', state)
runtime.LogInfo('渲染组件')
```

**后端调试：**
```go
// 在 Go 方法中
import "github.com/wailsapp/wails/v2/pkg/runtime"

func (a *App) SomeMethod() string {
    runtime.LogInfo(a.ctx, "执行 SomeMethod")
    // ...
}
```

---

## 📦 6. 可选的第三方工具

### Wails Studio (UI 设计工具)

这是一个可视化的 Wails UI 设计器（社区项目）。

**安装：**
```bash
# 访问 GitHub  releases 下载
# https://github.com/wzshiming/wails-studio
```

### React Developer Tools

如果你使用 React，可以安装 React DevTools：

```bash
# 在 Chrome/Edge 浏览器中安装扩展
# React Developer Tools
```

在 Wails 中使用（需要额外配置）：
```go
// main.go - 添加 Chrome 扩展支持
err := wails.Run(&options.App{
    // ... 其他配置
    Debug: options.Debug{
        OpenInspectorOnStartup: true,
    },
})
```

---

## 🚀 快速开始

### 立即体验可视化工具

```bash
# 1. 进入 Wails 项目目录
cd e:\ai_assisting_code_learning\web\wails-app

# 2. 启动开发模式（DevTools 会自动打开）
wails dev

# 3. 在打开的应用中
# - 按 F12 打开 DevTools
# - 查看各个面板
# - 在 Console 中尝试 runtime API

# 4. 修改前端代码
# - 保存后会自动热重载
# - 观察变化

# 5. 修改 Go 代码
# - 保存后会自动重启后端
# - 前端会重新连接
```

---

## 📝 常见问题

### Q: DevTools 没有自动打开？

A: 检查以下几点：
1. 确认 `main.go` 中配置了 `Debug.OpenInspectorOnStartup: true`
2. 手动按 `F12` 打开
3. 检查 Wails 版本：`wails version`

### Q: 如何在生产版本中禁用 DevTools？

A: 生产构建默认会禁用 DevTools：
```bash
wails build  # 生产版本，无 DevTools
```

### Q: 如何自定义 DevTools 位置？

A: 可以在选项中配置：
```go
Debug: options.Debug{
    OpenInspectorOnStartup: true,
    StartDebugger: true,
},
```

### Q: 能看到 Go 方法的实时调用吗？

A: 可以！使用 Wails Inspector：
1. 打开 DevTools
2. 切换到 "Wails" 标签
3. 查看所有可调用方法
4. 点击方法名即可调用

---

## 🎓 学习资源

- [Wails 官方文档](https://wails.io/docs/gettingstarted/installation)
- [Wails API 参考](https://wails.io/docs/reference/api)
- [React 开发指南](https://react.dev/learn)
- [Chrome DevTools 教程](https://developer.chrome.com/docs/devtools/)

---

## ✨ 当前配置

你的项目已配置：
- ✅ DevTools 自动打开（启动时）
- ✅ 热重载支持
- ✅ Runtime API 可用
- ✅ Inspector 可用

**下一步：**
运行 `wails dev` 开始体验可视化工具吧！

---

**最后更新**: 2024年  
**Wails 版本**: v2.x  
**项目**: AI 辅助代码学习平台
