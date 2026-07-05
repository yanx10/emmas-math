import Link from 'next/link'
import { getLessonBySlug } from '@/lib/data'
import { PageHeader } from '@/components/layout/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, PenLine, Trophy } from 'lucide-react'
import { MarkLessonComplete } from './mark-complete'
import type { Example } from '@/types'

function renderContent(text: string): string {
  const lines = text.split('\n')
  let html = ''
  for (const line of lines) {
    if (line.startsWith('## ')) {
      html += `<h2>${line.slice(3)}</h2>`
    } else if (line.startsWith('```')) {
      // skip fences, handled inline
    } else {
      let processed = line
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      html += processed ? `<p>${processed}</p>` : '<br>'
    }
  }
  return html
}

export default async function LessonPage({ params }: { params: Promise<{ lessonSlug: string }> }) {
  const { lessonSlug } = await params
  const lesson = await getLessonBySlug(lessonSlug)

  if (!lesson) {
    return (
      <div className="text-center py-20">
        <p className="text-stone-500 text-lg">Lesson not found.</p>
        <Link href="/course" className="mt-4 inline-block text-pink-600 hover:underline">Back to Course</Link>
      </div>
    )
  }

  const topicSlug = (lesson.topic as { slug?: string } | undefined)?.slug ?? ''
  const weekNumber = lesson.week_number ?? 1

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title={lesson.title}
        subtitle={`Week ${weekNumber} · ${(lesson.topic as { title?: string } | undefined)?.title ?? ''}`}
      >
        <MarkLessonComplete weekNumber={weekNumber} />
      </PageHeader>

      {/* Summary card */}
      {lesson.summary && (
        <Card className="mb-6 bg-pink-50 border-pink-100">
          <p className="text-pink-900 font-medium">{lesson.summary}</p>
        </Card>
      )}

      {/* Lesson content */}
      {lesson.content && (
        <div
          className="lesson-content mb-8"
          dangerouslySetInnerHTML={{ __html: renderContent(lesson.content) }}
        />
      )}

      {/* Examples */}
      {lesson.examples && lesson.examples.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-stone-800 mb-4">Worked Examples</h2>
          <div className="space-y-4">
            {(lesson.examples as Example[]).map((ex, i) => (
              <Card key={i} className="border-l-4 border-pink-400">
                <p className="text-xs font-semibold text-pink-500 uppercase tracking-wide mb-2">Example {i + 1}</p>
                <p className="font-medium text-stone-900 mb-2">📝 {ex.problem}</p>
                <p className="text-emerald-700 font-semibold mb-1">✓ Answer: {ex.solution}</p>
                {ex.explanation && (
                  <p className="text-stone-500 text-sm mt-1">{ex.explanation}</p>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Common mistakes */}
      {lesson.common_mistakes && lesson.common_mistakes.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Common Mistakes to Avoid
          </h2>
          <Card className="bg-amber-50 border-amber-100">
            <ul className="space-y-2">
              {(lesson.common_mistakes as string[]).map((mistake, i) => (
                <li key={i} className="flex items-start gap-2 text-amber-800 text-sm">
                  <span className="flex-shrink-0 mt-0.5">⚠️</span>
                  {mistake}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3 pb-8">
        <Link href={`/practice/${topicSlug}`}>
          <Button size="lg">
            <PenLine className="h-5 w-5" />
            Start Practice
          </Button>
        </Link>
        <Link href="/quiz">
          <Button variant="secondary" size="lg">
            <Trophy className="h-5 w-5" />
            Take a Quiz
          </Button>
        </Link>
        <Link href="/course">
          <Button variant="ghost" size="lg">← Back to Course</Button>
        </Link>
      </div>
    </div>
  )
}
