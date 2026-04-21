import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'
import { getContent, setContent } from '@/lib/kv'

export async function GET() {
  if (!(await verifySession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const content = await getContent()
  return NextResponse.json({ hero: content.hero, featuredReel: content.featuredReel })
}

export async function PUT(req: NextRequest) {
  if (!(await verifySession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const content = await getContent()
  if (body.hero) content.hero = { ...content.hero, ...body.hero }
  if (body.featuredReel) content.featuredReel = { ...content.featuredReel, ...body.featuredReel }
  await setContent(content)
  return NextResponse.json({ hero: content.hero, featuredReel: content.featuredReel })
}
