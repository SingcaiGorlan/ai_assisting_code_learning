<template>
  <div class="page">
    <header class="hero">
      <div class="container hero-inner">
        <div>
          <p class="badge">🚀 AI Learning Platform</p>
          <h1>Build faster with AI-driven learning & code assistance</h1>
          <p class="subtitle">Unified portal: AI chat, code analysis, lessons, and admin tools. Crafted for developers and teams.</p>
          <div class="hero-actions">
            <button class="btn" @click="goDocs">View Docs</button>
            <button class="btn ghost" @click="goAdmin">Open Admin</button>
          </div>
          <div class="highlights">
            <div class="pill">Code Assist</div>
            <div class="pill">AI Chat</div>
            <div class="pill">Lessons & Progress</div>
            <div class="pill">User Management</div>
          </div>
        </div>
        <div class="glass card">
          <p class="mini-title">Live API snapshot</p>
          <ul>
            <li><span>Health</span><code>GET /health</code></li>
            <li><span>Login</span><code>POST /api/v1/users/login</code></li>
            <li><span>Lessons</span><code>GET /api/v1/learning/lessons</code></li>
            <li><span>AI Chat</span><code>POST /api/v1/ai/chat</code></li>
          </ul>
          <small class="muted">Backend running at http://localhost:8080</small>
        </div>
      </div>
    </header>

    <main class="container sections">
      <section class="grid">
        <div class="card feature">
          <h3>AI Code Assist</h3>
          <p>Analyze code, detect issues, and receive actionable suggestions in seconds.</p>
          <span class="tag">/api/v1/ai/code-assist</span>
        </div>
        <div class="card feature">
          <h3>Learning Path</h3>
          <p>Curated lessons with progress tracking and exercises for your team.</p>
          <span class="tag">/api/v1/learning/*</span>
        </div>
        <div class="card feature">
          <h3>Admin Console</h3>
          <p>Manage users, roles, and platform data through a modern dashboard.</p>
          <span class="tag">/admin/</span>
        </div>
      </section>

      <section class="cta card">
        <div>
          <h2>Ready to explore?</h2>
          <p class="muted">Start the backend, open the admin, and call the APIs — everything runs locally.</p>
        </div>
        <div class="cta-actions">
          <button class="btn" @click="openUrl('http://localhost:8080/health')">Check Health</button>
          <button class="btn ghost" @click="goAdmin">Open Admin</button>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
const openUrl = (url: string) => window.open(url, '_blank')
const goDocs = () => openUrl('/docs')
const goAdmin = () => openUrl('http://localhost:4174/admin/')
</script>

<style scoped>
.page {
  color: var(--text);
}
.hero {
  padding: 64px 0;
  background: radial-gradient(circle at 20% 20%, rgba(59,130,246,0.25), transparent 35%),
              radial-gradient(circle at 80% 0%, rgba(139,92,246,0.25), transparent 30%),
              var(--bg);
}
.hero-inner {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 32px;
  align-items: center;
}
.badge {
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(59,130,246,0.15);
  color: #bfdbfe;
  font-weight: 600;
  margin: 0 0 12px;
}
h1 {
  margin: 0 0 12px;
  font-size: 36px;
  line-height: 1.2;
}
.subtitle {
  color: var(--muted);
  margin: 0 0 18px;
  max-width: 640px;
}
.hero-actions { display: flex; gap: 12px; margin: 12px 0 16px; flex-wrap: wrap; }
.btn.ghost {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text);
}
.highlights { display: flex; gap: 10px; flex-wrap: wrap; }
.pill {
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border);
  color: var(--muted);
  font-weight: 600;
}
.glass {
  background: rgba(15,23,42,0.65);
  backdrop-filter: blur(8px);
  box-shadow: 0 20px 60px rgba(0,0,0,0.35);
}
.glass ul { list-style: none; padding: 0; margin: 12px 0; display: grid; gap: 8px; }
.glass li { display: flex; justify-content: space-between; gap: 12px; }
.glass code { background: rgba(255,255,255,0.05); padding: 6px 8px; border-radius: 8px; color: #cbd5e1; }
.mini-title { margin: 0; color: var(--muted); font-weight: 600; }
.muted { color: var(--muted); }

.sections { padding: 40px 0 72px; display: flex; flex-direction: column; gap: 20px; }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
}
.feature h3 { margin: 0 0 8px; }
.feature p { margin: 0 0 10px; color: var(--muted); }
.tag {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 10px;
  background: rgba(59,130,246,0.12);
  color: #bfdbfe;
  font-size: 12px;
  border: 1px solid rgba(59,130,246,0.3);
}

.cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15));
}
.cta h2 { margin: 0 0 6px; }
.cta-actions { display: flex; gap: 10px; flex-wrap: wrap; }

@media (max-width: 900px) {
  .hero-inner { grid-template-columns: 1fr; }
}
</style>
