import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getNewsFeed } from '@app/web/features/fil-d-actualite/db/getNewsFeed'
import { getNewsFeedNotifications } from '@app/web/features/fil-d-actualite/db/getNewsFeedNotifications'
import { prismaClient } from '@app/web/prismaClient'
import { getBaseResourcesViewsCount } from '@app/web/server/bases/baseResources'
import {
  countNewsFeedResources,
  defaultNewsFeedPaginationParams,
  getFollowedResourceIds,
  getResourceIds,
  NewsFeedFilters,
} from '@app/web/server/newsFeed/getNewsFeedResources'
import {
  resourceListSelect,
  toResourceWithFeedbackAverage,
} from '@app/web/server/resources/getResourcesList'
import { type PaginationParams } from '@app/web/server/search/searchQueryParams'
import { Prisma } from '@prisma/client'
import { redirect } from 'next/navigation'
import { cache } from 'react'

export const updateLastOpenedAt = async (userId: string) =>
  prismaClient.newsFeed.update({
    data: {
      lastOpenedAt: new Date(),
    },
    where: {
      userId,
    },
    select: {
      lastOpenedAt: true,
    },
  })

export const getNewsFeedResources = async (
  userId: string,
  filters: NewsFeedFilters = { themes: [], professionalSectors: [] },
  paginationParams: PaginationParams = defaultNewsFeedPaginationParams,
  lastOpenedAt?: Date,
) => {
  const { profileSlug, baseSlug } = filters

  const newsFeedResources =
    baseSlug === 'tout' && profileSlug === 'tout'
      ? await getFollowedResourceIds(userId, paginationParams, lastOpenedAt)
      : await getResourceIds(userId, filters, paginationParams, lastOpenedAt)

  // Followed bases that have at least 1 resource (direct publications or collections)
  const followedBasesWithResources = await prismaClient.$queryRaw<
    { id: string }[]
  >(
    Prisma.sql`
      WITH followedBases AS (
        SELECT base_id FROM base_follows WHERE follower_id = ${userId}::uuid
      )
      SELECT DISTINCT base_id as id
      FROM (
        -- Bases with direct publications
        SELECT r.base_id
        FROM resources r
        LEFT JOIN bases b ON r.base_id = b.id
        WHERE r.base_id IN (SELECT base_id FROM followedBases)
          AND r.deleted IS NULL
          AND r.published IS NOT NULL
          AND r.is_public = true
          AND (b.id IS NULL OR b.deleted IS NULL)
        
        UNION
        
        -- Bases with collections containing saved resources
        SELECT c.base_id
        FROM resources r
        LEFT JOIN collection_resources cr ON cr.resource_id = r.id
        LEFT JOIN collections c ON c.id = cr.collection_id AND c.deleted IS NULL AND c.is_public = true
        WHERE c.base_id IN (SELECT base_id FROM followedBases)
          AND r.deleted IS NULL
          AND r.published IS NOT NULL
          AND r.is_public = true
          AND cr.id IS NOT NULL
      ) base_sources
      WHERE base_id IS NOT NULL
    `,
  )

  // Followed profiles that have at least 1 resource (direct creations or collections)
  const followedProfilesWithResources = await prismaClient.$queryRaw<
    { id: string }[]
  >(
    Prisma.sql`
      WITH followedProfiles AS (
        SELECT profile_id FROM profile_follows WHERE follower_id = ${userId}::uuid
      )
      SELECT DISTINCT profile_id as id
      FROM (
        -- Profiles with direct resource creations
        SELECT r.created_by_id as profile_id
        FROM resources r
        WHERE r.created_by_id IN (SELECT profile_id FROM followedProfiles)
          AND r.deleted IS NULL
          AND r.published IS NOT NULL
          AND r.is_public = true
        
        UNION
        
        -- Profiles with collections containing saved resources
        SELECT c.created_by_id as profile_id
        FROM resources r
        LEFT JOIN collection_resources cr ON cr.resource_id = r.id
        LEFT JOIN collections c ON c.id = cr.collection_id AND c.deleted IS NULL AND c.is_public = true
        WHERE c.created_by_id IN (SELECT profile_id FROM followedProfiles)
          AND r.deleted IS NULL
          AND r.published IS NOT NULL
          AND r.is_public = true
          AND cr.id IS NOT NULL
      ) profile_sources
      WHERE profile_id IS NOT NULL
    `,
  )

  const resourceIds = newsFeedResources.map(({ id }) => id)
  const resourceMap = new Map(
    newsFeedResources.map(
      ({ id, seen, source, event_type, added_to_collection_at, collection_id }) => [
        id,
        {
          source,
          seen,
          eventType: event_type,
          addedToCollectionAt: added_to_collection_at,
          collectionId: collection_id,
        },
      ],
    ),
  )
  const [followedBasesData, followedProfiles] = await Promise.all([
    prismaClient.baseFollow.findMany({
      where: {
        followerId: userId,
        baseId: { in: followedBasesWithResources.map(({ id }) => id) },
        base: { deleted: null },
      },
      select: {
        id: true,
        followed: true,
        base: {
          select: {
            id: true,
            title: true,
            excerpt: true,
            isPublic: true,
            slug: true,
            department: true,
            image: {
              select: {
                id: true,
              },
            },
            coverImage: {
              select: {
                id: true,
              },
            },
            followedBy: {
              select: {
                id: true,
                followerId: true,
              },
              where: {
                followerId: userId,
              },
            },
            _count: {
              select: {
                resources: {
                  where: {
                    deleted: null,
                    published: { not: null },
                    isPublic: true,
                  },
                },
                followedBy: true,
              },
            },
          },
        },
      },
      orderBy: {
        followed: 'desc',
      },
    }),
    prismaClient.profileFollow.findMany({
      where: {
        followerId: userId,
        profileId: { in: followedProfilesWithResources.map(({ id }) => id) },
        profile: { deleted: null },
      },
      select: {
        id: true,
        followed: true,
        profile: {
          select: {
            id: true,
            name: true,
            firstName: true,
            lastName: true,
            slug: true,
            email: true,
            image: {
              select: {
                id: true,
                altText: true,
              },
            },
            followedBy: {
              where: {
                followerId: userId,
              },
              select: {
                followerId: true,
                id: true,
              },
            },
            resourceEvent: {
              distinct: ['resourceId'],
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
              },
              where: {
                deleted: null,
                isPublic: true,
                published: {
                  not: null,
                },
              },
            },
            resources: {
              select: {
                resourceId: true,
              },
              where: {
                resource: {
                  deleted: null,
                  isPublic: true,
                  published: {
                    not: null,
                  },
                },
              },
            },
            _count: {
              select: {
                followedBy: true,
              },
            },
          },
        },
      },
      orderBy: {
        followed: 'desc',
      },
    }),
  ])

  const baseResourcesViews = await getBaseResourcesViewsCount(
    followedBasesData.map(({ base }) => base.id),
  )

  const followedBases = followedBasesData.map((baseFollow) => ({
    ...baseFollow,
    base: {
      ...baseFollow.base,
      _count: {
        ...baseFollow.base._count,
        resourcesViews:
          baseResourcesViews.find(({ baseId }) => baseId === baseFollow.base.id)
            ?._sum.viewsCount ?? 0,
      },
    },
  }))

  if (resourceIds.length === 0) {
    return {
      resources: [],
      followedBases,
      followedProfiles,
    }
  }

  const resources = await prismaClient.resource.findMany({
    where: { id: { in: resourceIds } },
    select: {
      ...resourceListSelect({ id: userId }),
      themes: true,
      professionalSectors: true,
      collections: {
        select: {
          id: true,
          added: true,
          collectionId: true,
          collection: {
            select: {
              id: true,
              slug: true,
              title: true,
              baseId: true,
              createdById: true,
              base: {
                select: {
                  image: true,
                  id: true,
                  title: true,
                  slug: true,
                },
              },
              createdBy: {
                select: {
                  image: true,
                  id: true,
                  name: true,
                  firstName: true,
                  lastName: true,
                  slug: true,
                },
              },
            },
          },
        },
      },
    },
  })

  // keep the same indexing
  const orderMap = new Map(resourceIds.map((id, index) => [id, index]))
  const sortedResources = resources.sort(
    (a, b) => (orderMap.get(a.id) ?? 0) - (orderMap.get(b.id) ?? 0),
  )
  return {
    resources: sortedResources.map((resource) => {
      const extraData = resourceMap.get(resource.id) || {
        source: 'base' as const,
        seen: false,
        eventType: 'published' as const,
        collectionId: undefined,
        addedToCollectionAt: undefined,
      }
      return {
        ...toResourceWithFeedbackAverage(resource),
        source: extraData.source,
        seen: extraData.seen,
        eventType: extraData.eventType,
        collectionId: extraData.collectionId,
        addedToCollectionAt: extraData.addedToCollectionAt,
      }
    }),
    followedBases,
    followedProfiles,
  }
}

