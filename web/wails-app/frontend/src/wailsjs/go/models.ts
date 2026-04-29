// 此文件由 Wails 自动生成，请勿手动修改
// 用于导出 Go 方法供前端调用

// 导入类型声明以触发 Wails 绑定生成
import './wailsjs/go/main/App'

// 通过全局 window 对象访问 Go 方法
export const GetAppVersion = () => window.go.main.App.GetAppVersion()
export const Login = (username: string, password: string) => window.go.main.App.Login(username, password)
export const Register = (username: string, email: string, password: string) => window.go.main.App.Register(username, email, password)
export const GetLessons = () => window.go.main.App.GetLessons()
export const ChatWithAI = (message: string) => window.go.main.App.ChatWithAI(message)
export const CodeAssist = (code: string, question: string) => window.go.main.App.CodeAssist(code, question)
export const OpenExternalLink = (url: string) => window.go.main.App.OpenExternalLink(url)
