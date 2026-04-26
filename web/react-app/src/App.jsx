import { useState } from 'react'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  const features = [
    {
      title: 'AI 智能对话',
      description: '与 AI 助手实时对话,解答编程疑问,获得个性化学习建议',
      icon: '💬',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: '代码辅助',
      description: '智能代码生成、解释和优化,提升编程效率',
      icon: '💻',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: '进度追踪',
      description: '可视化学习进度管理,清晰掌握知识点掌握情况',
      icon: '📊',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: '智能题库',
      description: '海量编程习题,自动评分和详细解析',
      icon: '📝',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const courses = [
    { name: 'Python 基础', level: '初级', students: 1234, progress: 75 },
    { name: 'JavaScript 进阶', level: '中级', students: 892, progress: 60 },
    { name: 'React 开发', level: '高级', students: 567, progress: 45 },
    { name: 'Go 语言入门', level: '初级', students: 445, progress: 30 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🚀</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                AI 学习平台
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              {['home', 'courses', 'practice', 'profile'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`capitalize px-3 py-2 rounded-lg transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-white/20 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab === 'home' ? '首页' : 
                   tab === 'courses' ? '课程' :
                   tab === 'practice' ? '练习' : '我的'}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300">
                登录
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
            AI 驱动的编程学习
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            智能化、个性化、高效化的编程学习体验,让 AI 成为你的专属导师
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300">
              开始学习 🎯
            </button>
            <button className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300">
              了解更多 📖
            </button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/30 rounded-full blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">核心功能</h2>
          <p className="text-center text-gray-400 mb-12 text-lg">全方位提升你的编程能力</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">热门课程</h2>
          <p className="text-center text-gray-400 mb-12 text-lg">精选优质课程,助你快速成长</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-white">{course.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    course.level === '初级' ? 'bg-green-500/30 text-green-300' :
                    course.level === '中级' ? 'bg-yellow-500/30 text-yellow-300' :
                    'bg-red-500/30 text-red-300'
                  }`}>
                    {course.level}
                  </span>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>学习进度</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>👥 {course.students} 人在学</span>
                  <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
                    继续学习 →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: '注册用户', value: '10,000+', icon: '👤' },
              { label: '精品课程', value: '50+', icon: '📚' },
              { label: 'AI 对话', value: '100,000+', icon: '💬' },
              { label: '满意度', value: '98%', icon: '⭐' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-md border border-white/20 rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-white mb-4">准备好开始了吗?</h2>
            <p className="text-xl text-gray-300 mb-8">加入我们的学习社区,开启你的编程之旅</p>
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300">
              免费注册 🎉
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🚀</span>
                <span className="text-xl font-bold text-white">AI 学习平台</span>
              </div>
              <p className="text-gray-400 text-sm">
                用 AI 技术赋能编程教育,让学习更高效、更有趣
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">产品</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">课程中心</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI 助手</a></li>
                <li><a href="#" className="hover:text-white transition-colors">题库练习</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">支持</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">帮助中心</a></li>
                <li><a href="#" className="hover:text-white transition-colors">联系我们</a></li>
                <li><a href="#" className="hover:text-white transition-colors">反馈建议</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">关于</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">关于我们</a></li>
                <li><a href="#" className="hover:text-white transition-colors">隐私政策</a></li>
                <li><a href="#" className="hover:text-white transition-colors">服务条款</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 AI 学习平台. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
