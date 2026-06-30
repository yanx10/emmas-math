import type { TopicMastery, TopicStats } from '@/types'

export function getTopicMastery(accuracy: number): TopicMastery {
  if (accuracy >= 85) return 'mastered'
  if (accuracy >= 60) return 'practicing'
  return 'needs_review'
}

export function getMasteryLabel(mastery: TopicMastery): string {
  return { mastered: 'Mastered', practicing: 'Practicing', needs_review: 'Needs Review' }[mastery]
}

export function getMasteryColor(mastery: TopicMastery): string {
  return {
    mastered: 'text-emerald-600 bg-emerald-50',
    practicing: 'text-amber-600 bg-amber-50',
    needs_review: 'text-rose-600 bg-rose-50',
  }[mastery]
}

export function getDifficultyLabel(difficulty: string): string {
  return {
    easy: 'Easy',
    standard: 'Standard',
    word_problem: 'Word Problem',
    challenge: 'Challenge',
  }[difficulty] ?? difficulty
}

export function getDifficultyColor(difficulty: string): string {
  return {
    easy: 'text-emerald-600 bg-emerald-50',
    standard: 'text-sky-600 bg-sky-50',
    word_problem: 'text-violet-600 bg-violet-50',
    challenge: 'text-rose-600 bg-rose-50',
  }[difficulty] ?? 'text-gray-600 bg-gray-50'
}

export function buildTopicStats(
  attempts: { question_id: string; is_correct: boolean; question?: { topic_id?: string; topic?: { id: string; title: string; slug: string } } }[]
): TopicStats[] {
  const map = new Map<string, { title: string; slug: string; total: number; correct: number }>()

  for (const a of attempts) {
    const topic = a.question?.topic
    if (!topic) continue
    const existing = map.get(topic.id) ?? { title: topic.title, slug: topic.slug, total: 0, correct: 0 }
    existing.total++
    if (a.is_correct) existing.correct++
    map.set(topic.id, existing)
  }

  return Array.from(map.entries()).map(([id, s]) => {
    const accuracy = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0
    return {
      topic_id: id,
      topic_title: s.title,
      topic_slug: s.slug,
      total_attempts: s.total,
      correct_attempts: s.correct,
      accuracy,
      mastery: getTopicMastery(accuracy),
    }
  })
}
