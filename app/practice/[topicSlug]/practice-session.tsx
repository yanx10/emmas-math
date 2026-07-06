'use client'

import { useState, useRef } from 'react'
import { saveAttempt, markPracticeCompleted } from '@/app/actions'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ProgressBar } from '@/components/ui/progress-bar'
import { Confetti } from '@/components/ui/confetti'
import { getDifficultyLabel, getDifficultyColor } from '@/lib/scoring'
import { cn } from '@/lib/utils'
import { CheckCircle, XCircle, RotateCcw, Clock } from 'lucide-react'
import Link from 'next/link'
import type { Question } from '@/types'

const GOAL_SECONDS = 45 * 60

const CORRECT_MESSAGES = [
  { emoji: '🍓', text: "BOOM! That's correct!" },
  { emoji: '✨', text: 'Amazing work, Emma!' },
  { emoji: '🌸', text: "You're crushing it!" },
  { emoji: '🎀', text: 'Nailed it! So proud of you!' },
  { emoji: '🌺', text: 'Brilliant! Keep going!' },
  { emoji: '🌷', text: 'You got it! Superstar!' },
  { emoji: '✨', text: 'Perfect! You rock, Emma!' },
]

const WRONG_MESSAGES = [
  { emoji: '🌸', text: "Almost! Check the hint below." },
  { emoji: '🍓', text: "Not quite — but you're learning!" },
  { emoji: '🌷', text: "Good try! Read the explanation." },
  { emoji: '🎀', text: "That's tricky! You'll get it next time." },
]

interface OtherTopic {
  slug: string
  title: string
  emoji: string
}

interface Props {
  questions: Question[]
  weekNumber: number
  todaySecondsStart: number
  otherTopics: OtherTopic[]
}

