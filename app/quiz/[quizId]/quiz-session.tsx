'use client'

import { useState } from 'react'
import { saveQuizResult } from '@/app/actions'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ProgressBar } from '@/components/ui/progress-bar'
import { getDifficultyLabel, getDifficultyColor } from '@/lib/scoring'
import { cn } from '@/lib/utils'
import { CheckCircle, XCircle, Clock, Trophy, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import { Confetti } from '@/components/ui/confetti'
import type { Quiz, Question } from '@/types'

type Phase = 'intro' | 'taking' | 'results'

interface QuizAttempt {
  questionId: string
  question: Question
  userAnswer: string
  isCorrect: boolean
}

function extractQuestions(quiz: Quiz): Question[] {
  if (!quiz.questions) return []
  return quiz.questions
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((qq) => qq.question)
    .filter(Boolean) as Question[]
}

export function QuizSession({ quiz }: { quiz: Quiz }) {
  const questions = extractQuestions(quiz)
  const [phase, setPhase] = useState<Phase>('intro')
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [results, setResults] = useState<QuizAttempt[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const currentQuestion = questions[index]
  const choices: string[] = Array.isArray(currentQuestion?.choices)
    ? (currentQuestion.choices as string[])
    : []
  const currentAnswer = answers[currentQuestion?.id ?? ''] ?? ''

  function handleSelectAnswer(ans: string) {
    if (!currentQuestion) return
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: ans }))
  }

  function handleNext() {
    if (index + 1 < questions.length) {
      setIndex((i) => i + 1)
    }
  }

  async function handleSubmit() {
    setSubmitting(true)
    const quizResults: QuizAttempt[] = questions.map((q) => {
      const userAnswer = answers[q.id] ?? ''
      const isCorrect = userAnswer.trim().toLowerCase() === q.correct_answer.trim().toLowerCase()
      return { questionId: q.id, question: q, userAnswer, isCorrect }
    })

    const correct = quizResults.filter((r) => r.isCorrect).length
    const score = Math.round((correct / questions.length) * 100)

    await saveQuizResult(
      quiz.id,
      quiz.week_number ?? 1,
      score,
      quizResults.map((r) => ({ questionId: r.questionId, userAnswer: r.userAnswer, isCorrect: r.isCorrect }))
    )

    setResults(quizResults)
    setPhase('results')
    setSubmitting(false)
    if (score >= 80) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 4000)
    }
  }

  function handleRetake() {
    setPhase('intro')
    setIndex(0)
    setAnswers({})
    setResults([])
  }

  // Intro
  if (phase === 'intro') {
    return (
      <Card className="max-w-xl mx-auto text-center py-10 px-8">
        <Trophy className="h-12 w-12 text-amber-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-stone-900 mb-2">{quiz.title}</h2>
        {quiz.description && <p className="text-stone-500 mb-6">{quiz.description}</p>}
        <div className="flex justify-center gap-8 mb-8">
          <div>
            <p className="text-2xl font-bold text-stone-800">{questions.length}</p>
            <p className="text-sm text-stone-400">Questions</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-stone-800">~{Math.ceil(questions.length * 1.5)} min</p>
            <p className="text-sm text-stone-400">Estimated</p>
          </div>
        </div>
        <p className="text-sm text-stone-400 mb-6">Answer all questions, then submit at the end to see your score.</p>
        <Button size="lg" className="w-full" onClick={() => setPhase('taking')}>
          Start Quiz
        </Button>
      </Card>
    )
  }

  // Results
  if (phase === 'results') {
    const correct = results.filter((r) => r.isCorrect).length
    const score = Math.round((correct / results.length) * 100)
    const scoreColor = score >= 80 ? 'text-emerald-600' : score >= 60 ? 'text-amber-600' : 'text-rose-600'
    const scoreMsg = score >= 80 ? 'Excellent work! 🎉' : score >= 60 ? 'Nice job! Keep practicing. 👍' : 'Keep going — you\'ll get it! 📚'

    const wrongTopics = Array.from(
      new Set(results.filter((r) => !r.isCorrect).map((r) => (r.question.topic as { title?: string } | null)?.title).filter(Boolean))
    )

    return (
      <>
      <Confetti active={showConfetti} />
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center py-8 bg-gradient-to-br from-pink-50 to-purple-50 border-pink-100">
          <p className="text-5xl mb-2">{score >= 80 ? '🏆' : score >= 60 ? '🌟' : '💪'}</p>
          <p className={cn('text-5xl font-black mb-2', scoreColor)}>{score}%</p>
          <p className="text-stone-500 mb-1">{correct} of {results.length} correct</p>
          <p className="font-black text-stone-800 text-xl mt-3">{scoreMsg}</p>
          {wrongTopics.length > 0 && (
            <p className="text-sm text-stone-500 mt-2">Review: {wrongTopics.join(', ')}</p>
          )}
        </Card>

        {/* Question breakdown */}
        <div className="space-y-3">
          {results.map((r, i) => (
            <Card key={r.questionId} className={cn('border-l-4', r.isCorrect ? 'border-emerald-400' : 'border-rose-400')}>
              <div className="flex items-start gap-3">
                {r.isCorrect
                  ? <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  : <XCircle className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                }
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-stone-400 mb-1">Q{i + 1}</p>
                  <p className="font-medium text-stone-800 text-sm mb-2">{r.question.question_text}</p>
                  {!r.isCorrect && (
                    <div className="text-sm space-y-1">
                      <p className="text-rose-600">Your answer: <span className="font-medium">{r.userAnswer || '(no answer)'}</span></p>
                      <p className="text-emerald-700">Correct: <span className="font-medium">{r.question.correct_answer}</span></p>
                    </div>
                  )}
                  {r.question.explanation && !r.isCorrect && (
                    <p className="text-xs text-stone-500 mt-2 bg-stone-50 rounded-lg p-2">{r.question.explanation}</p>
                  )}
                </div>
                <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0', getDifficultyColor(r.question.difficulty))}>
                  {getDifficultyLabel(r.question.difficulty)}
                </span>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={handleRetake} className="gap-2">
            <RotateCcw className="h-4 w-4" /> Retake Quiz
          </Button>
          <Link href="/review">
            <Button variant="outline" className="gap-2">Review Mistakes 📖</Button>
          </Link>
          <Link href="/quiz">
            <Button variant="ghost">← All Quizzes</Button>
          </Link>
        </div>
      </div>
      </>
    )
  }

  // Taking phase
  const progressPct = Math.round((index / questions.length) * 100)
  const isLast = index === questions.length - 1
  const allAnswered = questions.every((q) => answers[q.id])

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between text-sm text-stone-500 mb-2">
          <span>Question {index + 1} of {questions.length}</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Quiz in progress</span>
        </div>
        <ProgressBar value={progressPct} />
      </div>

      <Card>
        <div className="flex items-center gap-2 mb-4">
          <span className={cn('text-xs font-medium px-2.5 py-1 rounded-full', getDifficultyColor(currentQuestion.difficulty))}>
            {getDifficultyLabel(currentQuestion.difficulty)}
          </span>
        </div>

        <p className="text-lg font-semibold text-stone-900 mb-6 leading-relaxed">{currentQuestion.question_text}</p>

        {currentQuestion.question_type === 'multiple_choice' && choices.length > 0 ? (
          <div className="space-y-2 mb-6">
            {choices.map((choice) => (
              <button
                key={choice}
                onClick={() => handleSelectAnswer(choice)}
                className={cn(
                  'w-full text-left rounded-xl border px-4 py-3 text-sm font-medium transition-all',
                  currentAnswer === choice
                    ? 'border-pink-400 bg-pink-50 text-pink-800'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-pink-200 hover:bg-pink-50/50'
                )}
              >
                {choice}
              </button>
            ))}
          </div>
        ) : (
          <input
            type="text"
            value={currentAnswer}
            onChange={(e) => handleSelectAnswer(e.target.value)}
            placeholder="Type your answer..."
            className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
          />
        )}

        {isLast ? (
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={submitting || !allAnswered}
          >
            {submitting ? 'Submitting...' : 'Submit Quiz →'}
          </Button>
        ) : (
          <Button
            className="w-full"
            onClick={handleNext}
            disabled={!currentAnswer}
          >
            Next Question →
          </Button>
        )}
      </Card>

      {/* Answer tracker dots */}
      <div className="mt-4 flex flex-wrap gap-1.5 justify-center">
        {questions.map((q, i) => (
          <button
            key={q.id}
            onClick={() => setIndex(i)}
            className={cn(
              'h-6 w-6 rounded-full text-xs font-medium transition-all',
              i === index
                ? 'bg-pink-600 text-white'
                : answers[q.id]
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-stone-100 text-stone-400'
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}
