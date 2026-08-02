import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import { ProgressBar } from '@/components/ui/progress-bar'
import { Button } from '@/components/ui/button'
import { CheckCircle, Circle, BookOpen, PenLine, Trophy, Clock } from 'lucide-react'
import { buildTopicStats } from '@/lib/scoring'
import { getTodayTimeSpentSeconds } from '@/lib/data'
import { cn } from '@/lib/utils'
import type { Attempt } from '@/types'

const GOAL_SECONDS = 45 * 60

const WEEK_META = [
  { week: 1, title: 'Decimal Place Value', slug: 'decimal-place-value', lesson: 'decimal-place-value-lesson', emoji: '🌸', gradient: 'from-pink-400 to-rose-400' },
  { week: 2, title: 'Decimal Operations', slug: 'decimal-operations', lesson: 'decimal-operations-lesson', emoji: '🌺', gradient: 'from-purple-400 to-pink-400' },
  { week: 3, title: 'Fractions Review', slug: 'fractions-review', lesson: 'fractions-review-lesson', emoji: '🌷', gradient: 'from-sky-400 to-purple-400' },
  { week: 4, title: 'Ratios & Rates', slug: 'ratios-and-rates', lesson: 'ratios-and-rates-lesson', emoji: '🌻', gradient: 'from-green-400 to-teal-400' },
  { week: 5, title: 'Percentages', slug: 'percentages', lesson: 'percentages-lesson', emoji: '💫', gradient: 'from-teal-400 to-cyan-400' },
  { week: 6, title: 'Integers & Negative Numbers', slug: 'integers', lesson: 'integers-lesson', emoji: '❄️', gradient: 'from-blue-400 to-indigo-400' },
  { week: 7, title: 'Expressions & Equations', slug: 'expressions-and-equations', lesson: 'expressions-equations-lesson', emoji: '🔢', gradient: 'from-indigo-400 to-violet-400' },
  { week: 8, title: 'Geometry: Area & Volume', slug: 'geometry-area-volume', lesson: 'geometry-area-volume-lesson', emoji: '📐', gradient: 'from-violet-400 to-fuchsia-400' },
  { week: 9, title: 'Statistics', slug: 'statistics', lesson: 'statistics-lesson', emoji: '📊', gradient: 'from-fuchsia-400 to-rose-400' },
  { week: 10, title: 'Coordinate Plane', slug: 'coordinate-plane', lesson: 'coordinate-plane-lesson', emoji: '🗺️', gradient: 'from-rose-400 to-orange-400' },
]

const statusConfig: Record<string, { label: string; color: string }> = {
  not_started: { label: 'Not Started', color: 'bg-stone-100 text-stone-500' },
  in_progress: { label: 'In Progress! 🚀', color: 'bg-amber-50 text-amber-700' },
  completed: { label: 'Complete! 🏆', color: 'bg-emerald-50 text-emerald-700' },
  needs_review: { label: 'Review Time 📚', color: 'bg-rose-50 text-rose-600' },
}

