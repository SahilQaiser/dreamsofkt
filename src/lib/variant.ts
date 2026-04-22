import { headers } from 'next/headers'

export type Variant = 'dreams' | 'thoughts' | 'memories' | 'legacy'
const VARIANTS: Variant[] = ['dreams', 'thoughts', 'memories', 'legacy']

export async function getVariant(): Promise<Variant> {
  const hdrs = await headers()

  // ?variant= query param (forwarded by middleware as x-variant header)
  const xv = hdrs.get('x-variant') as Variant | null
  if (xv && VARIANTS.includes(xv)) return xv

  // Subdomain-based detection for production
  const host = hdrs.get('host') ?? ''
  if (host.startsWith('thoughts.')) return 'thoughts'
  if (host.startsWith('memories.')) return 'memories'
  if (host.startsWith('legacy.')) return 'legacy'
  return 'dreams'
}
