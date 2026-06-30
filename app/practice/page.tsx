import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import { ProgressBar } from '@/components/ui/progress-bar'
import { PenLine } from 'lucide-react'
import { buildTopicStats } from '@/lib/scoring'
import type { Attempt, Topic } from '@/types'

export default async function PracticePage() {
  const supabase = await createClient()

  const [{ data: topicsRaw }, { data: questionsRaw }, { data: attemptsRaw }] = await Promise.all([
    supabase.from('topics').select('*').order('sort_order'),
    supabase.from('questions').select('id, topic_id').eq('is_active', true),
    supabase.from('attempts').select('*, question:questions(*, topic:topics(*))'),
  ])

  const topics = (topicsRaw ?? []) as Topic[]
  const questions = questionsRaw ?? []
  const attempts = (attemptsRaw ?? []) as Attempt[]

  const topicStats = buildTopicStats(attempts as Parameters<typeof buildTopicStats>[0])

  const topicData = topics.map((topic) => {
    const qCount = questions.filter((q) => q.topic_id === topic.id).length
    const stats = topicStats.find((s) => s.topic_id === topic.id)
    return { topic, qCount, stats }
  })

  return (
    <div>
      <PageHeader title="Practice" subtitle="Choose a topic and start practicing" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topicData.map(({ topic, qCount, stats }) => (
          <Card key={topic.id}>
            <h3 className="font-semibold text-stone-900 text-lg mb-1">{topic.title}</h3>
            <p className="text-stone-500 text-sm mb-3">{topic.description}</p>
            <p className="text-xs text-stone-400 mb-3">{qCount} questions available</p>

            {stats ? (
              <div className="mb-4">
                <div className="flex justify-between text-xs text-stone-500 mb-1">
                  <span>Accuracy</span>
                  <span>{stats.accuracy}%</span>
                </div>
                <ProgressBar
                  value={stats.accuracy}
                  barClassName={
                    stats.mastery === 'mastered'
                      ? 'bg-emerald-500'
                      : stats.mastery === 'practicing'
                      ? 'bg-amber-500'
                      : 'bg-rose-400'
                  }
                />
                <p className="text-xs text-stone-400 mt-1">{stats.total_attempts} attempts</p>
              </div>
            ) : (
              <div className="mb-4 h-8" />
            )}

            <Link href={`/practice/${topic.slug}`}>
              <Button className="w-full">
                <PenLine className="h-4 w-4" />
                {stats ? 'Continue Practice' : 'Start Practice'}
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
