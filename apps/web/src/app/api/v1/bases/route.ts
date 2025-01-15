import { type NextRequest, NextResponse } from 'next/server'
import { prismaClient } from '@app/web/prismaClient'
import { getServerUrl } from '@app/web/utils/baseUrl'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Returns all public bases
export const GET = async (_request: NextRequest) => {
  const bases = await prismaClient.base.findMany({
    where: {
      isPublic: true,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      deleted: true,
    },
    orderBy: {
      created: 'desc',
    },
  })

  const response = {
    data: bases.map((base) => ({
      id: base.id,
      title: base.title,
      slug: base.slug,
      deleted: base.deleted?.toISOString(),
      url: getServerUrl(`/bases/${base.slug}`, true),
    })),
  }

  return NextResponse.json(response, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}
