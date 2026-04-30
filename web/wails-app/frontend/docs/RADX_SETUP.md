# Radix UI + Tailwind CSS 配置完成

## ✅ 已完成的配置

### 1. 安装的依赖

```json
{
  "@radix-ui/themes": "^3.3.0",
  "@radix-ui/react-slot": "最新版本",
  "@radix-ui/react-dialog": "最新版本",
  "@radix-ui/react-dropdown-menu": "最新版本",
  "@radix-ui/react-tabs": "最新版本",
  "@radix-ui/react-tooltip": "最新版本",
  "@radix-ui/react-toast": "最新版本",
  "@radix-ui/react-avatar": "最新版本",
  "@radix-ui/react-popover": "最新版本",
  "@radix-ui/react-switch": "最新版本",
  "@radix-ui/react-checkbox": "最新版本",
  "@radix-ui/react-radio-group": "最新版本",
  "@radix-ui/react-select": "最新版本",
  "@radix-ui/react-separator": "最新版本",
  "@radix-ui/react-aspect-ratio": "最新版本",
  "class-variance-authority": "最新版本",
  "clsx": "最新版本",
  "tailwind-merge": "最新版本",
  "tailwindcss-animate": "最新版本"
}
```

### 2. 配置文件

#### Tailwind CSS 配置
- **文件**: `tailwind.config.js`
- **新增**:
  - 暗色模式支持 (`darkMode: 'class'`)
  - Radix UI 主题路径
  - CSS 变量颜色系统
  - 圆角、动画等扩展

#### PostCSS 配置
- **文件**: `postcss.config.js`
- 已配置 Tailwind CSS 和 Autoprefixer

#### TypeScript 配置
- **文件**: `tsconfig.json`
- 路径别名: `@/*` → `./src/*`

### 3. 样式文件

#### 全局样式
- **文件**: `src/styles/globals.css`
- **包含**:
  - CSS 变量定义（亮色/暗色主题）
  - Tailwind CSS 基础样式
  - 边框、背景等基础类

#### 主样式
- **文件**: `src/styles.css`
- **导入**: `@import './styles/globals.css'`
- 保留 VS Code 风格滚动条

### 4. 工具函数

- **文件**: `src/lib/utils.ts`
- **功能**: `cn()` - 合并 Tailwind 类名

### 5. UI 组件

已创建基础组件（位于 `src/components/ui/`）:

- ✅ `button.tsx` - 按钮组件（6 种变体，4 种尺寸）
- ✅ `card.tsx` - 卡片组件（含 Header、Content、Footer）
- ✅ `input.tsx` - 输入框组件

### 6. 示例页面

- **文件**: `src/pages/RadixDemo.tsx`
- **功能**: 展示所有已配置的组件和样式

---

## 🚀 启动开发服务器

```bash
cd web/wails-app/frontend
npm run dev
```

访问: `http://localhost:5173`

---

## 📁 目录结构

```
frontend/
├── src/
│   ├── components/
│   │   ── ui/                    ← Radix UI 组件
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ── input.tsx
│   ├── lib/
│   │   └── utils.ts               ← 工具函数
│   ├── pages/
│   │   └── RadixDemo.tsx          ← 示例页面
│   ├── styles/
│   │   └── globals.css            ← 全局样式（CSS 变量）
│   └── styles.css                 ← 主样式文件
├── tailwind.config.js             ← Tailwind 配置
├── postcss.config.js              ← PostCSS 配置
└── tsconfig.json                  ← TypeScript 配置
```

---

## 🎨 使用示例

### 1. 使用按钮组件

```tsx
import { Button } from "@/components/ui/button"

<Button variant="default">默认按钮</Button>
<Button variant="secondary">次要按钮</Button>
<Button variant="destructive">危险按钮</Button>
<Button variant="outline">边框按钮</Button>
```

### 2. 使用卡片组件

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>卡片标题</CardTitle>
  </CardHeader>
  <CardContent>
    卡片内容
  </CardContent>
