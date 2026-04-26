import { apiClient } from './client'

export const authApi = {
  async login(email: string, password: string): Promise<string> {
    // NOTE: backend login is TODO; here we call /users/login and expect token
    const res = await apiClient.post('/users/login', { email, password })
    if (res.data?.token) return res.data.token as string
    // Fallback mock token for now
    return 'demo-token'
  }
}