export const getNewsFeedPageContext = cache(
  async (
    filters: NewsFeedFilters = { themes: [], professionalSectors: [] },
    paginationParams: PaginationParams = defaultNewsFeedPaginationParams,
  ) => {
    const user = await getSessionUser()
    const userNewsFeed = await getNewsFeed(user)
    if (!user) {
      return redirect('/connexion?suivant=/fil-d-actualite/tout')
    }
    // Redirect to onboarding only if no newsFeed record exists
    // If user has skipped onboarding (hasCompleteOnboarding: false), they can still access the feed
    if (!userNewsFeed) {
      return redirect('/fil-d-actualite/onboarding')
    }
    const [
      { resources, followedBases, followedProfiles },
      resourceCounts,
      notificationsCount,
    ] = await Promise.all([
      getNewsFeedResources(
        user.id,
        filters,
        paginationParams,
        userNewsFeed.lastOpenedAt ?? undefined,
      ),
      countNewsFeedResources(user.id),
      getNewsFeedNotifications(user, filters),
    ])

    return {
      user,
      userNewsFeed,
      resources,
      followedBases,
      followedProfiles,
      resourceCounts,
      notificationsCount,
    }
  },
)

export type NewsFeedResource = Awaited<
  ReturnType<typeof getNewsFeedResources>
>['resources'][0]

export type NewsFeedPageContext = Awaited<
  ReturnType<typeof getNewsFeedPageContext>
>

export type NewsFeedBases = Awaited<
  ReturnType<typeof getNewsFeedPageContext>
>['followedBases']

export type NewsFeedProfiles = Awaited<
  ReturnType<typeof getNewsFeedPageContext>
>['followedProfiles']
