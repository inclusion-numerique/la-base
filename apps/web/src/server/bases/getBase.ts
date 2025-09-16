import { BaseMembersSortType } from '@app/web/app/(public)/bases/[slug]/(consultation)/membres/searchParams'
import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
import { imageCropSelect } from '@app/web/server/image/imageCropSelect'
import {
  computeResourcesListWhereForUser,
  resourceListSelect,
  toResourceWithFeedbackAverage,
} from '@app/web/server/resources/getResourcesList'
import type { Prisma } from '@prisma/client'
import {
  collectionSelect,
  computeCollectionsListWhereForUser,
} from '../collections/getCollectionsList'
import { profileListSelect } from '../profiles/getProfilesList'

const baseMembersOrderBy: Record<
  BaseMembersSortType,
  | Prisma.BaseMembersOrderByWithRelationInput
  | Prisma.BaseMembersOrderByWithRelationInput[]
> = {
  Alphabetique: { member: { name: 'asc' } },
  Role: [{ isAdmin: 'desc' }, { accepted: 'asc' }],
  Recent: { accepted: 'desc' },
  Ancien: { accepted: 'asc' },
}

export const baseSelect = (
  user: Pick<SessionUser, 'id'> | null,
  membersOrderBy?: BaseMembersSortType,
) =>
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
      select: {
        id: true,
        followerId: true,
        follower: {
          select: {
            image: true,
            id: true,
            firstName: true,
            lastName: true,
            name: true,
            isPublic: true,
            followedBy: true,
            slug: true,
            _count: {
              select: { resources: true, followedBy: true },
            },
          },
        },
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
      select: collectionSelect(user),
      where: computeCollectionsListWhereForUser(user),
      orderBy: [
        { order: 'asc' },
        {
          created: 'desc',
        },
      ],
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
      orderBy: membersOrderBy
        ? baseMembersOrderBy[membersOrderBy]
        : baseMembersOrderBy.Alphabetique,
    },
    _count: {
      select: {
        followedBy: true,
        resources: { where: computeResourcesListWhereForUser(user) },
      },
    },
  }) satisfies Prisma.BaseSelect

export const getBase = async ({
  id,
  slug,
  user,
  membersOrderBy,
}: {
  user: Pick<SessionUser, 'id'> | null
  membersOrderBy?: BaseMembersSortType
} & ({ id: string; slug?: undefined } | { id?: undefined; slug: string })) => {
  const base = await prismaClient.base.findFirst({
    select: baseSelect(user, membersOrderBy),
    where: { id, slug, deleted: null },
  })

  if (!base) return null

  const publicFollowedBy = base.followedBy
    .map(({ follower }) => follower)
    .filter(({ isPublic }) => isPublic)

  const privateFollowedBy = base.followedBy
    .map(({ follower }) => follower)
    .filter(({ isPublic }) => !isPublic)

  const visibleFollowedBy = [...publicFollowedBy, ...privateFollowedBy]

  const followedByData = {
    counts: {
      total: base.followedBy.length,
      public: publicFollowedBy.length,
      private: privateFollowedBy.length,
      visible: visibleFollowedBy.length,
    },
    visible: visibleFollowedBy,
  }

  return {
    ...base,
    followedByData,
  }
}

export const basePageQuery = async (
  slug: string,
  user: Pick<SessionUser, 'id'> | null,
  membersOrderBy?: BaseMembersSortType,
) => {
  const basePage = await getBase({ slug, user, membersOrderBy })
  const resourceViews = await prismaClient.resource.aggregate({
    where: {
      ...computeResourcesListWhereForUser(user),
      baseId: basePage?.id,
    },
    _sum: {
      viewsCount: true,
    },
  })

  return basePage == null
    ? null
    : {
        ...basePage,
        resources: basePage.resources.map(toResourceWithFeedbackAverage),
        _count: {
          ...basePage._count,
          resourcesViews: resourceViews._sum.viewsCount ?? 0,
        },
      }
}

export type BasePageData = Exclude<
  Awaited<ReturnType<typeof basePageQuery>>,
  null
>
export type BaseResource = BasePageData['resources'][number]
export type BaseMember = BasePageData['members'][number]
export type BaseFollowedByData = BasePageData['followedByData']
