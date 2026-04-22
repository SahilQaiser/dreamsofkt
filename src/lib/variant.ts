import { headers } from 'next/headers'

export type Variant = 'dreams' | 'thoughts' | 'memories' | 'legacy'

export async function getVariant(): Promise<Variant> {
  const host = (await headers()).get('host') ?? ''
  if (host.startsWith('thoughts.')) return 'thoughts'
  if (host.startsWith('memories.')) return 'memories'
  if (host.startsWith('legacy.')) return 'legacy'
  return 'dreams'
}
