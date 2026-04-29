# VS Code 风格界面实现指南

## 📋 目录
- [项目概述](#项目概述)
- [技术栈](#技术栈)
- [配色方案](#配色方案)
- [组件结构](#组件结构)
- [布局规范](#布局规范)
- [使用示例](#使用示例)

---

## 项目概述

本项目实现了完整的 **VS Code Dark+** 风格的 Wails + React 桌面应用界面。所有组件都严格遵循 VS Code 的视觉语言和交互规范。

### ✨ 核心特性

- ✅ 完整的三栏式布局（活动栏 + 侧边栏 + 内容区）
- ✅ VS Code Dark+ 配色方案
- ✅ 标签页管理系统
- ✅ 状态栏显示
- ✅ 响应式设计支持
- ✅ 自定义滚动条样式
- ✅ 流畅的过渡动画

---

## 技术栈

- **框架**: Wails v2 + React 18 + TypeScript
- **样式**: Tailwind CSS 3.x
- **图标**: Lucide React
- **路由**: React Router v6
- **UI 组件**: Ant Design（仅登录页面）

---

## 配色方案

### 核心颜色（严格遵守）

| 用途 | 颜色值 | 说明 |
|------|--------|------|
| 主背景色 | `#1e1e1e` | 深灰色，主要内容区域 |
| 侧边栏背景 | `#252526` | 稍浅灰色，卡片和侧边栏 |
| 活动栏背景 | `#333333` | 更浅灰色，最左侧图标栏 |
| 标签栏背景 | `#2d2d2d` | 中灰色，顶部标签页 |
| 边框颜色 | `#3c3c3c` / `#252526` | 分隔线和边框 |

### 强调色

| 状态 | 颜色值 | 说明 |
|------|--------|------|
| 选中状态 | `#094771` | 深蓝色背景，激活项 |
| 悬停状态 | `#2a2d2e` | 浅灰悬停背景 |
| 活动指示器 | `#007acc` | VS Code 蓝色，主要强调色 |
| 状态栏 | `#007acc` | 蓝色状态栏 |
| 链接/按钮 | `#007acc` | 可点击元素 |

### 文字颜色

| 类型 | 颜色值 | 说明 |
|------|--------|------|
| 主文字 | `#ffffff` | 白色，标题和重要文本 |
| 次要文字 | `#9ca3af` | 灰色，描述和辅助文本 |
| 链接/按钮 | `#007acc` | 蓝色，可交互文本 |

---

## 组件结构

### 1. Sidebar（侧边栏）

**文件位置**: `frontend/src/components/Sidebar.tsx`

**功能**:
- 左侧活动栏（48px 宽度）
- 右侧导航菜单（250px 宽度）
- 底部用户信息卡片

**关键特性**:
```tsx
// 活动图标 - 带白色指示条
{activeActivity === index && (
  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white" />
)}

// 导航项 - 选中状态
className={isActive ? 'bg-[#094771] text-white' : 'text-gray-300 hover:bg-[#2a2d2e]'}
```

### 2. TabBar（标签栏）

**文件位置**: `frontend/src/components/TabBar.tsx`

**功能**:
- 页面标签切换
- 活动标签高亮
- 关闭按钮（X）

**样式规范**:
```tsx
// 活动标签
className="bg-[#1e1e1e] text-white"

// 非活动标签
className="bg-[#2d2d2d] text-gray-400 hover:bg-[#2a2d2e]"
```

### 3. StatusBar（状态栏）

**文件位置**: `frontend/src/components/StatusBar.tsx`

**功能**:
- Git 分支显示
- 错误/警告计数
- 光标位置、编码等信息

**配色**:
- 背景: `#007acc`（蓝色）
- 文字: 白色
- 悬停: `rgba(255,255,255,0.1)`

### 4. Breadcrumb（面包屑导航）

**文件位置**: `frontend/src/components/Breadcrumb.tsx`

**使用示例**:
```tsx
<Breadcrumb items={[
  { label: '工作台', path: '/dashboard' },
  { label: '课程学习', path: '/lessons' }
]} />
```

---

## 布局规范

### 整体布局（三栏式）

```
┌─────────────────────────────────────────────────────┐
│  活动栏  │  侧边栏        │  标签栏                  │
│  (48px)  │  (250px)       │  TabBar (35px)          │
│          │                ├─────────────────────────┤
│  📄      │  导航菜单      │                         │
│  🔍      │  - 欢迎        │   内容区域               │
│  🔀      │  - 仪表板      │   (Pages)                │
│  🐛      │  - 课程        │   bg-[#1e1e1e]           │
│  📦      │  - AI 助手     │                         │
│          │  - 设置        │                         │
│  👤      │  ──────────┐  │                         │
│          │  │ 用户信息  │  │                         │
└──────────┴──┴──────────┴──┴─────────────────────────┘
│              状态栏 (StatusBar, 22px)                │
───────────────────────────────────────────────────────
```

### 页面结构

每个页面应包含：

1. **面包屑导航**（可选）
   ```tsx
   <div className="flex items-center gap-2 px-6 py-3 border-b border-[#252526] bg-[#252526]">
     <span className="text-[13px] text-gray-400">工作台</span>
     <span className="text-[13px] text-gray-500">/</span>
     <span className="text-[13px] text-white">页面名称</span>
   </div>
   ```

2. **内容区域**
   ```tsx
   <div className="p-6">
     {/* 页面内容 */}
   </div>
   ```

3. **滚动容器**
   ```tsx
   <div className="h-full overflow-y-auto custom-scrollbar">
     {/* 内容 */}
   </div>
   ```

---

## 使用示例

### 创建新页面

#### Step 1: 创建页面组件

```tsx
// frontend/src/pages/NewPage.tsx
import { SomeIcon } from 'lucide-react'

export default function NewPage() {
  return (
    <div className="h-full bg-[#1e1e1e] overflow-y-auto custom-scrollbar">
      {/* 面包屑导航 */}
      <div className="flex items-center gap-2 px-6 py-3 border-b border-[#252526] bg-[#252526]">
        <span className="text-[13px] text-gray-400">工作台</span>
        <span className="text-[13px] text-gray-500">/</span>
        <span className="text-[13px] text-white">新页面</span>
      </div>

      {/* 内容区域 */}
      <div className="p-6">
        <h1 className="text-[26px] font-semibold text-white mb-4">
          页面标题
        </h1>
        
        {/* 卡片示例 */}
        <div className="bg-[#252526] border border-[#3c3c3c] rounded-md p-5 hover:border-[#007acc] transition-all duration-200">
          <h2 className="text-[16px] font-semibold text-white mb-2">
            卡片标题
          </h2>
          <p className="text-[13px] text-gray-400">
            卡片内容描述
          </p>
        </div>
      </div>
    </div>
  )
}
```

#### Step 2: 添加路由

在 `App.tsx` 中添加路由：

```tsx
import NewPage from './pages/NewPage'

// 在 Routes 中添加
<Route 
  path="/newpage" 
  element={<NewPage />} 
/>
```

#### Step 3: 更新侧边栏

在 `Sidebar.tsx` 中添加导航项：

```tsx
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

在 `TabBar.tsx` 中添加标签：

```tsx
const tabs: Tab[] = [
  // ... 其他标签
  { path: '/newpage', label: '新页面' },
]
```

---

## 样式规范

### Tailwind CSS 最佳实践

#### ✅ 推荐写法

```tsx
<div className="bg-[#1e1e1e] text-white">
  <div className="bg-[#252526] border border-[#3c3c3c] hover:border-[#007acc]">
    <span className="text-[13px] text-gray-400">
  </div>
</div>
```

#### ❌ 避免写法

```tsx
// 不要使用内联样式
<div style={{ backgroundColor: '#1e1e1e' }}>

// 不要使用渐变色（VS Code 风格不使用渐变）
bg-gradient-to-r from-blue-500 to-purple-500
```

### 交互效果

#### 过渡动画

```tsx
className="transition-all duration-200 ease-in-out"
```

#### 悬停效果

```tsx
className="hover:bg-[#2a2d2e] hover:text-white hover:border-[#007acc]"
```

#### 选中状态

```tsx
className={isActive ? 'bg-[#094771] text-white' : 'text-gray-400'}
```

---

## 滚动条样式

已在 `styles.css` 中定义：

```css
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: #1e1e1e;
}

::-webkit-scrollbar-thumb {
  background: #424242;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #4f4f4f;
}
```

使用时添加类名：

```tsx
<div className="overflow-y-auto custom-scrollbar">
```

---

## 字体规范

| 用途 | 大小 | 字重 | 示例 |
|------|------|------|------|
| 大标题 | 26px | 600 | 页面标题 |
| 中标题 | 16-18px | 600 | 章节标题 |
| 正文 | 13-15px | 400 | 主要内容 |
| 小字 | 11-12px | 400 | 辅助信息 |

```tsx
<h1 className="text-[26px] font-semibold text-white">大标题</h1>
<h2 className="text-[16px] font-semibold text-white">中标题</h2>
<p className="text-[13px] text-gray-400">正文内容</p>
<span className="text-[12px] text-gray-400">小字说明</span>
```

---

## 图标规范

使用 **Lucide React** 图标库：

```tsx
import { Home, BookOpen, MessageSquare } from 'lucide-react'

// 活动栏图标
<Home size={24} />

// 导航菜单图标
<BookOpen size={18} />

// 内容图标
<MessageSquare size={20} />

// 状态栏图标
<Bell size={12} />
```

---

## 响应式设计

### 断点

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px

### 示例

```tsx
// 网格布局响应式
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* 卡片 */}
</div>

// 移动端隐藏侧边栏
<div className="hidden md:block w-[250px]">
  {/* 侧边栏内容 */}
</div>
```

---

## 测试清单

开发新组件时，请检查：

- [ ] 配色符合 VS Code Dark+ 规范
- [ ] 没有使用渐变色
- [ ] 使用 Tailwind CSS，无内联样式
- [ ] 布局响应式正常
- [ ] 交互效果流畅（hover、active）
- [ ] 滚动条样式正确
- [ ] 图标大小合适
- [ ] 文字可读性好
- [ ] 状态切换正确
- [ ] 无明显性能问题

---

## 常见问题

### Q: 如何修改主题颜色？

A: 不建议修改。VS Code Dark+ 配色已硬编码在组件中。如需自定义，建议创建主题配置文件。

### Q: 为什么登录页面使用 Ant Design？

A: 登录页面是独立的全屏页面，使用 Ant Design 可以快速实现表单验证和交互。其他页面均使用原生 Tailwind CSS。

### Q: 如何添加新的图标？

A: 从 [Lucide React](https://lucide.dev/icons/) 网站查找图标，导入后使用：

```tsx
import { NewIcon } from 'lucide-react'
<NewIcon size={20} />
```

### Q: 状态栏信息如何动态更新？

A: 修改 `StatusBar.tsx` 组件，添加状态管理：

```tsx
const [gitBranch, setGitBranch] = useState('main')
const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 })
```

---

## 总结

本实现完全遵循 VS Code 的设计语言，提供了：

1. **一致的视觉体验** - 所有组件使用统一的配色和样式
2. **流畅的交互反馈** - 悬停、选中、过渡动画
3. **清晰的层次结构** - 三栏式布局，信息组织合理
4. **良好的可扩展性** - 模块化设计，易于添加新功能

遵循本文档的规范，你可以快速开发出更多符合 VS Code 风格的页面和功能。

---

**最后更新**: 2026-04-29  
**版本**: 1.0.0
