import { prismaClient } from '@app/web/prismaClient'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { type NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export type ApiV1BasesResponse = {
  data: {
    id: string
    slug: string
    created: string
    updated: string
    deleted: string | null
    is_public: boolean
    title: string | null // Null if not public or deleted
    url: string | null // Null if not public or deleted
  }[]
}

// Returns all public bases
export const GET = async (_request: NextRequest) => {
  const bases = await prismaClient.base.findMany({
    // We select all bases for syncing external systems, but remove non public data we don't want to send to the client
    select: {
      id: true,
      title: true,
      slug: true,
      deleted: true,
      created: true,
      updated: true,
      isPublic: true,
    },
    orderBy: {
      created: 'desc',
    },
  })

  const response = {
    data: bases.map((base) => {
      const obfuscate = !base.isPublic || base.deleted
      return {
        id: base.id,
        slug: base.slug,
        created: base.created.toISOString(),
        updated: base.updated.toISOString(),
        deleted: base.deleted?.toISOString() ?? null,
        is_public: base.isPublic,
        title: obfuscate ? null : base.title,
        url: obfuscate
          ? null
          : getServerUrl(`/bases/${base.slug}`, {
              absolutePath: true,
            }),
      }
    }),
  } satisfies ApiV1BasesResponse

  return NextResponse.json(response, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}
