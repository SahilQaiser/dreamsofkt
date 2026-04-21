import { cookies } from 'next/headers'
import { getSession, setSession, deleteSession } from '@/lib/kv'

export const SESSION_COOKIE = 'admin_session'
export const SESSION_MAX_AGE = 604800 // 7 days

export async function createSession(): Promise<string> {
  const token = crypto.randomUUID()
  await setSession(token)
  return token
}

export async function getSessionToken(): Promise<string | null> {
  const jar = await cookies()
  return jar.get(SESSION_COOKIE)?.value ?? null
}

export async function verifySession(): Promise<boolean> {
  const token = await getSessionToken()
  if (!token) return false
  const val = await getSession(token)
  return val !== null
}

export async function destroySession(): Promise<void> {
  const token = await getSessionToken()
  if (token) await deleteSession(token)
}
