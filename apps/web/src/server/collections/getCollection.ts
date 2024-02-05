import { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { SessionUser } from '@app/web/auth/sessionUser'
import { imageCropSelect } from '../image/imageCropSelect'
import {
  computeResourcesListWhereForUser,
  resourceListSelect,
} from '../resources/getResourcesList'

export const collectionSelect = (user: Pick<SessionUser, 'id'> | null) =>
  ({
    id: true,
    title: true,
    slug: true,
    description: true,
    isPublic: true,
    image: {
      select: {
        id: true,
        altText: true,
        ...imageCropSelect,
        upload: {
          select: {
            name: true,
            size: true,
            mimeType: true,
          },
        },
      },
    },
    owner: {
      select: {
        id: true,
        slug: true,
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
    baseId: true,
    base: {
      select: {
        id: true,
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
      select: { resource: { select: resourceListSelect(user) } },
      where: { resource: computeResourcesListWhereForUser(user) },
      orderBy: [
        { resource: { lastPublished: 'desc' } },
        { resource: { updated: 'desc' } },
      ],
    },
  }) satisfies Prisma.CollectionSelect

export const getCollection = async (
  {
    slug,
    id,
  }: { slug: string; id?: undefined } | { slug?: undefined; id: string },
  user: Pick<SessionUser, 'id'> | null,
) =>
  prismaClient.collection.findFirst({
    select: collectionSelect(user),
    where: { id, slug, deleted: null },
  })

export type CollectionPageData = Exclude<
  Awaited<ReturnType<typeof getCollection>>,
  null
>
