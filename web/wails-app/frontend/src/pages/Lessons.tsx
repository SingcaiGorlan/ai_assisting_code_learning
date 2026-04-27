import { useState, useEffect } from 'react'
import { BookOpen, PlayCircle, CheckCircle } from 'lucide-react'

declare global {
  interface Window {
    go: {
      main: {
        App: {
          GetLessons: () => Promise<any[]>
        }
      }
    }
  }
}

export default function Lessons() {
  const [lessons, setLessons] = useState<any[]>([])
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
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">我的课程</h1>
          <p className="text-gray-600">选择要学习的课程</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group">
              <div className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 mb-2">{lesson.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{lesson.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">学习进度</span>
                    <span className="font-semibold text-purple-600">{lesson.progress}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                      style={{ width: `${lesson.progress}%` }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                    <span>已完成 {lesson.completed} / {lesson.total} 节</span>
                    {lesson.progress > 0 && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </div>

                <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all flex items-center justify-center gap-2">
                  <PlayCircle className="w-4 h-4" />
                  {lesson.progress > 0 ? '继续学习' : '开始学习'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
