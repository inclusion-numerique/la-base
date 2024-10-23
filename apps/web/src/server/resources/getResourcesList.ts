import type { Prisma } from '@prisma/client'
import { Theme } from '@prisma/client'
import { pascalCase, snakeCase } from 'change-case'
import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
import {
  Category,
  categoryThemes,
  themeCategories,
} from '@app/web/themes/themes'

export const resourceListSelect = (user: { id: string } | null) =>
  ({
    id: true,
    title: true,
    slug: true,
    created: true,
    updated: true,
    published: true,
    deleted: true,
    createdById: true,
    baseId: true,
    lastPublished: true,
    excerpt: true,
    isPublic: true,
    image: {
      select: {
        id: true,
        altText: true,
      },
    },
    createdBy: {
      select: {
        name: true,
        id: true,
        slug: true,
        firstName: true,
        isPublic: true,
        lastName: true,
        image: {
          select: {
            id: true,
            altText: true,
          },
        },
      },
    },
    resourceFeedback: {
      where: {
        deleted: null,
      },
      select: {
        rating: true,
      },
    },
    contributors: {
      select: {
        contributorId: true,
      },
      where: {
        contributorId: user?.id,
      },
    },
    base: {
      select: {
        id: true,
        title: true,
        slug: true,
        isPublic: true,
        image: {
          select: {
            id: true,
            altText: true,
          },
        },
        members: {
          select: { accepted: true, memberId: true, isAdmin: true },
          where: {
            accepted: { not: null },
            memberId: user?.id,
          },
        },
      },
    },
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
    _count: {
      select: {
        collections: true,
        views: true,
        resourceFeedback: {
          where: { deleted: null },
        },
      },
    },
  }) satisfies Parameters<typeof prismaClient.resource.findUnique>[0]['select']

export const computeResourcesListWhereForUser = (
  user?: Pick<SessionUser, 'id'> | null,
  where: Prisma.ResourceWhereInput = {},
): Prisma.ResourceWhereInput => {
  const whereResourceIsPublic = {
    isPublic: true,
  }

  const authorizationWhere: Prisma.ResourceWhereInput = user
    ? {
        OR: [
          whereResourceIsPublic,
          // Public or created by user
          { createdById: user.id },
          // User is a contributor
          {
            contributors: {
              some: {
                contributorId: user.id,
              },
            },
          },
          // User is member of base
          {
            base: {
              members: {
                some: {
                  accepted: { not: null },
                  memberId: user.id,
                },
              },
            },
          },
        ],
      }
    : whereResourceIsPublic

  const baseNotDeleted: Prisma.ResourceWhereInput = {
    OR: [
      {
        base: {
          deleted: null,
        },
      },
      { baseId: null },
    ],
  }

  const resourceNotDeleted: Prisma.ResourceWhereInput = {
    deleted: null,
  }

  return {
    deleted: null,
    AND: [authorizationWhere, resourceNotDeleted, baseNotDeleted, where],
  }
}

const computeResourcesListWhereForUserAndProfile = (
  profileId: string,
  user?: Pick<SessionUser, 'id'> | null,
) =>
  computeResourcesListWhereForUser(user, {
    OR: [
      {
        createdById: profileId,
      },
      {
        AND: [
          {
            contributors: {
              some: {
                contributorId: profileId,
              },
            },
          },
          {
            events: {
              some: {
                byId: profileId,
              },
            },
          },
        ],
      },
    ],
  })

export const getResourcesCountByTheme = async () => {
  // theme is snake_case in database
  const counts = await prismaClient.$queryRaw<
    { theme: Theme; count: number }[]
  >`
      SELECT unnest(themes) AS theme, CAST(COUNT(DISTINCT resources.id) AS integer) AS "count"
      FROM resources
      LEFT JOIN bases ON resources.base_id = bases.id
      WHERE resources.is_public = true
        AND resources.deleted IS NULL
        AND (bases.id IS NULL OR bases.deleted IS NULL)
      GROUP BY theme
      ORDER BY theme ASC;
  `

  // Initialize object with every theme (so that we have 0 for themes with no resources)
  const themes = Object.fromEntries(
    Object.keys(themeCategories).map((theme) => [theme, 0]),
  ) as { [theme in Theme]: number }

  // Add the counts for each theme that have some resources
  // Convert snake case from db to enum value
  for (const { theme, count } of counts) {
    themes[pascalCase(theme) as Theme] = count
  }

  return themes
}

export const getResourcesCountByCategory = async () => {
  // The categoryThemes object is a map of category to themes[]
  // Convert categoryThemes object to a string suitable for SQL WITH clause
  const categoryThemesSQL = Object.entries(categoryThemes)
    .map(
      ([category, themes]) =>
        `SELECT '${category}' AS category, ARRAY[${themes
          .map((theme) => `'${snakeCase(theme)}'::theme`)
          .join(', ')}]::theme[] AS themes`,
    )
    .join(' UNION ALL ')

  const querySql = `
      WITH categories AS (${categoryThemesSQL})
      SELECT categories.category, CAST(COUNT(DISTINCT resources.id) AS integer) AS count
      FROM resources
        JOIN categories ON resources.themes && categories.themes
        LEFT JOIN bases ON resources.base_id = bases.id
      WHERE resources.is_public = true
        AND resources.deleted IS NULL
        AND resources.published IS NOT NULL
        AND (bases.id IS NULL OR bases.deleted IS NULL)
      GROUP BY categories.category
      ORDER BY categories.category ASC;
  `

  // Use the categoryThemesSQL in the WITH clause
  const counts =
    await prismaClient.$queryRawUnsafe<{ category: Category; count: number }[]>(
      querySql,
    )
  // Initialize object with every category (so that we have 0 for categories with no resources)
  const categories = Object.fromEntries(
    Object.keys(categoryThemes).map((category) => [category, 0]),
  ) as { [category in Category]: number }

  // Add the counts for each category that have some resources
  for (const { category, count } of counts) {
    categories[category] = count
  }

  return categories
}

const toRatingsSum = (ratingSum: number, { rating }: { rating: number }) =>
  ratingSum + rating

export const toResourceWithFeedbackAverage = <T>(
  resource: T & { resourceFeedback: { rating: number }[] },
) => {
  const { resourceFeedback, ...nextResource } = resource

  return {
    ...nextResource,
    feedbackAverage:
      resourceFeedback.reduce(toRatingsSum, 0) / resourceFeedback.length,
  }
}

export const getProfileResources = async (
  profileId: string,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const where = computeResourcesListWhereForUserAndProfile(profileId, user)

  const profileResources = await prismaClient.resource.findMany({
    where,
    select: resourceListSelect(user),
    orderBy: [
      { lastPublished: 'desc' },
      {
        updated: 'desc',
      },
    ],
  })

  return profileResources.map(toResourceWithFeedbackAverage)
}

export const getProfileResourcesCount = async (
  profileId: string,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const where = computeResourcesListWhereForUserAndProfile(profileId, user)

  return prismaClient.resource.count({
    where,
  })
}

export type ResourceListItem = Awaited<
  ReturnType<typeof getProfileResources>
>[number]
