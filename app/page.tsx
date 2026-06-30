import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import { ProgressBar } from '@/components/ui/progress-bar'
import { Button } from '@/components/ui/button'
import { CheckCircle, Circle, BookOpen, PenLine, Trophy, Flame, Target, TrendingUp } from 'lucide-react'
import { buildTopicStats } from '@/lib/scoring'
import type { Attempt } from '@/types'

const WEEK_TOPICS = [
  { week: 1, title: 'Decimal Place Value', slug: 'decimal-place-value', lesson: 'decimal-place-value-lesson' },
  { week: 2, title: 'Decimal Operations', slug: 'decimal-operations', lesson: 'decimal-operations-lesson' },
  { week: 3, title: 'Fractions Review', slug: 'fractions-review', lesson: 'fractions-review-lesson' },
]

const statusColors: Record<string, string> = {
  not_started: 'bg-stone-100 text-stone-500',
  in_progress: 'bg-amber-50 text-amber-700',
  completed: 'bg-emerald-50 text-emerald-700',
  needs_review: 'bg-rose-50 text-rose-700',
}

const statusLabels: Record<string, string> = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  completed: 'Completed',
  needs_review: 'Needs Review',
}

export default async function HomePage() {
  const supabase = await createClient()

  const [{ data: progressRows }, { data: attemptsRaw }, { data: quizzesRaw }] = await Promise.all([
    supabase.from('weekly_progress').select('*').order('week_number'),
    supabase.from('attempts').select('*, question:questions(*, topic:topics(*))').order('created_at', { ascending: false }).limit(200),
    supabase.from('quizzes').select('id, week_number').order('week_number'),
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
  const currentWeekInfo = WEEK_TOPICS.find((t) => t.week === currentWeekNum) ?? WEEK_TOPICS[0]

  const quizForCurrentWeek = quizzes.find((q) => q.week_number === currentWeekNum)
  const topicStats = buildTopicStats(attempts as Parameters<typeof buildTopicStats>[0])
  const topicsPracticed = topicStats.length

  // Distinct calendar days with attempts
  const days = new Set(attempts.map((a) => a.created_at.slice(0, 10)))
  const streak = days.size

  const weekProgress = WEEK_TOPICS.map((wt) => {
    const p = progress.find((pr) => pr.week_number === wt.week)
    const quiz = quizzes.find((q) => q.week_number === wt.week)
    return { ...wt, progress: p, quiz }
  })

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-stone-900">Hey Emma! 👋</h1>
        <p className="mt-1 text-stone-500 text-lg">Let&apos;s practice some math today.</p>
      </div>

      {/* Today's Mission */}
      <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-violet-700 p-6 text-white shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-200">Week {currentWeekNum}</span>
            <h2 className="mt-1 text-2xl font-bold">{currentWeekInfo.title}</h2>
            <p className="mt-1 text-violet-200 text-sm">This week&apos;s focus topic</p>
          </div>
          <Target className="h-10 w-10 text-violet-300 flex-shrink-0" />
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={`/lesson/${currentWeekInfo.lesson}`}>
            <button className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-violet-700 hover:bg-violet-50 transition-colors">
              <BookOpen className="h-4 w-4" /> Open Lesson
            </button>
          </Link>
          <Link href={`/practice/${currentWeekInfo.slug}`}>
            <button className="inline-flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-400 transition-colors">
              <PenLine className="h-4 w-4" /> Start Practice
            </button>
          </Link>
          {quizForCurrentWeek && (
            <Link href={`/quiz/${quizForCurrentWeek.id}`}>
              <button className="inline-flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-400 transition-colors">
                <Trophy className="h-4 w-4" /> Take Quiz
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card>
          <div className="flex items-center gap-2 text-amber-500 mb-1">
            <Flame className="h-5 w-5" />
            <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">Streak</span>
          </div>
          <p className="text-3xl font-bold text-stone-900">{streak}</p>
          <p className="text-xs text-stone-400 mt-0.5">days of practice</p>
        </Card>
        <Card>
          <div className="flex items-center gap-2 text-violet-500 mb-1">
            <PenLine className="h-5 w-5" />
            <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">Answered</span>
          </div>
          <p className="text-3xl font-bold text-stone-900">{totalAnswered}</p>
          <p className="text-xs text-stone-400 mt-0.5">questions</p>
        </Card>
        <Card>
          <div className="flex items-center gap-2 text-emerald-500 mb-1">
            <TrendingUp className="h-5 w-5" />
            <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">Accuracy</span>
          </div>
          <p className="text-3xl font-bold text-stone-900">{accuracy}%</p>
          <p className="text-xs text-stone-400 mt-0.5">correct</p>
        </Card>
        <Card>
          <div className="flex items-center gap-2 text-sky-500 mb-1">
            <BookOpen className="h-5 w-5" />
            <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">Topics</span>
          </div>
          <p className="text-3xl font-bold text-stone-900">{topicsPracticed}</p>
          <p className="text-xs text-stone-400 mt-0.5">practiced</p>
        </Card>
      </div>

      {/* Week overview */}
      <div>
        <h2 className="text-lg font-semibold text-stone-800 mb-4">All Weeks</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {weekProgress.map(({ week, title, slug, lesson, progress: p, quiz }) => {
            const status = p?.status ?? 'not_started'
            const pct = p?.completion_percentage ?? 0
            return (
              <Card key={week}>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">Week {week}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[status]}`}>
                    {statusLabels[status]}
                  </span>
                </div>
                <h3 className="font-semibold text-stone-900 mb-3">{title}</h3>
                <ProgressBar value={pct} showLabel className="mb-3" />
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-4">
                  {p?.lesson_completed ? <CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> : <Circle className="h-3.5 w-3.5" />}
                  <span>Lesson</span>
                  {p?.practice_completed ? <CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> : <Circle className="h-3.5 w-3.5" />}
                  <span>Practice</span>
                  {p?.quiz_completed ? <CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> : <Circle className="h-3.5 w-3.5" />}
                  <span>Quiz</span>
                </div>
                <div className="flex gap-2">
                  <Link href={`/lesson/${lesson}`} className="flex-1">
                    <Button variant="secondary" size="sm" className="w-full text-xs">Lesson</Button>
                  </Link>
                  <Link href={`/practice/${slug}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full text-xs">Practice</Button>
                  </Link>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
