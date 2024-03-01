import type { Prisma } from '@prisma/client'
import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'

const userCollectionFragment = {
  select: {
    id: true,
    slug: true,
    isPublic: true,
    title: true,
    resources: {
      select: { resourceId: true },
      where: { resource: { deleted: null } },
    },
  },
  where: { deleted: null, baseId: null },
  orderBy: {
    title: 'asc',
  },
} satisfies {
  select: Prisma.CollectionSelect
  where: Prisma.CollectionWhereInput
  orderBy:
    | Prisma.CollectionOrderByWithRelationAndSearchRelevanceInput
    | Prisma.CollectionOrderByWithRelationAndSearchRelevanceInput[]
}

const baseCollectionFragment = {
  select: {
    id: true,
    isPublic: true,
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
    | Prisma.CollectionOrderByWithRelationAndSearchRelevanceInput
    | Prisma.CollectionOrderByWithRelationAndSearchRelevanceInput[]
}

const userSavedCollectionFragment = {
  select: {
    id: true,
    collectionId: true,
    baseId: true,
  },
  where: { baseId: null },
} satisfies {
  select: Prisma.SavedCollectionSelect
  where: Prisma.SavedCollectionWhereInput
}

const baseSavedCollectionFragment = {
  select: {
    id: true,
    collectionId: true,
    baseId: true,
  },
} satisfies {
  select: Prisma.SavedCollectionSelect
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
          ownedBases: {
            select: {
              id: true,
              slug: true,
              title: true,
              isPublic: true,
              collections: baseCollectionFragment,
              savedCollections: baseSavedCollectionFragment,
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
                  collections: baseCollectionFragment,
                  savedCollections: baseSavedCollectionFragment,
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
          savedCollections: userSavedCollectionFragment,
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
  }
}
