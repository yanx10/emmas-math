import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/page-header'
import { Card } from '@/components/ui/card'
import { ProgressBar } from '@/components/ui/progress-bar'
import { buildTopicStats, getMasteryLabel, getMasteryColor } from '@/lib/scoring'
import { cn } from '@/lib/utils'
import { CheckCircle, XCircle, TrendingUp, Flame, BookOpen, Trophy, AlertTriangle } from 'lucide-react'
import type { Attempt, WeeklyProgress, Question, Topic } from '@/types'

const WEEK_TITLES: Record<number, string> = {
  1: 'Decimal Place Value',
  2: 'Decimal Operations',
  3: 'Fractions Review',
}

export default async function ProgressPage() {
  const supabase = await createClient()

  const [{ data: progressRows }, { data: attemptsRaw }] = await Promise.all([
    supabase.from('weekly_progress').select('*').order('week_number'),
    supabase.from('attempts').select('*, question:questions(*, topic:topics(*))').order('created_at', { ascending: false }),
  ])

  const progress = (progressRows ?? []) as WeeklyProgress[]
  const attempts = (attemptsRaw ?? []) as Attempt[]

  const totalAnswered = attempts.length
  const correctCount = attempts.filter((a) => a.is_correct).length
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0
  const quizzesCompleted = progress.filter((p) => p.quiz_completed).length
  const days = new Set(attempts.map((a) => a.created_at.slice(0, 10)))
  const streak = days.size

  const topicStats = buildTopicStats(attempts as Parameters<typeof buildTopicStats>[0])
  const recent = attempts.slice(0, 10)

  // Most missed questions
  const wrongByQuestion = new Map<string, { question: Question; count: number }>()
  for (const a of attempts) {
    if (!a.is_correct && a.question) {
      const q = a.question as Question
      const existing = wrongByQuestion.get(q.id) ?? { question: q, count: 0 }
      existing.count++
      wrongByQuestion.set(q.id, existing)
    }
  }
  const mostMissed = Array.from(wrongByQuestion.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // Quiz score trend
  const quizScores = progress
    .filter((p) => p.quiz_score != null)
    .map((p) => ({ week: p.week_number, score: p.quiz_score! }))

  return (
    <div>
      <PageHeader title="Progress" subtitle="Emma's learning journey" />

      {/* Parent summary banner */}
      <div className="mb-8 rounded-2xl bg-gradient-to-br from-violet-50 to-sky-50 border border-violet-100 p-6">
        <h2 className="text-sm font-semibold text-violet-600 uppercase tracking-wide mb-3">📊 Parent Summary</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <p className="text-3xl font-bold text-stone-900">{totalAnswered}</p>
            <p className="text-sm text-stone-500">Questions answered</p>
          </div>
          <div>
            <p className={cn('text-3xl font-bold', accuracy >= 80 ? 'text-emerald-600' : accuracy >= 60 ? 'text-amber-600' : 'text-rose-600')}>
              {accuracy}%
            </p>
            <p className="text-sm text-stone-500">Overall accuracy</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-stone-900">{quizzesCompleted}/3</p>
            <p className="text-sm text-stone-500">Quizzes done</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-amber-500 flex items-center gap-1">
              <Flame className="h-7 w-7" />{streak}
            </p>
            <p className="text-sm text-stone-500">Days practiced</p>
          </div>
        </div>

        {/* Quiz scores */}
        {quizScores.length > 0 && (
          <div className="mt-5 pt-5 border-t border-violet-100">
            <p className="text-sm font-semibold text-stone-700 mb-3 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-500" /> Quiz Scores
            </p>
            <div className="flex gap-3">
              {quizScores.map(({ week, score }) => (
                <div key={week} className="flex-1">
                  <div className="flex justify-between text-xs text-stone-500 mb-1">
                    <span>Week {week}</span>
                    <span className={cn('font-semibold', score >= 80 ? 'text-emerald-600' : score >= 60 ? 'text-amber-600' : 'text-rose-600')}>
                      {score}%
                    </span>
                  </div>
                  <ProgressBar
                    value={score}
                    barClassName={score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-amber-500' : 'bg-rose-400'}
                  />
                </div>
              ))}
              {/* Placeholder for incomplete weeks */}
              {Array.from({ length: 3 - quizScores.length }).map((_, i) => (
                <div key={`empty-${i}`} className="flex-1 opacity-30">
                  <div className="flex justify-between text-xs text-stone-500 mb-1">
                    <span>Week {quizScores.length + i + 1}</span>
                    <span>—</span>
                  </div>
                  <ProgressBar value={0} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Needs attention */}
        {mostMissed.length > 0 && (
          <div className="mt-5 pt-5 border-t border-violet-100">
            <p className="text-sm font-semibold text-stone-700 mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" /> Needs Attention
            </p>
            <div className="space-y-2">
              {mostMissed.map(({ question: q, count }) => (
                <div key={q.id} className="flex items-center justify-between text-sm">
                  <span className="text-stone-700 truncate flex-1 mr-4">{q.question_text}</span>
                  <span className="text-rose-600 font-medium flex-shrink-0">
                    missed {count}×
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* By Topic */}
        <div>
          <h2 className="text-lg font-semibold text-stone-800 mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-violet-500" /> By Topic
          </h2>
          {topicStats.length === 0 ? (
            <Card>
              <p className="text-stone-400 text-sm text-center py-4">No practice attempts yet.</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {topicStats.map((s) => (
                <Card key={s.topic_id}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-stone-800">{s.topic_title}</h3>
                    <span className={cn('text-xs font-medium px-2.5 py-1 rounded-full', getMasteryColor(s.mastery))}>
                      {getMasteryLabel(s.mastery)}
                    </span>
                  </div>
                  <ProgressBar
                    value={s.accuracy}
                    barClassName={
                      s.mastery === 'mastered' ? 'bg-emerald-500' :
                      s.mastery === 'practicing' ? 'bg-amber-500' : 'bg-rose-400'
                    }
                    showLabel
                  />
                  <p className="text-xs text-stone-400 mt-1">{s.correct_attempts}/{s.total_attempts} correct</p>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Weekly Progress */}
        <div>
          <h2 className="text-lg font-semibold text-stone-800 mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-violet-500" /> Weekly Progress
          </h2>
          <div className="space-y-3">
            {progress.map((p) => (
              <Card key={p.week_number}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-xs font-bold text-violet-600">Week {p.week_number}</span>
                    <p className="font-medium text-stone-800">{WEEK_TITLES[p.week_number] ?? `Week ${p.week_number}`}</p>
                  </div>
                  {p.quiz_score != null && (
                    <span className={cn(
                      'text-sm font-semibold px-2 py-1 rounded-lg',
                      p.quiz_score >= 80 ? 'bg-emerald-50 text-emerald-700' :
                      p.quiz_score >= 60 ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                    )}>
                      <Trophy className="h-3.5 w-3.5 inline mr-1" />{p.quiz_score}%
                    </span>
                  )}
                </div>
                <ProgressBar value={p.completion_percentage} showLabel className="mb-2" />
                <div className="flex gap-3 text-xs text-stone-500">
                  <span className={cn('flex items-center gap-1', p.lesson_completed && 'text-emerald-600')}>
                    {p.lesson_completed ? <CheckCircle className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5 text-stone-300" />} Lesson
                  </span>
                  <span className={cn('flex items-center gap-1', p.practice_completed && 'text-emerald-600')}>
                    {p.practice_completed ? <CheckCircle className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5 text-stone-300" />} Practice
                  </span>
                  <span className={cn('flex items-center gap-1', p.quiz_completed && 'text-emerald-600')}>
                    {p.quiz_completed ? <CheckCircle className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5 text-stone-300" />} Quiz
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      {recent.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-stone-800 mb-4">Recent Activity</h2>
          <Card>
            <div className="divide-y divide-stone-50">
              {recent.map((a) => {
                const q = a.question as Question | undefined
                return (
                  <div key={a.id} className="flex items-center gap-3 py-2.5">
                    {a.is_correct
                      ? <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      : <XCircle className="h-4 w-4 text-rose-400 flex-shrink-0" />
                    }
                    <p className="text-sm text-stone-700 flex-1 truncate">{q?.question_text ?? 'Question'}</p>
                    <span className="text-xs text-stone-400 flex-shrink-0">{(q?.topic as Topic | undefined)?.title ?? ''}</span>
                    <span className="text-xs text-stone-300 flex-shrink-0">{new Date(a.created_at).toLocaleDateString()}</span>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
