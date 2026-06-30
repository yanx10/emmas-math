export interface Topic {
  id: string
  slug: string
  title: string
  description: string | null
  grade_level: string | null
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Lesson {
  id: string
  slug: string
  title: string
  summary: string | null
  content: string | null
  examples: Example[]
  common_mistakes: string[]
  topic_id: string | null
  week_number: number | null
  sort_order: number
  status: string
  created_at: string
  updated_at: string
  topic?: Topic
}

export interface Example {
  problem: string
  solution: string
  explanation?: string
}

export interface Question {
  id: string
  topic_id: string | null
  lesson_id: string | null
  week_number: number | null
  question_text: string
  question_type: 'multiple_choice' | 'numeric' | 'text'
  difficulty: 'easy' | 'standard' | 'word_problem' | 'challenge'
  choices: string[]
  correct_answer: string
  explanation: string | null
  is_challenge: boolean
  is_active: boolean
  created_at: string
  updated_at: string
  topic?: Topic
}

export interface Quiz {
  id: string
  title: string
  description: string | null
  week_number: number | null
  topic_id: string | null
  is_active: boolean
  created_at: string
  updated_at: string
  topic?: Topic
  questions?: QuizQuestion[]
}

export interface QuizQuestion {
  id: string
  quiz_id: string
  question_id: string
  sort_order: number
  created_at: string
  question?: Question
}

export interface Attempt {
  id: string
  question_id: string | null
  quiz_id: string | null
  user_answer: string | null
  is_correct: boolean | null
  attempt_type: 'practice' | 'quiz' | 'review'
  time_spent_seconds: number | null
  created_at: string
  question?: Question
}

export interface WeeklyProgress {
  id: string
  week_number: number
  status: 'not_started' | 'in_progress' | 'completed' | 'needs_review'
  completion_percentage: number
  lesson_completed: boolean
  practice_completed: boolean
  quiz_completed: boolean
  quiz_score: number | null
  created_at: string
  updated_at: string
}

export type TopicMastery = 'mastered' | 'practicing' | 'needs_review'

export interface TopicStats {
  topic_id: string
  topic_title: string
  topic_slug: string
  total_attempts: number
  correct_attempts: number
  accuracy: number
  mastery: TopicMastery
}

export interface DashboardStats {
  current_week: number
  current_topic: string
  streak: number
  questions_completed: number
  average_accuracy: number
  topics_mastered: number
  recent_quiz_score: number | null
  weekly_progress: WeeklyProgress[]
  topic_stats: TopicStats[]
}
