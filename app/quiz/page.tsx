import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import { Trophy, Clock, CheckCircle } from 'lucide-react'

export default async function QuizListPage() {
  const supabase = await createClient()

  const [{ data: quizzesRaw }, { data: progressRows }, { data: qCounts }] = await Promise.all([
    supabase.from('quizzes').select('*, topic:topics(*)').eq('is_active', true).order('week_number'),
    supabase.from('weekly_progress').select('*'),
    supabase.from('quiz_questions').select('quiz_id'),
  ])

  const quizzes = quizzesRaw ?? []
  const progress = progressRows ?? []
  const counts = qCounts ?? []

  return (
    <div>
      <PageHeader title="Weekly Quizzes" subtitle="Test your knowledge each week" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => {
          const p = progress.find((pr) => pr.week_number === quiz.week_number)
          const qCount = counts.filter((q) => q.quiz_id === quiz.id).length
          const estimatedMins = Math.ceil(qCount * 1.5)
          const topic = quiz.topic as { title?: string } | null

          return (
            <Card key={quiz.id}>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${quiz.week_number === 0 ? 'text-amber-700 bg-amber-50' : 'text-pink-600 bg-pink-50'}`}>
                  {quiz.week_number === 0 ? '🏆 Test Prep' : `Level ${quiz.week_number}`}
                </span>
                {p?.quiz_completed && (
                  <span className="flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <CheckCircle className="h-3 w-3" /> Done
                  </span>
                )}
              </div>

              <h3 className="font-semibold text-stone-900 mb-1">{quiz.title}</h3>
              {topic?.title && <p className="text-stone-500 text-sm mb-3">{topic.title}</p>}

              <div className="flex items-center gap-4 text-xs text-stone-400 mb-4">
                <span className="flex items-center gap-1">
                  <Trophy className="h-3.5 w-3.5" /> {qCount} questions
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> ~{estimatedMins} min
                </span>
                {p?.quiz_score != null && (
                  <span className="font-medium text-stone-600">Score: {p.quiz_score}%</span>
                )}
              </div>

              <Link href={`/quiz/${quiz.id}`}>
                <Button className="w-full" variant={p?.quiz_completed ? 'secondary' : 'primary'}>
                  {p?.quiz_completed ? 'Retake Quiz' : 'Start Quiz'}
                </Button>
              </Link>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
