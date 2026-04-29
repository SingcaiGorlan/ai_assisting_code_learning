import { useState } from 'react'
import { Send, Sparkles, Code, Loader2, MessageSquare } from 'lucide-react'

export default function Chat() {
  const [activeTab, setActiveTab] = useState<'chat' | 'code'>('chat')
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai', content: string }>>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  
  // 代码辅助状态
  const [code, setCode] = useState('')
  const [question, setQuestion] = useState('')
  const [codeSuggestion, setCodeSuggestion] = useState('')

  const handleSendMessage = async () => {
    if (!input.trim()) return
    
    setLoading(true)
    const userMessage = input
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])

    try {
      const result = await window.go.main.App.ChatWithAI(userMessage)
      if (result.success) {
        setMessages(prev => [...prev, { role: 'ai', content: result.reply }])
      }
    } catch (error) {
      console.error('发送消息失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCodeAssist = async () => {
    if (!code.trim() || !question.trim()) return
    
    setLoading(true)
    
    try {
      const result = await window.go.main.App.CodeAssist(code, question)
      if (result.success) {
        setCodeSuggestion(result.suggestion)
      }
    } catch (error) {
      console.error('代码辅助失败:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-full bg-[#1e1e1e] flex flex-col">
      {/* 面包屑导航 */}
      <div className="flex items-center gap-2 px-6 py-3 border-b border-[#252526] bg-[#252526]">
        <span className="text-[13px] text-gray-400">工作台</span>
        <span className="text-[13px] text-gray-500">/</span>
        <span className="text-[13px] text-white">AI 助手</span>
      </div>

      {/* 标签页切换 */}
      <div className="bg-[#252526] border-b border-[#1e1e1e] px-6 py-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded-sm font-medium transition-all duration-200 flex items-center gap-2 text-[13px] ${
              activeTab === 'chat'
                ? 'bg-[#094771] text-white'
                : 'text-gray-400 hover:bg-[#2a2d2e] hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            AI 对话
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-sm font-medium transition-all duration-200 flex items-center gap-2 text-[13px] ${
              activeTab === 'code'
                ? 'bg-[#094771] text-white'
                : 'text-gray-400 hover:bg-[#2a2d2e] hover:text-white'
            }`}
          >
            <Code className="w-4 h-4" />
            代码辅助
          </button>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'chat' ? (
          <div className="h-full flex flex-col">
            {/* 消息列表 */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {messages.length === 0 ? (
                <div className="text-center text-gray-400 mt-12">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                  <p className="text-[15px]">开始与 AI 助手对话吧！</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-3xl px-4 py-3 rounded-md ${
                      msg.role === 'user'
                        ? 'bg-[#094771] text-white'
                        : 'bg-[#252526] border border-[#3c3c3c] text-white'
                    }`}>
                      <p className="whitespace-pre-wrap text-[13px]">{msg.content}</p>
                    </div>
                  </div>
                ))
              )}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[#252526] border border-[#3c3c3c] px-4 py-3 rounded-md">
                    <Loader2 className="w-5 h-5 animate-spin text-[#007acc]" />
                  </div>
                </div>
              )}
            </div>

            {/* 输入框 */}
            <div className="bg-[#252526] border-t border-[#1e1e1e] p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="输入你的问题..."
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 bg-[#3c3c3c] border border-[#555555] rounded-sm text-white placeholder:text-gray-500 focus:border-[#007acc] focus:shadow-[0_0_0_2px_rgba(0,122,204,0.2)] outline-none transition-all disabled:opacity-50 text-[13px]"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={loading || !input.trim()}
                  className="bg-[#007acc] hover:bg-[#1177bb] text-white px-6 py-2.5 rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-[13px] font-medium"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  发送
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full overflow-y-auto p-6 custom-scrollbar">
            <div className="max-w-4xl mx-auto space-y-4">
              {/* 代码输入 */}
              <div className="bg-[#252526] border border-[#3c3c3c] rounded-md p-5">
                <h3 className="text-[15px] font-semibold text-white mb-3">粘贴你的代码</h3>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="在这里粘贴你的代码..."
                  className="w-full h-48 px-4 py-3 bg-[#1e1e1e] border border-[#3c3c3c] rounded-sm text-white placeholder:text-gray-500 focus:border-[#007acc] focus:shadow-[0_0_0_2px_rgba(0,122,204,0.2)] outline-none transition-all font-mono text-[13px] resize-none"
                />
              </div>

              {/* 问题输入 */}
              <div className="bg-[#252526] border border-[#3c3c3c] rounded-md p-5">
                <h3 className="text-[15px] font-semibold text-white mb-3">你想了解什么？</h3>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCodeAssist()}
                  placeholder="例如：如何优化这段代码？"
                  className="w-full px-4 py-2.5 bg-[#3c3c3c] border border-[#555555] rounded-sm text-white placeholder:text-gray-500 focus:border-[#007acc] focus:shadow-[0_0_0_2px_rgba(0,122,204,0.2)] outline-none transition-all text-[13px]"
                />
                <button
                  onClick={handleCodeAssist}
                  disabled={loading || !code.trim() || !question.trim()}
                  className="w-full mt-4 bg-[#007acc] hover:bg-[#1177bb] text-white py-2.5 rounded-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-[13px]"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  获取建议
                </button>
              </div>

              {/* 建议结果 */}
              {codeSuggestion && (
                <div className="bg-[#252526] border border-[#3c3c3c] rounded-md p-5">
                  <h3 className="text-[15px] font-semibold text-white mb-3">AI 建议</h3>
                  <div className="bg-[#1e1e1e] border border-[#3c3c3c] p-4 rounded-sm">
                    <pre className="whitespace-pre-wrap text-gray-300 text-[13px] font-mono">{codeSuggestion}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
