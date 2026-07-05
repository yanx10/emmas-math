'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { BookOpen, Home, PenLine, Trophy, RotateCcw, BarChart2, Settings } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/course', label: 'Course', icon: BookOpen },
  { href: '/practice', label: 'Practice', icon: PenLine },
  { href: '/quiz', label: 'Quiz', icon: Trophy },
  { href: '/review', label: 'Review', icon: RotateCcw },
  { href: '/progress', label: 'Progress', icon: BarChart2 },
]

export function TopNav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-pink-100 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-black text-pink-600 text-lg">
            <span className="text-2xl">✨</span>
            <span className="hidden sm:block bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Emma&apos;s Math</span>
          </Link>
          <nav className="flex items-center gap-0.5 sm:gap-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors sm:px-3 sm:text-sm',
                    active
                      ? 'bg-pink-50 text-pink-700'
                      : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900'
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="hidden md:block">{label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}
