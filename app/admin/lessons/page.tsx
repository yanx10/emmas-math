import { getLessons } from '@/lib/data'
import { PageHeader } from '@/components/layout/page-header'
import Link from 'next/link'
import type { Lesson, Topic } from '@/types'

export default async function AdminLessonsPage() {
  const lessons = await getLessons()

  return (
    <div>
      <PageHeader title="Lesson Manager" subtitle={`${lessons.length} lessons`} />

      <div className="overflow-x-auto rounded-2xl border border-stone-100 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100 text-xs text-stone-400 uppercase tracking-wide">
              <th className="text-left px-4 py-3">Week</th>
              <th className="text-left px-4 py-3">Title</th>
              <th className="text-left px-4 py-3">Topic</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {(lessons as Lesson[]).map((lesson) => {
              const topic = lesson.topic as Topic | undefined
              return (
                <tr key={lesson.id} className="hover:bg-stone-50">
                  <td className="px-4 py-3 text-stone-500">Week {lesson.week_number}</td>
                  <td className="px-4 py-3 font-medium text-stone-900">{lesson.title}</td>
                  <td className="px-4 py-3 text-stone-500">{topic?.title ?? '—'}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                      {lesson.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/lesson/${lesson.slug}`} className="text-violet-600 hover:underline text-xs">
                      View →
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
