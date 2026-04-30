import { Theme, Button, Card, Text, Heading, Separator, Badge, Callout } from '@radix-ui/themes'
import { useState } from 'react'
import { CheckCircle, AlertCircle, Info, Bell } from 'lucide-react'

export default function RadixShowcase() {
  const [darkMode, setDarkMode] = useState(true)

  return (
    <Theme 
      accentColor="blue" 
      appearance={darkMode ? "dark" : "light"} 
      radius="medium"
      scaling="100%"
    >
      <div className="min-h-screen p-8 bg-background">
        {/* 头部 */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Heading size="8" className="mb-2">Radix UI 组件展示</Heading>
            <Text size="4" color="gray">
              完整的桌面端 UI 组件库，基于 Radix UI + Tailwind CSS
            </Text>
          </div>
          
          <Button 
            variant="soft" 
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '切换到亮色' : '切换到暗色'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Button 组件 */}
          <Card size="3">
            <Heading size="5" className="mb-4">🔘 Button 按钮</Heading>
            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                <Button variant="solid">Solid</Button>
                <Button variant="soft">Soft</Button>
                <Button variant="surface">Surface</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
              
              <Separator size="4" />
              
              <div className="flex gap-2 flex-wrap">
                <Button color="blue">Blue</Button>
                <Button color="red">Red</Button>
                <Button color="green">Green</Button>
                <Button color="orange">Orange</Button>
                <Button color="purple">Purple</Button>
              </div>
              
              <Separator size="4" />
              
              <div className="flex gap-2 flex-wrap">
                <Button size="1">Small</Button>
                <Button size="2">Medium</Button>
                <Button size="3">Large</Button>
                <Button size="4">Extra Large</Button>
              </div>
            </div>
          </Card>

          {/* Badge 组件 */}
          <Card size="3">
            <Heading size="5" className="mb-4">🏷️ Badge 徽章</Heading>
            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                <Badge variant="solid">Solid</Badge>
                <Badge variant="soft">Soft</Badge>
                <Badge variant="surface">Surface</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
              
              <Separator size="4" />
              
              <div className="flex gap-2 flex-wrap">
                <Badge color="blue">Blue</Badge>
                <Badge color="red">Red</Badge>
                <Badge color="green">Green</Badge>
                <Badge color="orange">Orange</Badge>
              </div>
            </div>
          </Card>

          {/* Callout 组件 */}
          <Card size="3">
            <Heading size="5" className="mb-4">💬 Callout 提示框</Heading>
            <div className="space-y-3">
              <Callout.Root color="blue">
                <Callout.Icon>
                  <Info />
                </Callout.Icon>
                <Callout.Text>
                  这是一个信息提示框，用于显示重要信息。
                </Callout.Text>
              </Callout.Root>
              
              <Callout.Root color="green">
                <Callout.Icon>
                  <CheckCircle />
                </Callout.Icon>
                <Callout.Text>
                  操作成功！数据已保存。
                </Callout.Text>
              </Callout.Root>
              
              <Callout.Root color="red">
                <Callout.Icon>
                  <AlertCircle />
                </Callout.Icon>
                <Callout.Text>
                  错误：无法连接到服务器，请检查网络。
                </Callout.Text>
              </Callout.Root>
            </div>
          </Card>

          {/* Text 文本样式 */}
          <Card size="3">
            <Heading size="5" className="mb-4">📝 Text 文本</Heading>
            <div className="space-y-3">
              <Text size="1" weight="light">Light text - Size 1</Text>
              <Text size="2" weight="regular">Regular text - Size 2</Text>
              <Text size="3" weight="medium">Medium text - Size 3</Text>
              <Text size="4" weight="bold">Bold text - Size 4</Text>
              <Text size="5" weight="bold" color="blue">Bold text - Size 5</Text>
              
              <Separator size="4" />
              
              <Text size="2" color="gray">Gray text</Text>
              <Text size="2" color="blue">Blue text</Text>
              <Text size="2" color="red">Red text</Text>
              <Text size="2" color="green">Green text</Text>
            </div>
          </Card>

          {/* 实际应用场景示例 */}
          <Card size="3" className="lg:col-span-2">
            <Heading size="5" className="mb-4">🎯 实际应用场景</Heading>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 用户卡片 */}
              <Card size="2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
                    U
                  </div>
                  <div>
                    <Text weight="bold" size="3">用户名</Text>
                    <Text size="2" color="gray">user@example.com</Text>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="2" variant="soft" style={{ flex: 1 }}>编辑</Button>
                  <Button size="2" color="red" variant="soft" style={{ flex: 1 }}>删除</Button>
                </div>
              </Card>

              {/* 通知卡片 */}
              <Card size="2">
                <div className="flex items-start gap-3">
                  <Bell className="w-5 h-5 text-blue-500 mt-1" />
                  <div className="flex-1">
                    <Text weight="bold" size="2">新通知</Text>
                    <Text size="2" color="gray" className="mt-1">
                      你有 3 条未读消息
                    </Text>
                    <div className="mt-2">
                      <Badge size="1" color="blue">3 未读</Badge>
                    </div>
                  </div>
                </div>
              </Card>

              {/* 状态卡片 */}
              <Card size="2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Text size="2">系统状态</Text>
                    <Badge color="green" variant="soft">运行中</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <Text size="2">CPU 使用率</Text>
                    <Text size="2" weight="bold">45%</Text>
                  </div>
                  <div className="flex items-center justify-between">
                    <Text size="2">内存使用</Text>
                    <Text size="2" weight="bold">2.4 GB</Text>
                  </div>
                  <Separator size="4" />
                  <Button size="2" variant="outline" style={{ width: '100%' }}>
                    查看详情
                  </Button>
                </div>
              </Card>
            </div>
          </Card>

          {/* 表单元素示例 */}
          <Card size="3" className="lg:col-span-2">
            <Heading size="5" className="mb-4">📋 表单元素示例</Heading>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Text as="label" size="2" weight="bold" className="block mb-2">
                    用户名
                  </Text>
                  <input 
                    type="text" 
                    placeholder="输入用户名"
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <Text as="label" size="2" weight="bold" className="block mb-2">
                    邮箱
                  </Text>
                  <input 
                    type="email" 
                    placeholder="example@email.com"
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Text as="label" size="2" weight="bold" className="block mb-2">
                    密码
                  </Text>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <Text as="label" size="2" weight="bold" className="block mb-2">
                    角色
                  </Text>
                  <select className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>管理员</option>
                    <option>普通用户</option>
                    <option>访客</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex gap-2 justify-end">
              <Button variant="soft">取消</Button>
              <Button>保存</Button>
            </div>
          </Card>
        </div>

        {/* 底部说明 */}
        <div className="mt-12 text-center">
          <Text size="2" color="gray">
            更多组件请参考{' '}
            <a 
              href="https://www.radix-ui.com/themes" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Radix UI 官方文档
            </a>
          </Text>
        </div>
      </div>
    </Theme>
  )
}
