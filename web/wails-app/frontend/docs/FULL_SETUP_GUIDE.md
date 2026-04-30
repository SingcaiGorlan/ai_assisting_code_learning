# 桌面端 UI + 前后端 API 完整配置指南

## 📋 概述

本文档详细说明了 AI 辅助代码学习平台的桌面端 UI 设计、前后端集成和 API 配置的完整方案。

---

## ✅ 已完成配置

### 1. Radix UI + Tailwind CSS 基础架构

#### 已安装的依赖包
```json
{
  "@radix-ui/themes": "^3.0.0",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0",
  "tailwindcss-animate": "^1.0.7",
  "lucide-react": "^0.300.0"
}
```

#### 配置文件
- **`tailwind.config.js`** - 支持暗色模式和 CSS 变量
- **`postcss.config.js`** - PostCSS 配置
- **`src/styles/globals.css`** - HSL 颜色变量系统

#### 主题系统
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* ... */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  /* ... */
}
```

---

### 2. UI 组件库

#### 基础组件（位于 `src/components/ui/`）
- **Button** - 支持多种变体（default, destructive, outline, ghost, link）和尺寸
- **Card** - 卡片容器组件
- **Input** - 输入框组件

#### 布局组件（位于 `src/components/layout/`）
- **AppLayout** - 主应用布局（侧边栏 + 主内容区）
- **Sidebar** - 可折叠侧边栏导航
- **Navbar** - 顶部导航栏（搜索、主题切换、通知）

---

### 3. 页面组件（位于 `src/pages/`）

| 页面 | 路径 | 说明 | 状态 |
|------|------|------|------|
| Login | `/login` | 用户登录页面 | ✅ 完成 |
| Dashboard | `/dashboard` | 仪表板（统计卡片 + 课程列表） | ✅ 完成 |
| LessonsPage | `/lessons` | 课程列表页面 | ✅ 完成 |
| ChatPage | `/chat` | AI 聊天助手 | ✅ 完成 |
| Profile | `/profile` | 个人资料页面 | 🚧 开发中 |
| Settings | `/settings` | 设置页面 | 🚧 开发中 |
| RadixDemo | `/demo` | Radix UI 示例页面 | ✅ 完成 |

---

### 4. API 服务层（位于 `src/services/`）

#### Axios 配置 (`api.ts`)
```typescript
const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

// 请求拦截器：自动添加 Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器：处理 401 错误
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

#### 认证服务 (`auth.ts`)
```typescript
export const authAPI = {
  login: async (data: LoginRequest) => 
    await api.post('/users/login', data),
  
  register: async (data: RegisterRequest) => 
    await api.post('/users/register', data),
  
  getProfile: async () => 
    await api.get('/users/profile')
}
```

#### 课程服务 (`lessons.ts`)
```typescript
export const lessonsAPI = {
  getList: async () => 
    await api.get('/learning/lessons'),
  
  getDetail: async (id: string) => 
    await api.get(`/learning/lessons/${id}`),
  
  complete: async (id: string) => 
    await api.post(`/learning/lessons/${id}/complete`)
}
```

#### 聊天服务 (`chat.ts`)
```typescript
export const chatAPI = {
  sendMessage: async (message: string) => {
    const response = await api.post('/ai/chat', { message })
    return response.data.response
  }
}
```

---

### 5. 路由配置 (`src/routes/index.tsx`)

```typescript
<BrowserRouter>
  <Routes>
    {/* 公开路由 */}
    <Route path="/login" element={<Login />} />
    <Route path="/demo" element={<RadixDemo />} />
    
    {/* 受保护的路由 */}
    <Route path="/" element={
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    }>
      <Route index element={<Navigate to="/dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="lessons" element={<LessonsPage />} />
      <Route path="chat" element={<ChatPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="settings" element={<SettingsPage />} />
    </Route>
  </Routes>
</BrowserRouter>
```

---

