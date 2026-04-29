interface BreadcrumbItem {
  label: string
  path?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-2 px-6 py-3 border-b border-[#252526] bg-[#252526]">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && (
            <span className="text-[13px] text-gray-500">/</span>
          )}
          <span 
            className={`text-[13px] ${
              index === items.length - 1 ? 'text-white' : 'text-gray-400'
            }`}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}
