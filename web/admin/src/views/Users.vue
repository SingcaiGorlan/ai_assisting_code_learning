<template>
  <div class="card">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
      <div>
        <h3 style="margin:0;">Users</h3>
        <p style="margin:4px 0 0;color:var(--muted);">Manage registered users</p>
      </div>
      <button class="btn btn-primary" @click="refresh" :disabled="loading">Refresh</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Email</th>
          <th>Username</th>
          <th>Role</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in users" :key="u.id">
          <td>{{ u.email }}</td>
          <td>{{ u.username }}</td>
          <td>{{ u.role }}</td>
          <td :style="{color: u.active ? 'var(--success)' : 'var(--danger)'}">
            {{ u.active ? 'Active' : 'Disabled' }}
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="!users.length && !loading" style="color:var(--muted);">No users yet.</p>
    <p v-if="error" style="color:var(--danger);">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { usersApi, type User } from '@/api/users'

const users = ref<User[]>([])
const loading = ref(false)
const error = ref('')

const load = async () => {
  loading.value = true
  error.value = ''
  try {
    users.value = await usersApi.list()
  } catch (err: any) {
    error.value = err?.message || 'Failed to load users'
  } finally {
    loading.value = false
  }
}

const refresh = () => load()

onMounted(load)
</script>
