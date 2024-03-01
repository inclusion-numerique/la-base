import type { Prisma } from '@prisma/client'
import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'

export const computeCollectionsListWhereForUser = (
  user?: Pick<SessionUser, 'id'> | null,
  where: Prisma.CollectionWhereInput = {},
): Prisma.CollectionWhereInput => {
  const whereCollectionIsPublic = {
    isPublic: true,
  }

  return {
    deleted: null,
    AND: [
      user
        ? {
            OR: [
              // Public
              whereCollectionIsPublic,
              // Created by user
              { createdById: user.id },
              // In base where user is active member
              {
                base: {
                  members: {
                    some: {
                      accepted: {
                        not: null,
                      },
                      memberId: user.id,
                    },
                  },
                },
              },
            ],
          }
        : whereCollectionIsPublic,
      where,
    ],
  }
}

export const getWhereCollectionsProfileList = (
  profileId: string,
  user?: Pick<SessionUser, 'id'> | null,
) =>
  computeCollectionsListWhereForUser(user, {
    createdById: profileId,
    baseId: null,
  })

export const getProfileCollectionsCount = async (
  profileId: string,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const where = getWhereCollectionsProfileList(profileId, user)

  const collections = await prismaClient.collection.count({
    where,
  })
  const savedCollections = await prismaClient.savedCollection.count({
    where: {
      collection: where,
    },
  })

  return {
    collections,
    savedCollections,
    total: collections + savedCollections,
  }
}

export const collectionSelect = {
  id: true,
  title: true,
  slug: true,
  description: true,
  isPublic: true,
  image: {
    select: {
      id: true,
      altText: true,
    },
  },
  createdBy: {
    select: {
      id: true,
      slug: true,
      name: true,
      firstName: true,
      lastName: true,
      image: { select: { altText: true, id: true } },
    },
  },
  base: {
    select: {
      id: true,
      slug: true,
      title: true,
      image: { select: { altText: true, id: true } },
    },
  },
  // Resources only for image previews
  resources: {
    select: {
      resource: {
        select: {
          image: { select: { id: true, altText: true } },
        },
      },
    },
    where: {
      resource: {
        deleted: null,
        image: {
          isNot: null,
        },
      },
    },
    take: 3,
    orderBy: { resource: { lastPublished: 'desc' } },
  },
  _count: {
    select: {
      resources: {
        where: {
          resource: {
            deleted: null,
          },
        },
      },
    },
  },
} satisfies Prisma.CollectionSelect

export const getProfileCollections = async (
  profileId: string,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const where = getWhereCollectionsProfileList(profileId, user)
  return prismaClient.collection.findMany({
    select: collectionSelect,
    where,
    orderBy: {
      created: 'desc',
    },
  })
}

export type CollectionListItem = Exclude<
  Awaited<ReturnType<typeof getProfileCollections>>,
  null
>[number]
