import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, PlayCircle, Loader2 } from "lucide-react"
import { lessonsAPI, Lesson } from "@/services/wails-lessons"

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLessons()
  }, [])

  const fetchLessons = async () => {
    try {
      const data = await lessonsAPI.getList()
      setLessons(data)
    } catch (error) {
      console.error('Failed to fetch lessons:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">我的课程</h1>
        <p className="text-muted-foreground">选择要学习的课程</p>
      </div>

      {lessons.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">暂无课程</p>
          </CardContent>
        </Card>
      ) : (
        /* 课程网格 */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <Card key={lesson.id} className="hover:border-primary transition-colors cursor-pointer group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 line-clamp-1">{lesson.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{lesson.description}</CardDescription>
                  </div>
                  <div className="ml-2">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/20 rounded-md group-hover:bg-primary/30 transition-colors">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* 难度标签 */}
                <div className="mb-4">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    lesson.level === 'beginner' ? 'bg-green-500/20 text-green-500' :
                    lesson.level === 'intermediate' ? 'bg-blue-500/20 text-blue-500' :
                    'bg-purple-500/20 text-purple-500'
                  }`}>
                    {lesson.level === 'beginner' ? '初级' : 
                     lesson.level === 'intermediate' ? '中级' : '高级'}
                  </span>
                </div>

                {/* 进度条 */}
                {lesson.progress !== undefined && lesson.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">学习进度</span>
                      <span className="text-sm font-semibold text-primary">{lesson.progress}%</span>
                    </div>
                    
                    <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                      <div
                        className="h-2 rounded-full bg-primary transition-all duration-300"
                        style={{ width: `${lesson.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* 按钮 */}
                <Button className="w-full" variant="solid">
                  <PlayCircle className="w-4 h-4 mr-2" />
                  {lesson.progress && lesson.progress > 0 ? '继续学习' : '开始学习'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
