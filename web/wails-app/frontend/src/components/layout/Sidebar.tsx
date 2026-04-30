import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { 
  Home, 
  BookOpen, 
  MessageSquare, 
  Settings, 
  User,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"

interface MenuItem {
  icon: React.ElementType
  label: string
  path: string
}

const menuItems: MenuItem[] = [
  { icon: Home, label: "仪表板", path: "/dashboard" },
  { icon: BookOpen, label: "课程", path: "/lessons" },
  { icon: MessageSquare, label: "AI 助手", path: "/chat" },
  { icon: User, label: "个人", path: "/profile" },
  { icon: Settings, label: "设置", path: "/settings" },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  return (
    <div 
      className={cn(
        "bg-secondary border-r border-border transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        {!collapsed && (
          <h1 className="text-lg font-bold text-primary">
            AI 代码学习
          </h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-accent rounded-md transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* 菜单项 */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-accent text-foreground"
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* 底部用户信息 */}
      <div className="p-4 border-t border-border">
        <div className={cn(
          "flex items-center gap-3",
          collapsed && "justify-center"
        )}>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
            U
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">演示用户</p>
              <p className="text-xs text-muted-foreground truncate">demo@example.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
