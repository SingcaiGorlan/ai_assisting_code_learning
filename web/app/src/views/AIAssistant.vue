<template>
  <div class="ai-assistant">
    <div class="container">
      <h1 class="page-title">🤖 AI 智能助手</h1>
      
      <!-- 功能切换标签 -->
      <div class="card tabs-card">
        <div class="tabs">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            class="tab-btn" 
            :class="{ active: currentTab === tab.id }"
            @click="currentTab = tab.id"
          >
            <span class="tab-icon">{{ tab.icon }}</span>
            {{ tab.name }}
          </button>
        </div>
      </div>

      <!-- AI 对话界面 -->
      <div v-if="currentTab === 'chat'" class="card chat-container">
        <div class="chat-header">
          <div class="chat-info">
            <h3>💬 AI 对话助手</h3>
            <p class="chat-status">在线 · 随时为你解答编程问题</p>
          </div>
          <button class="btn btn-small" @click="clearChat">清空对话</button>
        </div>
        
        <div class="chat-messages" ref="messagesContainer">
          <div v-for="(msg, index) in messages" :key="index" class="message" :class="msg.role">
            <div class="message-avatar">
              {{ msg.role === 'user' ? '👤' : '🤖' }}
            </div>
            <div class="message-content">
              <div class="message-text" v-html="formatMessage(msg.content)"></div>
              <div class="message-time">{{ msg.time }}</div>
            </div>
          </div>
          
          <div v-if="isLoading" class="message assistant">
            <div class="message-avatar">🤖</div>
            <div class="message-content">
              <div class="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="chat-input-area">
          <div class="quick-questions">
            <button v-for="q in quickQuestions" :key="q" class="quick-btn" @click="sendQuickQuestion(q)">
              {{ q }}
            </button>
          </div>
          <div class="input-wrapper">
            <textarea 
              v-model="inputMessage" 
              placeholder="输入你的问题... (Shift+Enter 换行)"
              @keydown.enter.exact.prevent="sendMessage"
              rows="1"
            ></textarea>
            <button class="btn btn-primary send-btn" @click="sendMessage" :disabled="!inputMessage.trim() || isLoading">
              <span v-if="!isLoading">发送</span>
              <span v-else class="loading-spinner">⏳</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 代码辅助界面 -->
      <div v-if="currentTab === 'code'" class="card code-assist-container">
        <div class="code-header">
          <h3>💻 代码分析与优化</h3>
          <div class="language-selector">
            <label>编程语言：</label>
            <select v-model="selectedLanguage">
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="go">Go</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
          </div>
        </div>
        
        <div class="code-editor-section">
          <div class="editor-panel">
            <div class="panel-header">
              <span>📝 代码输入</span>
              <button class="btn btn-small" @click="clearCode">清空</button>
            </div>
            <textarea 
              v-model="codeInput" 
              class="code-editor"
              placeholder="// 粘贴你的代码到这里..."
              spellcheck="false"
            ></textarea>
            <div class="editor-footer">
              <span>{{ codeInput.length }} 字符</span>
              <span>{{ codeLines }} 行</span>
            </div>
          </div>
          
          <div class="analysis-panel">
            <div class="panel-header">
              <span>📊 分析结果</span>
              <button v-if="analysisResult" class="btn btn-small" @click="copyAnalysis">复制</button>
            </div>
            
            <div v-if="!analysisResult && !isAnalyzing" class="empty-analysis">
              <div class="empty-icon">🔍</div>
              <p>输入代码并点击"分析代码"获取 AI 建议</p>
            </div>
            
            <div v-if="isAnalyzing" class="analyzing-state">
              <div class="spinner"></div>
              <p>AI 正在分析你的代码...</p>
            </div>
            
            <div v-if="analysisResult" class="analysis-result">
              <div class="score-section">
                <h4>代码质量评分</h4>
                <div class="score-circle" :class="getScoreClass(analysisResult.score)">
                  {{ analysisResult.score }}
                </div>
              </div>
              
              <div v-if="analysisResult.suggestions && analysisResult.suggestions.length > 0" class="suggestions-section">
                <h4>💡 改进建议</h4>
                <ul class="suggestion-list">
                  <li v-for="(suggestion, idx) in analysisResult.suggestions" :key="idx">
                    <span class="suggestion-number">{{ idx + 1 }}</span>
                    <span class="suggestion-text">{{ suggestion }}</span>
                  </li>
                </ul>
              </div>
              
              <div v-if="analysisResult.analysis" class="analysis-text">
                <h4>📋 详细分析</h4>
                <p>{{ analysisResult.analysis }}</p>
              </div>
              
              <div v-if="analysisResult.optimized_code" class="optimized-code">
                <h4>✨ 优化后的代码</h4>
                <pre><code>{{ analysisResult.optimized_code }}</code></pre>
              </div>
            </div>
          </div>
        </div>
        
        <div class="code-actions">
          <button class="btn btn-primary analyze-btn" @click="analyzeCode" :disabled="!codeInput.trim() || isAnalyzing">
            {{ isAnalyzing ? '分析中...' : '🚀 分析代码' }}
          </button>
          <button class="btn btn-secondary" @click="loadExample">加载示例代码</button>
        </div>
      </div>

      <!-- AI 生成代码界面 -->
      <div v-if="currentTab === 'generate'" class="card generate-container">
        <div class="generate-header">
          <h3>✨ AI 代码生成</h3>
          <p class="subtitle">描述你想要的功能，AI 帮你生成代码</p>
        </div>
        
        <div class="generate-form">
          <div class="form-group">
            <label>功能描述：</label>
            <textarea 
              v-model="generatePrompt" 
              placeholder="例如：创建一个 React 组件，显示用户列表，支持搜索和分页..."
              rows="4"
            ></textarea>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label>编程语言：</label>
              <select v-model="generateLanguage">
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="go">Go</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>框架/库：</label>
              <select v-model="generateFramework">
                <option value="none">无</option>
                <option value="react">React</option>
                <option value="vue">Vue</option>
                <option value="express">Express</option>
                <option value="flask">Flask</option>
              </select>
            </div>
          </div>
          
          <button class="btn btn-primary generate-btn" @click="generateCode" :disabled="!generatePrompt.trim() || isGenerating">
            {{ isGenerating ? '生成中...' : '✨ 生成代码' }}
          </button>
        </div>
        
        <div v-if="generatedCode" class="generated-result">
          <div class="result-header">
            <h4>生成的代码</h4>
            <button class="btn btn-small" @click="copyGeneratedCode">复制代码</button>
          </div>
          <pre><code>{{ generatedCode }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'

interface Message {
  role: 'user' | 'assistant'
  content: string
  time: string
}

interface AnalysisResult {
  score: number
  suggestions: string[]
  analysis: string
  optimized_code?: string
}

const currentTab = ref('chat')
const isLoading = ref(false)
const isAnalyzing = ref(false)
const isGenerating = ref(false)
const inputMessage = ref('')
const codeInput = ref('')
const selectedLanguage = ref('javascript')
const generatePrompt = ref('')
const generateLanguage = ref('javascript')
const generateFramework = ref('none')
const messagesContainer = ref<HTMLElement>()

const tabs = [
  { id: 'chat', name: 'AI 对话', icon: '💬' },
  { id: 'code', name: '代码分析', icon: '💻' },
  { id: 'generate', name: '代码生成', icon: '✨' }
]

const messages = ref<Message[]>([
  {
    role: 'assistant',
    content: '你好！我是 AI 编程助手，可以帮你：\n\n• 解答编程问题\n• 分析代码质量\n• 提供最佳实践建议\n• 生成示例代码\n\n有什么我可以帮你的吗？',
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }
])

const quickQuestions = [
  '如何优化这段代码？',
  '解释一下闭包的概念',
  'React hooks 最佳实践',
  '如何处理异步错误？'
]

const analysisResult = ref<AnalysisResult | null>(null)
const generatedCode = ref('')

const codeLines = computed(() => {
  return codeInput.value ? codeInput.value.split('\n').length : 0
})

const formatMessage = (content: string) => {
  // 简单的 Markdown 格式化
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>')
}

const sendMessage = async () => {
  if (!inputMessage.value.trim() || isLoading.value) return
  
  const userMessage = inputMessage.value.trim()
  
  // 添加用户消息
  messages.value.push({
    role: 'user',
    content: userMessage,
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  })
  
  inputMessage.value = ''
  isLoading.value = true
  
  // 滚动到底部
  await nextTick()
  scrollToBottom()
  
  try {
    // TODO: 调用后端 API
    // const response = await fetch('/api/v1/ai/chat', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ message: userMessage })
    // })
    
    // 模拟响应（实际使用时替换为真实 API 调用）
    setTimeout(() => {
      messages.value.push({
        role: 'assistant',
        content: `这是一个模拟回复。你问的是："${userMessage}"\n\n在实际应用中，这里会连接到真实的 AI API（如 OpenAI）来获取智能回复。`,
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      })
      isLoading.value = false
      nextTick().then(scrollToBottom)
    }, 1500)
  } catch (error) {
    console.error('Error:', error)
    messages.value.push({
      role: 'assistant',
      content: '抱歉，发生错误。请稍后重试。',
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    })
    isLoading.value = false
  }
}

const sendQuickQuestion = (question: string) => {
  inputMessage.value = question
  sendMessage()
}

const clearChat = () => {
  messages.value = [{
    role: 'assistant',
    content: '对话已清空。有什么新的问题吗？',
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }]
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const analyzeCode = async () => {
  if (!codeInput.value.trim() || isAnalyzing.value) return
  
  isAnalyzing.value = true
  analysisResult.value = null
  
  try {
    // TODO: 调用后端 API
    // const response = await fetch('/api/v1/ai/code-assist', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     code: codeInput.value,
    //     language: selectedLanguage.value
    //   })
    // })
    
    // 模拟分析结果
    setTimeout(() => {
      analysisResult.value = {
        score: 8.5,
        suggestions: [
          '考虑使用更语义化的变量命名',
          '添加错误处理机制以提高健壮性',
          '可以使用箭头函数简化代码',
          '建议添加注释说明复杂逻辑'
        ],
        analysis: '整体代码结构清晰，逻辑正确。主要改进空间在于代码规范和错误处理方面。',
        optimized_code: '// 优化后的代码示例\nfunction example() {\n  // ...'
      }
      isAnalyzing.value = false
    }, 2000)
  } catch (error) {
    console.error('Error:', error)
    isAnalyzing.value = false
  }
}

const clearCode = () => {
  codeInput.value = ''
  analysisResult.value = null
}

const loadExample = () => {
  codeInput.value = `// 示例代码
function calculateSum(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}

const result = calculateSum([1, 2, 3, 4, 5]);
console.log(result);`
}

const getScoreClass = (score: number) => {
  if (score >= 9) return 'excellent'
  if (score >= 7) return 'good'
  if (score >= 5) return 'average'
  return 'poor'
}

const copyAnalysis = () => {
  if (analysisResult.value) {
    navigator.clipboard.writeText(JSON.stringify(analysisResult.value, null, 2))
    alert('分析结果已复制到剪贴板')
  }
}

const generateCode = async () => {
  if (!generatePrompt.value.trim() || isGenerating.value) return
  
  isGenerating.value = true
  generatedCode.value = ''
  
  try {
    // TODO: 调用后端 API
    setTimeout(() => {
      generatedCode.value = `// 根据描述生成的示例代码
// 语言: ${generateLanguage.value}
// 框架: ${generateFramework.value}

function example() {
  console.log("这是 AI 生成的代码");
  // 实际应用中会连接到真实的 AI API
}

export default example;`
      isGenerating.value = false
    }, 2500)
  } catch (error) {
    console.error('Error:', error)
    isGenerating.value = false
  }
}

const copyGeneratedCode = () => {
  if (generatedCode.value) {
    navigator.clipboard.writeText(generatedCode.value)
    alert('代码已复制到剪贴板')
  }
}
</script>

<style scoped>
.ai-assistant {
  min-height: 100vh;
  background: var(--bg);
  padding: 40px 0;
}

.page-title {
  font-size: 32px;
  margin: 0 0 32px;
  color: var(--text);
}

.card {
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
}

/* 标签页 */
.tabs-card {
  padding: 16px;
}

.tabs {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.tab-btn {
  flex: 1;
  min-width: 150px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--muted);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.tab-btn:hover {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.3);
}

.tab-btn.active {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2));
  border-color: #3b82f6;
  color: var(--text);
}

