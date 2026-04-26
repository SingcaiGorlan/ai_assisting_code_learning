<template>
  <div class="login-page" style="display:flex;align-items:center;justify-content:center;min-height:100vh;">
    <div class="card" style="width:360px;">
      <h2 style="margin:0 0 12px;">Admin Login</h2>
      <p style="color:var(--muted);margin:0 0 20px;">Sign in to manage users</p>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div>
          <label>Email</label>
          <input class="input" v-model="email" type="email" placeholder="admin@example.com" />
        </div>
        <div>
          <label>Password</label>
          <input class="input" v-model="password" type="password" placeholder="••••••" />
        </div>
        <button class="btn btn-primary" @click="login" :disabled="loading">
          {{ loading ? 'Signing in...' : 'Login' }}
        </button>
        <p v-if="error" style="color:var(--danger);margin:0;">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authApi } from '@/api/auth'

const email = ref('admin@example.com')
const password = ref('123456')
const loading = ref(false)
const error = ref('')
const router = useRouter()

const login = async () => {
  loading.value = true
  error.value = ''
  try {
    const token = await authApi.login(email.value, password.value)
    localStorage.setItem('token', token)
    router.push({ name: 'users' })
  } catch (err: any) {
    error.value = err?.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>
