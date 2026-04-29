import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Lessons from './pages/Lessons'
import Chat from './pages/Chat'
import Welcome from './pages/Welcome'
import SettingsPage from './pages/Settings'
import Sidebar from './components/Sidebar'
import TabBar from './components/TabBar'
import StatusBar from './components/StatusBar'

// 内部组件，用于处理导航
function AppContent({ isLoggedIn, user, handleLogout, onLogin }: { 
  isLoggedIn: boolean
  user: any
  handleLogout: () => void
  onLogin: (userData: any) => void
}) {
  const navigate = useNavigate()

  return (
    <div className="h-screen flex flex-col bg-[#1e1e1e]">
      {isLoggedIn && (
        <div className="flex-1 flex overflow-hidden">
          <Sidebar user={user} onLogout={handleLogout} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <TabBar />
            <div className="flex-1 overflow-hidden">
              <Routes>
                <Route 
                  path="/login" 
                  element={<Navigate to="/dashboard" />} 
                />
                <Route 
                  path="/welcome" 
                  element={<Welcome onNavigate={navigate} />} 
                />
                <Route 
                  path="/dashboard" 
                  element={<Dashboard />} 
                />
                <Route 
                  path="/lessons" 
                  element={<Lessons />} 
                />
                <Route 
                  path="/chat" 
                  element={<Chat />} 
                />
                <Route 
                  path="/settings" 
                  element={<SettingsPage />} 
                />
                <Route path="/" element={<Navigate to="/welcome" />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
      {!isLoggedIn && (
        <div className="flex-1 overflow-hidden">
          <Routes>
            <Route 
              path="/login" 
              element={<Login onLogin={onLogin} />} 
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      )}
      <StatusBar />
    </div>
  )
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // 检查本地存储的登录状态
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      setIsLoggedIn(true)
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogin = (userData: any) => {
    setIsLoggedIn(true)
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <BrowserRouter>
      <AppContent 
        isLoggedIn={isLoggedIn} 
        user={user} 
        handleLogout={handleLogout}
        onLogin={handleLogin}
      />
    </BrowserRouter>
  )
}

export default App