.tab-icon {
  font-size: 20px;
}

/* 聊天界面 */
.chat-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 280px);
  min-height: 600px;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 16px;
}

.chat-header h3 {
  margin: 0 0 4px;
}

.chat-status {
  margin: 0;
  font-size: 13px;
  color: #22c55e;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message {
  display: flex;
  gap: 12px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.message.user {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(59, 130, 246, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.message.user .message-avatar {
  background: rgba(139, 92, 246, 0.2);
}

.message-content {
  max-width: 70%;
  background: rgba(255, 255, 255, 0.05);
  padding: 12px 16px;
  border-radius: 12px;
}

.message.user .message-content {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2));
}

.message-text {
  line-height: 1.6;
  white-space: pre-wrap;
}

.message-text code {
  background: rgba(0, 0, 0, 0.3);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
}

.message-time {
  font-size: 11px;
  color: var(--muted);
  margin-top: 6px;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 8px 0;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--muted);
  animation: typing 1.4s infinite;
}

.typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
.typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

@keyframes typing {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-10px); }
}

.chat-input-area {
  border-top: 1px solid var(--border);
  padding-top: 16px;
}

.quick-questions {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.quick-btn {
  padding: 6px 12px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 20px;
  color: #bfdbfe;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quick-btn:hover {
  background: rgba(59, 130, 246, 0.2);
}

.input-wrapper {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.input-wrapper textarea {
  flex: 1;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text);
  font-size: 14px;
  resize: none;
  min-height: 48px;
  max-height: 120px;
}

.input-wrapper textarea:focus {
  outline: none;
  border-color: #3b82f6;
}

.send-btn {
  padding: 12px 24px;
  min-height: 48px;
}

/* 代码辅助界面 */
.code-assist-container {
  padding: 0;
}

.code-header {
  padding: 24px;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.code-header h3 {
  margin: 0;
}

.language-selector {
  display: flex;
  align-items: center;
  gap: 8px;
}

.language-selector select {
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
}

.code-editor-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  min-height: 400px;
}

.editor-panel,
.analysis-panel {
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.editor-panel {
  border-right: 1px solid var(--border);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-weight: 600;
}

.code-editor {
  flex: 1;
  padding: 16px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: #e2e8f0;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
  resize: none;
}

.code-editor:focus {
  outline: none;
  border-color: #3b82f6;
}

.editor-footer {
  display: flex;
  gap: 16px;
  margin-top: 12px;
  font-size: 13px;
  color: var(--muted);
}

.empty-analysis,
.analyzing-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--muted);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(59, 130, 246, 0.2);
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.analysis-result {
  flex: 1;
  overflow-y: auto;
}

.score-section {
  margin-bottom: 24px;
}

.score-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: bold;
  margin-top: 12px;
}

