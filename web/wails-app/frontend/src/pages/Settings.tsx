import { Settings, User, Bell, Shield, Palette, Database } from 'lucide-react'

export default function SettingsPage() {
  const settingsSections = [
    {
      title: '账户设置',
      icon: <User size={20} />,
      items: [
        { label: '用户名', value: 'admin', type: 'text' },
        { label: '邮箱', value: 'admin@example.com', type: 'email' },
      ]
    },
    {
      title: '通知设置',
      icon: <Bell size={20} />,
      items: [
        { label: '启用通知', value: true, type: 'toggle' },
        { label: '声音提醒', value: false, type: 'toggle' },
      ]
    },
    {
      title: '隐私与安全',
      icon: <Shield size={20} />,
      items: [
        { label: '数据加密', value: true, type: 'toggle' },
        { label: '自动锁定', value: '30分钟', type: 'select' },
      ]
    },
    {
      title: '外观',
      icon: <Palette size={20} />,
      items: [
        { label: '主题', value: 'Dark+', type: 'select' },
        { label: '字体大小', value: '14px', type: 'select' },
      ]
    },
    {
      title: '数据存储',
      icon: <Database size={20} />,
      items: [
        { label: '数据库位置', value: './data/ai_learning.db', type: 'text' },
        { label: '自动备份', value: true, type: 'toggle' },
      ]
    }
  ]

  return (
    <div className="h-full bg-[#1e1e1e] overflow-y-auto custom-scrollbar">
      {/* 面包屑导航 */}
      <div className="flex items-center gap-2 px-6 py-3 border-b border-[#252526] bg-[#252526]">
        <span className="text-[13px] text-gray-400">工作台</span>
        <span className="text-[13px] text-gray-500">/</span>
        <span className="text-[13px] text-white">设置</span>
      </div>

      {/* 内容区域 */}
      <div className="p-6 max-w-4xl mx-auto">
        {/* 标题 */}
        <div className="mb-6">
          <h1 className="text-[26px] font-semibold text-white mb-2 flex items-center gap-3">
            <Settings className="w-7 h-7" />
            设置
          </h1>
          <p className="text-[15px] text-gray-400">
            自定义应用配置和偏好设置
          </p>
        </div>

        {/* 设置项 */}
        <div className="space-y-4">
          {settingsSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-[#252526] border border-[#3c3c3c] rounded-md">
              {/* 章节标题 */}
              <div className="px-5 py-4 border-b border-[#3c3c3c] flex items-center gap-3">
                <div className="text-[#007acc]">{section.icon}</div>
                <h2 className="text-[16px] font-semibold text-white">{section.title}</h2>
              </div>

              {/* 设置项列表 */}
              <div className="divide-y divide-[#3c3c3c]">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="px-5 py-4 flex items-center justify-between hover:bg-[#2a2d2e] transition-colors">
                    <span className="text-[14px] text-white">{item.label}</span>
                    
                    {/* 根据类型渲染不同的控件 */}
                    {item.type === 'toggle' ? (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={item.value as boolean}
                          className="sr-only peer"
                          readOnly
                        />
                        <div className="w-11 h-6 bg-[#3c3c3c] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007acc]"></div>
                      </label>
                    ) : item.type === 'select' ? (
                      <select 
                        value={item.value as string}
                        className="bg-[#3c3c3c] border border-[#555555] text-white text-[13px] rounded-sm px-3 py-1.5 focus:border-[#007acc] outline-none"
                        disabled
                      >
                        <option>{item.value as string}</option>
                      </select>
                    ) : (
                      <input 
                        type={item.type}
                        value={item.value as string}
                        readOnly
                        className="bg-[#3c3c3c] border border-[#555555] text-white text-[13px] rounded-sm px-3 py-1.5 w-64 focus:border-[#007acc] outline-none"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 保存按钮 */}
        <div className="mt-6 flex justify-end gap-3">
          <button className="px-4 py-2 bg-[#3c3c3c] hover:bg-[#4a4a4a] text-white rounded-sm text-[13px] font-medium transition-colors">
            重置
          </button>
          <button className="px-4 py-2 bg-[#007acc] hover:bg-[#1177bb] text-white rounded-sm text-[13px] font-medium transition-colors">
            保存更改
          </button>
        </div>
      </div>
    </div>
  )
}
