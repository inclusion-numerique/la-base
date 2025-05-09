import type { SessionUser } from '@app/web/auth/sessionUser'
import {
  type ResourceAuthorizationTarget,
  ResourcePermissions,
  resourceAuthorization,
} from '@app/web/authorization/models/resourceAuthorization'
import { prismaClient } from '@app/web/prismaClient'

export const getResourceSelect = (user: { id: string } | null) =>
  ({
    id: true,
    title: true,
    description: true,
    excerpt: true,
    slug: true,
    published: true,
    lastPublished: true,
    deleted: true,
    created: true,
    updated: true,
    isPublic: true,
    createdById: true,
    legacyId: true,
    publicFeedback: true,
    resourceFeedback: {
      where: {
        deleted: null,
      },
      orderBy: {
        created: 'desc',
      },
      select: {
        rating: true,
        comment: true,
        created: true,
        updated: true,
        sentById: true,
        resourceId: true,
        sentBy: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
            name: true,
            slug: true,
            isPublic: true,
            image: {
              select: {
                id: true,
                altText: true,
              },
            },
          },
        },
      },
    },
    createdBy: {
      select: {
        name: true,
        id: true,
        slug: true,
        isPublic: true,
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
    collections: {
      select: {
        collectionId: true,
      },
      where: {
        collection: {
          createdById: user?.id,
        },
      },
    },
    base: {
      select: {
        id: true,
        title: true,
        slug: true,
        isPublic: true,
        members: {
          select: {
            accepted: true,
            memberId: true,
            isAdmin: true,
          },
        },
        image: {
          select: {
            id: true,
            altText: true,
          },
        },
      },
    },
    contributors: {
      select: {
        contributorId: true,
      },
      orderBy: {
        added: 'asc',
      },
    },
    imageId: true,
    image: {
      select: {
        id: true,
        altText: true,
      },
    },
    themes: true,
    supportTypes: true,
    targetAudiences: true,
    contents: {
      select: {
        id: true,
        title: true,
        type: true,
        caption: true,
        imageId: true,
        imageAltText: true,
        image: {
          select: {
            id: true,
            altText: true,
            width: true,
            height: true,
            upload: {
              select: {
                key: true,
                name: true,
              },
            },
          },
        },
        fileKey: true,
        file: {
          select: {
            mimeType: true,
            key: true,
            name: true,
            size: true,
          },
        },
        order: true,
        showPreview: true,
        url: true,
        linkDescription: true,
        linkTitle: true,
        linkImageUrl: true,
        linkFaviconUrl: true,
        text: true,
      },
      orderBy: { order: 'asc' },
    },
    viewsCount: true,
    _count: {
      select: {
        resourceFeedback: {
          where: { deleted: null },
        },
        collections: true,
      },
    },
  }) satisfies Parameters<typeof prismaClient.resource.findUnique>[0]['select']

const onlySendBy =
  (user: SessionUser | null) =>
  ({ sentById }: { sentById: string }) =>
    sentById === user?.id

const canSeeAllFeedbacksFor =
  (resource: ResourceAuthorizationTarget & { publicFeedback: boolean }) =>
  (user: SessionUser | null) => {
    const { hasPermission } = resourceAuthorization(resource, user)
    const canWrite = hasPermission(ResourcePermissions.WriteResource)

    return resource.publicFeedback || canWrite
  }

type FeedbackCountByRecommendation = {
  notRecommended: number
  moderatelyRecommended: number
  recommended: number
  highlyRecommended: number
}

const DEFAULT_FEEDBACK_COUNT_BY_RECOMMENDATION: FeedbackCountByRecommendation =
  {
    notRecommended: 0,
    moderatelyRecommended: 0,
    recommended: 0,
    highlyRecommended: 0,
  }

const RATING_MAP: Map<number, keyof FeedbackCountByRecommendation> = new Map([
  [1, 'notRecommended'],
  [2, 'moderatelyRecommended'],
  [3, 'recommended'],
  [4, 'highlyRecommended'],
])

const feedbackCountFor =
  (key: keyof FeedbackCountByRecommendation | undefined) => (rating: number) =>
    key ? { [key]: rating } : {}

const toFeedbackCountByRecommendation = (
  feedbackCount: FeedbackCountByRecommendation,
  { _count, rating }: { _count: { rating: number }; rating: number },
) => ({
  ...feedbackCount,
  ...feedbackCountFor(RATING_MAP.get(rating))(_count.rating),
})

const feedbackCountByRating = async (id: string) =>
  prismaClient.resourceFeedback.groupBy({
    by: ['rating'],
    where: { resourceId: id, deleted: null },
    _count: { rating: true },
  })

const feedbackCountByRecommendation = async ({ id }: { id: string }) => {
  const countByRating = await feedbackCountByRating(id)
  return countByRating.reduce(
    toFeedbackCountByRecommendation,
    DEFAULT_FEEDBACK_COUNT_BY_RECOMMENDATION,
  )
}

export const getResource = async (
  where: { slug: string } | { id: string },
  user: SessionUser | null,
) => {
  const resource = await prismaClient.resource.findFirst({
    select: getResourceSelect(user),
    where: {
      ...where,
      deleted: null,
      OR: [
        {
          base: {
            deleted: null,
          },
        },
        { base: null },
      ],
    },
  })

  if (resource == null) return resource

  const allFeedbacks = await prismaClient.resourceFeedback.aggregate({
    where: { resourceId: resource.id, deleted: null },
    _avg: { rating: true },
    _count: { rating: true },
  })

  return {
    ...resource,
    resourceFeedback: canSeeAllFeedbacksFor(resource)(user)
      ? resource.resourceFeedback
      : resource.resourceFeedback.filter(onlySendBy(user)),
    feedbackCount: {
      ...(await feedbackCountByRecommendation(resource)),
    },
    feedbackAverage: allFeedbacks._avg.rating ?? 0,
  }
}

export type Resource = Exclude<Awaited<ReturnType<typeof getResource>>, null>
export type ResourceContent = Resource['contents'][number]
