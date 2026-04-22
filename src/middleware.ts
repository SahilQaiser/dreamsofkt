import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const VARIANTS = ['dreams', 'thoughts', 'memories', 'legacy']

export function middleware(request: NextRequest) {
  const variant = request.nextUrl.searchParams.get('variant')
  const headers = new Headers(request.headers)
  if (variant && VARIANTS.includes(variant)) {
    headers.set('x-variant', variant)
  }
  return NextResponse.next({ request: { headers } })
}

export const config = {
  matcher: ['/((?!_next|api|favicon).*)'],
}
