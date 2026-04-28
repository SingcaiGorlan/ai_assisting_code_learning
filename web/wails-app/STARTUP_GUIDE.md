# 🚀 Wails 可视化工具启动指南

## ✅ 当前状态

Wails 开发服务器正在启动中...

**进度**:
- ✅ Go 依赖已安装
- ✅ 前端依赖已安装
- ⏳ 前端代码编译中...

---

## 📖 使用说明

### 当 Wails 应用成功启动后：

#### 1. **自动打开 DevTools**
应用窗口会自动打开开发者工具面板（Inspector）

#### 2. **手动打开 DevTools**
如果未自动打开，可以：
- 按 `F12` 键
- 或按 `Ctrl+Shift+I` (Windows/Linux)
- 或在应用中右键 → "检查元素"

#### 3. **使用 Runtime API**
在浏览器控制台中可以使用：

```javascript
// 查看可用的 Go 方法
console.log(window.go.main.App)

// 调用 Go 方法
window.go.main.App.GetAppVersion()
window.go.main.App.Login("username", "password")
window.go.main.App.GetLessons()

// 日志记录
window.runtime.LogInfo("信息消息")
window.runtime.LogError("错误消息")

// 窗口操作
window.runtime.WindowSetTitle("新标题")
window.runtime.WindowGetSize()
```

#### 4. **热重载功能**
- 修改 React 组件代码会自动刷新
- 修改 Go 代码会自动重启后端
- 无需手动重启应用

---

## 🔧 常见问题

### Q: 编译卡住了怎么办？
A: 
1. 等待几分钟，首次编译可能较慢
2. 如果超过5分钟，按 `Ctrl+C` 停止
3. 重新运行 `wails dev`

### Q: DevTools 没有自动打开？
A: 
1. 检查 `main.go` 中是否配置了 `Debug.OpenInspectorOnStartup: true`
2. 手动按 `F12` 打开
3. 重启应用

### Q: 看不到 Wails Inspector？
A: 
1. 确保使用的是 `wails dev` 而不是 `wails build`
2. Inspector 只在开发模式可用

---

## 📝 快速命令参考

```bash
# 启动开发模式（带可视化工具）
cd web/wails-app
wails dev

# 仅构建（无DevTools）
wails build

# 查看版本
wails version

# 环境诊断
wails doctor
```

---

## 🎯 下一步

1. 等待应用成功启动
2. 查看自动打开的 DevTools
3. 尝试在 Console 中调用 Go 方法
4. 阅读 [WAILS_VISUAL_TOOLS.md](file://e:\ai_assisting_code_learning\web\wails-app\WAILS_VISUAL_TOOLS.md) 了解更多功能

---

**提示**: 如果遇到问题，请查看终端输出的错误信息
