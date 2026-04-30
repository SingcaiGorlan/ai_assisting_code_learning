import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import AppLayout from "@/components/layout/AppLayout"
import Login from "@/pages/Login"
import Dashboard from "@/pages/Dashboard"
import LessonsPage from "@/pages/LessonsPage"
import ChatPage from "@/pages/ChatPage"
import RadixDemo from "@/pages/RadixDemo"
import RadixShowcase from "@/pages/RadixShowcase"

// 简单的认证检查
const isAuthenticated = () => {
  return !!localStorage.getItem('token')
}

// 受保护的路由
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 公开路由 */}
        <Route path="/login" element={<Login />} />
        <Route path="/demo" element={<RadixDemo />} />
        <Route path="/showcase" element={<RadixShowcase />} />
        
        {/* 受保护的路由 */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="lessons" element={<LessonsPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="profile" element={<div className="p-6 text-center"><h2 className="text-2xl font-bold mb-4">个人页面</h2><p className="text-muted-foreground">开发中...</p></div>} />
          <Route path="settings" element={<div className="p-6 text-center"><h2 className="text-2xl font-bold mb-4">设置页面</h2><p className="text-muted-foreground">开发中...</p></div>} />
        </Route>
        
        {/* 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
