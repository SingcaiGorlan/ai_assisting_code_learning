import { BookOpen, MessageSquare, Settings, FileText } from 'lucide-react'

interface WelcomePageProps {
  onNavigate: (path: string) => void
}

export default function WelcomePage({ onNavigate }: WelcomePageProps) {
  const quickActions = [
    {
      icon: <BookOpen size={20} />,
      title: '开始学习',
      description: '浏览课程并开始学习',
      path: '/lessons',
      color: '#007acc'
    },
    {
      icon: <MessageSquare size={20} />,
      title: 'AI 助手',
      description: '获取智能学习建议',
      path: '/chat',
      color: '#dcdcaa'
    },
    {
      icon: <FileText size={20} />,
      title: '查看文档',
      description: '阅读使用指南和文档',
      path: '/docs',
      color: '#4ec9b0'
    },
    {
      icon: <Settings size={20} />,
      title: '设置',
      description: '自定义应用配置',
      path: '/settings',
      color: '#ce9178'
    }
  ]

  return (
    <div className="h-full bg-[#1e1e1e] overflow-y-auto custom-scrollbar">
      {/* 面包屑导航 */}
      <div className="flex items-center gap-2 px-6 py-3 border-b border-[#252526] bg-[#252526]">
        <span className="text-[13px] text-gray-400">工作台</span>
        <span className="text-[13px] text-gray-500">/</span>
        <span className="text-[13px] text-white">欢迎</span>
      </div>

      {/* 内容区域 */}
      <div className="p-8 max-w-4xl mx-auto">
        {/* 标题 */}
        <div className="mb-8 text-center">
          <h1 className="text-[32px] font-semibold text-white mb-3">
            AI 辅助代码学习平台
          </h1>
          <p className="text-[15px] text-gray-400">
            基于 Wails + React + Go 构建的现代化学习工具
          </p>
        </div>

        {/* 快捷操作 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => onNavigate(action.path)}
              className="bg-[#252526] border border-[#3c3c3c] rounded-md p-6 hover:border-[#007acc] transition-all duration-200 cursor-pointer group text-left"
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-md flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{ backgroundColor: `${action.color}20` }}
                >
                  <div style={{ color: action.color }}>
                    {action.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-white mb-1 group-hover:text-[#007acc] transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-[13px] text-gray-400">
                    {action.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* 特性列表 */}
        <div className="bg-[#252526] border border-[#3c3c3c] rounded-md p-6">
          <h2 className="text-[18px] font-semibold text-white mb-4">核心功能</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#007acc] mt-2 flex-shrink-0" />
              <div>
                <p className="text-[14px] text-white font-medium">智能 AI 对话</p>
                <p className="text-[13px] text-gray-400">与 AI 助手进行自然语言对话，获取编程建议</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#007acc] mt-2 flex-shrink-0" />
              <div>
                <p className="text-[14px] text-white font-medium">代码辅助分析</p>
                <p className="text-[13px] text-gray-400">粘贴代码获取优化建议和最佳实践</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#007acc] mt-2 flex-shrink-0" />
              <div>
                <p className="text-[14px] text-white font-medium">学习进度追踪</p>
                <p className="text-[13px] text-gray-400">可视化展示学习进度和完成情况</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#007acc] mt-2 flex-shrink-0" />
              <div>
                <p className="text-[14px] text-white font-medium">本地数据存储</p>
                <p className="text-[13px] text-gray-400">使用 SQLite 数据库，数据完全本地化</p>
              </div>
            </div>
          </div>
        </div>

        {/* 技术栈 */}
        <div className="mt-6 bg-[#252526] border border-[#3c3c3c] rounded-md p-6">
          <h2 className="text-[18px] font-semibold text-white mb-4">技术栈</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'Wails v2', desc: '桌面框架' },
              { name: 'React 18', desc: '前端框架' },
              { name: 'TypeScript', desc: '类型系统' },
              { name: 'Tailwind CSS', desc: '样式框架' },
              { name: 'Go 1.21', desc: '后端语言' },
              { name: 'Gin', desc: 'Web 框架' },
              { name: 'SQLite', desc: '数据库' },
              { name: 'Lucide', desc: '图标库' }
            ].map((tech, index) => (
              <div key={index} className="bg-[#1e1e1e] border border-[#3c3c3c] rounded-sm p-3">
                <p className="text-[13px] text-white font-medium">{tech.name}</p>
                <p className="text-[11px] text-gray-400">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
