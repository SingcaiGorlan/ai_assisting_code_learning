# Radix UI + Tailwind CSS 快速启动指南

## 🚀 快速开始

### 1. 启动开发服务器

**Windows (PowerShell):**
```powershell
cd web/wails-app/frontend
npm run dev
```

**Windows (双击运行):**
```
web/wails-app/scripts/start-radix-dev.bat
```

**macOS/Linux:**
```bash
cd web/wails-app/frontend
npm run dev
```

### 2. 访问应用

打开浏览器访问: http://localhost:5173

### 3. 查看示例页面

在浏览器地址栏输入: `http://localhost:5173/RadixDemo`

---

## 📦 已安装的组件

### UI 组件 (src/components/ui/)

- ✅ **Button** - 按钮组件
  - 6 种变体: default, secondary, destructive, outline, ghost, link
  - 4 种尺寸: sm, default, lg, icon

- ✅ **Card** - 卡片组件
  - CardHeader, CardTitle, CardDescription
  - CardContent, CardFooter

- ✅ **Input** - 输入框组件
  - 支持所有 HTML input 属性
  - 自动适配主题

### Radix UI 基础组件

已安装但未封装，可以直接使用：
- Dialog (对话框)
- DropdownMenu (下拉菜单)
- Tabs (标签页)
- Tooltip (工具提示)
- Toast (通知)
- Avatar (头像)
- Popover (弹出框)
- Switch (开关)
- Checkbox (复选框)
- RadioGroup (单选组)
- Select (选择器)
- Separator (分隔线)

---

##  样式系统

### CSS 变量

所有颜色使用 CSS 变量，支持亮色/暗色主题：

```css
/* 在组件中使用 */
<div className="bg-background text-foreground">
  <h1 className="text-primary">主色文本</h1>
  <p className="text-muted-foreground">次要文本</p>
</div>
```

### 颜色变量

| 变量名 | 用途 | 示例 |
|--------|------|------|
| `--background` | 背景色 | `bg-background` |
| `--foreground` | 前景色（文字） | `text-foreground` |
| `--primary` | 主色 | `bg-primary` |
| `--secondary` | 次要色 | `bg-secondary` |
| `--muted` | 柔和色 | `bg-muted` |
| `--accent` | 强调色 | `bg-accent` |
| `--destructive` | 危险色 | `bg-destructive` |
| `--border` | 边框色 | `border-border` |

### 主题切换

```tsx
// 切换到暗色主题
document.documentElement.classList.add('dark')

// 切换到亮色主题
document.documentElement.classList.remove('dark')
```

---

## 💻 代码示例

### 示例 1: 创建登录表单

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function LoginForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>登录</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input type="email" placeholder="邮箱" />
        <Input type="password" placeholder="密码" />
      </CardContent>
      <CardFooter>
        <Button className="w-full">登录</Button>
      </CardFooter>
    </Card>
  )
}
```

### 示例 2: 创建用户卡片

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function UserCard({ name, role }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{role}</p>
        <Button variant="outline" className="mt-4">
          查看详情
        </Button>
      </CardContent>
    </Card>
  )
}
```

### 示例 3: 使用 Tailwind 布局

```tsx
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Grid 布局 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 卡片内容 */}
        </div>
        
        {/* Flex 布局 */}
        <div className="flex items-center justify-between mt-8">
          <h1 className="text-2xl font-bold">标题</h1>
          <Button>操作</Button>
        </div>
      </div>
    </div>
  )
}
```

---

## ️ 开发工具

### VS Code 推荐插件

1. **Tailwind CSS IntelliSense** - Tailwind CSS 自动补全
2. **ESLint** - 代码检查
3. **Prettier** - 代码格式化

### 常用命令

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview

# 类型检查
npx tsc --noEmit
```

---

## 📚 学习资源

### 官方文档

- [Radix UI](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite](https://vitejs.dev/guide/)
- [React](https://react.dev/)

### 组件参考

- [shadcn/ui](https://ui.shadcn.com/) - 组件设计灵感
- [Radix Themes](https://www.radix-ui.com/themes/docs/overview/getting-started) - 主题系统

---

## ❓ 常见问题

### Q1: 如何修改主题颜色？

编辑 `src/styles/globals.css`：

```css
:root {
  --primary: 222.2 47.4% 11.2%;  /* 修改这里 */
}
```

### Q2: 组件样式不生效？

1. 检查是否正确导入组件
2. 确认 Tailwind CSS 配置
3. 重启开发服务器

### Q3: 如何添加新组件？

1. 在 `src/components/ui/` 创建新文件
2. 参考现有组件结构
3. 使用 `cn()` 工具函数合并类名

### Q4: 路径别名不工作？

检查 `tsconfig.json` 配置：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 🎯 下一步

1. **查看示例页面**: `http://localhost:5173/RadixDemo`
2. **阅读配置文档**: `docs/RADX_SETUP.md`
3. **开始设计布局**: 在 `src/pages/` 创建新页面
4. **添加更多组件**: 根据需求封装 Radix UI 组件

---

## 📝 项目结构

```
frontend/
├── src/
│   ├── components/
│   │   └── ui/              ← UI 组件
│   ├── lib/
│   │   ── utils.ts         ← 工具函数
│   ├── pages/
│   │   └── RadixDemo.tsx    ← 示例页面
│   ├── styles/
│   │   └── globals.css      ← 全局样式
│   ── styles.css           ← 主样式
├── docs/
│   └── RADX_SETUP.md        ← 配置文档
└── scripts/
    └── start-radix-dev.bat  ← 启动脚本
```

---

##  技术支持

遇到问题？

1. 查看 `docs/RADX_SETUP.md` 详细配置文档
2. 检查浏览器控制台错误
3. 查看终端输出
4. 参考官方文档

---

**祝你开发愉快！** 🚀
