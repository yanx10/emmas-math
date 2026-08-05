import { getQuizById } from '@/lib/data'
import { QuizSession } from './quiz-session'
import { PageHeader } from '@/components/layout/page-header'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function QuizPage({ params }: { params: Promise<{ quizId: string }> }) {
  const { quizId } = await params
  const quiz = await getQuizById(quizId)

  if (!quiz) {
    return (
      <div className="text-center py-20">
        <p className="text-stone-500 text-lg">Quiz not found.</p>
        <Link href="/quiz" className="mt-4 inline-block">
          <Button variant="secondary">← Back to Quizzes</Button>
        </Link>
      </div>
    )
  }

  const topic = quiz.topic as { title?: string } | null

  return (
    <div>
      <PageHeader
        title={quiz.title}
        subtitle={quiz.week_number === 0 ? 'MDTP-style · No calculator needed' : topic?.title ? `Level ${quiz.week_number} · ${topic.title}` : `Level ${quiz.week_number}`}
      />
      <QuizSession quiz={quiz} />
    </div>
  )
}
