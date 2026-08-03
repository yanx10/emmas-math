import { createClient } from '@/lib/supabase/server'
import { updateQuestion, deleteQuestion } from '@/app/admin/actions'
import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { Question, Topic } from '@/types'

export default async function EditQuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: q }, { data: topics }] = await Promise.all([
    supabase.from('questions').select('*, topic:topics(*)').eq('id', id).single(),
    supabase.from('topics').select('id, title').order('sort_order'),
  ])

  if (!q) {
    return (
      <div className="text-center py-20">
        <p className="text-stone-500">Question not found.</p>
        <Link href="/admin/questions" className="mt-4 inline-block text-pink-600 hover:underline">← Back</Link>
      </div>
    )
  }

  const question = q as Question & { topic?: Topic }
  const choices = Array.isArray(question.choices) ? (question.choices as string[]).join('\n') : ''

  return (
    <div className="max-w-2xl">
      <PageHeader title="Edit Question" subtitle={`Week ${question.week_number}`}>
        <Link href="/admin/questions">
          <Button variant="ghost">Cancel</Button>
        </Link>
      </PageHeader>

      <form action={updateQuestion} className="space-y-5 bg-white border border-stone-100 rounded-2xl p-6 shadow-sm mb-6">
        <input type="hidden" name="id" value={question.id} />

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Topic</label>
          <select name="topic_id" defaultValue={question.topic_id ?? ''} className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400">
            <option value="">— Select topic —</option>
            {(topics ?? []).map((t) => (
              <option key={t.id} value={t.id}>{t.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Week Number</label>
          <input type="number" name="week_number" min="1" max="10" defaultValue={question.week_number ?? ''} className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400" />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Question Text *</label>
          <textarea name="question_text" required rows={3} defaultValue={question.question_text} className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Question Type *</label>
            <select name="question_type" required defaultValue={question.question_type} className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400">
              <option value="multiple_choice">Multiple Choice</option>
              <option value="numeric">Numeric</option>
              <option value="text">Text</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Difficulty *</label>
            <select name="difficulty" required defaultValue={question.difficulty} className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400">
              <option value="easy">Easy</option>
              <option value="standard">Standard</option>
              <option value="word_problem">Word Problem</option>
              <option value="challenge">Challenge</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Answer Choices <span className="text-stone-400 font-normal">(one per line)</span>
          </label>
          <textarea name="choices" rows={4} defaultValue={choices} className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 font-mono" />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Correct Answer *</label>
          <input type="text" name="correct_answer" required defaultValue={question.correct_answer} className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400" />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Explanation</label>
          <textarea name="explanation" rows={3} defaultValue={question.explanation ?? ''} className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400" />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="is_challenge" id="is_challenge" defaultChecked={question.is_challenge} className="rounded" />
          <label htmlFor="is_challenge" className="text-sm text-stone-700">Challenge question</label>
        </div>

        <Button type="submit" size="lg" className="w-full">Save Changes</Button>
      </form>

      {/* Delete */}
      <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5">
        <h3 className="font-semibold text-rose-800 mb-1">Delete Question</h3>
        <p className="text-sm text-rose-600 mb-4">This cannot be undone. Any attempts linked to this question will also be removed.</p>
        <form action={deleteQuestion}>
          <input type="hidden" name="id" value={question.id} />
          <Button type="submit" variant="danger" size="sm">Delete Question</Button>
        </form>
      </div>
    </div>
  )
}
