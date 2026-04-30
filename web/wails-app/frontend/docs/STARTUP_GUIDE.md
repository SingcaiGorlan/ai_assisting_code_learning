# 🚀 桌面端启动指南

**最后更新**: 2026-04-30  
**状态**: ✅ 前端已启动 | ⚠️ 后端需要 GCC

---

## ✅ 当前状态

### 前端开发服务器
- **状态**: ✅ 正在运行
- **地址**: http://localhost:5173
- **Radix UI 演示**: http://localhost:5173/demo

### 后端服务器
- **状态**: ⚠️ 需要安装 GCC
- **原因**: SQLite 需要 CGO 支持
- **预期地址**: http://localhost:8080/api/v1

---

## 🎨 查看 Radix UI 设计

### 方式一：访问主应用（推荐）
打开浏览器访问：**http://localhost:5173**

你将看到：
- ✨ 现代化的登录页面
- 📊 仪表板界面（需要登录后端）
- 📚 课程列表页面
- 💬 AI 聊天界面
- 🎯 完整的侧边栏和导航栏

### 方式二：访问 Radix UI 演示页面
打开浏览器访问：**http://localhost:5173/demo**

这将展示：
- 🎨 Radix UI 组件示例
- 🎭 各种按钮变体
- 📦 卡片组件
- 📝 输入框样式
- 🌓 主题切换效果

---

## 🔧 解决后端启动问题

### 问题原因
后端使用 SQLite 数据库，需要 CGO（C Go）支持，但系统未安装 GCC 编译器。

### 解决方案

#### 方案一：安装 TDM-GCC（推荐）

1. **下载 TDM-GCC**
   - 访问：https://jmeubank.github.io/tdm-gcc/
   - 下载 `tdm64-gcc-10.3.0.exe`（或最新版本）

2. **安装步骤**
   ```
   - 运行安装程序
   - 选择 "Create"
   - 选择安装路径（默认 C:\TDM-GCC-64）
   - 勾选 "gcc" 和 "g++"
   - 点击 "Install"
   ```

3. **配置环境变量**
   ```powershell
   # 添加到系统 PATH
   C:\TDM-GCC-64\bin
   ```

4. **验证安装**
   ```powershell
   gcc --version
   ```

5. **重新启动后端**
   ```powershell
   cd e:\ai_assisting_code_learning
   $env:CGO_ENABLED="1"
   go run cmd/server/main.go
   ```

#### 方案二：切换到内存数据库（临时方案）

修改 `internal/app/app.go`，使用 GORM 的内存模式：

```go
// 将第 79 行改为：
db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
```

**注意**: 这种方式数据不会持久化，重启后数据丢失。

#### 方案三：使用 PostgreSQL（生产环境推荐）

1. 安装 PostgreSQL
2. 修改配置文件 `configs/config.yaml`
3. 更新 `internal/app/app.go` 使用 PostgreSQL 驱动

---

## 📱 可用的页面路由

| 路径 | 说明 | 需要登录 |
|------|------|----------|
| `/login` | 登录页面 | ❌ |
| `/demo` | Radix UI 演示 | ❌ |
| `/dashboard` | 仪表板 | ✅ |
| `/lessons` | 课程列表 | ✅ |
| `/chat` | AI 聊天 | ✅ |
| `/profile` | 个人资料 | ✅ |
| `/settings` | 设置 | ✅ |

---

## 🎯 快速测试 UI

### 1. 测试登录页面
访问：http://localhost:5173/login

功能：
- ✅ 邮箱/密码输入框
- ✅ 表单验证
- ✅ 登录按钮
- ✅ 注册链接

### 2. 测试 Radix UI 组件
访问：http://localhost:5173/demo

展示的组件：
- ✅ Button（5 种变体）
- ✅ Card（卡片容器）
- ✅ Input（输入框）
- ✅ 主题切换
- ✅ 响应式布局

