import type { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
import {
  computeResourcesListWhereForUser,
  type ResourceListItem,
  resourceListSelect,
  toResourceWithFeedbackAverage,
} from '@app/web/server/resources/getResourcesList'
import type { Prisma } from '@prisma/client'
import { imageCropSelect } from '../image/imageCropSelect'

export const collectionSelect = (
  user: Pick<SessionUser, 'id'> | null,
  isShareToken = false,
) =>
  ({
    id: true,
    title: true,
    slug: true,
    description: true,
    isPublic: true,
    isFavorites: true,
    deleted: true,
    created: true,
    updated: true,
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
      select: {
        order: true,
        id: true,
        resource: { select: resourceListSelect(user) },
        shareableLink: {
          select: {
            id: true,
            enabled: true,
          },
        },
      },
      where: {
        OR: [
          // Normal resource access
          {
            resource: computeResourcesListWhereForUser(user, {}, isShareToken),
          },
          // Resource added via enabled shareable link
          {
            shareableLink: {
              enabled: true,
            },
          },
        ],
      },
      orderBy: [
        { order: 'asc' },
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
  isShareToken = false,
) => {
  const collection = await prismaClient.collection.findFirst({
    select: collectionSelect(user, isShareToken),
    where: { id, slug, deleted: null },
    orderBy: [
      {
        isFavorites: 'desc',
      },
      {
        created: 'asc',
      },
    ],
  })

  return collection == null
    ? null
    : {
        ...collection,
        resources: collection.resources.map((collectionResource) => ({
          resource: toResourceWithFeedbackAverage(collectionResource.resource),
          order: collectionResource.order,
          collectionResourceId: collectionResource.id,
          // Only include the share token if the link is still enabled
          shareToken:
            collectionResource.shareableLink?.enabled === true
              ? collectionResource.shareableLink.id
              : null,
        })),
      }
}

export type CollectionPageData = Exclude<
  Awaited<ReturnType<typeof getCollection>>,
  null
>

export type CollectionResourceListItem = ResourceListItem & {
  collectionResourceId: string
  shareToken: string | null
}
