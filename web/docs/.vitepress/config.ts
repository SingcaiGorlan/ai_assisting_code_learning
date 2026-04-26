import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AI Learning Platform',
  description: 'AI-Powered Code Learning & Assistance Platform',
  lang: 'zh-CN',
  base: '/',
  lastUpdated: true,
  
  ignoreDeadLinks: [
    // 忽略本地开发链接
    /^http:\/\/localhost:\d+/,
    // 忽略特定域名
    /github\.com/
  ],
  
  head: [
    ['meta', { name: 'theme-color', content: '#3c3c44' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'zh_CN' }],
  ],

  markdown: {
    lineNumbers: true,
  },

  themeConfig: {
    logo: '🚀',
    siteTitle: 'AI Learning Platform',
    
    nav: [
      { text: '首页', link: '/' },
      { text: '开始', link: '/guide/getting-started' },
      { text: 'API', link: '/guide/api' },
      { text: '前端', link: '/guide/frontend' },
      { text: 'GitHub', link: 'https://github.com/SingcaiGorlan/ai_assisting_code_learning' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: 'API 文档', link: '/guide/api' },
            { text: '前端界面', link: '/guide/frontend' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/SingcaiGorlan/ai_assisting_code_learning' }
    ],

    footer: {
      message: 'MIT Licensed',
      copyright: 'Copyright © 2024-present AI Learning Platform'
    },

    outline: {
      level: 'deep',
      label: '页面导航'
    },

    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    langMenuLabel: '更改语言',
    externalLinkIcon: true,

    search: {
      provider: 'local'
    }
  }
})
