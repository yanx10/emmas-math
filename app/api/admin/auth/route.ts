import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { pin } = await request.json()
  const correctPin = process.env.ADMIN_PIN ?? '1234'

  if (pin === correctPin) {
    const res = NextResponse.json({ ok: true })
    res.cookies.set('admin_auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
    return res
  }

  return NextResponse.json({ error: 'Invalid PIN' }, { status: 401 })
}
