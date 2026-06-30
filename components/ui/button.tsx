import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-violet-600 text-white hover:bg-violet-700 focus:ring-violet-500 shadow-sm': variant === 'primary',
            'bg-stone-100 text-stone-800 hover:bg-stone-200 focus:ring-stone-400': variant === 'secondary',
            'border-2 border-violet-200 text-violet-700 hover:bg-violet-50 focus:ring-violet-500': variant === 'outline',
            'text-stone-600 hover:bg-stone-100 focus:ring-stone-400': variant === 'ghost',
            'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500': variant === 'danger',
          },
          {
            'text-sm px-3 py-1.5': size === 'sm',
            'text-sm px-4 py-2': size === 'md',
            'text-base px-6 py-3': size === 'lg',
          },
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
