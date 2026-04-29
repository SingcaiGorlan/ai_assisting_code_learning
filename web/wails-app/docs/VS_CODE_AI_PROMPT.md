# AI 提示词：设计 VS Code 风格前端界面

## 📋 完整提示词模板

```markdown
# 角色
你是一个专业的 UI/UX 设计师和前端开发专家，精通 VS Code 界面设计和 Tailwind CSS。

# 任务
为我的 Wails + React + TypeScript 桌面应用设计并实现类似 VS Code 风格的界面。

# 技术要求
- 框架：Wails v2 + React 18 + TypeScript
- 样式：Tailwind CSS 3.x
- 图标：Lucide React
- 路由：React Router v6
- 配色：VS Code Dark+ 主题

# 配色方案（必须严格遵守）

## 核心颜色
- 主背景色：#1e1e1e（深灰色）
- 侧边栏背景：#252526（稍浅灰色）
- 活动栏背景：#333333（更浅灰色）
- 标签栏背景：#2d2d2d（中灰色）
- 边框颜色：#3c3c3c / #252526

## 强调色
- 选中状态：#094771（深蓝色背景）
- 悬停状态：#2a2d2e（浅灰悬停）
- 活动指示器：#007acc（VS Code 蓝色）
- 状态栏：#007acc（蓝色状态栏）
- 链接/按钮：#007acc

## 文字颜色
- 主文字：#ffffff（白色）
- 次要文字：#9ca3af（灰色）
- 链接/按钮：#007acc（蓝色）

# 布局结构

## 整体布局（三栏式）
┌─────────────────────────────────────────────────────┐
│  活动栏  │  侧边栏        │  标签栏                  │
│  (48px)  │  (250px)       │  TabBar                 │
│          │                ├─────────────────────────┤
│  📄      │  导航菜单      │                         │
│  🔍      │  - 首页        │   内容区域               │
│  🔀      │  - 课程        │   (Pages)                │
│  🐛      │  - AI 助手     │                         │
│  📦      │  - 设置        │                         │
│          │                │                         │
│  👤      │  ──────────┐  │                         │
│        │  │ 用户信息  │  │                         │
└──────────┴──┴──────────┴──┴─────────────────────────┘
│              状态栏 (StatusBar, 22px)                │
───────────────────────────────────────────────────────

# 组件规范

## 1. Sidebar（侧边栏）
- 宽度：48px（活动栏）+ 250px（导航菜单）
- 背景色：活动栏 #333333，导航 #252526
- 功能：
  - 左侧活动图标栏（垂直排列）
  - 右侧导航菜单（带标题和列表）
  - 底部用户信息卡片
- 交互：
  - 选中项：蓝色背景 #094771
  - 悬停：#2a2d2e 背景
  - 活动图标：左侧白色 2px 指示条

## 2. TabBar（标签栏）
- 高度：35px
- 背景色：#2d2d2d
- 功能：页面标签切换
- 样式：
  - 活动标签：#1e1e1e 背景，白色文字
  - 非活动标签：#2d2d2d 背景，灰色文字
  - 右侧有关闭按钮（X）

## 3. StatusBar（状态栏）
- 高度：22px
- 背景色：#007acc（蓝色）
- 文字颜色：白色
- 左侧内容：Git 分支、错误数、警告数
- 右侧内容：行号、缩进、编码、文件格式
- 交互：悬停高亮（rgba(255,255,255,0.1)）

## 4. 内容页面
- 背景色：#1e1e1e
- 面包屑导航：#252526 背景，13px 字体
- 卡片样式：
  - 背景：#252526
  - 边框：#3c3c3c
  - 悬停边框：#007acc
  - 圆角：4-6px
- 统计卡片：
  - 网格布局（1-4 列响应式）
  - 图标 + 标签 + 数值
  - 数值使用强调色

# 代码规范

## Tailwind CSS 使用
```tsx
// ✅ 推荐写法
<div className="bg-[#1e1e1e] text-white">
  <div className="bg-[#252526] border border-[#3c3c3c] hover:border-[#007acc]">
    <span className="text-[13px] text-gray-400">
  </div>
</div>

//  避免写法（不要用内联样式）
<div style={{ backgroundColor: '#1e1e1e' }}>
```

## 组件结构
```tsx
import { Icon } from 'lucide-react'

interface ComponentProps {
  // 定义 props
}

