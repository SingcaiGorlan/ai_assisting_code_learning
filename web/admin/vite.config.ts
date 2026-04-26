import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 4174
  },
  base: '/admin/',
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
