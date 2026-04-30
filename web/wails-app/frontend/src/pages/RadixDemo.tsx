import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Theme } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"

export default function RadixDemo() {
  return (
    <Theme accentColor="blue" appearance="dark" radius="medium">
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-foreground">
              Radix UI + Tailwind CSS
            </h1>
            <p className="text-muted-foreground">
              现代化的 UI 组件库已配置完成
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Button Variants */}
            <Card>
              <CardHeader>
                <CardTitle>按钮组件</CardTitle>
                <CardDescription>多种样式和尺寸的按钮</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button variant="solid">默认</Button>
                  <Button variant="soft">次要</Button>
                  <Button variant="classic" color="red">危险</Button>
                  <Button variant="outline">边框</Button>
                  <Button variant="ghost">幽灵</Button>
                  <button className="text-blue-500 hover:underline bg-transparent border-0 cursor-pointer px-2 py-1">链接</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="1">小</Button>
                  <Button size="2">默认</Button>
                  <Button size="3">大</Button>
                </div>
              </CardContent>
            </Card>

            {/* Input Component */}
            <Card>
              <CardHeader>
                <CardTitle>输入框组件</CardTitle>
                <CardDescription>表单输入元素</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="请输入文本..." />
                <Input type="email" placeholder="email@example.com" />
                <Input type="password" placeholder="密码" />
              </CardContent>
            </Card>

            {/* Color Palette */}
            <Card>
              <CardHeader>
                <CardTitle>颜色系统</CardTitle>
                <CardDescription>基于 CSS 变量的主题色</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  <div className="h-12 rounded-md bg-primary flex items-center justify-center text-xs text-primary-foreground">
                    Primary
                  </div>
                  <div className="h-12 rounded-md bg-secondary flex items-center justify-center text-xs text-secondary-foreground">
                    Secondary
                  </div>
                  <div className="h-12 rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground">
                    Muted
                  </div>
                  <div className="h-12 rounded-md bg-accent flex items-center justify-center text-xs text-accent-foreground">
                    Accent
                  </div>
                  <div className="h-12 rounded-md bg-destructive flex items-center justify-center text-xs text-destructive-foreground">
                    Destructive
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Layout Examples */}
            <Card>
              <CardHeader>
                <CardTitle>布局示例</CardTitle>
                <CardDescription>Tailwind CSS 布局工具</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-1 h-16 bg-primary/10 rounded-md flex items-center justify-center text-sm">
                    Flex 1
                  </div>
                  <div className="flex-1 h-16 bg-primary/20 rounded-md flex items-center justify-center text-sm">
                    Flex 2
                  </div>
                  <div className="flex-1 h-16 bg-primary/30 rounded-md flex items-center justify-center text-sm">
                    Flex 3
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-16 bg-secondary/10 rounded-md flex items-center justify-center text-sm">
                    Grid 1
                  </div>
                  <div className="h-16 bg-secondary/20 rounded-md flex items-center justify-center text-sm">
                    Grid 2
                  </div>
                  <div className="h-16 bg-secondary/30 rounded-md flex items-center justify-center text-sm">
                    Grid 3
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>开始使用</CardTitle>
              <CardDescription>所有组件已就绪，可以开始设计布局了</CardDescription>
            </CardHeader>
            <CardFooter className="flex gap-4">
              <Button size="3">
                开始设计
              </Button>
              <Button variant="outline" size="3">
                查看文档
              </Button>
            </CardFooter>
          </Card>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground pt-8 border-t">
            <p>Radix UI + Tailwind CSS 已配置完成</p>
            <p className="mt-2">组件路径: src/components/ui/</p>
            <p>样式文件: src/styles/globals.css</p>
          </div>
        </div>
      </div>
    </Theme>
  )
}
