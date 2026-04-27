// Wails Go Bridge 类型声明
export {}

declare global {
  interface Window {
    go: {
      main: {
        App: {
          GetAppVersion(): Promise<string>
          Login(username: string, password: string): Promise<{
            success: boolean
            message?: string
            token?: string
            user?: any
          }>
          Register(username: string, email: string, password: string): Promise<{
            success: boolean
            message?: string
          }>
          GetLessons(): Promise<Array<{
            id: number
            title: string
            description: string
            progress: number
            total: number
            completed: number
          }>>
          ChatWithAI(message: string): Promise<{
            success: boolean
            reply?: string
            message?: string
          }>
          CodeAssist(code: string, question: string): Promise<{
            success: boolean
            suggestion?: string
            message?: string
          }>
          OpenExternalLink(url: string): Promise<void>
        }
      }
    }
  }
}
