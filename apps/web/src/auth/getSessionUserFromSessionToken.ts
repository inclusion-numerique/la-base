import type { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
import type { Prisma } from '@prisma/client'

const userCollectionFragment = {
  select: {
    id: true,
    slug: true,
    isPublic: true,
    created: true,
    updated: true,
    isFavorites: true,
    title: true,
    resources: {
      select: { resourceId: true },
      where: { resource: { deleted: null } },
    },
  },
  where: { deleted: null, baseId: null },
  orderBy: [
    {
      isFavorites: 'desc',
    },
    {
      title: 'asc',
    },
  ],
} satisfies {
  select: Prisma.CollectionSelect
  where: Prisma.CollectionWhereInput
  orderBy:
    | Prisma.CollectionOrderByWithRelationInput
    | Prisma.CollectionOrderByWithRelationInput[]
}

const baseCollectionFragment = {
  select: {
    id: true,
    isPublic: true,
    isFavorites: true,
    created: true,
    updated: true,
    title: true,
    slug: true,
    resources: {
      select: { resourceId: true },
      where: { resource: { deleted: null } },
    },
  },
  where: { deleted: null },
  orderBy: {
    title: 'asc',
  },
} satisfies {
  select: Prisma.CollectionSelect
  where: Prisma.CollectionWhereInput
  orderBy:
    | Prisma.CollectionOrderByWithRelationInput
    | Prisma.CollectionOrderByWithRelationInput[]
}

export const getSessionUserFromSessionToken = async (
  sessionToken: string | null,
): Promise<SessionUser | null> => {
  if (!sessionToken) {
    return null
  }

  const res = await prismaClient.session.findFirst({
    where: {
      sessionToken,
      expires: { gt: new Date() },
      user: {
        deleted: null,
      },
    },
    include: {
      user: {
        select: {
          id: true,
          slug: true,
          legacyId: true,
          role: true,
          email: true,
          firstName: true,
          lastName: true,
          name: true,
          emailVerified: true,
          image: true,
          title: true,
          location: true,
          description: true,
          created: true,
          updated: true,
          isPublic: true,
          hasSeenV2Onboarding: true,
          lastCguAcceptedAt: true,
          cguVersion: true,
          ownedBases: {
            select: {
              id: true,
              slug: true,
              title: true,
              isPublic: true,
              image: true,
              collections: baseCollectionFragment,
            },
            where: {
              deleted: null,
            },
          },
          bases: {
            select: {
              isAdmin: true,
              base: {
                select: {
                  id: true,
                  slug: true,
                  title: true,
                  isPublic: true,
                  image: true,
                  collections: baseCollectionFragment,
                },
              },
            },
            where: {
              accepted: {
                not: null,
              },
              base: {
                deleted: null,
              },
            },
          },
          collections: userCollectionFragment,
          resources: {
            select: {
              resourceId: true,
            },
            where: {
              resource: {
                deleted: null,
              },
            },
          },
          createdResources: {
            select: {
              id: true,
              slug: true,
            },
            where: {
              deleted: null,
            },
          },
        },
      },
    },
  })

  if (!res?.user) {
    return null
  }

  return {
    ...res.user,
    hasSeenV2Onboarding: res.user.hasSeenV2Onboarding?.toISOString() ?? null,
    created: res.user.created.toISOString(),
    updated: res.user.updated.toISOString(),
    emailVerified: res.user.emailVerified?.toISOString() ?? null,
    lastCguAcceptedAt: res.user.lastCguAcceptedAt?.toISOString() ?? null,
  }
}