export function PracticeSession({ questions, weekNumber, todaySecondsStart, otherTopics }: Props) {
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [results, setResults] = useState<{ correct: boolean }[]>([])
  const [done, setDone] = useState(false)
  const [saving, setSaving] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [feedbackMsg, setFeedbackMsg] = useState(CORRECT_MESSAGES[0])
  const [sessionSeconds, setSessionSeconds] = useState(0)
  const questionStartRef = useRef<number>(Date.now())

  const question = questions[index]
  const choices: string[] = Array.isArray(question?.choices) ? question.choices as string[] : []

  async function handleSubmit() {
    if (!answer.trim() || saving) return
    setSaving(true)

    const elapsed = Math.round((Date.now() - questionStartRef.current) / 1000)
    setSessionSeconds((s) => s + elapsed)

    const correct = answer.trim().toLowerCase() === question.correct_answer.trim().toLowerCase()
    setIsCorrect(correct)
    setSubmitted(true)

    const msgList = correct ? CORRECT_MESSAGES : WRONG_MESSAGES
    setFeedbackMsg(msgList[Math.floor(Math.random() * msgList.length)])

    if (correct) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }

    await saveAttempt(question.id, null, answer, correct, 'practice', elapsed)
    setResults((prev) => [...prev, { correct }])
    setSaving(false)
  }

  function handleNext() {
    questionStartRef.current = Date.now()
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
    setSessionSeconds(0)
    questionStartRef.current = Date.now()
  }

  if (done) {
    const correct = results.filter((r) => r.correct).length
    const accuracy = Math.round((correct / results.length) * 100)
    const totalTodaySeconds = todaySecondsStart + sessionSeconds
    const goalMet = totalTodaySeconds >= GOAL_SECONDS
    const todayMinutes = Math.floor(totalTodaySeconds / 60)
    const remainingMinutes = Math.max(0, Math.ceil((GOAL_SECONDS - totalTodaySeconds) / 60))
    const goalPct = Math.min(100, Math.round((totalTodaySeconds / GOAL_SECONDS) * 100))

    return (
      <>
        <Confetti active={accuracy >= 80} />
        <div className="max-w-xl mx-auto space-y-4">
          <Card className="text-center py-10 px-8 bg-gradient-to-br from-pink-50 to-purple-50 border-pink-100">
            <div className="text-6xl mb-4">{accuracy >= 80 ? '🎀' : accuracy >= 60 ? '🌸' : '🌷'}</div>
            <h2 className="text-3xl font-black text-stone-900 mb-1">
              {accuracy >= 80 ? 'Mission Complete!' : accuracy >= 60 ? 'Great effort!' : 'Keep practicing!'}
            </h2>
            <p className="text-stone-500 mb-6">You answered {questions.length} questions</p>
            <div className="flex justify-center gap-8 mb-6">
              <div className="bg-white rounded-2xl px-5 py-3 shadow-sm">
                <p className="text-3xl font-black text-emerald-500">{correct}</p>
                <p className="text-sm text-stone-400">Correct ✓</p>
              </div>
              <div className="bg-white rounded-2xl px-5 py-3 shadow-sm">
                <p className="text-3xl font-black text-pink-500">{accuracy}%</p>
                <p className="text-sm text-stone-400">Score</p>
              </div>
              <div className="bg-white rounded-2xl px-5 py-3 shadow-sm">
                <p className="text-3xl font-black text-rose-400">{results.length - correct}</p>
                <p className="text-sm text-stone-400">To review</p>
              </div>
            </div>
          </Card>

          {/* Daily goal tracker */}
          <Card className="border-pink-100">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-pink-500" />
              <h3 className="font-black text-stone-800">Today&apos;s Goal</h3>
              <span className={cn('ml-auto text-sm font-bold', goalMet ? 'text-emerald-600' : 'text-amber-600')}>
                {todayMinutes} / 45 min
              </span>
            </div>
            <ProgressBar
              value={goalPct}
              barClassName={goalMet ? 'bg-emerald-400' : 'bg-gradient-to-r from-pink-400 to-purple-400'}
              className="mb-3"
            />
            {goalMet ? (
              <p className="text-sm font-bold text-emerald-700 text-center">🎉 You hit your 45-minute goal today! Amazing work, Emma!</p>
            ) : (
              <p className="text-sm text-stone-500 text-center">
                Just <strong className="text-pink-600">{remainingMinutes} more minutes</strong> to hit your goal — keep going! 🍓
              </p>
            )}
          </Card>

          {/* Suggest more practice if goal not met */}
          {!goalMet && otherTopics.length > 0 && (
            <Card className="border-amber-100 bg-amber-50/50">
              <p className="text-sm font-bold text-amber-800 mb-3">
                {accuracy < 60
                  ? '💪 Practice makes perfect — try this topic again or explore another!'
                  : '🚀 You\'re on a roll! Keep the momentum going:'}
              </p>
              <div className="flex flex-col gap-2">
                {accuracy < 70 && (
                  <Button variant="secondary" onClick={handleRestart} className="gap-2 justify-start">
                    <RotateCcw className="h-4 w-4" /> Practice this topic again
                  </Button>
                )}
                {otherTopics.map((t) => (
                  <Link key={t.slug} href={`/practice/${t.slug}`}>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <span>{t.emoji}</span> Practice {t.title}
                    </Button>
                  </Link>
                ))}
              </div>
            </Card>
          )}

          <div className="flex flex-col gap-3">
            <Link href="/review">
              <Button variant="secondary" className="w-full">Review Mistakes 📖</Button>
            </Link>
            {accuracy >= 70 && (
              <Button variant="ghost" onClick={handleRestart} className="w-full gap-2">
                <RotateCcw className="h-4 w-4" /> Try Again
              </Button>
            )}
            <Link href="/practice">
              <Button variant="ghost" className="w-full">← Back to Topics</Button>
            </Link>
          </div>
        </div>
      </>
    )
  }

  const progressPct = Math.round((index / questions.length) * 100)

  return (
    <>
      <Confetti active={showConfetti} />
      <div className="max-w-xl mx-auto">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-stone-500 mb-2">
            <span className="font-semibold">Question {index + 1} of {questions.length}</span>
            <span>{results.filter((r) => r.correct).length} 🍓 correct</span>
          </div>
          <ProgressBar value={progressPct} barClassName="bg-gradient-to-r from-pink-400 to-purple-400" />
        </div>

        <Card className="border-pink-100">
          {/* Badges */}
          <div className="flex items-center gap-2 mb-4">
            <span className={cn('text-xs font-bold px-2.5 py-1 rounded-full', getDifficultyColor(question.difficulty))}>
              {getDifficultyLabel(question.difficulty)}
            </span>
            {question.is_challenge && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700">
                ⭐ Challenge
              </span>
            )}
          </div>

          {/* Question */}
          <p className="text-xl font-bold text-stone-900 mb-6 leading-relaxed">{question.question_text}</p>

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
                        'w-full text-left rounded-2xl border-2 px-4 py-3 text-sm font-semibold transition-all',
                        answer === choice
                          ? 'border-pink-400 bg-pink-50 text-pink-800 scale-[1.01]'
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
                  placeholder="Type your answer here..."
                  className="w-full rounded-2xl border-2 border-stone-200 px-4 py-3 text-sm font-semibold mb-6 focus:outline-none focus:ring-0 focus:border-pink-400 transition-colors"
                />
              )}

              <Button
                className="w-full text-base py-3"
                onClick={handleSubmit}
                disabled={!answer.trim() || saving}
              >
                {saving ? 'Checking... ⏳' : 'Submit Answer 🚀'}
              </Button>
            </>
          )}

          {/* Feedback */}
          {submitted && (
            <div className="mt-2">
              <div className={cn(
                'rounded-2xl p-4 mb-4 text-center',
                isCorrect
                  ? 'bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200'
                  : 'bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-200'
              )}>
                <p className="text-3xl mb-1">{feedbackMsg.emoji}</p>
                <p className={cn('font-black text-lg', isCorrect ? 'text-emerald-700' : 'text-rose-700')}>
                  {feedbackMsg.text}
                </p>
                {!isCorrect && (
                  <p className="text-sm text-rose-600 mt-1">
                    Correct answer: <strong>{question.correct_answer}</strong>
                  </p>
                )}
              </div>

              {question.explanation && (
                <div className="bg-amber-50 rounded-2xl p-4 mb-4 border border-amber-100">
                  <p className="font-bold text-amber-800 mb-1">💡 Here&apos;s why:</p>
                  <p className="text-sm text-amber-700">{question.explanation}</p>
                </div>
              )}

              <Button className="w-full text-base" onClick={handleNext}>
                {index + 1 >= questions.length ? 'Finish! 🎊' : 'Next Question →'}
              </Button>
            </div>
          )}
        </Card>

        {/* Dot progress */}
        <div className="mt-4 flex flex-wrap gap-1.5 justify-center">
          {questions.map((q, i) => (
            <div
              key={q.id}
              className={cn(
                'h-2.5 w-2.5 rounded-full transition-all',
                i < results.length
                  ? results[i].correct ? 'bg-emerald-400' : 'bg-rose-300'
                  : i === index ? 'bg-pink-400 scale-125' : 'bg-stone-200'
              )}
            />
          ))}
        </div>
      </div>
    </>
  )
}
