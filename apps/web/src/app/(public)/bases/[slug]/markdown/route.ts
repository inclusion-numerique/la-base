import { baseToMarkdown } from '@app/web/bases/baseToMarkdown'
import { getBaseForMarkdown } from '@app/web/bases/getBaseForMarkdown'
import type { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const GET = async (
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) => {
  const { slug } = await context.params
  const base = await getBaseForMarkdown({ slug })
  if (!base) {
    return new Response('not-found', {
      status: 404,
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  }
  if (!base.isPublic) {
    return new Response('not-found', {
      status: 404,
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  }

  const markdown = baseToMarkdown(base)

  return new Response(markdown, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  })
}
