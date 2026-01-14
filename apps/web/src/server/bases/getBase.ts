import { BaseMembersSortType } from '@app/web/app/(public)/bases/[slug]/(consultation)/(autres)/membres/searchParams'
import type { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
import { imageCropSelect } from '@app/web/server/image/imageCropSelect'
import {
  computeResourcesListWhereForUser,
  resourceListSelect,
  toResourceWithFeedbackAverage,
} from '@app/web/server/resources/getResourcesList'
import { getResourcesOrderBy } from '@app/web/server/resources/getResourcesOrderBy'
import { getResourcesSearchBy } from '@app/web/server/resources/getResourcesSearchBy'
import { PaginationParams } from '@app/web/server/search/searchQueryParams'
import type { Prisma } from '@prisma/client'
import { HighlightResourcesType } from '@prisma/client'
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
  paginationParams?: PaginationParams,
  isShareToken = false,
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
    highlightCollections: true,
    highlightResources: true,
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
      where: computeResourcesListWhereForUser(user, {}, isShareToken),
      orderBy: getResourcesOrderBy(paginationParams?.sort),
    },
    collections: {
      select: collectionSelect(user, isShareToken),
      where: computeCollectionsListWhereForUser(user, {}, isShareToken),
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
    shareableLink: {
      select: {
        id: true,
        enabled: true,
      },
    },
    _count: {
      select: {
        followedBy: true,
        resources: {
          where: computeResourcesListWhereForUser(user, {}, isShareToken),
        },
      },
    },
  }) satisfies Prisma.BaseSelect

export const getBase = async ({
  id,
  slug,
  user,
  membersOrderBy,
  paginationParams,
  isShareToken = false,
}: {
  user: Pick<SessionUser, 'id'> | null
  membersOrderBy?: BaseMembersSortType
  paginationParams?: PaginationParams
  isShareToken?: boolean
} & ({ id: string; slug?: undefined } | { id?: undefined; slug: string })) => {
  const base = await prismaClient.base.findFirst({
    select: baseSelect(user, membersOrderBy, paginationParams, isShareToken),
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

type RawResourceForSorting = {
  viewsCount: number
  resourceFeedback: { rating: number }[]
  lastPublished: Date | null
}

const sortResourcesByMostViewed = <T extends RawResourceForSorting>(
  resources: T[],
): T[] => resources.sort((a, b) => b.viewsCount - a.viewsCount)

const sortResourcesByMostRecommended = <T extends RawResourceForSorting>(
  resources: T[],
): T[] =>
  resources.sort(
    (a, b) => b.resourceFeedback.length - a.resourceFeedback.length,
  )

const sortResourcesByLatestPublished = <T extends RawResourceForSorting>(
  resources: T[],
): T[] =>
  resources.sort((a, b) => {
    const aDate = a.lastPublished ? new Date(a.lastPublished).getTime() : 0
    const bDate = b.lastPublished ? new Date(b.lastPublished).getTime() : 0
    return bDate - aDate
  })

const sortResources = <T extends RawResourceForSorting>(
  resources: T[],
  type: HighlightResourcesType,
): T[] => {
  switch (type) {
    case HighlightResourcesType.MostViewed:
      return sortResourcesByMostViewed(resources)
    case HighlightResourcesType.MostRecommended:
      return sortResourcesByMostRecommended(resources)
    case HighlightResourcesType.LatestPublished:
      return sortResourcesByLatestPublished(resources)
    default:
      return resources
  }
}

export const basePageQuery = async (
  slug: string,
  user: Pick<SessionUser, 'id'> | null,
  membersOrderBy?: BaseMembersSortType,
  paginationParams?: PaginationParams,
  isShareToken = false,
) => {
  const basePage = await getBase({
    slug,
    user,
    membersOrderBy,
    paginationParams,
    isShareToken,
  })
  const resourceViews = await prismaClient.resource.aggregate({
    where: {
      ...computeResourcesListWhereForUser(user, {}, isShareToken),
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
        highlightedResources: basePage.highlightResources
          ? sortResources([...basePage.resources], basePage.highlightResources)
              .slice(0, 3)
              .map(toResourceWithFeedbackAverage)
          : [],
        highlightedCollections: basePage.highlightCollections
          ? [...basePage.collections].slice(0, 3)
          : [],
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

export const getBaseResourcesPaginated = async (
  baseId: string,
  user: Pick<SessionUser, 'id'> | null,
  paginationParams: PaginationParams,
) => {
  const baseWhere = {
    ...computeResourcesListWhereForUser(user),
    baseId,
  }

  const searchWhere = paginationParams.search
    ? {
        OR: [
          {
            title: {
              contains: paginationParams.search,
              mode: 'insensitive' as const,
            },
          },
          {
            excerpt: {
              contains: paginationParams.search,
              mode: 'insensitive' as const,
            },
          },
        ],
      }
    : {}

  const where = { ...baseWhere, ...searchWhere }

  const skip = (paginationParams.page - 1) * paginationParams.perPage
  const take = paginationParams.perPage

  const baseResources = await prismaClient.resource.findMany({
    where,
    select: resourceListSelect(user),
    orderBy: getResourcesOrderBy(paginationParams.sort),
    skip,
    take,
  })

  return baseResources.map(toResourceWithFeedbackAverage)
}

export const getBaseResourcesCount = async (
  baseId: string,
  user: Pick<SessionUser, 'id'> | null,
  searchTerm?: string,
) => {
  const baseWhere = {
    ...computeResourcesListWhereForUser(user),
    baseId,
  }

  const searchWhere = getResourcesSearchBy(searchTerm)

  const where = { ...baseWhere, ...searchWhere }

  return prismaClient.resource.count({
    where,
  })
}
