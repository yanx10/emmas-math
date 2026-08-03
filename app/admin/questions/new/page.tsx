import { createClient } from '@/lib/supabase/server'
import { addQuestion } from '@/app/admin/actions'
import { PageHeader } from '@/components/layout/page-header'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function NewQuestionPage() {
  const supabase = await createClient()
  const { data: topics } = await supabase.from('topics').select('id, title').order('sort_order')

  return (
    <div className="max-w-2xl">
      <PageHeader title="Add Question" subtitle="Create a new practice question">
        <Link href="/admin/questions">
          <Button variant="ghost">Cancel</Button>
        </Link>
      </PageHeader>

      <form action={addQuestion} className="space-y-5 bg-white border border-stone-100 rounded-2xl p-6 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Topic</label>
          <select name="topic_id" className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400">
            <option value="">— Select topic —</option>
            {(topics ?? []).map((t) => (
              <option key={t.id} value={t.id}>{t.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Week Number</label>
          <input type="number" name="week_number" min="1" max="10" className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400" />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Question Text *</label>
          <textarea name="question_text" required rows={3} className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Question Type *</label>
            <select name="question_type" required className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400">
              <option value="multiple_choice">Multiple Choice</option>
              <option value="numeric">Numeric</option>
              <option value="text">Text</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Difficulty *</label>
            <select name="difficulty" required className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400">
              <option value="easy">Easy</option>
              <option value="standard">Standard</option>
              <option value="word_problem">Word Problem</option>
              <option value="challenge">Challenge</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Answer Choices <span className="text-stone-400 font-normal">(one per line, for multiple choice)</span>
          </label>
          <textarea name="choices" rows={4} placeholder="Option A&#10;Option B&#10;Option C&#10;Option D" className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 font-mono" />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Correct Answer *</label>
          <input type="text" name="correct_answer" required className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400" />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Explanation</label>
          <textarea name="explanation" rows={3} className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400" />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="is_challenge" id="is_challenge" className="rounded" />
          <label htmlFor="is_challenge" className="text-sm text-stone-700">Challenge question</label>
        </div>

        <div className="pt-2">
          <Button type="submit" size="lg" className="w-full">Save Question</Button>
        </div>
      </form>
    </div>
  )
}
