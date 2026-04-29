import { useState, useEffect } from 'react'
import { BookOpen, PlayCircle, CheckCircle, Loader2 } from 'lucide-react'

interface Lesson {
  id: number
  title: string
  description: string
  progress: number
  completed: number
  total: number
}

export default function Lessons() {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLessons()
  }, [])

  const loadLessons = async () => {
    try {
      const data = await window.go.main.App.GetLessons()
      setLessons(data)
    } catch (error) {
      console.error('加载课程失败:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="h-full bg-[#1e1e1e] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#007acc] mx-auto mb-4" />
          <p className="text-[13px] text-gray-400">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-[#1e1e1e] overflow-y-auto custom-scrollbar">
      {/* 面包屑导航 */}
      <div className="flex items-center gap-2 px-6 py-3 border-b border-[#252526] bg-[#252526]">
        <span className="text-[13px] text-gray-400">工作台</span>
        <span className="text-[13px] text-gray-500">/</span>
        <span className="text-[13px] text-white">课程学习</span>
      </div>

      {/* 内容区域 */}
      <div className="p-6">
        {/* 标题 */}
        <div className="mb-6">
          <h1 className="text-[26px] font-semibold text-white mb-2">
            我的课程
          </h1>
          <p className="text-[15px] text-gray-400">
            选择要学习的课程
          </p>
        </div>

        {lessons.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-[15px] text-gray-400">暂无课程</p>
          </div>
        ) : (
          /* 课程网格 */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-[#252526] border border-[#3c3c3c] rounded-md p-5 hover:border-[#007acc] transition-all duration-200 cursor-pointer group"
              >
                {/* 图标和标题 */}
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#007acc]/20 rounded-md mb-3 group-hover:bg-[#007acc]/30 transition-colors">
                    <BookOpen className="w-6 h-6 text-[#007acc]" />
                  </div>
                  
                  <h3 className="text-[16px] font-semibold text-white mb-2 line-clamp-1">
                    {lesson.title}
                  </h3>
                  <p className="text-[13px] text-gray-400 line-clamp-2 min-h-[40px]">
                    {lesson.description}
                  </p>
                </div>

                {/* 进度条 */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] text-gray-400">学习进度</span>
                    <span className="text-[14px] font-semibold text-[#007acc]">
                      {lesson.progress}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-[#3c3c3c] rounded-full h-[6px] overflow-hidden">
                    <div
                      className="h-[6px] rounded-full bg-[#007acc] transition-all duration-300"
                      style={{ width: `${lesson.progress}%` }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between mt-2 text-[12px] text-gray-400">
                    <span>已完成 {lesson.completed} / {lesson.total} 节</span>
                    {lesson.progress > 0 && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </div>

                {/* 按钮 */}
                <button
                  className="w-full h-[40px] bg-[#007acc] hover:bg-[#1177bb] text-white rounded-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <PlayCircle className="w-5 h-5" />
                  {lesson.progress > 0 ? '继续学习' : '开始学习'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
