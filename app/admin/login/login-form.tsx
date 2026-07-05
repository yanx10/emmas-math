'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function AdminLoginForm() {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)

    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin }),
    })

    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      setError(true)
      setPin('')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="password"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        placeholder="Enter PIN"
        className="w-full rounded-xl border border-stone-200 px-4 py-3 text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-violet-400"
        autoFocus
        maxLength={8}
      />
      {error && (
        <p className="text-center text-sm text-rose-600">Incorrect PIN. Try again.</p>
      )}
      <Button type="submit" className="w-full" disabled={!pin || loading}>
        {loading ? 'Checking...' : 'Enter'}
      </Button>
    </form>
  )
}
