import { NextResponse } from 'next/server'
import { prismaClient } from '@app/web/prismaClient'
import { legacyBaseOwnerFromLegacyBaseId } from '@app/web/legacyRedirection/legacyBaseOwnerFromLegacyBaseId'

const legacyHostname = process.env.LEGACY_HOSTNAME

export const isLegacyRequest = ({
  requestHost,
}: {
  requestHost: string | null
}) => !!legacyHostname && requestHost === legacyHostname

export const mapLegacyPath = async (url: URL) => {
  const path = url.pathname
  const { searchParams } = url

  if (path === '/' || path === '') {
    return '/'
  }

  if (path.startsWith('/recherche')) {
    return '/rechercher/tout/ressources'
  }

  if (path.startsWith('/ressource')) {
    const resource = await prismaClient.resource.findUnique({
      where: {
        legacyId: Number.parseInt(path.split('/')[2], 10),
      },
      select: {
        id: true,
        slug: true,
      },
    })

    if (!resource) {
      return '/ressources'
    }

    return `/ressources/${resource.slug}`
  }

  if (path.startsWith('/base')) {
    // If we are in a collection, it is in the search params
    const collectionParam = searchParams.get('collection')
    if (collectionParam) {
      const collection = await prismaClient.collection.findUnique({
        where: {
          legacyId: Number.parseInt(collectionParam, 10),
        },
        select: {
          id: true,
          slug: true,
        },
      })

      if (!collection) {
        return '/collections'
      }

      return `/collections/${collection.slug}`
    }

    const legacyBaseId = Number.parseInt(path.split('/')[2], 10)

    if (!legacyBaseId) {
      return '/'
    }

    const migratedToLegacyProfileId =
      legacyBaseOwnerFromLegacyBaseId.get(legacyBaseId)

    if (migratedToLegacyProfileId) {
      const migratedProfileFromBase = await prismaClient.user.findFirst({
        where: {
          legacyId: migratedToLegacyProfileId,
        },
        select: { id: true, slug: true },
      })

      if (migratedProfileFromBase) {
        return `/profils/${migratedProfileFromBase.slug}`
      }

      return '/profils'
    }

    const base = await prismaClient.base.findUnique({
      where: {
        legacyId: legacyBaseId,
      },
      select: {
        id: true,
        slug: true,
      },
    })

    if (!base) {
      return '/bases'
    }

    return `/bases/${base.slug}`
  }

  // Fallback to homepage if we don't have a mapping
  return '/'
}

export const redirectLegacyPathToCurrentUrl = async ({
  httpsBase,
  requestUrl,
}: {
  httpsBase: string
  requestUrl: URL
}) => {
  const migratedPath = await mapLegacyPath(requestUrl)

  const redirectTo = `${httpsBase}${migratedPath}`

  // 301 permanent and post => get
  return NextResponse.redirect(redirectTo, { status: 301 })
}
