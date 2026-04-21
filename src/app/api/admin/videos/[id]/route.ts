import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'
import { getContent, setContent } from '@/lib/kv'

type Params = { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Params) {
  if (!(await verifySession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const content = await getContent()

  const idx = content.videos.findIndex((v) => v.id === id)
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Handle order swap (reorder up/down)
  if (typeof body.order === 'number' && body.order !== content.videos[idx].order) {
    const targetIdx = content.videos.findIndex((v) => v.order === body.order)
    if (targetIdx !== -1) {
      const currentOrder = content.videos[idx].order
      content.videos[targetIdx].order = currentOrder
      content.videos[idx].order = body.order
    }
  }

  content.videos[idx] = { ...content.videos[idx], ...body }
  await setContent(content)
  return NextResponse.json({ video: content.videos[idx] })
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  if (!(await verifySession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const content = await getContent()

  content.videos = content.videos
    .filter((v) => v.id !== id)
    .sort((a, b) => a.order - b.order)
    .map((v, i) => ({ ...v, order: i }))

  await setContent(content)
  return NextResponse.json({ ok: true })
}
