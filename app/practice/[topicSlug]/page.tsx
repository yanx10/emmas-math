import { getQuestionsByTopic } from '@/lib/data'
import { createClient } from '@/lib/supabase/server'
import { PracticeSession } from './practice-session'
import { PageHeader } from '@/components/layout/page-header'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function PracticeTopicPage({ params }: { params: Promise<{ topicSlug: string }> }) {
  const { topicSlug } = await params

  const supabase = await createClient()
  const { data: topic } = await supabase.from('topics').select('*').eq('slug', topicSlug).single()

  const questions = await getQuestionsByTopic(topicSlug)

  if (!questions.length) {
    return (
      <div className="text-center py-20">
        <p className="text-stone-500 text-lg">No questions found for this topic.</p>
        <Link href="/practice" className="mt-4 inline-block">
          <Button variant="secondary">← Back to Practice</Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title={topic?.title ?? topicSlug}
        subtitle={`${questions.length} questions · Practice session`}
      />
      <PracticeSession questions={questions} weekNumber={topic?.sort_order ?? 1} />
    </div>
  )
}
