import { apiClient } from './client'

export type User = {
  id: string
  email: string
  username: string
  role: string
  active: boolean
}

export const usersApi = {
  async list(): Promise<User[]> {
    // Call real backend when ready
    try {
      const res = await apiClient.get('/users')
      if (Array.isArray(res.data)) return res.data as User[]
    } catch (e) {
      // fall through to mock if backend not ready
    }
    // Mock data
    return [
      { id: '1', email: 'admin@example.com', username: 'admin', role: 'admin', active: true },
      { id: '2', email: 'user@example.com', username: 'user01', role: 'user', active: true }
    ]
  }
}
