// Wails Bindings for Lessons

export interface Lesson {
  id: number
  title: string
  description: string
  level: 'beginner' | 'intermediate' | 'advanced'
  progress?: number
}

export interface LessonDetail extends Lesson {
  content: string
  exercises: string[]
}

export const lessonsAPI = {
  // 获取课程列表
  getList: async (): Promise<Lesson[]> => {
    try {
      const result = await window.go.main.App.GetLessons()
      return result as any
    } catch (error) {
      console.error('Failed to fetch lessons:', error)
      throw error
    }
  },

  // 获取课程详情
  getDetail: async (id: number): Promise<LessonDetail> => {
    try {
      const result = await window.go.main.App.GetLessonDetail(id)
      return result as any
    } catch (error) {
      console.error('Failed to fetch lesson detail:', error)
      throw error
    }
  },

  // 完成课程
  complete: async (id: number) => {
    try {
      const result = await window.go.main.App.CompleteLesson(id)
      return result
    } catch (error) {
      console.error('Failed to complete lesson:', error)
      throw error
    }
  },
}
