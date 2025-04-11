import { NextRequest } from 'next/server'
import { v4 } from 'uuid'
import cookie from 'cookie'
import { prismaClient } from '@app/web/prismaClient'
import { getOrSetVisitHashCookie } from '@app/web/server/visitHash/getOrSetVisitHashCookie'
import { getSessionUserFromSessionToken } from '@app/web/auth/getSessionUserFromSessionToken'
import { getSessionTokenFromCookies } from '@app/web/auth/getSessionTokenFromCookies'

export const POST = async (
  request: NextRequest,
  context: { params: { slug: string } },
) => {
  const { slug } = context.params
  const visitHash = getOrSetVisitHashCookie()

  const resource = await prismaClient.resource.findFirst({
    where: {
      slug,
      deleted: null,
    },
    select: {
      id: true,
    },
  })
  if (!resource) {
    return new Response('not-found', {
      status: 200,
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  }
  const existingView = await prismaClient.resourceView.findFirst({
    where: {
      hash: visitHash,
      resource: {
        slug,
      },
    },
    select: { id: true },
  })
  if (existingView) {
    return new Response('noop', {
      status: 200,
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  }

  const cookies = cookie.parse(request.headers.get('cookie') || '')
  const sessionToken = getSessionTokenFromCookies(cookies)
  const user = sessionToken
    ? await getSessionUserFromSessionToken(sessionToken)
    : null

  await prismaClient.resourceView.create({
    data: {
      id: v4(),
      hash: visitHash,
      userId: user?.id ?? null,
      resourceId: resource.id,
      timestamp: new Date(),
    },
    select: {
      id: true,
    },
  })
  await prismaClient.resource.update({
    where: {
      id: resource.id,
    },
    data: {
      viewsCount: {
        increment: 1,
      },
      lastView: new Date(),
    },
    select: {
      id: true,
    },
  })

  return new Response('ok', {
    status: 200,
    headers: {
      'Content-Type': 'image/webp',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
