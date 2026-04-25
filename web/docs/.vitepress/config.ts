import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AI Learning Platform',
  description: 'Pseudo-static docs and web interface for the AI Learning Platform',
  lang: 'en-US',
  base: '/ai_assisting_code_learning/',
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/guide/api' },
      { text: 'Frontend', link: '/guide/frontend' }
    ],
    sidebar: {
      '/guide/': [
        { text: 'Getting Started', link: '/guide/getting-started' },
        { text: 'API Reference', link: '/guide/api' },
        { text: 'Frontend UI', link: '/guide/frontend' }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/SingcaiGorlan/ai_assisting_code_learning' }
    ]
  }
})
