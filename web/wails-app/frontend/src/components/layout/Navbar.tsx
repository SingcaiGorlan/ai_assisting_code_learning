import { Bell, Search, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true)

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark', !darkMode)
  }

  return (
    <header className="h-16 bg-secondary border-b border-border flex items-center justify-between px-6">
      {/* 左侧：搜索框 */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="搜索课程、内容..." 
            className="pl-10 bg-background border-border"
          />
        </div>
      </div>

      {/* 右侧：操作按钮 */}
      <div className="flex items-center gap-3">
        {/* 主题切换 */}
        <Button
          variant="ghost"
          size="3"
          onClick={toggleTheme}
          className="text-foreground p-2"
        >
          {darkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>

        {/* 通知 */}
        <Button variant="ghost" size="3" className="text-foreground relative p-2">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </Button>

        {/* 用户头像 */}
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold cursor-pointer">
          U
        </div>
      </div>
    </header>
  )
}
