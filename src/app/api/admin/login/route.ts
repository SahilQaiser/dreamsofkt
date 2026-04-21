import { NextRequest, NextResponse } from 'next/server'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { createSession, destroySession, SESSION_COOKIE, SESSION_MAX_AGE } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  const { env } = getCloudflareContext()
  const adminPassword = (env as CloudflareEnv).ADMIN_PASSWORD

  if (!password || password !== adminPassword) {
    return NextResponse.json({ error: 'Invalid password.' }, { status: 401 })
  }

  const token = await createSession()
  const response = NextResponse.json({ ok: true })
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  })
  return response
}

export async function DELETE() {
  await destroySession()
  const response = NextResponse.json({ ok: true })
  response.cookies.set(SESSION_COOKIE, '', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })
  return response
}
