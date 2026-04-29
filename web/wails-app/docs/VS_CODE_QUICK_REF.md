# VS Code Dark+ 快速参考

## 🎨 核心配色速查表

### 背景色
```tsx
主背景:    bg-[#1e1e1e]  // 内容区域
侧边栏:    bg-[#252526]  // 卡片、菜单
活动栏:    bg-[#333333]  // 最左侧图标栏
标签栏:    bg-[#2d2d2d]  // 顶部标签
输入框:    bg-[#3c3c3c]  // 表单输入
```

### 边框色
```tsx
普通边框:  border-[#3c3c3c]
分隔线:    border-[#252526]
悬停边框:  hover:border-[#007acc]
```

### 强调色
```tsx
主要蓝色:  text-[#007acc] / bg-[#007acc]
选中背景:  bg-[#094771]
悬停背景:  hover:bg-[#2a2d2e]
按钮悬停:  hover:bg-[#1177bb]
```

### 文字色
```tsx
主文字:    text-white
次要文字:  text-gray-400
小字:      text-gray-500
链接:      text-[#007acc]
```

---

## 📐 常用尺寸

### 布局尺寸
```tsx
活动栏宽度:  w-[48px]
侧边栏宽度:  w-[250px]
标签栏高度:  h-[35px]
状态栏高度:  h-[22px]
```

### 字体大小
```tsx
大标题:    text-[26px]
中标题:    text-[16px] / text-[18px]
正文:      text-[13px] / text-[14px] / text-[15px]
小字:      text-[11px] / text-[12px]
```

### 间距
```tsx
页面内边距:  p-6 (24px)
卡片内边距:  p-4 (16px) / p-5 (20px)
组件间距:    gap-2 (8px) / gap-3 (12px) / gap-4 (16px)
```

### 圆角
```tsx
小圆角:    rounded-sm (2px)
中圆角:    rounded-md (6px)
大圆角:    rounded-lg (8px)
全圆角:    rounded-full
```

---

## 🔧 常用组件模板

### 卡片组件
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

### 按钮组件
```tsx
<button className="bg-[#007acc] hover:bg-[#1177bb] text-white px-4 py-2 rounded-sm text-[13px] font-medium transition-colors">
  按钮文本
</button>
```

### 输入框组件
```tsx
<input 
  type="text"
  placeholder="请输入..."
  className="w-full px-4 py-2.5 bg-[#3c3c3c] border border-[#555555] rounded-sm text-white placeholder:text-gray-500 focus:border-[#007acc] focus:shadow-[0_0_0_2px_rgba(0,122,204,0.2)] outline-none transition-all text-[13px]"
/>
```

### 面包屑导航
```tsx
<div className="flex items-center gap-2 px-6 py-3 border-b border-[#252526] bg-[#252526]">
  <span className="text-[13px] text-gray-400">工作台</span>
  <span className="text-[13px] text-gray-500">/</span>
  <span className="text-[13px] text-white">当前页面</span>
</div>
```

### 统计卡片
```tsx
<div className="bg-[#252526] border border-[#3c3c3c] rounded-md p-4 hover:border-[#007acc] transition-all duration-200 cursor-pointer group">
  <div className="flex items-center gap-3 mb-3">
    <div className="text-gray-400 group-hover:text-white">
      <Icon size={20} />
    </div>
    <span className="text-[13px] text-gray-400 group-hover:text-white">标签</span>
  </div>
  <div className="text-[28px] font-semibold text-[#007acc]">
    数值
  </div>
</div>
```

### 进度条
```tsx
<div className="w-full bg-[#3c3c3c] rounded-full h-[6px] overflow-hidden">
  <div
    className="h-[6px] rounded-full bg-[#007acc] transition-all duration-300"
    style={{ width: `${progress}%` }}
  />
</div>
```

---

## 🎯 交互效果

### 过渡动画
```tsx
className="transition-all duration-200 ease-in-out"
```

### 悬停效果
```tsx
className="hover:bg-[#2a2d2e] hover:text-white hover:border-[#007acc]"
```

### 选中状态
```tsx
className={isActive ? 'bg-[#094771] text-white' : 'text-gray-400 hover:bg-[#2a2d2e]'}
```

### 点击反馈
```tsx
className="active:scale-95 transition-transform"
```

---

## 📱 响应式断点

```tsx
// 移动端优先
grid-cols-1        // 默认（手机）
sm:grid-cols-2     // ≥640px（平板）
md:grid-cols-3     // ≥768px（小屏桌面）
lg:grid-cols-4     // ≥1024px（桌面）
```

---

## 🎨 图标使用

### Lucide React 图标
```tsx
import { Home, BookOpen, MessageSquare } from 'lucide-react'

// 活动栏图标 (24px)
<Home size={24} />

// 导航菜单图标 (18px)
<BookOpen size={18} />

// 内容图标 (20px)
<MessageSquare size={20} />

// 状态栏图标 (12px)
<Bell size={12} />
```

---

## ⚡ 快速复制粘贴

### 完整页面结构
```tsx
export default function MyPage() {
  return (
    <div className="h-full bg-[#1e1e1e] overflow-y-auto custom-scrollbar">
      {/* 面包屑 */}
      <div className="flex items-center gap-2 px-6 py-3 border-b border-[#252526] bg-[#252526]">
        <span className="text-[13px] text-gray-400">工作台</span>
        <span className="text-[13px] text-gray-500">/</span>
        <span className="text-[13px] text-white">页面名称</span>
      </div>

      {/* 内容 */}
      <div className="p-6">
        <h1 className="text-[26px] font-semibold text-white mb-4">
          页面标题
        </h1>
        
        {/* 你的内容 */}
      </div>
    </div>
  )
}
```

### 网格布局
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {items.map((item, index) => (
    <div key={index} className="bg-[#252526] border border-[#3c3c3c] rounded-md p-5 hover:border-[#007acc] transition-all duration-200">
      {/* 卡片内容 */}
    </div>
  ))}
</div>
```

---

## ❌ 禁止事项

1. **不要使用渐变色** - VS Code 不使用渐变
   ```tsx
   // ❌ 错误
   bg-gradient-to-r from-blue-500 to-purple-500
   
   // ✅ 正确
   bg-[#007acc]
   ```

2. **不要使用内联样式** - 统一使用 Tailwind
   ```tsx
   // ❌ 错误
   <div style={{ backgroundColor: '#1e1e1e' }}>
   
   // ✅ 正确
   <div className="bg-[#1e1e1e]">
   ```

3. **不要偏离配色方案** - 严格使用定义的颜色
   ```tsx
   // ❌ 错误
   bg-blue-500 text-green-600
   
   // ✅ 正确
   bg-[#007acc] text-[#4ec9b0]
   ```

---

## 💡 提示

- 所有颜色值都已硬编码，确保一致性
- 使用 `custom-scrollbar` 类应用自定义滚动条样式
- 过渡动画统一使用 `duration-200`
- 圆角统一使用 `rounded-sm` (2px) 或 `rounded-md` (6px)
- 保持代码简洁，避免过度嵌套

---

**保存此文件以便快速查阅！** 🚀
