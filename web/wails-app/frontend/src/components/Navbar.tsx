import { Home, BookOpen, MessageSquare, LogOut, User } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

interface NavbarProps {
  user: any
  onLogout: () => void
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  const location = useLocation()

  const navItems = [
    { path: '/dashboard', icon: Home, label: '首页' },
    { path: '/lessons', icon: BookOpen, label: '课程' },
    { path: '/chat', icon: MessageSquare, label: 'AI 助手' },
  ]

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <h1 className="text-xl font-bold text-gray-800">代码学习平台</h1>
            </div>

            <div className="flex gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                      isActive
                        ? 'bg-purple-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-lg">
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">{user?.username || '用户'}</span>
            </div>
            
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              退出
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
