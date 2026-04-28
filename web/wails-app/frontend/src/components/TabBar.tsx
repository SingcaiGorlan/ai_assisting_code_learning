import { X } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

interface Tab {
  path: string
  label: string
  icon?: React.ReactNode
}

export default function TabBar() {
  const location = useLocation()
  const navigate = useNavigate()

  const tabs: Tab[] = [
    { path: '/dashboard', label: '仪表板' },
    { path: '/lessons', label: '课程学习' },
    { path: '/chat', label: 'AI 助手' },
  ]

  return (
    <div className="flex items-center bg-[#2d2d2d] border-b border-[#1e1e1e] h-[35px] px-2">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`flex items-center gap-2 px-3 py-1 text-[13px] border-r border-[#1e1e1e] transition-colors ${
              isActive
                ? 'bg-[#1e1e1e] text-white'
                : 'bg-[#2d2d2d] text-gray-400 hover:bg-[#2a2d2e]'
            }`}
          >
            <span>{tab.label}</span>
            {isActive && (
              <X size={14} className="hover:text-white cursor-pointer" />
            )}
          </button>
        )
      })}
    </div>
  )
}
