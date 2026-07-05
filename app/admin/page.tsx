import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/page-header'
import { Card } from '@/components/ui/card'
import { PenLine, BookOpen, Trophy, BarChart2, LogOut } from 'lucide-react'

export default async function AdminPage() {
  const supabase = await createClient()

  const [{ count: qCount }, { count: lCount }, { count: quizCount }, { count: aCount }] = await Promise.all([
    supabase.from('questions').select('*', { count: 'exact', head: true }),
    supabase.from('lessons').select('*', { count: 'exact', head: true }),
    supabase.from('quizzes').select('*', { count: 'exact', head: true }),
    supabase.from('attempts').select('*', { count: 'exact', head: true }),
  ])

  const items = [
    { href: '/admin/questions', label: 'Questions', icon: PenLine, count: qCount ?? 0, desc: 'Manage practice questions' },
    { href: '/admin/lessons', label: 'Lessons', icon: BookOpen, count: lCount ?? 0, desc: 'Manage lesson content' },
    { href: '/admin/quizzes', label: 'Quizzes', icon: Trophy, count: quizCount ?? 0, desc: 'Manage weekly quizzes' },
  ]

  return (
    <div>
      <PageHeader title="Admin Dashboard" subtitle="Manage course content" />

      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        {items.map(({ href, label, icon: Icon, count, desc }) => (
          <Link key={href} href={href}>
            <Card className="hover:shadow-md hover:border-pink-100 transition-all cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-pink-50 rounded-xl">
                  <Icon className="h-6 w-6 text-pink-600" />
                </div>
                <div>
                  <p className="font-semibold text-stone-900">{label}</p>
                  <p className="text-2xl font-bold text-stone-800">{count}</p>
                  <p className="text-xs text-stone-400">{desc}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <div className="flex items-center gap-2 mb-2">
          <BarChart2 className="h-5 w-5 text-pink-500" />
          <h2 className="font-semibold text-stone-900">Total Attempts</h2>
        </div>
        <p className="text-4xl font-bold text-stone-900">{aCount ?? 0}</p>
        <p className="text-sm text-stone-400 mt-1">answer submissions recorded</p>
      </Card>

      <div className="mt-8">
        <form action="/api/admin/logout" method="POST">
          <button type="submit" className="flex items-center gap-2 text-sm text-stone-400 hover:text-rose-600 transition-colors">
            <LogOut className="h-4 w-4" /> Sign out of admin
          </button>
        </form>
      </div>
    </div>
  )
}
