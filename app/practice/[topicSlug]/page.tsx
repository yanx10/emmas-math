import { getQuestionsByTopic, getTodayTimeSpentSeconds } from '@/lib/data'
import { createClient } from '@/lib/supabase/server'
import { PracticeSession } from './practice-session'
import { PageHeader } from '@/components/layout/page-header'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const ALL_TOPICS = [
  { slug: 'decimal-place-value', title: 'Decimal Place Value', emoji: '🌸' },
  { slug: 'decimal-operations', title: 'Decimal Operations', emoji: '🌺' },
  { slug: 'fractions-review', title: 'Fractions Review', emoji: '🌷' },
]

export default async function PracticeTopicPage({ params }: { params: Promise<{ topicSlug: string }> }) {
  const { topicSlug } = await params

  const supabase = await createClient()
  const [{ data: topic }, questions, todaySeconds] = await Promise.all([
    supabase.from('topics').select('*').eq('slug', topicSlug).single(),
    getQuestionsByTopic(topicSlug),
    getTodayTimeSpentSeconds(),
  ])

  const otherTopics = ALL_TOPICS.filter((t) => t.slug !== topicSlug)

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
      <PracticeSession
        questions={questions}
        weekNumber={topic?.sort_order ?? 1}
        todaySecondsStart={todaySeconds}
        otherTopics={otherTopics}
      />
    </div>
  )
}