### 3. 测试主应用布局
登录后访问任意受保护页面，可以看到：
- ✅ 可折叠侧边栏
- ✅ 顶部导航栏
- ✅ 搜索框
- ✅ 主题切换按钮
- ✅ 用户头像

---

## 🛠️ 开发命令

### 前端开发
```powershell
# 启动开发服务器
cd e:\ai_assisting_code_learning\web\wails-app\frontend
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

### 后端开发（安装 GCC 后）
```powershell
# 启动后端服务器
cd e:\ai_assisting_code_learning
$env:CGO_ENABLED="1"
go run cmd/server/main.go

# 或使用一键启动脚本
.\web\wails-app\scripts\start-full-dev.bat
```

---

## 📦 依赖检查

### 前端依赖
```powershell
cd e:\ai_assisting_code_learning\web\wails-app\frontend
npm list @radix-ui/themes
npm list tailwindcss
npm list lucide-react
```

### 后端依赖
```powershell
cd e:\ai_assisting_code_learning
go list -m all | findstr gorm
go list -m all | findstr sqlite
```

---

## 🎨 Radix UI 特性

### 已配置的组件
- ✅ **@radix-ui/themes** - 主题系统
- ✅ **Button** - 按钮组件（5 种变体）
- ✅ **Card** - 卡片组件
- ✅ **Input** - 输入框组件
- ✅ **Dialog** - 对话框
- ✅ **DropdownMenu** - 下拉菜单
- ✅ **Tabs** - 标签页
- ✅ **Tooltip** - 提示框
- ✅ **Toast** - 通知
- ✅ **Avatar** - 头像
- ✅ **Popover** - 弹出框
- ✅ **Switch** - 开关
- ✅ **Checkbox** - 复选框
- ✅ **RadioGroup** - 单选组
- ✅ **Select** - 选择器
- ✅ **Separator** - 分隔线

### 主题配置
```typescript
<Theme 
  accentColor="blue"    // 强调色
  appearance="dark"     // 暗色主题
  radius="medium"       // 圆角大小
>
  {/* 应用内容 */}
</Theme>
```

### CSS 变量系统
所有颜色使用 HSL 格式，支持亮色/暗色主题自动切换：
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 210 40% 98%;
}
```

---

## 🆘 常见问题

### Q: 前端页面空白？
**A**: 检查：
1. Vite 开发服务器是否运行（终端输出 "VITE v5.x ready"）
2. 浏览器控制台是否有错误
3. 访问 http://localhost:5173 是否正确

### Q: 样式没有生效？
**A**: 检查：
1. Tailwind CSS 是否正确配置
2. `globals.css` 是否被导入
3. 清除浏览器缓存

### Q: 后端无法启动？
**A**: 
1. 确认已安装 GCC（运行 `gcc --version`）
2. 设置环境变量 `$env:CGO_ENABLED="1"`
3. 检查端口 8080 是否被占用

### Q: API 请求失败？
**A**: 
1. 确认后端正在运行
2. 检查 API 地址是否正确（`http://localhost:8080/api/v1`）
3. 浏览器控制台查看网络请求

---

## 📚 相关文档

- **[完整配置指南](./FULL_SETUP_GUIDE.md)** - 详细的配置说明
- **[UI 设计方案](./UI_DESIGN_PLAN.md)** - UI 设计理念
- **[配置完成报告](./COMPLETION_REPORT.md)** - 本次工作总结
- **[快速开始](./README.md)** - 项目概览

---

## 🎉 下一步

### 立即体验
1. ✅ 访问 http://localhost:5173 查看主应用
2. ✅ 访问 http://localhost:5173/demo 查看 Radix UI 组件
3. ⚠️ 安装 GCC 以启动后端（可选）

### 后续开发
1. 实现真实的用户认证逻辑
2. 连接数据库（SQLite/PostgreSQL）
3. 实现课程 CRUD 操作
4. 接入真实 AI API

---

**祝你开发愉快！** 🚀
