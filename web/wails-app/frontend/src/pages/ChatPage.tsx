import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Loader2, MessageSquare, Sparkles } from "lucide-react"
import { chatAPI } from "@/services/wails-chat"

interface ChatMessage {
  role: 'user' | 'ai'
  content: string
  timestamp?: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return
    
    setLoading(true)
    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    }
    
    // 添加用户消息
    setMessages(prev => [...prev, userMessage])
    setInput('')

    try {
      // 调用 API
      const response = await chatAPI.sendMessage(input)
      
      // 添加 AI 回复
      const aiMessage: ChatMessage = {
        role: 'ai',
        content: response,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Failed to send message:', error)
      
      // 错误提示
      const errorMessage: ChatMessage = {
        role: 'ai',
        content: '抱歉，发送消息失败。请稍后重试。',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* 标题 */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">AI 助手</h1>
        <p className="text-muted-foreground">与 AI 对话，获取学习帮助</p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            智能对话
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* 消息列表 */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground mt-12">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">开始与 AI 助手对话吧！</p>
                <p className="text-sm mt-2">你可以询问任何关于编程学习的问题</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] px-4 py-3 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary border border-border'
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                    {msg.timestamp && (
                      <p className="text-xs opacity-70 mt-2">
                        {msg.timestamp.toLocaleTimeString('zh-CN', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
            
            {/* 加载指示器 */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-secondary border border-border px-4 py-3 rounded-lg">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* 输入框 */}
          <div className="border-t p-4 bg-background">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="输入你的问题..."
                disabled={loading}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={loading || !input.trim()}
                className="px-6"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    发送
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              按 Enter 发送消息
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
