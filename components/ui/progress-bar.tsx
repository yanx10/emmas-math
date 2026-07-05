import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  className?: string
  barClassName?: string
  showLabel?: boolean
}

export function ProgressBar({ value, className, barClassName, showLabel }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div className={cn('relative', className)}>
      <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-500', barClassName ?? 'bg-pink-500')}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className="mt-1 block text-xs text-stone-500">{clamped}%</span>
      )}
    </div>
  )
}
