import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api/v1'

export const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
