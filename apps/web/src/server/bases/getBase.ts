import { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { SessionUser } from '@app/web/auth/sessionUser'
import { imageCropSelect } from '@app/web/server/image/imageCropSelect'
import {
  computeResourcesListWhereForUser,
  resourceListSelect,
  toResourceWithFeedbackAverage,
} from '@app/web/server/resources/getResourcesList'
import {
  collectionSelect,
  computeCollectionsListWhereForUser,
} from '../collections/getCollectionsList'
import { profileListSelect } from '../profiles/getProfilesList'

export const baseSelect = (user: Pick<SessionUser, 'id'> | null) =>
  ({
    id: true,
    slug: true,
    title: true,
    deleted: true,
    createdById: true,
    description: true,
    department: true,
    email: true,
    emailIsPublic: true,
    linkedin: true,
    facebook: true,
    twitter: true,
    website: true,
    isPublic: true,
    createdBy: {
      select: {
        id: true,
        slug: true,
      },
    },
    coverImage: {
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
    followedBy: {
      where: {
        followerId: user?.id,
      },
      select: {
        id: true,
      },
    },
    resources: {
      select: resourceListSelect(user),
      where: computeResourcesListWhereForUser(user),
      orderBy: [
        {
          lastPublished: 'desc',
        },
        { updated: 'desc' },
      ],
    },
    collections: {
      select: collectionSelect,
      where: computeCollectionsListWhereForUser(user),
      orderBy: {
        updated: 'desc',
      },
    },
    savedCollections: {
      select: {
        collection: { select: collectionSelect },
      },
      where: {
        collection: computeCollectionsListWhereForUser(user),
      },
      orderBy: {
        saved: 'desc',
      },
    },
    members: {
      select: {
        isAdmin: true,
        baseId: true,
        memberId: true,
        accepted: true,
        member: {
          select: profileListSelect(user),
        },
      },
      orderBy: { added: 'asc' },
    },
    _count: {
      select: {
        followedBy: true,
      },
    },
  }) satisfies Prisma.BaseSelect

export const getBase = async (id: string, user: Pick<SessionUser, 'id'>) =>
  prismaClient.base.findFirst({
    select: baseSelect(user),
    where: { id, deleted: null },
  })

export const basePageQuery = async (
  slug: string,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const basePage = await prismaClient.base.findFirst({
    select: baseSelect(user),
    where: { slug, deleted: null },
  })

  return basePage == null
    ? null
    : {
        ...basePage,
        resources: basePage.resources.map(toResourceWithFeedbackAverage),
      }
}

export type BasePageData = Exclude<
  Awaited<ReturnType<typeof basePageQuery>>,
  null
>
export type BaseResource = BasePageData['resources'][number]
export type BaseMember = BasePageData['members'][number]
