import { GitBranch, Bell, Check } from 'lucide-react'

export default function StatusBar() {
  return (
    <div className="flex items-center justify-between bg-[#007acc] text-white text-[12px] h-[22px] px-3 select-none">
      {/* 左侧状态 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer">
          <GitBranch size={12} />
          <span>main</span>
        </div>
        <div className="flex items-center gap-1 hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer">
          <Check size={12} />
          <span>0 错误</span>
        </div>
        <div className="flex items-center gap-1 hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer">
          <Bell size={12} />
          <span>0 警告</span>
        </div>
      </div>

      {/* 右侧状态 */}
      <div className="flex items-center gap-4">
        <div className="hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer">
          Ln 1, Col 1
        </div>
        <div className="hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer">
          空格: 4
        </div>
        <div className="hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer">
          UTF-8
        </div>
        <div className="hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer">
          CRLF
        </div>
        <div className="hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer">
          TypeScript
        </div>
        <div className="hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer">
          Prettier
        </div>
      </div>
    </div>
  )
}
