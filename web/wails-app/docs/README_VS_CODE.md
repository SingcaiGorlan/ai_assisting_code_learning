# 🎨 VS Code 风格界面实现

> AI 辅助代码学习平台 - 完整的 VS Code Dark+ 主题桌面应用界面

## 📋 目录

- [项目简介](#项目简介)
- [核心特性](#核心特性)
- [技术栈](#技术栈)
- [界面预览](#界面预览)
- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [配色方案](#配色方案)
- [组件说明](#组件说明)
- [开发指南](#开发指南)
- [文档资源](#文档资源)

---

## 项目简介

本项目将 **AI 辅助代码学习平台** 改造为完整的 **VS Code Dark+** 风格桌面应用。所有界面元素严格遵循 VS Code 的视觉语言和交互规范，提供专业、一致的编码体验。

### 设计理念

- 🎯 **专业性**: 完全复刻 VS Code 的视觉设计
- 🎨 **一致性**: 统一的配色方案和交互模式
- ⚡ **高性能**: 轻量级依赖，快速渲染
- 📱 **响应式**: 适配不同屏幕尺寸
- ♿ **无障碍**: 良好的对比度和焦点状态

---

## 核心特性

### ✨ 界面特性

- ✅ **三栏式布局**: 活动栏 (48px) + 侧边栏 (250px) + 内容区
- ✅ **标签页管理**: 多页面切换，类似 VS Code 编辑器标签
- ✅ **状态栏显示**: Git 分支、错误数、光标位置等信息
- ✅ **面包屑导航**: 清晰的页面层级展示
- ✅ **自定义滚动条**: VS Code 风格的深色滚动条

### 🎨 视觉设计

- ✅ **Dark+ 主题**: 严格的 VS Code Dark+ 配色方案
- ✅ **零渐变色**: 全部使用纯色，符合 VS Code 设计规范
- ✅ **流畅动画**: 200ms 过渡效果，自然流畅
- ✅ **清晰反馈**: 悬停、选中、激活状态明确
- ✅ **语法高亮色**: 使用 VS Code 主题色作为强调色

### 🛠️ 技术优势

- ✅ **纯 Tailwind CSS**: 100% 使用工具类，无内联样式
- ✅ **Lucide Icons**: 现代化图标库，轻量高效
- ✅ **模块化设计**: 可复用组件，易于扩展
- ✅ **类型安全**: TypeScript 完整类型定义
- ✅ **热重载**: 开发模式下代码修改即时生效

---

## 技术栈

| 类别 | 技术 | 版本 | 用途 |
|------|------|------|------|
| 桌面框架 | Wails | v2 | 跨平台桌面应用 |
| 前端框架 | React | 18 | UI 组件化 |
| 编程语言 | TypeScript | 5.x | 类型安全 |
| 样式框架 | Tailwind CSS | 3.x | 原子化 CSS |
| 图标库 | Lucide React | latest | SVG 图标 |
| 路由管理 | React Router | v6 | 页面导航 |
| 后端语言 | Go | 1.21+ | API 服务 |
| Web 框架 | Gin | v1.9 | HTTP 服务器 |
| 数据库 | SQLite | v1.5 | 本地数据存储 |

---

## 界面预览

### 整体布局

```
┌─────────────────────────────────────────────────────┐
│ Activity │ Sidebar   │ TabBar (35px)                │
│  Bar     │           ├──────────────────────────────┤
│  (48px)  │  (250px)  │                              │
│          │           │   Content Area               │
│  📄      │  Welcome  │   bg-[#1e1e1e]               │
│  🔍      │  Dashboard│                              │
│  🔀      │  Lessons  │   • 面包屑导航               │
│  🐛      │  Chat     │   • 页面内容                 │
│  📦      │  Settings │   • 卡片/列表/表单           │
│          │           │                              │
│  👤      │  ───────  │                              │
│  ⚙️      │  User Info│                              │
└──────────┴───────────┴──────────────────────────────┘
│              StatusBar (22px, #007acc)               │
└─────────────────────────────────────────────────────┘
```

### 页面列表

| 页面 | 路径 | 说明 |
|------|------|------|
| 欢迎页 | `/welcome` | 应用介绍和快速操作（默认首页） |
| 仪表板 | `/dashboard` | 学习统计和最近课程 |
| 课程学习 | `/lessons` | 课程列表和进度追踪 |
| AI 助手 | `/chat` | AI 对话和代码辅助 |
| 设置 | `/settings` | 应用配置和偏好设置 |
| 登录 | `/login` | 用户认证（未登录时显示） |

---

## 快速开始

### 环境要求

- Node.js 18+
- Go 1.21+
- Wails CLI v2

### 安装依赖

```bash
# 进入 Wails 应用目录
cd web/wails-app

# 安装前端依赖
cd frontend
npm install
```

### 开发模式

```bash
# 启动开发服务器（前端热重载 + 后端自动重启）
wails dev
```

开发模式下：
- DevTools 会自动打开
- 修改前端代码自动刷新
- 修改后端代码自动重启
- 按 **F12** 或 **Ctrl+Shift+I** 打开开发者工具

### 生产构建

```bash
# 构建桌面应用
wails build

# 输出位置
# Windows: build/bin/ai-learning.exe
# macOS:   build/bin/ai-learning.app
# Linux:   build/bin/ai-learning
```

---

## 项目结构

```
web/wails-app/frontend/src/
├── components/              # 可复用组件
│   ├── Sidebar.tsx         # 侧边栏（活动栏 + 导航菜单）
│   ├── TabBar.tsx          # 标签栏
│   ├── StatusBar.tsx       # 状态栏
│   └── Breadcrumb.tsx      # 面包屑导航
├── pages/                   # 页面组件
│   ├── Login.tsx           # 登录页面
│   ├── Welcome.tsx         # 欢迎页面 ✨
│   ├── Dashboard.tsx       # 仪表板
│   ├── Lessons.tsx         # 课程学习
│   ├── Chat.tsx            # AI 助手
│   └── Settings.tsx        # 设置页面 ✨
├── App.tsx                  # 应用主组件（路由配置）
├── main.tsx                 # 应用入口
└── styles.css               # 全局样式（滚动条等）
```

---

## 配色方案

### 核心颜色（严格遵守）

| 用途 | 颜色值 | Tailwind 类 | 应用场景 |
|------|--------|-------------|----------|
| 主背景 | `#1e1e1e` | `bg-[#1e1e1e]` | 内容区域、页面背景 |
| 侧边栏/卡片 | `#252526` | `bg-[#252526]` | 侧边栏、卡片、面包屑 |
| 活动栏 | `#333333` | `bg-[#333333]` | 最左侧图标栏 |
| 标签栏 | `#2d2d2d` | `bg-[#2d2d2d]` | 顶部标签页 |
| 边框 | `#3c3c3c` | `border-[#3c3c3c]` | 卡片边框、分隔线 |
| 输入框背景 | `#3c3c3c` | `bg-[#3c3c3c]` | 表单输入框 |
| 输入框边框 | `#555555` | `border-[#555555]` | 输入框边框 |

### 强调色

| 状态 | 颜色值 | Tailwind 类 | 应用场景 |
|------|--------|-------------|----------|
| 主要蓝色 | `#007acc` | `text-[#007acc]` / `bg-[#007acc]` | 按钮、链接、进度条 |
| 选中背景 | `#094771` | `bg-[#094771]` | 激活的导航项、用户消息 |
| 按钮悬停 | `#1177bb` | `hover:bg-[#1177bb]` | 按钮 hover 状态 |
| 悬停背景 | `#2a2d2e` | `hover:bg-[#2a2d2e]` | 鼠标悬停效果 |

### 文字颜色

| 类型 | 颜色值 | Tailwind 类 | 应用场景 |
|------|--------|-------------|----------|
| 主文字 | `#ffffff` | `text-white` | 标题、重要文本 |
| 次要文字 | `#9ca3af` | `text-gray-400` | 描述、辅助文本 |
| 小字 | `#6b7280` | `text-gray-500` | 面包屑分隔符 |

### VS Code 语法高亮色

| 颜色 | 值 | 用途 |
|------|-----|------|
| 蓝色 | `#007acc` | 关键字、学习课程统计 |
| 青绿 | `#4ec9b0` | 类名、学习时长统计 |
| 橙色 | `#ce9178` | 字符串、完成进度统计 |
| 黄色 | `#dcdcaa` | 函数名、AI 对话统计 |

---

## 组件说明

### 1. Sidebar（侧边栏）

**文件**: `components/Sidebar.tsx`

**结构**:
```
┌────────┬──────────────┐
│        │  导航菜单     │
│ 活动栏  │  (250px)     │
│(48px)  │              │
│        │  • Welcome   │
│  📄    │  • Dashboard │
│  🔍    │  • Lessons   │
│  🔀    │  • Chat      │
│  🐛    │  • Settings  │
│  📦    │              │
│        │  ──────────  │
│  👤    │  User Info   │
│  ⚙️    │              │
└────────┴──────────────┘
```

**特性**:
- 活动图标带白色指示条
- 导航项选中背景 `#094771`
- 悬停效果 `#2a2d2e`
- 底部用户信息卡片

---

### 2. TabBar（标签栏）

**文件**: `components/TabBar.tsx`

**高度**: 35px

**特性**:
- 活动标签背景 `#1e1e1e`
- 非活动标签背景 `#2d2d2d`
- 支持横向滚动
- 关闭按钮（X）

---

### 3. StatusBar（状态栏）

**文件**: `components/StatusBar.tsx`

**高度**: 22px  
**背景**: `#007acc`

**左侧信息**:
- Git 分支
- 错误数
- 警告数

**右侧信息**:
- 光标位置
- 缩进设置
- 文件编码
- 文件格式

---

### 4. Breadcrumb（面包屑导航）

**文件**: `components/Breadcrumb.tsx`

**使用示例**:
```tsx
<Breadcrumb items={[
  { label: '工作台', path: '/dashboard' },
  { label: '课程学习', path: '/lessons' }
]} />
```

---

## 开发指南

### 创建新页面

#### Step 1: 创建页面组件

```tsx
// pages/NewPage.tsx
import { SomeIcon } from 'lucide-react'

export default function NewPage() {
  return (
    <div className="h-full bg-[#1e1e1e] overflow-y-auto custom-scrollbar">
      {/* 面包屑 */}
      <div className="flex items-center gap-2 px-6 py-3 border-b border-[#252526] bg-[#252526]">
        <span className="text-[13px] text-gray-400">工作台</span>
        <span className="text-[13px] text-gray-500">/</span>
        <span className="text-[13px] text-white">新页面</span>
      </div>

      {/* 内容 */}
      <div className="p-6">
        <h1 className="text-[26px] font-semibold text-white mb-4">
          页面标题
        </h1>
      </div>
    </div>
  )
}
```

#### Step 2: 添加路由

```tsx
// App.tsx
import NewPage from './pages/NewPage'

<Route path="/newpage" element={<NewPage />} />
```

#### Step 3: 更新侧边栏

```tsx
// components/Sidebar.tsx
const navItems: NavItem[] = [
  // ... 其他项
  { 
    icon: <SomeIcon size={18} />, 
    label: '新页面', 
    path: '/newpage',
    tooltip: 'New Page'
  },
]
```

#### Step 4: 更新标签栏

```tsx
// components/TabBar.tsx
const tabs: Tab[] = [
  // ... 其他标签
  { path: '/newpage', label: '新页面' },
]
```

---

### 常用组件模板

#### 卡片组件

```tsx
<div className="bg-[#252526] border border-[#3c3c3c] rounded-md p-5 hover:border-[#007acc] transition-all duration-200">
  <h3 className="text-[16px] font-semibold text-white mb-2">
    标题
  </h3>
  <p className="text-[13px] text-gray-400">
    描述内容
  </p>
</div>
```

#### 按钮组件

```tsx
<button className="bg-[#007acc] hover:bg-[#1177bb] text-white px-4 py-2 rounded-sm text-[13px] font-medium transition-colors">
  按钮文本
</button>
```

#### 输入框组件

```tsx
<input 
  type="text"
  placeholder="请输入..."
  className="w-full px-4 py-2.5 bg-[#3c3c3c] border border-[#555555] rounded-sm text-white placeholder:text-gray-500 focus:border-[#007acc] focus:shadow-[0_0_0_2px_rgba(0,122,204,0.2)] outline-none transition-all text-[13px]"
/>
```

#### 进度条

```tsx
<div className="w-full bg-[#3c3c3c] rounded-full h-[6px] overflow-hidden">
  <div
    className="h-[6px] rounded-full bg-[#007acc] transition-all duration-300"
    style={{ width: `${progress}%` }}
  />
</div>
```

---

## 文档资源

### 📚 完整文档

| 文档 | 说明 | 适用场景 |
|------|------|----------|
| [VS_CODE_STYLE_GUIDE.md](./VS_CODE_STYLE_GUIDE.md) | 完整实现指南 | 深入学习设计规范 |
| [VS_CODE_QUICK_REF.md](./VS_CODE_QUICK_REF.md) | 快速参考手册 | 日常开发速查 |
| [VS_CODE_UPDATE_SUMMARY.md](./VS_CODE_UPDATE_SUMMARY.md) | 更新总结 | 了解改动详情 |
| [VS_CODE_VISUAL_COMPARISON.md](./VS_CODE_VISUAL_COMPARISON.md) | 视觉对比 | 查看改进效果 |

### 🎯 推荐阅读顺序

1. **新手**: `VS_CODE_QUICK_REF.md` → 快速上手
2. **进阶**: `VS_CODE_STYLE_GUIDE.md` → 深入理解
3. **回顾**: `VS_CODE_UPDATE_SUMMARY.md` → 了解历史
4. **对比**: `VS_CODE_VISUAL_COMPARISON.md` → 查看差异

---

## ⚠️ 注意事项

### 必须遵守

1. ❌ **禁止使用渐变色** - VS Code 不使用渐变
2. ❌ **禁止使用内联样式** - 统一使用 Tailwind CSS
3. ✅ **严格使用配色方案** - 不要偏离定义的颜色值
4. ✅ **保持圆角一致** - 使用 `rounded-sm` (2px) 或 `rounded-md` (6px)
5. ✅ **统一过渡动画** - 使用 `duration-200`

### 最佳实践

- 使用 `custom-scrollbar` 类应用自定义滚动条
- 图标大小：活动栏 24px，导航 18px，内容 20px，状态栏 12px
- 字体大小：标题 26px，正文 13-15px，小字 11-12px
- 间距使用 Tailwind 标准间距（gap-2, gap-3, gap-4）

---

## 🎉 总结

通过本次更新，我们成功实现了：

✅ **完整的 VS Code Dark+ 风格界面**  
✅ **严格的配色方案和视觉规范**  
✅ **模块化的组件设计**  
✅ **流畅的交互体验**  
✅ **详尽的技术文档**  

现在你的应用拥有专业的编码工具外观和体验！

---

## 📞 支持与反馈

如有问题或建议，请参考：
- 📖 [Wails 官方文档](https://wails.io/docs/)
- 🎨 [Tailwind CSS 文档](https://tailwindcss.com/docs)
- 🔍 [Lucide React 图标](https://lucide.dev/icons/)

---

**享受你的 VS Code 风格开发体验！** 🚀

*最后更新: 2026-04-29*