</Card>
```

### 3. 使用输入框

```tsx
import { Input } from "@/components/ui/input"

<Input placeholder="请输入..." />
```

### 4. 使用 Tailwind CSS 类

```tsx
<div className="flex items-center justify-between p-4 bg-card rounded-lg">
  <h1 className="text-2xl font-bold text-foreground">标题</h1>
  <p className="text-sm text-muted-foreground">描述</p>
</div>
```

---

## 🎯 CSS 变量系统

所有颜色都使用 CSS 变量，支持亮色/暗色主题切换：

### 主要颜色

- `bg-background` / `text-foreground` - 背景/前景色
- `bg-primary` / `text-primary-foreground` - 主色
- `bg-secondary` / `text-secondary-foreground` - 次要色
- `bg-muted` / `text-muted-foreground` - 柔和色
- `bg-accent` / `text-accent-foreground` - 强调色
- `bg-destructive` / `text-destructive-foreground` - 危险色

### 边框和圆角

- `border-border` - 边框颜色
- `rounded-lg` / `rounded-md` / `rounded-sm` - 圆角

### 切换暗色模式

```tsx
// 在 HTML 根元素添加 class
document.documentElement.classList.add('dark')

// 或使用 Tailwind
<html className="dark">
```

---

## 📚 可用组件列表

### 已安装但未封装的 Radix UI 组件

可以直接使用：

```tsx
import * as Dialog from "@radix-ui/react-dialog"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import * as Tabs from "@radix-ui/react-tabs"
import * as Tooltip from "@radix-ui/react-tooltip"
import * as Toast from "@radix-ui/react-toast"
import * as Avatar from "@radix-ui/react-avatar"
import * as Popover from "@radix-ui/react-popover"
import * as Switch from "@radix-ui/react-switch"
import * as Checkbox from "@radix-ui/react-checkbox"
import * as RadioGroup from "@radix-ui/react-radio-group"
import * as Select from "@radix-ui/react-select"
import * as Separator from "@radix-ui/react-separator"
```

需要封装成 shadcn/ui 风格的组件，可以告诉我！

---

## 🔧 下一步建议

### 1. 添加更多 UI 组件

常用组件：
- Dialog（对话框）
- DropdownMenu（下拉菜单）
- Tabs（标签页）
- Tooltip（工具提示）
- Toast（通知）
- Avatar（头像）
- Select（选择器）
- Switch（开关）
- Checkbox（复选框）

### 2. 集成路由

在 `App.tsx` 中添加路由：

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom"
import RadixDemo from "./pages/RadixDemo"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RadixDemo />} />
      </Routes>
    </BrowserRouter>
  )
}
```

### 3. 主题切换

添加亮色/暗色主题切换功能：

```tsx
const [theme, setTheme] = useState<'light' | 'dark'>('dark')

useEffect(() => {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}, [theme])
```

---

## ❓ 常见问题

### Q: 如何添加新组件？

在 `src/components/ui/` 下创建新文件，参考现有组件的结构。

### Q: 如何修改主题颜色？

编辑 `src/styles/globals.css` 中的 CSS 变量。

### Q: 组件样式不生效？

1. 检查 Tailwind CSS 是否正确配置
2. 确认 `tailwind.config.js` 中的 content 路径
3. 重启开发服务器

### Q: 路径别名不工作？

检查 `tsconfig.json` 和 `vite.config.ts` 中的路径配置。

---

##  相关文档

- [Radix UI 官方文档](https://www.radix-ui.com/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [shadcn/ui 组件库](https://ui.shadcn.com/)

---

## ✅ 验证清单

- [x] 安装所有依赖
- [x] 配置 Tailwind CSS
- [x] 配置 PostCSS
- [x] 创建 CSS 变量文件
- [x] 创建工具函数
- [x] 创建基础 UI 组件
- [x] 创建示例页面
- [x] 配置路径别名
- [x] 启动开发服务器

---

**配置完成！现在可以开始使用 Radix UI 和 Tailwind CSS 设计布局了！** 🎉
