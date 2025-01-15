import { NextRequest } from 'next/server'
import { getResourceForMarkdown } from '@app/web/resources/getResourceForMarkdown'
import { resourceToMarkdown } from '@app/web/resources/resourceToMarkdown'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const GET = async (
  _request: NextRequest,
  context: { params: { slug: string } },
) => {
  const { slug } = context.params
  const resource = await getResourceForMarkdown({ slug })
  if (!resource) {
    return new Response('not-found', {
      status: 404,
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  }
  if (!resource.isPublic || !resource.published) {
    return new Response('not-found', {
      status: 404,
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  }

  const markdown = resourceToMarkdown(resource)

  return new Response(markdown, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  })
}
