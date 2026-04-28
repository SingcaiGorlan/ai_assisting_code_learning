import { Book, Clock, TrendingUp, MessageCircle } from 'lucide-react'

export default function Dashboard() {
  const stats = [
    { icon: <Book size={20} />, label: '学习课程', value: '3', color: '#3b82f6' },
    { icon: <Clock size={20} />, label: '学习时长', value: '24h', color: '#10b981' },
    { icon: <TrendingUp size={20} />, label: '完成进度', value: '45%', color: '#8b5cf6' },
    { icon: <MessageCircle size={20} />, label: 'AI 对话', value: '128', color: '#ec4899' },
  ]

  const recentLessons = [
    { id: 1, title: 'Go 语言基础', progress: 75, lastStudied: '2小时前' },
    { id: 2, title: 'Web 开发实战', progress: 40, lastStudied: '昨天' },
    { id: 3, title: '数据库设计', progress: 0, lastStudied: '未开始' },
  ]

  return (
    <div className="h-full bg-[#1e1e1e] overflow-y-auto">
      {/* 面包屑导航 */}
      <div className="flex items-center gap-2 px-6 py-3 border-b border-[#252526] bg-[#252526]">
        <span className="text-[13px] text-gray-400">工作台</span>
        <span className="text-[13px] text-gray-500">/</span>
        <span className="text-[13px] text-white">仪表板</span>
      </div>

      {/* 内容区域 */}
      <div className="p-6">
        {/* 欢迎标题 */}
        <div className="mb-6">
          <h1 className="text-[26px] font-semibold text-white mb-2">
            欢迎回来！👋
          </h1>
          <p className="text-[15px] text-gray-400">
            继续你的学习之旅，今天想学习些什么？
          </p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#252526] border border-[#3c3c3c] rounded-md p-4 hover:border-[#007acc] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-gray-400">{stat.icon}</div>
                <span className="text-[13px] text-gray-400">{stat.label}</span>
              </div>
              <div className="text-[28px] font-semibold" style={{ color: stat.color }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* 最近学习 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold text-white">最近学习</h2>
            <button className="text-[13px] text-[#007acc] hover:underline">
              查看全部
            </button>
          </div>
          
          <div className="space-y-2">
            {recentLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-[#252526] border border-[#3c3c3c] rounded-md p-4 hover:border-[#007acc] transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[14px] text-white font-medium">
                    {lesson.title}
                  </div>
                  <div className="text-[12px] text-gray-400">
                    {lesson.lastStudied}
                  </div>
                </div>
                
                {/* 进度条 */}
                <div className="w-full bg-[#3c3c3c] rounded-full h-[6px] mb-2">
                  <div
                    className="h-[6px] rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                    style={{ width: `${lesson.progress}%` }}
                  />
                </div>
                
                <div className="text-[12px] text-gray-400">
                  进度: {lesson.progress}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 快捷操作 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#252526] border border-[#3c3c3c] rounded-md p-6 hover:border-[#007acc] transition-all cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-md flex items-center justify-center text-blue-400 group-hover:bg-blue-500/30 transition-colors">
                <Book size={24} />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-white mb-1">
                  继续学习
                </h3>
                <p className="text-[13px] text-gray-400">
                  从上次离开的地方继续
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#252526] border border-[#3c3c3c] rounded-md p-6 hover:border-[#007acc] transition-all cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-md flex items-center justify-center text-purple-400 group-hover:bg-purple-500/30 transition-colors">
                <MessageCircle size={24} />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-white mb-1">
                  AI 助手
                </h3>
                <p className="text-[13px] text-gray-400">
                  获取智能学习建议
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
