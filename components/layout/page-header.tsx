import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  subtitle?: string
  className?: string
  children?: React.ReactNode
}

export function PageHeader({ title, subtitle, className, children }: PageHeaderProps) {
  return (
    <div className={cn('mb-8 flex items-start justify-between gap-4', className)}>
      <div>
        <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-stone-500">{subtitle}</p>}
      </div>
      {children && <div className="flex-shrink-0">{children}</div>}
    </div>
  )
}
