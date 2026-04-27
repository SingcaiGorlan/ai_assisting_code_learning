import { BookOpen, MessageSquare, TrendingUp, Clock } from 'lucide-react'

export default function Dashboard() {
  const stats = [
    { icon: BookOpen, label: '学习课程', value: '3', color: 'from-blue-500 to-blue-600' },
    { icon: Clock, label: '学习时长', value: '24h', color: 'from-green-500 to-green-600' },
    { icon: TrendingUp, label: '完成进度', value: '45%', color: 'from-purple-500 to-purple-600' },
    { icon: MessageSquare, label: 'AI 对话', value: '128', color: 'from-pink-500 to-pink-600' },
  ]

  const recentLessons = [
    { id: 1, title: 'Go 语言基础', progress: 75, lastStudied: '2小时前' },
    { id: 2, title: 'Web 开发实战', progress: 40, lastStudied: '昨天' },
    { id: 3, title: '数据库设计', progress: 0, lastStudied: '未开始' },
  ]

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">欢迎回来！</h1>
          <p className="text-gray-600">继续你的学习之旅</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* 最近学习 */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">最近学习</h2>
          <div className="space-y-4">
            {recentLessons.map((lesson) => (
              <div key={lesson.id} className="border border-gray-200 rounded-lg p-4 hover:border-purple-500 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">{lesson.title}</h3>
                  <span className="text-sm text-gray-500">{lesson.lastStudied}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                    style={{ width: `${lesson.progress}%` }}
                  />
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  进度: {lesson.progress}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 快捷操作 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md p-6 text-white cursor-pointer hover:shadow-lg transition-shadow">
            <BookOpen className="w-8 h-8 mb-4" />
            <h3 className="text-xl font-bold mb-2">继续学习</h3>
            <p className="text-blue-100">从上次离开的地方继续</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-md p-6 text-white cursor-pointer hover:shadow-lg transition-shadow">
            <MessageSquare className="w-8 h-8 mb-4" />
            <h3 className="text-xl font-bold mb-2">AI 助手</h3>
            <p className="text-purple-100">获取智能学习建议</p>
          </div>
        </div>
      </div>
    </div>
  )
}