### 6. 后端 API（Go + Gin）

#### 路由配置 (`internal/app/handler/router.go`)

```go
func RegisterRoutes(router *gin.Engine, db *gorm.DB, cfg *config.Config) {
  // API v1 路由组
  v1 := router.Group("/api/v1")
  {
    // 用户相关
    users := v1.Group("/users")
    {
      users.POST("/register", api.Register)
      users.POST("/login", api.Login)
      users.GET("/profile", api.AuthMiddleware(), api.GetProfile)
    }

    // 学习相关
    learning := v1.Group("/learning")
    learning.Use(api.AuthMiddleware())
    {
      learning.GET("/lessons", api.GetLessons)
      learning.GET("/lessons/:id", api.GetLesson)
      learning.POST("/lessons/:id/complete", api.CompleteLesson)
    }

    // AI 助手
    ai := v1.Group("/ai")
    ai.Use(api.AuthMiddleware())
    {
      ai.POST("/chat", api.AIChat)
      ai.POST("/code-assist", api.CodeAssist)
    }
  }
}
```

#### API 端点清单

| 方法 | 路径 | 说明 | 需要认证 |
|------|------|------|----------|
| POST | `/api/v1/users/register` | 用户注册 | ❌ |
| POST | `/api/v1/users/login` | 用户登录 | ❌ |
| GET | `/api/v1/users/profile` | 获取用户信息 | ✅ |
| GET | `/api/v1/learning/lessons` | 获取课程列表 | ✅ |
| GET | `/api/v1/learning/lessons/:id` | 获取课程详情 | ✅ |
| POST | `/api/v1/learning/lessons/:id/complete` | 完成课程 | ✅ |
| POST | `/api/v1/ai/chat` | AI 聊天 | ✅ |
| POST | `/api/v1/ai/code-assist` | 代码辅助 | ✅ |

---

## 🚀 启动流程

### 1. 启动后端服务器

```bash
# 在项目根目录
cd e:\ai_assisting_code_learning
go run cmd/server/main.go
```

后端将在 `http://localhost:8080` 启动，API 端点为 `http://localhost:8080/api/v1`

### 2. 启动前端开发服务器

```bash
# 在前端目录
cd e:\ai_assisting_code_learning\web\wails-app\frontend
npm run dev
```

或者使用提供的脚本：
```bash
e:\ai_assisting_code_learning\web\wails-app\scripts\start-radix-dev.bat
```

前端将在 `http://localhost:5173` 启动

### 3. 访问应用

打开浏览器访问 `http://localhost:5173`

---

## 🔐 认证流程

1. **用户登录**
   ```typescript
   const response = await authAPI.login({ email, password })
   localStorage.setItem('token', response.token)
   navigate('/dashboard')
   ```

2. **Token 自动附加**
   - Axios 请求拦截器自动从 `localStorage` 读取 Token
   - 添加到请求头：`Authorization: Bearer <token>`

3. **Token 过期处理**
   - 响应拦截器检测到 401 错误
   - 清除本地 Token
   - 重定向到登录页

---

## 🎨 设计特点

### VS Code Dark+ 风格
- 深色背景：`#1e1e1e`
- 边框颜色：`#252526`, `#3c3c3c`
- 强调色：`#007acc` (蓝色)
- 字体：系统默认 sans-serif

### 响应式设计
- 侧边栏可折叠（宽度：展开 256px / 收起 64px）
- 网格布局自适应（1/2/3 列）
- 移动端友好

### 暗色/亮色主题切换
- 通过 `document.documentElement.classList.toggle('dark')` 切换
- Navbar 提供主题切换按钮
- 所有颜色使用 CSS 变量，自动适配

---

## 📁 项目结构

