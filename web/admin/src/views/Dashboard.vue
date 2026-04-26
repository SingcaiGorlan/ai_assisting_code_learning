<template>
  <div class="layout">
    <aside class="sidebar">
      <h2>AI Admin</h2>
      <router-link to="/users" active-class="active">Users</router-link>
      <button class="btn" style="width:100%;margin-top:12px;background:var(--border);" @click="logout">Logout</button>
    </aside>
    <div style="display:flex;flex-direction:column;min-height:100vh;">
      <header class="topbar">
        <div>
          <div style="font-weight:700;">AI Learning Platform</div>
          <div style="color:var(--muted);font-size:13px;">Admin Console</div>
        </div>
        <div style="color:var(--muted);font-size:13px;">{{ userEmail }}</div>
      </header>
      <main style="padding:20px;flex:1;">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userEmail = computed(() => 'admin@example.com')

const logout = () => {
  localStorage.removeItem('token')
  router.push({ name: 'login' })
}
</script>