.score-circle.excellent {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
}

.score-circle.good {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
}

.score-circle.average {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

.score-circle.poor {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
}

.suggestions-section h4,
.analysis-text h4,
.optimized-code h4 {
  margin: 0 0 12px;
  font-size: 16px;
}

.suggestion-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.suggestion-list li {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 8px;
}

.suggestion-number {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  flex-shrink: 0;
}

.suggestion-text {
  flex: 1;
  line-height: 1.5;
}

.analysis-text p {
  line-height: 1.6;
  color: var(--muted);
}

.optimized-code pre {
  background: rgba(0, 0, 0, 0.3);
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
}

.optimized-code code {
  font-family: 'Courier New', monospace;
  font-size: 13px;
  color: #e2e8f0;
}

.code-actions {
  padding: 24px;
  border-top: 1px solid var(--border);
  display: flex;
  gap: 12px;
}

.analyze-btn {
  flex: 1;
}

/* 代码生成界面 */
.generate-header h3 {
  margin: 0 0 8px;
}

.subtitle {
  margin: 0;
  color: var(--muted);
}

.generate-form {
  margin-top: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-group textarea,
.form-group select {
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  font-size: 14px;
}

.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #3b82f6;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.generate-btn {
  width: 100%;
  padding: 14px;
  font-size: 16px;
}

.generated-result {
  margin-top: 24px;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.result-header h4 {
  margin: 0;
}

.generated-result pre {
  background: rgba(0, 0, 0, 0.3);
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
}

.generated-result code {
  font-family: 'Courier New', monospace;
  font-size: 13px;
  color: #e2e8f0;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text);
  border: 1px solid var(--border);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
}

.btn-small {
  padding: 6px 12px;
  font-size: 13px;
}

@media (max-width: 1024px) {
  .code-editor-section {
    grid-template-columns: 1fr;
  }
  
  .editor-panel {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .chat-container {
    height: calc(100vh - 240px);
  }
  
  .message-content {
    max-width: 85%;
  }
}
</style>
