'use client'

import { useState } from 'react'
import { saveAttempt, markPracticeCompleted } from '@/app/actions'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ProgressBar } from '@/components/ui/progress-bar'
import { getDifficultyLabel, getDifficultyColor } from '@/lib/scoring'
import { cn } from '@/lib/utils'
import { CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import type { Question } from '@/types'

const CORRECT_MESSAGES = [
  'Great job! ✨',
  'Correct! Keep it up! 🎉',
  'You got it! 🌟',
  'Excellent work! 💪',
  'Perfect! ✅',
]

const WRONG_MESSAGES = [
  'Not quite — check the explanation below.',
  'Almost there — review the hint and try again next time.',
  "That's tricky! Read the explanation carefully.",
  "Good try! The explanation will help you remember.",
]

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.abs(Math.sin(Date.now())) * arr.length)]
}

interface Props {
  questions: Question[]
  weekNumber: number
}

export function PracticeSession({ questions, weekNumber }: Props) {
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [results, setResults] = useState<{ correct: boolean }[]>([])
  const [done, setDone] = useState(false)
  const [saving, setSaving] = useState(false)

  const question = questions[index]
  const choices: string[] = Array.isArray(question?.choices) ? question.choices as string[] : []

  async function handleSubmit() {
    if (!answer.trim() || saving) return
    setSaving(true)

    const correct = answer.trim().toLowerCase() === question.correct_answer.trim().toLowerCase()
    setIsCorrect(correct)
    setSubmitted(true)

    await saveAttempt(question.id, null, answer, correct, 'practice')
    setResults((prev) => [...prev, { correct }])
    setSaving(false)
  }

  function handleNext() {
    if (index + 1 >= questions.length) {
      markPracticeCompleted(weekNumber)
      setDone(true)
    } else {
      setIndex((i) => i + 1)
      setAnswer('')
      setSubmitted(false)
    }
  }

  function handleRestart() {
    setIndex(0)
    setAnswer('')
    setSubmitted(false)
    setIsCorrect(false)
    setResults([])
    setDone(false)
  }

  if (done) {
    const correct = results.filter((r) => r.correct).length
    const accuracy = Math.round((correct / results.length) * 100)
    return (
      <Card className="max-w-xl mx-auto text-center py-10 px-8">
        <div className="text-5xl mb-4">{accuracy >= 80 ? '🎉' : accuracy >= 60 ? '👍' : '📚'}</div>
        <h2 className="text-2xl font-bold text-stone-900 mb-2">Session Complete!</h2>
        <p className="text-stone-500 mb-6">You answered {questions.length} questions</p>
        <div className="flex justify-center gap-8 mb-6">
          <div>
            <p className="text-3xl font-bold text-emerald-600">{correct}</p>
            <p className="text-sm text-stone-400">Correct</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-stone-800">{accuracy}%</p>
            <p className="text-sm text-stone-400">Accuracy</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-rose-500">{results.length - correct}</p>
            <p className="text-sm text-stone-400">To Review</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Link href="/review">
            <Button variant="secondary" className="w-full gap-2">
              <Trophy className="h-4 w-4" /> Review Mistakes
            </Button>
          </Link>
          <Button variant="ghost" onClick={handleRestart} className="w-full gap-2">
            <RotateCcw className="h-4 w-4" /> Try Again
          </Button>
          <Link href="/practice">
            <Button variant="ghost" className="w-full">← Back to Topics</Button>
          </Link>
        </div>
      </Card>
    )
  }

  const progressPct = Math.round((index / questions.length) * 100)

  return (
    <div className="max-w-xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-stone-500 mb-2">
          <span>Question {index + 1} of {questions.length}</span>
          <span>{results.filter((r) => r.correct).length} correct</span>
        </div>
        <ProgressBar value={progressPct} />
      </div>

      <Card>
        {/* Badges */}
        <div className="flex items-center gap-2 mb-4">
          <span className={cn('text-xs font-medium px-2.5 py-1 rounded-full', getDifficultyColor(question.difficulty))}>
            {getDifficultyLabel(question.difficulty)}
          </span>
          {question.is_challenge && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-700">
              ⭐ Challenge
            </span>
          )}
        </div>

        {/* Question */}
        <p className="text-lg font-semibold text-stone-900 mb-6 leading-relaxed">{question.question_text}</p>

        {/* Answer input */}
        {!submitted && (
          <>
            {question.question_type === 'multiple_choice' && choices.length > 0 ? (
              <div className="space-y-2 mb-6">
                {choices.map((choice) => (
                  <button
                    key={choice}
                    onClick={() => setAnswer(choice)}
                    className={cn(
                      'w-full text-left rounded-xl border px-4 py-3 text-sm font-medium transition-all',
                      answer === choice
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
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !submitted && handleSubmit()}
                placeholder="Type your answer..."
                className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              />
            )}

            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={!answer.trim() || saving}
            >
              {saving ? 'Checking...' : 'Submit Answer'}
            </Button>
          </>
        )}

        {/* Feedback */}
        {submitted && (
          <div className="mt-2">
            <div className={cn(
              'rounded-xl p-4 mb-4 flex items-start gap-3',
              isCorrect ? 'bg-emerald-50 border border-emerald-200' : 'bg-rose-50 border border-rose-200'
            )}>
              {isCorrect
                ? <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                : <XCircle className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
              }
              <div>
                <p className={cn('font-semibold', isCorrect ? 'text-emerald-800' : 'text-rose-800')}>
                  {isCorrect ? getRandom(CORRECT_MESSAGES) : getRandom(WRONG_MESSAGES)}
                </p>
                {!isCorrect && (
                  <p className="text-sm text-rose-700 mt-1">
                    Correct answer: <strong>{question.correct_answer}</strong>
                  </p>
                )}
              </div>
            </div>

            {question.explanation && (
              <div className="bg-stone-50 rounded-xl p-4 mb-4 text-sm text-stone-600 border border-stone-100">
                <p className="font-medium text-stone-700 mb-1">💡 Explanation</p>
                {question.explanation}
              </div>
            )}

            <Button className="w-full" onClick={handleNext}>
              {index + 1 >= questions.length ? 'Finish Session →' : 'Next Question →'}
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
