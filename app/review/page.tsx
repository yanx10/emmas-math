import { getIncorrectAttempts } from '@/lib/data'
import { PageHeader } from '@/components/layout/page-header'
import { Card } from '@/components/ui/card'
import { getDifficultyLabel, getDifficultyColor } from '@/lib/scoring'
import { cn } from '@/lib/utils'
import { XCircle, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Attempt, Question, Topic } from '@/types'

export default async function ReviewPage() {
  const attempts = await getIncorrectAttempts()

  // Deduplicate: only the most recent incorrect attempt per question
  const seen = new Set<string>()
  const unique = attempts.filter((a) => {
    if (!a.question_id || seen.has(a.question_id)) return false
    seen.add(a.question_id)
    return true
  })

  if (unique.length === 0) {
    return (
      <div>
        <PageHeader title="Mistake Review" subtitle="Questions to work on" />
        <div className="text-center py-20">
          <CheckCircle2 className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-stone-800 mb-2">No mistakes yet!</h2>
          <p className="text-stone-500 mb-6">Keep practicing and any incorrect answers will appear here.</p>
          <Link href="/practice">
            <Button>Start Practicing</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Group by topic
  const byTopic = new Map<string, { topicTitle: string; attempts: Attempt[] }>()
  for (const attempt of unique) {
    const topic = (attempt.question as Question & { topic?: Topic } | undefined)?.topic
    const key = topic?.slug ?? 'other'
    const title = topic?.title ?? 'Other'
    const existing = byTopic.get(key) ?? { topicTitle: title, attempts: [] }
    existing.attempts.push(attempt)
    byTopic.set(key, existing)
  }

  return (
    <div>
      <PageHeader
        title="Mistake Review"
        subtitle={`${unique.length} question${unique.length !== 1 ? 's' : ''} to revisit`}
      />

      <div className="space-y-8">
        {Array.from(byTopic.entries()).map(([, { topicTitle, attempts: topicAttempts }]) => (
          <div key={topicTitle}>
            <h2 className="text-base font-semibold text-stone-700 mb-3 flex items-center gap-2">
              <XCircle className="h-4 w-4 text-rose-400" /> {topicTitle}
            </h2>
            <div className="space-y-3">
              {topicAttempts.map((attempt) => {
                const q = attempt.question as Question | undefined
                if (!q) return null
                return (
                  <Card key={attempt.id} className="border-l-4 border-rose-300">
                    <div className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-stone-900 mb-2">{q.question_text}</p>
                        <div className="space-y-1 text-sm mb-3">
                          <p className="text-rose-600">
                            Your answer:{' '}
                            <span className="font-medium line-through">{attempt.user_answer || '(no answer)'}</span>
                          </p>
                          <p className="text-emerald-700">
                            Correct answer: <span className="font-semibold">{q.correct_answer}</span>
                          </p>
                        </div>
                        {q.explanation && (
                          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-sm text-amber-800">
                            <span className="font-medium">💡 Explanation: </span>
                            {q.explanation}
                          </div>
                        )}
                        <div className="mt-3 flex items-center gap-2">
                          <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', getDifficultyColor(q.difficulty))}>
                            {getDifficultyLabel(q.difficulty)}
                          </span>
                          <span className="text-xs text-stone-400">
                            {new Date(attempt.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link href="/practice">
          <Button variant="secondary">← Go Practice</Button>
        </Link>
      </div>
    </div>
  )
}
