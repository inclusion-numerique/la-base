import { type NextRequest, NextResponse } from 'next/server'
import { prismaClient } from '@app/web/prismaClient'
import { getServerUrl } from '@app/web/utils/baseUrl'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Returns all public published resources
export const GET = async (_request: NextRequest) => {
  const resources = await prismaClient.resource.findMany({
    where: {
      isPublic: true,
      published: { not: null },
    },
    select: {
      id: true,
      title: true,
      slug: true,
      published: true,
      deleted: true,
    },
    orderBy: {
      created: 'desc',
    },
  })

  const response = {
    data: resources.map((resource) => ({
      id: resource.id,
      title: resource.title,
      slug: resource.slug,
      url: getServerUrl(`/ressources/${resource.slug}`, true),
    })),
  }

  return NextResponse.json(response)
}
