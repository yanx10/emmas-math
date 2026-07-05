import { getQuizzes } from '@/lib/data'
import { createClient } from '@/lib/supabase/server'
import { PageHeader } from '@/components/layout/page-header'
import Link from 'next/link'
import type { Quiz, Topic } from '@/types'

export default async function AdminQuizzesPage() {
  const [quizzes, supabase] = await Promise.all([getQuizzes(), createClient()])
  const { data: qCounts } = await supabase.from('quiz_questions').select('quiz_id')

  const counts = qCounts ?? []

  return (
    <div>
      <PageHeader title="Quiz Manager" subtitle={`${quizzes.length} quizzes`} />

      <div className="overflow-x-auto rounded-2xl border border-stone-100 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100 text-xs text-stone-400 uppercase tracking-wide">
              <th className="text-left px-4 py-3">Week</th>
              <th className="text-left px-4 py-3">Title</th>
              <th className="text-left px-4 py-3">Topic</th>
              <th className="text-left px-4 py-3">Questions</th>
              <th className="text-left px-4 py-3">Active</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {(quizzes as Quiz[]).map((quiz) => {
              const topic = quiz.topic as Topic | undefined
              const qCount = counts.filter((q) => q.quiz_id === quiz.id).length
              return (
                <tr key={quiz.id} className="hover:bg-stone-50">
                  <td className="px-4 py-3 text-stone-500">Week {quiz.week_number}</td>
                  <td className="px-4 py-3 font-medium text-stone-900">{quiz.title}</td>
                  <td className="px-4 py-3 text-stone-500">{topic?.title ?? '—'}</td>
                  <td className="px-4 py-3 text-stone-600">{qCount}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${quiz.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-stone-100 text-stone-400'}`}>
                      {quiz.is_active ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/quiz/${quiz.id}`} className="text-pink-600 hover:underline text-xs">
                      Preview →
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
