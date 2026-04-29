import { useState, useEffect } from 'react'
import { Settings, Save, TestTube, RefreshCw, Key, Globe, Cpu, Thermometer, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface AIConfig {
  provider: string
  model: string
  base_url: string
  api_key: string
  max_tokens: number
  temperature: number
}

interface Provider {
  id: string
  name: string
  description: string
  models: string[]
  default_model: string
}

export default function AIConfigPage() {
  const [config, setConfig] = useState<AIConfig>({
    provider: 'openai',
    model: 'gpt-3.5-turbo',
    base_url: 'https://api.openai.com/v1',
    api_key: '',
    max_tokens: 1000,
    temperature: 0.7,
  })

  const [providers, setProviders] = useState<Provider[]>([])
  const [loading, setLoading] = useState(false)
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // 加载配置和提供商列表
  useEffect(() => {
    loadConfig()
    loadProviders()
  }, [])

  const loadConfig = async () => {
    try {
      const response = await fetch('/api/v1/ai/config')
      const data = await response.json()
      if (data.success) {
        setConfig(data.data)
      }
    } catch (error) {
      console.error('Failed to load config:', error)
    }
  }

  const loadProviders = async () => {
    try {
      const response = await fetch('/api/v1/ai/providers')
      const data = await response.json()
      if (data.success) {
        setProviders(data.data)
      }
    } catch (error) {
      console.error('Failed to load providers:', error)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    setSaveSuccess(false)
    
    try {
      const response = await fetch('/api/v1/ai/config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      })
      
      const data = await response.json()
      if (data.success) {
        setSaveSuccess(true)
        setTimeout(() => setSaveSuccess(false), 3000)
      }
    } catch (error) {
      console.error('Failed to save config:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTest = async () => {
    setTesting(true)
    setTestResult(null)
    
    try {
      const response = await fetch('/api/v1/ai/config/test', {
        method: 'POST',
      })
      
      const data = await response.json()
      setTestResult({
        success: data.success,
        message: data.message || 'Connection test completed',
      })
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Connection test failed',
      })
    } finally {
      setTesting(false)
    }
  }

  const handleProviderChange = (providerId: string) => {
    const provider = providers.find(p => p.id === providerId)
    if (provider) {
      setConfig(prev => ({
        ...prev,
        provider: providerId,
        model: provider.default_model,
        base_url: getDefaultBaseUrl(providerId),
      }))
    }
  }

  const getDefaultBaseUrl = (providerId: string): string => {
    switch (providerId) {
      case 'openai':
        return 'https://api.openai.com/v1'
      case 'azure':
        return 'https://YOUR_RESOURCE.openai.azure.com'
      case 'local':
        return 'http://localhost:11434/v1'
      default:
        return 'https://api.openai.com/v1'
    }
  }

  return (
    <div className="h-full bg-[#1e1e1e] overflow-y-auto custom-scrollbar">
      {/* 面包屑导航 */}
      <div className="flex items-center gap-2 px-6 py-3 border-b border-[#252526] bg-[#252526]">
        <span className="text-[13px] text-gray-400">工作台</span>
        <span className="text-[13px] text-gray-500">/</span>
        <span className="text-[13px] text-white">AI 配置</span>
      </div>

      {/* 内容区域 */}
      <div className="p-6 max-w-4xl mx-auto">
        {/* 标题 */}
        <div className="mb-6">
          <h1 className="text-[26px] font-semibold text-white mb-2 flex items-center gap-3">
            <Settings className="w-7 h-7" />
            AI 配置管理
          </h1>
          <p className="text-[15px] text-gray-400">
            配置和管理 AI 服务提供商及模型参数
          </p>
        </div>

        {/* 测试连接结果 */}
        {testResult && (
          <div className={`mb-6 p-4 rounded-md border ${
            testResult.success 
              ? 'bg-[#1e3a1e] border-[#2d5a2d]' 
              : 'bg-[#3a1e1e] border-[#5a2d2d]'
          }`}>
            <div className="flex items-center gap-3">
              {testResult.success ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <XCircle className="w-5 h-5 text-red-400" />
              )}
              <span className="text-[14px] text-white">{testResult.message}</span>
            </div>
          </div>
        )}

        {/* 保存成功提示 */}
        {saveSuccess && (
          <div className="mb-6 p-4 rounded-md border bg-[#1e3a1e] border-[#2d5a2d]">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-[14px] text-white">配置已成功保存</span>
            </div>
          </div>
        )}

        {/* 配置表单 */}
        <div className="space-y-4">
          {/* AI 提供商选择 */}
          <div className="bg-[#252526] border border-[#3c3c3c] rounded-md p-5">
            <h2 className="text-[16px] font-semibold text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#007acc]" />
              AI 服务提供商
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {providers.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => handleProviderChange(provider.id)}
                  className={`p-4 rounded-md border text-left transition-all ${
                    config.provider === provider.id
                      ? 'border-[#007acc] bg-[#094771]'
                      : 'border-[#3c3c3c] bg-[#2d2d2d] hover:border-[#007acc]'
                  }`}
                >
                  <div className="text-[14px] font-medium text-white mb-1">
                    {provider.name}
                  </div>
                  <div className="text-[12px] text-gray-400">
                    {provider.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* API 密钥配置 */}
          <div className="bg-[#252526] border border-[#3c3c3c] rounded-md p-5">
            <h2 className="text-[16px] font-semibold text-white mb-4 flex items-center gap-2">
              <Key className="w-5 h-5 text-[#007acc]" />
              API 密钥
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[13px] text-gray-400 mb-2">
                  API Key
                </label>
                <input
                  type="password"
                  value={config.api_key}
                  onChange={(e) => setConfig({ ...config, api_key: e.target.value })}
                  placeholder="sk-..."
                  className="w-full bg-[#3c3c3c] border border-[#555555] text-white text-[13px] rounded-sm px-3 py-2 focus:border-[#007acc] outline-none"
                />
                <p className="text-[11px] text-gray-500 mt-1">
                  您的 API 密钥将被安全存储，仅用于 AI 服务调用
                </p>
              </div>

              <div>
                <label className="block text-[13px] text-gray-400 mb-2">
                  Base URL
                </label>
                <input
                  type="text"
                  value={config.base_url}
                  onChange={(e) => setConfig({ ...config, base_url: e.target.value })}
                  className="w-full bg-[#3c3c3c] border border-[#555555] text-white text-[13px] rounded-sm px-3 py-2 focus:border-[#007acc] outline-none"
                />
              </div>
            </div>
          </div>

          {/* 模型配置 */}
          <div className="bg-[#252526] border border-[#3c3c3c] rounded-md p-5">
            <h2 className="text-[16px] font-semibold text-white mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#007acc]" />
              模型配置
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[13px] text-gray-400 mb-2">
                  模型名称
                </label>
                <select
                  value={config.model}
                  onChange={(e) => setConfig({ ...config, model: e.target.value })}
                  className="w-full bg-[#3c3c3c] border border-[#555555] text-white text-[13px] rounded-sm px-3 py-2 focus:border-[#007acc] outline-none"
                >
                  {providers
                    .find(p => p.id === config.provider)
                    ?.models.map(model => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] text-gray-400 mb-2 flex items-center gap-2">
                    <Thermometer className="w-4 h-4" />
                    Temperature
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="2"
                    step="0.1"
                    value={config.temperature}
                    onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
                    className="w-full bg-[#3c3c3c] border border-[#555555] text-white text-[13px] rounded-sm px-3 py-2 focus:border-[#007acc] outline-none"
                  />
                  <p className="text-[11px] text-gray-500 mt-1">
                    范围: 0-2，越高越随机
                  </p>
                </div>

                <div>
                  <label className="block text-[13px] text-gray-400 mb-2">
                    Max Tokens
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="8192"
                    value={config.max_tokens}
                    onChange={(e) => setConfig({ ...config, max_tokens: parseInt(e.target.value) })}
                    className="w-full bg-[#3c3c3c] border border-[#555555] text-white text-[13px] rounded-sm px-3 py-2 focus:border-[#007acc] outline-none"
                  />
                  <p className="text-[11px] text-gray-500 mt-1">
                    单次响应最大 token 数
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-between items-center pt-4">
            <button
              onClick={handleTest}
              disabled={testing}
              className="px-4 py-2 bg-[#3c3c3c] hover:bg-[#4a4a4a] text-white rounded-sm text-[13px] font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {testing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  测试中...
                </>
              ) : (
                <>
                  <TestTube className="w-4 h-4" />
                  测试连接
                </>
              )}
            </button>

            <button
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-2 bg-[#007acc] hover:bg-[#1177bb] text-white rounded-sm text-[13px] font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  保存中...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  保存配置
                </>
              )}
            </button>
          </div>
        </div>

        {/* 帮助信息 */}
        <div className="mt-6 p-4 bg-[#252526] border border-[#3c3c3c] rounded-md">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#007acc] mt-0.5" />
            <div className="text-[13px] text-gray-400">
              <p className="font-medium text-white mb-2">配置说明：</p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>OpenAI:</strong> 需要有效的 API Key，访问 https://platform.openai.com 获取</li>
                <li><strong>Azure OpenAI:</strong> 需要 Azure 订阅和资源部署</li>
                <li><strong>Local Model:</strong> 需要本地运行 Ollama 或 LM Studio</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
