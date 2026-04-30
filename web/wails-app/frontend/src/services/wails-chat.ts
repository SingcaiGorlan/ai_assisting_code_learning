// Wails Bindings for Chat

export interface ChatMessage {
  message: string
  response?: string
  timestamp?: string
}

export const chatAPI = {
  // 发送消息
  sendMessage: async (message: string): Promise<string> => {
    try {
      const result = await window.go.main.App.ChatWithAI(message)
      if (result.success && result.reply) {
        return result.reply
      }
      return ''
    } catch (error) {
      console.error('Failed to send message:', error)
      throw error
    }
  },
}
