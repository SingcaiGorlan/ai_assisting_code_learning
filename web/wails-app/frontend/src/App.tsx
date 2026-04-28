import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Lessons from './pages/Lessons'
import Chat from './pages/Chat'
import Sidebar from './components/Sidebar'
import TabBar from './components/TabBar'
import StatusBar from './components/StatusBar'

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
                    element={
                      !isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />
                    } 
                  />
                  <Route 
                    path="/dashboard" 
                    element={
                      isLoggedIn ? <Dashboard /> : <Navigate to="/login" />
                    } 
                  />
                  <Route 
                    path="/lessons" 
                    element={
                      isLoggedIn ? <Lessons /> : <Navigate to="/login" />
                    } 
                  />
                  <Route 
                    path="/chat" 
                    element={
                      isLoggedIn ? <Chat /> : <Navigate to="/login" />
                    } 
                  />
                  <Route path="/" element={<Navigate to="/dashboard" />} />
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
                element={
                  !isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />
                } 
              />
              <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        )}
        <StatusBar />
      </div>
    </BrowserRouter>
  )
}

export default App