export default function Component({ prop }: ComponentProps) {
  return (
    <div className="...">
      {/* 使用 Tailwind 类 */}
    </div>
  )
}
```

# 交互效果

## 过渡动画
```css
transition-all duration-200 ease-in-out
```

## 悬停效果
```tsx
hover:bg-[#2a2d2e] hover:text-white hover:border-[#007acc]
```

## 选中状态
```tsx
className={isActive ? 'bg-[#094771] text-white' : 'text-gray-400'}
```

# 滚动条样式（在 styles.css 中）
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

# 响应式要求
- 移动端：侧边栏可折叠
- 平板：自适应网格
- 桌面：完整三栏布局
- 断点：sm(640px), md(768px), lg(1024px)

# 图标规范
- 使用 Lucide React 图标库
- 活动栏图标：size={24}
- 导航菜单图标：size={18}
- 内容图标：size={20}
- 状态栏图标：size={12}

# 字体规范
- 字体家族：'Segoe UI', 'Roboto', sans-serif
- 标题：26px, font-semibold
- 正文：13-15px
- 小字：11-12px
- 字重：400（正常）, 500（中等）, 600（半粗）

# 开发步骤

## Step 1: 创建组件
1. 在 `frontend/src/components/` 创建组件文件
2. 导入必要的图标和依赖
3. 定义接口和 props
4. 实现 JSX 结构

## Step 2: 应用样式
1. 使用 Tailwind 类应用配色
2. 添加交互效果（hover、active）
3. 设置响应式断点
4. 优化过渡动画

## Step 3: 集成到应用
1. 在 `App.tsx` 中导入组件
2. 更新路由配置
3. 添加状态管理
4. 测试交互效果

## Step 4: 优化调整
1. 检查颜色一致性
2. 测试响应式布局
3. 优化性能
4. 添加无障碍特性

# 测试清单
- [ ] 配色符合 VS Code 规范
- [ ] 布局响应式正常
- [ ] 交互效果流畅
- [ ] 滚动条样式正确
- [ ] 图标大小合适
- [ ] 文字可读性好
- [ ] 状态切换正确
- [ ] 无明显性能问题

# 输出要求
请提供：
1. 完整的组件代码（TSX）
2. 必要的样式修改（CSS）
3. 路由配置更新
4. 使用说明和示例
5. 截图或效果描述

# 注意事项
️ 必须严格遵守配色方案，不要使用渐变色
⚠️ 使用 Tailwind CSS，避免内联样式
⚠️ 保持代码简洁，添加必要注释
⚠️ 确保响应式设计正常工作
⚠️ 测试所有交互状态
⚠️ 遵循 VS Code 的视觉语言
```

---

## 🎯 简化版提示词（快速使用）

```markdown
请为我的 React + Tailwind CSS 应用设计一个类似 VS Code 风格的界面。

核心要求：
1. 深色主题，使用 VS Code Dark+ 配色
2. 左侧活动栏（48px）+ 侧边栏（250px）布局
3. 顶部标签栏（35px）+ 底部状态栏（22px）
4. 主背景色：#1e1e1e，侧边栏：#252526，状态栏：#007acc
5. 使用 Lucide React 图标
6. 所有样式使用 Tailwind CSS
7. 添加平滑的悬停和过渡动画

请提供完整的组件代码和使用示例。
```

---

## 📝 分步提示词

### 第 1 步：创建侧边栏
```markdown
请创建一个 VS Code 风格的侧边栏组件，包含：
- 左侧 48px 活动栏（图标：文件、搜索、Git、调试、扩展）
- 右侧 250px 导航菜单（首页、课程、AI 助手、设置）
- 底部用户信息卡片
- 使用 Tailwind CSS，配色：活动栏 #333333，导航 #252526
- 选中项蓝色背景 #094771，悬停 #2a2d2e
- 使用 Lucide React 图标
```

### 第 2 步：创建标签栏
```markdown
请创建一个 VS Code 风格的标签栏组件：
- 高度 35px，背景 #2d2d2d
- 显示页面标签（仪表板、课程、AI 助手）
- 活动标签背景 #1e1e1e，白色文字
- 非活动标签灰色文字
- 右侧有关闭按钮
- 点击标签切换页面
```

### 第 3 步：创建状态栏
```markdown
请创建一个 VS Code 风格的状态栏组件：
- 高度 22px，蓝色背景 #007acc
- 左侧显示：Git 分支、0 错误、0 警告
- 右侧显示：行号、UTF-8、TypeScript 等信息
- 白色文字，悬停高亮效果
- 使用 Lucide React 图标
```

### 第 4 步：设计页面
```markdown
请设计一个 VS Code 风格的页面（仪表板/课程/AI 对话）：
- 背景色 #1e1e1e
- 顶部面包屑导航（#252526 背景）
- 标题：26px 白色文字
- 统计卡片网格（#252526 背景，#3c3c3c 边框）
- 悬停边框变为 #007acc
- 进度条使用蓝紫渐变
- 响应式布局（1-4 列）
```

---

##  实际示例提示词

```markdown
# 任务
将我的登录页面改造成 VS Code 风格。

# 当前技术栈
- React 18 + TypeScript
- Tailwind CSS 3.x
- React Router v6
- Lucide React 图标

# VS Code 配色要求
- 背景：#1e1e1e
- 卡片：#252526
- 边框：#3c3c3c
- 主按钮：#007acc
- 文字：白色 / #9ca3af

# 设计要求
1. 深色主题，不要渐变
2. 居中卡片布局
3. 输入框样式：
   - 背景：#3c3c3c
   - 边框：#555555
   - 聚焦边框：#007acc
   - 文字：白色
4. 按钮样式：
   - 主按钮：#007acc 背景
   - 悬停：#1177bb
   - 圆角：4px
5. 图标使用 Lucide React
6. 响应式设计

请提供完整的 Login 组件代码。
```

---

## 🎨 视觉参考提示词

```markdown
请参考以下 VS Code 界面元素进行设计：

1. 整体布局：
   - 三栏式：活动栏 + 侧边栏 + 内容区
   - 固定高度元素：标签栏 35px、状态栏 22px
   - 内容区自适应

2. 颜色层次：
   - 最浅：#333333（活动栏）
   - 次浅：#2d2d2d（标签栏）
   - 中等：#252526（侧边栏、卡片）
   - 最深：#1e1e1e（主背景）
   - 边框：#3c3c3c
   - 强调：#007acc（蓝色）

3. 交互反馈：
   - 悬停：背景色变浅（#2a2d2e）
   - 选中：深蓝色背景（#094771）
   - 活动：左侧白色指示条
   - 过渡：200ms ease-in-out

4. 字体层级：
   - 大标题：26px
   - 中标题：16-18px
   - 正文：13-15px
   - 小字：11-12px

请根据这些规范创建 [组件名称]。
```

---

##  调试和优化提示词

```markdown
我的 VS Code 风格界面有以下问题，请帮我修复：

问题描述：[描述具体问题]

当前代码：
[粘贴代码]

期望效果：[描述期望效果]

请提供：
1. 问题原因分析
2. 修复后的代码
3. 优化建议
```

---

## 📌 使用技巧

### 1. 提供上下文
```
✅ 好的提示词：
"请创建一个 VS Code 风格的侧边栏，使用以下配色：
- 背景：#252526
- 边框：#3c3c3c
- 选中：#094771
技术栈：React + Tailwind CSS"

❌ 差的提示词：
"帮我做一个侧边栏"
```

### 2. 分步实现
- 先创建基础布局
- 再添加样式
- 最后添加交互
- 逐步优化

### 3. 提供截图参考
- 附上 VS Code 截图
- 标注关键元素
- 说明具体要求

### 4. 迭代优化
- 第一次：基础功能
- 第二次：样式调整
- 第三次：交互优化
- 第四次：性能优化

---

##  额外资源

### VS Code 主题参考
- 官方主题：https://github.com/microsoft/vscode
- 颜色参考：https://code.visualstudio.com/api/references/theme-color

### Tailwind CSS 配置
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        vscode: {
          bg: '#1e1e1e',
          sidebar: '#252526',
          activity: '#333333',
          tab: '#2d2d2d',
          border: '#3c3c3c',
          selected: '#094771',
          statusbar: '#007acc',
          hover: '#2a2d2e',
        }
      }
    }
  }
}
```

### 快速测试
```bash
# 启动开发模式
wails dev

# 浏览器预览
# 访问 http://localhost:34115
```

---

**使用这些提示词，你可以快速生成 VS Code 风格的前端界面！** 🚀
