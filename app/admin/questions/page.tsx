import Link from 'next/link'
import { getAllQuestions } from '@/lib/data'
import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import { getDifficultyLabel, getDifficultyColor } from '@/lib/scoring'
import { cn } from '@/lib/utils'
import type { Question, Topic } from '@/types'

export default async function AdminQuestionsPage() {
  const questions = await getAllQuestions()

  const byWeek = new Map<number, Question[]>()
  for (const q of questions) {
    const w = q.week_number ?? 0
    const existing = byWeek.get(w) ?? []
    existing.push(q)
    byWeek.set(w, existing)
  }

  return (
    <div>
      <PageHeader title="Question Manager" subtitle={`${questions.length} total questions`}>
        <Link href="/admin/questions/new">
          <Button>+ Add Question</Button>
        </Link>
      </PageHeader>

      <div className="space-y-6">
        {Array.from(byWeek.entries())
          .sort(([a], [b]) => a - b)
          .map(([week, qs]) => (
            <div key={week}>
              <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3">
                Week {week} — {qs.length} questions
              </h2>
              <div className="overflow-x-auto rounded-2xl border border-stone-100 bg-white">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-stone-100 text-xs text-stone-400 uppercase tracking-wide">
                      <th className="text-left px-4 py-3">Topic</th>
                      <th className="text-left px-4 py-3">Difficulty</th>
                      <th className="text-left px-4 py-3">Type</th>
                      <th className="text-left px-4 py-3">Question</th>
                      <th className="text-left px-4 py-3">Active</th>
                      <th className="text-left px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-50">
                    {qs.map((q) => {
                      const topic = q.topic as Topic | undefined
                      return (
                        <tr key={q.id} className="hover:bg-stone-50">
                          <td className="px-4 py-3 text-stone-600">{topic?.title ?? '—'}</td>
                          <td className="px-4 py-3">
                            <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', getDifficultyColor(q.difficulty))}>
                              {getDifficultyLabel(q.difficulty)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-stone-500">{q.question_type}</td>
                          <td className="px-4 py-3 text-stone-700 max-w-xs truncate">{q.question_text}</td>
                          <td className="px-4 py-3">
                            <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', q.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-stone-100 text-stone-400')}>
                              {q.is_active ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <Link href={`/admin/questions/${q.id}`} className="text-pink-600 hover:underline text-xs font-medium">
                              Edit →
                            </Link>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