export default async function HomePage() {
  const supabase = await createClient()

  const [{ data: progressRows }, { data: attemptsRaw }, { data: quizzesRaw }, todaySeconds] = await Promise.all([
    supabase.from('weekly_progress').select('*').order('week_number'),
    supabase.from('attempts').select('*, question:questions(*, topic:topics(*))').order('created_at', { ascending: false }).limit(200),
    supabase.from('quizzes').select('id, week_number').order('week_number'),
    getTodayTimeSpentSeconds(),
  ])

  const progress = progressRows ?? []
  const attempts = (attemptsRaw ?? []) as Attempt[]
  const quizzes = quizzesRaw ?? []

  const totalAnswered = attempts.length
  const correctCount = attempts.filter((a) => a.is_correct).length
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0

  const currentWeekEntry = progress.find((p) => p.status === 'in_progress') ??
    progress.find((p) => p.status === 'not_started') ??
    progress[progress.length - 1]
  const currentWeekNum = currentWeekEntry?.week_number ?? 1
  const currentWeekInfo = WEEK_META.find((t) => t.week === currentWeekNum) ?? WEEK_META[0]
  const quizForCurrentWeek = quizzes.find((q) => q.week_number === currentWeekNum)

  const topicStats = buildTopicStats(attempts as Parameters<typeof buildTopicStats>[0])
  const days = new Set(attempts.map((a) => a.created_at.slice(0, 10)))
  const streak = days.size

  const weekProgress = WEEK_META.map((wt) => {
    const p = progress.find((pr) => pr.week_number === wt.week)
    const quiz = quizzes.find((q) => q.week_number === wt.week)
    return { ...wt, progress: p, quiz }
  })

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-pink-500 font-bold text-sm uppercase tracking-widest mb-1">Welcome back!</p>
          <h1 className="text-4xl font-black text-stone-900">Hi Emma! 👋</h1>
          <p className="mt-1 text-stone-500 text-lg">Ready for today&apos;s math mission? 🌷</p>
        </div>
        {streak > 0 && (
          <div className="text-center bg-gradient-to-br from-amber-400 to-orange-400 text-white rounded-2xl px-4 py-3 shadow-lg">
            <p className="text-3xl font-black">🔥 {streak}</p>
            <p className="text-xs font-bold opacity-90">Day Streak!</p>
          </div>
        )}
      </div>

      {/* Daily goal tracker */}
      {(() => {
        const todayMinutes = Math.floor(todaySeconds / 60)
        const goalPct = Math.min(100, Math.round((todaySeconds / GOAL_SECONDS) * 100))
        const goalMet = todaySeconds >= GOAL_SECONDS
        const remaining = Math.max(0, Math.ceil((GOAL_SECONDS - todaySeconds) / 60))
        return (
          <Card className={cn('border-pink-100', goalMet && 'border-emerald-200 bg-emerald-50/50')}>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-pink-500" />
              <span className="font-black text-stone-800 text-sm">Daily Goal</span>
              <span className={cn('ml-auto text-sm font-bold', goalMet ? 'text-emerald-600' : 'text-stone-500')}>
                {todayMinutes} / 45 min
              </span>
            </div>
            <ProgressBar
              value={goalPct}
              barClassName={goalMet ? 'bg-emerald-400' : 'bg-gradient-to-r from-pink-400 to-purple-400'}
              className="mb-2"
            />
            <p className="text-xs text-stone-500">
              {goalMet
                ? '🎉 Goal complete! You crushed it today, Emma!'
                : todayMinutes === 0
                ? "You haven't practiced yet today — let's go! 🍓"
                : `${remaining} more minutes to hit your goal today! 💪`}
            </p>
          </Card>
        )
      })()}

      {/* Today's Mission */}
      <div className={`rounded-3xl bg-gradient-to-br ${currentWeekInfo.gradient} p-6 text-white shadow-xl`}>
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-widest opacity-80">Week {currentWeekNum} · Today&apos;s Mission</span>
            <h2 className="mt-1 text-2xl font-black">{currentWeekInfo.emoji} {currentWeekInfo.title}</h2>
            <p className="mt-1 opacity-80 text-sm">Let&apos;s crush some math today! 💪</p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={`/lesson/${currentWeekInfo.lesson}`}>
            <button className="inline-flex items-center gap-2 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 text-sm font-bold text-white hover:bg-white/30 transition-all">
              <BookOpen className="h-4 w-4" /> Lesson
            </button>
          </Link>
          <Link href={`/practice/${currentWeekInfo.slug}`}>
            <button className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-black text-pink-600 hover:scale-105 transition-all shadow-md">
              <PenLine className="h-4 w-4" /> Practice! 🚀
            </button>
          </Link>
          {quizForCurrentWeek && (
            <Link href={`/quiz/${quizForCurrentWeek.id}`}>
              <button className="inline-flex items-center gap-2 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 text-sm font-bold text-white hover:bg-white/30 transition-all">
                <Trophy className="h-4 w-4" /> Quiz
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Questions Done', value: totalAnswered, emoji: '🍓', color: 'from-pink-50 to-rose-50 border-pink-100' },
          { label: 'Accuracy', value: `${accuracy}%`, emoji: '✨', color: 'from-purple-50 to-pink-50 border-purple-100' },
          { label: 'Days Practiced', value: streak, emoji: '🌸', color: 'from-sky-50 to-blue-50 border-sky-100' },
          { label: 'Topics Tried', value: topicStats.length, emoji: '🎀', color: 'from-amber-50 to-orange-50 border-amber-100' },
        ].map(({ label, value, emoji, color }) => (
          <div key={label} className={`rounded-2xl bg-gradient-to-br ${color} border p-4`}>
            <p className="text-2xl mb-1">{emoji}</p>
            <p className="text-3xl font-black text-stone-900">{value}</p>
            <p className="text-xs font-semibold text-stone-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Week cards */}
      <div>
        <h2 className="text-xl font-black text-stone-800 mb-4">Your Weeks 🌺</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {weekProgress.map(({ week, title, slug, lesson, emoji, gradient, progress: p, quiz }) => {
            const status = p?.status ?? 'not_started'
            const pct = p?.completion_percentage ?? 0
            const cfg = statusConfig[status]

            return (
              <Card key={week} className="overflow-hidden border-pink-100 p-0">
                {/* Color header */}
                <div className={`bg-gradient-to-r ${gradient} p-4 text-white`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider opacity-80">Week {week}</span>
                    <span className="text-2xl">{emoji}</span>
                  </div>
                  <h3 className="font-black text-lg mt-1 leading-tight">{title}</h3>
                </div>

                {/* Body */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${cfg.color}`}>
                      {cfg.label}
                    </span>
                    <span className="text-xs font-bold text-stone-400">{pct}%</span>
                  </div>

                  <ProgressBar
                    value={pct}
                    barClassName={`bg-gradient-to-r ${gradient}`}
                    className="mb-3"
                  />

                  <div className="flex items-center gap-3 text-xs text-stone-500 mb-4">
                    {p?.lesson_completed ? <CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> : <Circle className="h-3.5 w-3.5" />}
                    <span>Lesson</span>
                    {p?.practice_completed ? <CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> : <Circle className="h-3.5 w-3.5" />}
                    <span>Practice</span>
                    {p?.quiz_completed ? <CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> : <Circle className="h-3.5 w-3.5" />}
                    <span>Quiz</span>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/lesson/${lesson}`} className="flex-1">
                      <Button variant="secondary" size="sm" className="w-full text-xs rounded-xl">Lesson</Button>
                    </Link>
                    <Link href={`/practice/${slug}`} className="flex-1">
                      <Button size="sm" className="w-full text-xs rounded-xl">Practice!</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
