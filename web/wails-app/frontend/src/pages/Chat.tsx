import { useState } from 'react'
import { Send, Sparkles, Code, Loader2 } from 'lucide-react'

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
    <div className="flex-1 overflow-hidden bg-gray-50">
      <div className="h-full flex flex-col">
        {/* 标签页 */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeTab === 'chat'
                  ? 'bg-purple-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              AI 对话
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeTab === 'code'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
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
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 mt-8">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 text-purple-500" />
                    <p>开始与 AI 助手对话吧！</p>
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-3xl px-4 py-3 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-purple-500 text-white'
                          : 'bg-white text-gray-800 shadow-md'
                      }`}>
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))
                )}
                
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white px-4 py-3 rounded-lg shadow-md">
                      <Loader2 className="w-5 h-5 animate-spin text-purple-500" />
                    </div>
                  </div>
                )}
              </div>

              {/* 输入框 */}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="输入你的问题..."
                    disabled={loading}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={loading || !input.trim()}
                    className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full overflow-y-auto p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* 代码输入 */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">粘贴你的代码</h3>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="在这里粘贴你的代码..."
                    className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  />
                </div>

                {/* 问题输入 */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">你想了解什么？</h3>
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCodeAssist()}
                    placeholder="例如：如何优化这段代码？"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleCodeAssist}
                    disabled={loading || !code.trim() || !question.trim()}
                    className="w-full mt-4 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                    获取建议
                  </button>
                </div>

                {/* 建议结果 */}
                {codeSuggestion && (
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">AI 建议</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <pre className="whitespace-pre-wrap text-gray-700 text-sm">{codeSuggestion}</pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
