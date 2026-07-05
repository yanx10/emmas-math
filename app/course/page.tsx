import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import { ProgressBar } from '@/components/ui/progress-bar'
import { PageHeader } from '@/components/layout/page-header'
import { BookOpen, PenLine, Trophy, CheckCircle, Circle, Lock } from 'lucide-react'

const WEEK_META = [
  { week: 1, topicSlug: 'decimal-place-value', lessonSlug: 'decimal-place-value-lesson', description: 'Place value, comparing, and rounding decimals' },
  { week: 2, topicSlug: 'decimal-operations', lessonSlug: 'decimal-operations-lesson', description: 'Adding, subtracting, and multiplying decimals' },
  { week: 3, topicSlug: 'fractions-review', lessonSlug: 'fractions-review-lesson', description: 'Fractions, equivalent forms, and mixed numbers' },
]

const statusColors: Record<string, string> = {
  not_started: 'bg-stone-100 text-stone-500',
  in_progress: 'bg-amber-50 text-amber-700 border border-amber-200',
  completed: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  needs_review: 'bg-rose-50 text-rose-700 border border-rose-200',
}

const statusLabels: Record<string, string> = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  completed: 'Completed',
  needs_review: 'Needs Review',
}

export default async function CoursePage() {
  const supabase = await createClient()

  const [{ data: progressRows }, { data: topicsRaw }, { data: quizzesRaw }] = await Promise.all([
    supabase.from('weekly_progress').select('*').order('week_number'),
    supabase.from('topics').select('*').order('sort_order'),
    supabase.from('quizzes').select('id, week_number').eq('is_active', true),
  ])

  const progress = progressRows ?? []
  const topics = topicsRaw ?? []
  const quizzes = quizzesRaw ?? []

  const weeks = WEEK_META.map((meta) => {
    const topic = topics.find((t) => t.slug === meta.topicSlug)
    const p = progress.find((pr) => pr.week_number === meta.week)
    const quiz = quizzes.find((q) => q.week_number === meta.week)
    return { ...meta, topic, progress: p, quiz }
  })

  return (
    <div>
      <PageHeader
        title="Course Roadmap"
        subtitle="3-week 5th grade review & middle school prep"
      />

      <div className="space-y-4">
        {weeks.map(({ week, topicSlug, lessonSlug, description, topic, progress: p, quiz }) => {
          const status = p?.status ?? 'not_started'
          const pct = p?.completion_percentage ?? 0

          return (
            <Card key={week} className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                {/* Left: info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-pink-600 bg-pink-50 px-2.5 py-1 rounded-full">
                      Week {week}
                    </span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[status]}`}>
                      {statusLabels[status]}
                    </span>
                    {p?.quiz_score != null && (
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                        Quiz: {p.quiz_score}%
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-bold text-stone-900">{topic?.title ?? topicSlug}</h2>
                  <p className="text-stone-500 text-sm mt-1">{description}</p>

                  <div className="mt-3">
                    <ProgressBar value={pct} showLabel />
                  </div>

                  <div className="mt-3 flex items-center gap-4 text-sm text-stone-500">
                    <span className="flex items-center gap-1.5">
                      {p?.lesson_completed ? <CheckCircle className="h-4 w-4 text-emerald-500" /> : <Circle className="h-4 w-4" />}
                      Lesson
                    </span>
                    <span className="flex items-center gap-1.5">
                      {p?.practice_completed ? <CheckCircle className="h-4 w-4 text-emerald-500" /> : <Circle className="h-4 w-4" />}
                      Practice
                    </span>
                    <span className="flex items-center gap-1.5">
                      {p?.quiz_completed ? <CheckCircle className="h-4 w-4 text-emerald-500" /> : <Circle className="h-4 w-4" />}
                      Quiz
                    </span>
                  </div>
                </div>

                {/* Right: action buttons */}
                <div className="flex flex-row gap-2 sm:flex-col sm:w-36">
                  <Link href={`/lesson/${lessonSlug}`} className="flex-1 sm:flex-none">
                    <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors">
                      <BookOpen className="h-4 w-4 text-pink-500" />
                      Lesson
                    </button>
                  </Link>
                  <Link href={`/practice/${topicSlug}`} className="flex-1 sm:flex-none">
                    <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors">
                      <PenLine className="h-4 w-4 text-pink-500" />
                      Practice
                    </button>
                  </Link>
                  {quiz ? (
                    <Link href={`/quiz/${quiz.id}`} className="flex-1 sm:flex-none">
                      <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors">
                        <Trophy className="h-4 w-4 text-amber-500" />
                        Quiz
                      </button>
                    </Link>
                  ) : (
                    <button disabled className="w-full flex items-center justify-center gap-2 rounded-xl border border-stone-100 bg-stone-50 px-3 py-2 text-sm font-medium text-stone-400 cursor-not-allowed">
                      <Lock className="h-4 w-4" />
                      Quiz
                    </button>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
