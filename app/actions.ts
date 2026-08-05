'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveAttempt(
  questionId: string,
  quizId: string | null,
  userAnswer: string,
  isCorrect: boolean,
  attemptType: 'practice' | 'quiz' | 'review',
  timeSpentSeconds?: number
) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('attempts')
    .insert({
      question_id: questionId,
      quiz_id: quizId,
      user_answer: userAnswer,
      is_correct: isCorrect,
      attempt_type: attemptType,
      time_spent_seconds: timeSpentSeconds ?? null,
    })
    .select()
    .single()
  if (error) throw error
  revalidatePath('/')
  revalidatePath('/progress')
  revalidatePath('/review')
  return data
}

export async function markLessonCompleted(weekNumber: number) {
  const supabase = await createClient()
  const { data: existing } = await supabase
    .from('weekly_progress')
    .select('*')
    .eq('week_number', weekNumber)
    .single()

  const practice_completed = existing?.practice_completed ?? false
  const quiz_completed = existing?.quiz_completed ?? false
  const lesson_completed = true

  const completion_percentage =
    (lesson_completed ? 33 : 0) + (practice_completed ? 34 : 0) + (quiz_completed ? 33 : 0)
  const status =
    lesson_completed && practice_completed && quiz_completed
      ? 'completed'
      : 'in_progress'

  await supabase
    .from('weekly_progress')
    .upsert({ week_number: weekNumber, lesson_completed, practice_completed, quiz_completed, completion_percentage, status, updated_at: new Date().toISOString() }, { onConflict: 'week_number' })

  revalidatePath('/')
  revalidatePath('/course')
}

export async function markPracticeCompleted(weekNumber: number) {
  const supabase = await createClient()
  const { data: existing } = await supabase
    .from('weekly_progress')
    .select('*')
    .eq('week_number', weekNumber)
    .single()

  const lesson_completed = existing?.lesson_completed ?? false
  const quiz_completed = existing?.quiz_completed ?? false
  const practice_completed = true

  const completion_percentage =
    (lesson_completed ? 33 : 0) + (practice_completed ? 34 : 0) + (quiz_completed ? 33 : 0)
  const status =
    lesson_completed && practice_completed && quiz_completed
      ? 'completed'
      : 'in_progress'

  await supabase
    .from('weekly_progress')
    .upsert({ week_number: weekNumber, lesson_completed, practice_completed, quiz_completed, completion_percentage, status, updated_at: new Date().toISOString() }, { onConflict: 'week_number' })

  revalidatePath('/')
  revalidatePath('/course')
}

export async function saveQuizResult(
  quizId: string,
  weekNumber: number,
  score: number,
  attempts: Array<{ questionId: string; userAnswer: string; isCorrect: boolean }>
) {
  const supabase = await createClient()

  await supabase.from('attempts').insert(
    attempts.map((a) => ({
      question_id: a.questionId,
      quiz_id: quizId,
      user_answer: a.userAnswer,
      is_correct: a.isCorrect,
      attempt_type: 'quiz' as const,
    }))
  )

  if (weekNumber > 0) {
    const { data: existing } = await supabase
      .from('weekly_progress')
      .select('*')
      .eq('week_number', weekNumber)
      .single()

    const lesson_completed = existing?.lesson_completed ?? false
    const practice_completed = existing?.practice_completed ?? false
    const quiz_completed = true

    const completion_percentage =
      (lesson_completed ? 33 : 0) + (practice_completed ? 34 : 0) + (quiz_completed ? 33 : 0)
    const status =
      lesson_completed && practice_completed && quiz_completed ? 'completed' : 'in_progress'

    await supabase
      .from('weekly_progress')
      .upsert(
        {
          week_number: weekNumber,
          lesson_completed,
          practice_completed,
          quiz_completed,
          quiz_score: score,
          completion_percentage,
          status,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'week_number' }
      )
  }

  revalidatePath('/')
  revalidatePath('/course')
  revalidatePath('/progress')
  revalidatePath('/review')
}
