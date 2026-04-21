import { getCloudflareContext } from '@opennextjs/cloudflare'
import { DEFAULT_CONTENT, type SiteContent } from '@/types/content'

function getEnv(): CloudflareEnv {
  return getCloudflareContext().env as CloudflareEnv
}

export async function getContent(): Promise<SiteContent> {
  const raw = await getEnv().KT_CONTENT.get('content')
  if (!raw) return DEFAULT_CONTENT
  try {
    return JSON.parse(raw) as SiteContent
  } catch {
    return DEFAULT_CONTENT
  }
}

export async function setContent(content: SiteContent): Promise<void> {
  await getEnv().KT_CONTENT.put('content', JSON.stringify(content))
}

export async function getSession(token: string): Promise<string | null> {
  return getEnv().KT_CONTENT.get(`session:${token}`)
}

export async function setSession(token: string): Promise<void> {
  await getEnv().KT_CONTENT.put(`session:${token}`, '1', { expirationTtl: 604800 })
}

export async function deleteSession(token: string): Promise<void> {
  await getEnv().KT_CONTENT.delete(`session:${token}`)
}
