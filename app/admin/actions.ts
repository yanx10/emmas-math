'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function addQuestion(formData: FormData) {
  const supabase = await createClient()

  const choicesRaw = formData.get('choices') as string
  const choices = choicesRaw
    ? choicesRaw.split('\n').map((c) => c.trim()).filter(Boolean)
    : []

  const { error } = await supabase.from('questions').insert({
    topic_id: formData.get('topic_id') as string || null,
    week_number: parseInt(formData.get('week_number') as string) || null,
    question_text: formData.get('question_text') as string,
    question_type: formData.get('question_type') as string,
    difficulty: formData.get('difficulty') as string,
    choices,
    correct_answer: formData.get('correct_answer') as string,
    explanation: formData.get('explanation') as string || null,
    is_challenge: formData.get('is_challenge') === 'on',
    is_active: true,
  })

  if (error) throw error
  revalidatePath('/admin/questions')
  redirect('/admin/questions')
}
