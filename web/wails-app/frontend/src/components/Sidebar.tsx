import { 
  Home, 
  BookOpen, 
  MessageSquare, 
  Settings, 
  FileText, 
  Search, 
  GitBranch,
  Bug,
  Layers,
  User
} from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface SidebarProps {
  user: any
  onLogout: () => void
}

interface SidebarItem {
  icon: React.ReactNode
  label: string
  path: string
  tooltip: string
}

export default function Sidebar({ user, onLogout }: SidebarProps) {
  const location = useLocation()
  const [activeActivity, setActiveActivity] = useState(0)

  // 活动栏图标（最左侧）
  const activityBarItems = [
    { icon: <FileText size={24} />, label: '资源管理器', tooltip: 'Explorer' },
    { icon: <Search size={24} />, label: '搜索', tooltip: 'Search' },
    { icon: <GitBranch size={24} />, label: '源代码管理', tooltip: 'Source Control' },
    { icon: <Bug size={24} />, label: '运行和调试', tooltip: 'Run and Debug' },
    { icon: <Layers size={24} />, label: '扩展', tooltip: 'Extensions' },
  ]

  // 导航菜单项（侧边栏内容）
  const navItems: SidebarItem[] = [
    { 
      icon: <Home size={18} />, 
      label: '首页', 
      path: '/dashboard',
      tooltip: 'Dashboard'
    },
    { 
      icon: <BookOpen size={18} />, 
      label: '课程学习', 
      path: '/lessons',
      tooltip: 'Lessons'
    },
    { 
      icon: <MessageSquare size={18} />, 
      label: 'AI 助手', 
      path: '/chat',
      tooltip: 'AI Chat'
    },
    { 
      icon: <Settings size={18} />, 
      label: '设置', 
      path: '/settings',
      tooltip: 'Settings'
    },
  ]

  return (
    <div className="flex h-full bg-[#1e1e1e]">
      {/* 活动栏 - 最左侧图标栏 */}
      <div className="w-[48px] bg-[#333333] flex flex-col items-center py-2 border-r border-[#252526]">
        {/* 顶部活动图标 */}
        <div className="flex-1 flex flex-col gap-1">
          {activityBarItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveActivity(index)}
              className={`w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white transition-colors relative ${
                activeActivity === index ? 'text-white' : ''
              }`}
              title={item.tooltip}
            >
              {item.icon}
              {activeActivity === index && (
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white" />
              )}
            </button>
          ))}
        </div>

        {/* 底部图标 */}
        <div className="flex flex-col gap-1">
          <button
            className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            title="账户"
          >
            <User size={24} />
          </button>
          <button
            onClick={onLogout}
            className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-red-400 transition-colors"
            title="退出登录"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </div>

      {/* 侧边栏 - 导航菜单 */}
      <div className="w-[250px] bg-[#252526] flex flex-col border-r border-[#1e1e1e]">
        {/* 侧边栏标题 */}
        <div className="h-[35px] px-4 flex items-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">
          导航菜单
        </div>

        {/* 导航项 */}
        <div className="flex-1 overflow-y-auto py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 mx-2 rounded-md text-[13px] transition-all ${
                  isActive
                    ? 'bg-[#094771] text-white'
                    : 'text-gray-300 hover:bg-[#2a2d2e] hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>

        {/* 用户信息 */}
        {user && (
          <div className="p-3 border-t border-[#1e1e1e] bg-[#252526]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                {user.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] text-white font-medium truncate">
                  {user.username}
                </div>
                <div className="text-[11px] text-gray-400 truncate">
                  {user.email || 'user@example.com'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
