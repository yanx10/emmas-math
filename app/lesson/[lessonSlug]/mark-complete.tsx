'use client'

import { useState } from 'react'
import { markLessonCompleted } from '@/app/actions'
import { CheckCircle } from 'lucide-react'

export function MarkLessonComplete({ weekNumber }: { weekNumber: number }) {
  const [done, setDone] = useState(false)

  async function handleClick() {
    await markLessonCompleted(weekNumber)
    setDone(true)
  }

  if (done) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 border border-emerald-200">
        <CheckCircle className="h-4 w-4" /> Lesson Complete
      </span>
    )
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 rounded-xl bg-stone-100 px-3 py-2 text-sm font-semibold text-stone-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
    >
      <CheckCircle className="h-4 w-4" /> Mark Complete
    </button>
  )
}
