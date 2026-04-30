// Wails Bindings - 直接调用 Go 方法，不需要 HTTP

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
}

export const authAPI = {
  // 用户登录
  login: async (data: LoginRequest): Promise<{ success: boolean; message: string; token?: string; user?: any }> => {
    try {
      const result = await window.go.main.App.Login(data.email, data.password)
      return result
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  },

  // 用户注册
  register: async (data: RegisterRequest): Promise<{ success: boolean; message: string }> => {
    try {
      const result = await window.go.main.App.Register(data.username, data.email, data.password)
      return result
    } catch (error) {
      console.error('Register failed:', error)
      throw error
    }
  },

  // 获取用户信息（Wails 应用中可以从本地存储获取）
  getProfile: async () => {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      return JSON.parse(userStr)
    }
    return null
  },
}