```
web/wails-app/frontend/
├── src/
│   ├── components/
│   │   ├── layout/          # 布局组件
│   │   │   ├── AppLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Navbar.tsx
│   │   └── ui/              # 基础 UI 组件
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── input.tsx
│   ├── pages/               # 页面组件
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── LessonsPage.tsx
│   │   ├── ChatPage.tsx
│   │   └── RadixDemo.tsx
│   ├── services/            # API 服务层
│   │   ├── api.ts           # Axios 配置
│   │   ├── auth.ts          # 认证服务
│   │   ├── lessons.ts       # 课程服务
│   │   └── chat.ts          # 聊天服务
│   ├── routes/              # 路由配置
│   │   └── index.tsx
│   ├── lib/                 # 工具函数
│   │   └── utils.ts         # cn() 函数
│   ├── styles/              # 样式文件
│   │   └── globals.css      # CSS 变量定义
│   └── App.tsx              # 应用入口
├── tailwind.config.js       # Tailwind 配置
├── postcss.config.js        # PostCSS 配置
└── package.json             # 依赖配置
```

---

## 🔧 开发建议

### 添加新页面
1. 在 `src/pages/` 创建页面组件
2. 在 `src/routes/index.tsx` 添加路由
3. 如需 API 调用，在 `src/services/` 创建服务模块

### 添加新组件
1. 基础组件放在 `src/components/ui/`
2. 业务组件放在 `src/components/` 或对应页面目录
3. 使用 `cva` 封装多态组件

### API 调用规范
```typescript
// 1. 在 services/ 定义接口
export const myAPI = {
  getData: async () => await api.get('/my-endpoint')
}

// 2. 在页面中使用
useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await myAPI.getData()
      setData(data)
    } catch (error) {
      console.error('Failed:', error)
    }
  }
  fetchData()
}, [])
```

---

## ⚠️ 注意事项

1. **CORS 配置**
   - 确保后端允许来自 `http://localhost:5173` 的跨域请求
   - 在生产环境中配置正确的域名

2. **环境变量**
   - 生产环境应使用环境变量配置 API 地址
   - 不要硬编码 `localhost`

3. **错误处理**
   - 所有 API 调用都需要 try-catch
   - 向用户显示友好的错误提示

4. **TypeScript 类型**
   - 为所有 API 响应定义接口
   - 避免使用 `any` 类型

---

## 📝 下一步计划

### 短期目标
- [ ] 完善个人资料页面
- [ ] 完善设置页面
- [ ] 添加课程详情页面
- [ ] 实现课程进度保存
- [ ] 添加错误边界组件

### 中期目标
- [ ] 实现 WebSocket 实时聊天
- [ ] 添加代码编辑器组件
- [ ] 实现文件上传功能
- [ ] 添加通知系统
- [ ] 实现离线缓存

### 长期目标
- [ ] PWA 支持
- [ ] 国际化（i18n）
- [ ] 单元测试覆盖
- [ ] E2E 测试
- [ ] 性能优化

---

## 🆘 常见问题

### Q: 前端无法连接后端？
A: 检查：
1. 后端是否在运行（`http://localhost:8080`）
2. API 地址是否正确（`baseURL: 'http://localhost:8080/api/v1'`）
3. 浏览器控制台是否有 CORS 错误

### Q: 登录后跳转到仪表板但显示未授权？
A: 检查：
1. Token 是否正确保存到 `localStorage`
2. 后端 AuthMiddleware 是否正确验证 Token
3. 浏览器开发者工具 Network 标签查看请求头

### Q: 样式没有生效？
A: 检查：
1. Tailwind CSS 是否正确配置
2. `globals.css` 是否被导入
3. 类名是否正确（注意大小写）

---

## 📚 相关文档

- [UI 设计方案](./UI_DESIGN_PLAN.md)
- [Radix UI 配置指南](./RADX_SETUP.md)
- [快速开始](./QUICK_START.md)
- [开发指南](./DEVELOPMENT_GUIDE.md)

---

**最后更新**: 2026-04-28  
**版本**: v1.0.0
