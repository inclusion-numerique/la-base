import { prismaClient } from '@app/web/prismaClient'
import type { Prisma } from '@prisma/client'

const whereBase: Prisma.FeaturedBlockWhereInput = {
  type: 'base',
  baseId: { not: null },
  base: {
    deleted: null,
    isPublic: true,
  },
}

const whereResource: Prisma.FeaturedBlockWhereInput = {
  type: 'resource',
  resourceId: { not: null },
  resource: {
    deleted: null,
    isPublic: true,
  },
}

const whereProfile: Prisma.FeaturedBlockWhereInput = {
  type: 'profile',
  profileId: { not: null },
  profile: {
    deleted: null,
    isPublic: true,
  },
}

export const getFeaturedBlocksListPageData = async () => {
  const featuredBases = await prismaClient.featuredBlock.findMany({
    where: whereBase,
    select: {
      base: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
  })

  const featuredResources = await prismaClient.featuredBlock.findMany({
    where: whereResource,
    select: {
      resource: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  })

  const featuredProfiles = await prismaClient.featuredBlock.findMany({
    where: whereProfile,
    select: {
      profile: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

  return {
    featuredBases,
    featuredResources,
    featuredProfiles,
  }
}

export type FeaturedBlocksListPageData = Awaited<
  ReturnType<typeof getFeaturedBlocksListPageData>
>

export type FeaturedBlock = {
  id: string
  title?: string
  slug?: string
  name?: string | null
}
