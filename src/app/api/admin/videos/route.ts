import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'
import { getContent, setContent } from '@/lib/kv'
import type { VideoItem } from '@/types/content'

export async function GET() {
  if (!(await verifySession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const content = await getContent()
  return NextResponse.json({ videos: content.videos.sort((a, b) => a.order - b.order) })
}

export async function POST(req: NextRequest) {
  if (!(await verifySession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const content = await getContent()

  const video: VideoItem = {
    id: crypto.randomUUID(),
    title: body.title ?? 'Untitled',
    location: body.location ?? '',
    duration: body.duration ?? '0:00',
    tags: body.tags ?? [],
    type: body.type ?? 'gradient',
    src: body.src ?? '',
    thumbnail: body.thumbnail,
    wide: body.wide ?? false,
    order: content.videos.length,
  }

  content.videos.push(video)
  await setContent(content)
  return NextResponse.json({ video }, { status: 201 })
}
