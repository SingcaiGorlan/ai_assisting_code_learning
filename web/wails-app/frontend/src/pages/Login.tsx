import { useState } from 'react'
import { LogIn, User, Mail, Lock, Loader2 } from 'lucide-react'

interface LoginProps {
  onLogin: (user: any) => void
}

declare global {
  interface Window {
    go: {
      main: {
        App: {
          Login: (username: string, password: string) => Promise<any>
          Register: (username: string, email: string, password: string) => Promise<any>
        }
      }
    }
  }
}

export default function Login({ onLogin }: LoginProps) {
  const [isRegister, setIsRegister] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isRegister) {
        const result = await window.go.main.App.Register(
          formData.username,
          formData.email,
          formData.password
        )
        
        if (result.success) {
          setIsRegister(false)
          setError('注册成功！请登录')
        } else {
          setError(result.message || '注册失败')
        }
      } else {
        const result = await window.go.main.App.Login(
          formData.username,
          formData.password
        )
        
        if (result.success) {
          localStorage.setItem('token', result.token)
          onLogin(result.user)
        } else {
          setError(result.message || '登录失败')
        }
      }
    } catch (err) {
      setError('操作失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md p-8 mx-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              AI 辅助代码学习
            </h1>
            <p className="text-gray-600">
              {isRegister ? '创建新账号' : '欢迎回来'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                用户名
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="请输入用户名"
                  required
                />
              </div>
            </div>

            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  邮箱
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="请输入邮箱"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                密码
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="请输入密码"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {error && (
              <div className={`p-3 rounded-lg ${error.includes('成功') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  处理中...
                </>
              ) : (
                <>
                  {isRegister ? '注册' : '登录'}
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsRegister(!isRegister)
                setError('')
                setFormData({ username: '', email: '', password: '' })
              }}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              {isRegister ? '已有账号？立即登录' : '没有账号？立即注册'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
