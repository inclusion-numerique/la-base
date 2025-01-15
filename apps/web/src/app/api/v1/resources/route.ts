import { type NextRequest, NextResponse } from 'next/server'
import { prismaClient } from '@app/web/prismaClient'
import { getServerUrl } from '@app/web/utils/baseUrl'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export type ApiV1ResourcesResponse = {
  data: {
    id: string
    slug: string
    title: string | null // null if not publicly visible
    deleted: string | null
    created: string
    updated: string
    is_public: boolean
    published: string | null
    url: string | null // null if not publicly visible
  }[]
}

// Returns all public published resources
export const GET = async (_request: NextRequest) => {
  const resources = await prismaClient.resource.findMany({
    // We select all ressources for syncing external systems, but remove non public data we don't want to send to the client
    select: {
      id: true,
      title: true,
      slug: true,
      published: true,
      created: true,
      updated: true,
      deleted: true,
      isPublic: true,
    },
    orderBy: {
      created: 'desc',
    },
  })

  const response = {
    data: resources.map((resource) => {
      const obfuscate =
        !resource.isPublic || resource.deleted || !resource.published
      return {
        id: resource.id,
        slug: resource.slug,
        title: obfuscate ? null : resource.title,
        created: resource.created.toISOString(),
        updated: resource.updated.toISOString(),
        deleted: resource.deleted?.toISOString() ?? null,
        is_public: resource.isPublic ?? false,
        published: resource.published?.toISOString() ?? null,
        url: obfuscate
          ? null
          : getServerUrl(`/ressources/${resource.slug}`, true),
      }
    }),
  } satisfies ApiV1ResourcesResponse

  return NextResponse.json(response, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}
