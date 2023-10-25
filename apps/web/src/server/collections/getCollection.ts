import { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { SessionUser } from '@app/web/auth/sessionUser'
import {
  computeResourcesListWhereForUser,
  resourceListSelect,
} from '../resources/getResourcesList'

const collectionSelect = (user: Pick<SessionUser, 'id'> | null) =>
  ({
    id: true,
    title: true,
    description: true,
    isPublic: true,
    image: {
      select: {
        id: true,
        altText: true,
      },
    },
    owner: {
      select: {
        id: true,
        name: true,
        firstName: true,
        lastName: true,
        image: {
          select: {
            id: true,
            altText: true,
          },
        },
      },
    },
    base: {
      select: {
        title: true,
        slug: true,
        image: {
          select: {
            id: true,
            altText: true,
          },
        },
      },
    },
    resources: {
      select: resourceListSelect,
      where: computeResourcesListWhereForUser(user),
    },
  }) satisfies Prisma.CollectionSelect

export const getCollection = async (
  id: string,
  user: Pick<SessionUser, 'id'> | null,
) =>
  prismaClient.collection.findFirst({
    select: collectionSelect(user),
    where: { id, deleted: null },
  })

export type CollectionPageData = Exclude<
  Awaited<ReturnType<typeof getCollection>>,
  null
>
