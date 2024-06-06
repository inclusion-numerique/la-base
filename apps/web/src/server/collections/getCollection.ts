import { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { SessionUser } from '@app/web/auth/sessionUser'
import {
  computeResourcesListWhereForUser,
  resourceListSelect,
  toResourceWithFeedbackAverage,
} from '@app/web/server/resources/getResourcesList'
import { imageCropSelect } from '../image/imageCropSelect'

export const collectionSelect = (user: Pick<SessionUser, 'id'> | null) =>
  ({
    id: true,
    title: true,
    slug: true,
    description: true,
    isPublic: true,
    deleted: true,
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
    createdById: true,
    createdBy: {
      select: {
        id: true,
        slug: true,
        name: true,
        firstName: true,
        lastName: true,
        isPublic: true,
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
) => {
  const collection = await prismaClient.collection.findFirst({
    select: collectionSelect(user),
    where: { id, slug, deleted: null },
  })

  return collection == null
    ? null
    : {
        ...collection,
        resources: collection.resources.map((resource) => ({
          resource: toResourceWithFeedbackAverage(resource.resource),
        })),
      }
}

export type CollectionPageData = Exclude<
  Awaited<ReturnType<typeof getCollection>>,
  null
>
