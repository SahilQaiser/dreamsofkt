import { getContent } from '@/lib/kv'
import { getVariant } from '@/lib/variant'
import { DEFAULT_CONTENT } from '@/types/content'
import DreamsLayout from '@/components/layouts/DreamsLayout'
import ThoughtsLayout from '@/components/layouts/ThoughtsLayout'
import MemoriesLayout from '@/components/layouts/MemoriesLayout'
import LegacyLayout from '@/components/layouts/LegacyLayout'

export default async function Home() {
  const [variant, content] = await Promise.all([
    getVariant(),
    getContent().catch(() => DEFAULT_CONTENT),
  ])

  if (variant === 'thoughts') return <ThoughtsLayout content={content} />
  if (variant === 'memories') return <MemoriesLayout content={content} />
  if (variant === 'legacy') return <LegacyLayout content={content} />
  return <DreamsLayout content={content} />
}
