import { createClient } from '@/lib/supabase/server'
import type { Topic, Lesson, Question, Quiz, Attempt, WeeklyProgress } from '@/types'

export async function getTopics(): Promise<Topic[]> {
  const supabase = await createClient()
  const { data } = await supabase.from('topics').select('*').order('sort_order')
  return (data ?? []) as Topic[]
}

export async function getLessons(): Promise<Lesson[]> {
  const supabase = await createClient()
  const { data } = await supabase.from('lessons').select('*, topic:topics(*)').order('week_number')
  return (data ?? []) as Lesson[]
}

export async function getLessonBySlug(slug: string): Promise<Lesson | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('lessons')
    .select('*, topic:topics(*)')
    .eq('slug', slug)
    .single()
  return data as Lesson | null
}

export async function getQuestionsByWeek(weekNumber: number): Promise<Question[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('questions')
    .select('*, topic:topics(*)')
    .eq('week_number', weekNumber)
    .eq('is_active', true)
    .order('difficulty')
  return (data ?? []) as Question[]
}

export async function getQuestionsByTopic(topicSlug: string): Promise<Question[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('questions')
    .select('*, topic:topics(*)')
    .eq('is_active', true)
    .order('difficulty')
  const all = (data ?? []) as Question[]
  return all.filter((q: Question) => (q.topic as Topic | undefined)?.slug === topicSlug)
}

export async function getQuizzes(): Promise<Quiz[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('quizzes')
    .select('*, topic:topics(*)')
    .eq('is_active', true)
    .order('week_number')
  return (data ?? []) as Quiz[]
}

export async function getQuizById(id: string): Promise<Quiz | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('quizzes')
    .select('*, topic:topics(*), questions:quiz_questions(*, question:questions(*, topic:topics(*)))')
    .eq('id', id)
    .single()
  return data as Quiz | null
}

export async function getWeeklyProgress(): Promise<WeeklyProgress[]> {
  const supabase = await createClient()
  const { data } = await supabase.from('weekly_progress').select('*').order('week_number')
  return (data ?? []) as WeeklyProgress[]
}

export async function getWeeklyProgressByWeek(weekNumber: number): Promise<WeeklyProgress | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('weekly_progress')
    .select('*')
    .eq('week_number', weekNumber)
    .single()
  return data as WeeklyProgress | null
}

export async function getAllAttempts(): Promise<Attempt[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('attempts')
    .select('*, question:questions(*, topic:topics(*))')
    .order('created_at', { ascending: false })
  return (data ?? []) as Attempt[]
}

export async function getIncorrectAttempts(): Promise<Attempt[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('attempts')
    .select('*, question:questions(*, topic:topics(*))')
    .eq('is_correct', false)
    .order('created_at', { ascending: false })
  return (data ?? []) as Attempt[]
}

export async function getRecentAttempts(limit = 20): Promise<Attempt[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('attempts')
    .select('*, question:questions(*, topic:topics(*))')
    .order('created_at', { ascending: false })
    .limit(limit)
  return (data ?? []) as Attempt[]
}

export async function getAllQuestions(): Promise<Question[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('questions')
    .select('*, topic:topics(*)')
    .order('week_number')
  return (data ?? []) as Question[]
}

export async function getTodayTimeSpentSeconds(): Promise<number> {
  const supabase = await createClient()
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  const { data } = await supabase
    .from('attempts')
    .select('time_spent_seconds')
    .gte('created_at', todayStart.toISOString())
  return (data ?? []).reduce((sum, a) => sum + (a.time_spent_seconds ?? 0), 0)
}
