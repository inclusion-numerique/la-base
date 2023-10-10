import type { Prisma } from '@prisma/client'
import { Theme } from '@prisma/client'
import { pascalCase } from 'change-case'
import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
import { themeCategories } from '@app/web/themes/themes'
import { SearchParams } from '@app/web/server/search/searchQueryParams'

const pageSize = 4

const takeAndSkip = (page: number) => ({
  take: pageSize,
  skip: (page - 1) * pageSize,
})

export const resourceListSelect = {
  id: true,
  title: true,
  slug: true,
  created: true,
  updated: true,
  published: true,
  description: true,
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
    },
  },
  base: {
    select: {
      title: true,
      slug: true,
      isPublic: true,
    },
  },
} satisfies Parameters<typeof prismaClient.resource.findUnique>[0]['select']

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

  return {
    deleted: null,
    AND: [authorizationWhere, baseNotDeleted, where],
  }
}

const computeResourceSearchWhere = (
  searchParams: SearchParams,
): Prisma.ResourceWhereInput | undefined => {
  const conditions: Prisma.ResourceWhereInput[] = []

  if (searchParams.query) {
    conditions.push({
      OR: [
        { title: { contains: searchParams.query, mode: 'insensitive' } },
        { description: { contains: searchParams.query, mode: 'insensitive' } },
      ],
    })
  }

  if (searchParams.themes) {
    conditions.push({
      themes: { hasSome: searchParams.themes },
    })
  }

  if (searchParams.targetAudiences) {
    conditions.push({
      targetAudiences: { hasSome: searchParams.targetAudiences },
    })
  }

  if (searchParams.supportTypes) {
    conditions.push({
      supportTypes: { hasSome: searchParams.supportTypes },
    })
  }

  return {
    AND: conditions,
  }
}

export const getResourcesList = async ({
  user,
  searchParams,
}: {
  searchParams: SearchParams
  user?: Pick<SessionUser, 'id'> | null
}) => {
  const where = computeResourcesListWhereForUser(
    user,
    computeResourceSearchWhere(searchParams),
  )

  return prismaClient.resource.findMany({
    where,
    select: resourceListSelect,
    orderBy: [
      {
        created: 'desc',
      },
    ],
    ...takeAndSkip(searchParams.page),
  })
}

export const getResourcesCount = ({
  user,
  query,
}: {
  user?: Pick<SessionUser, 'id'> | null
  query?: string
}) =>
  prismaClient.resource.count({
    where: computeResourcesListWhereForUser(
      user,
      computeResourceSearchWhere(query),
    ),
  })

// TODO We have to use raw query for certain type of operations, make the where clause work in those cases
export const getResourcesCountByTheme = async ({
  user,
  query,
}: {
  user?: Pick<SessionUser, 'id'> | null
  query?: string
}) => {
  // theme is snake_case in database
  const counts = await prismaClient.$queryRaw<
    { theme: Theme; count: number }[]
  >`
      SELECT unnest(themes) AS theme, CAST(COUNT(*) AS integer) AS "count"
      FROM resources
      GROUP BY theme
      ORDER BY theme ASC;
  `

  // Initialize object with every theme (so that we have 0 for themes with no resources)
  const result = Object.fromEntries(
    Object.keys(themeCategories).map((theme) => [theme, 0]),
  ) as { [theme in Theme]: number }

  // Add the counts for each theme that have some resources
  // Convert snake case from db to enum value
  for (const { theme, count } of counts) {
    result[pascalCase(theme)] = count
  }

  return result
}

export const getProfileResources = async (
  profileId: string,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const where = computeResourcesListWhereForUser(user, {
    createdById: profileId,
  })

  return prismaClient.resource.findMany({
    where,
    select: resourceListSelect,
    orderBy: [
      {
        created: 'desc',
      },
    ],
  })
}

export const getProfileResourcesCount = async (
  profileId: string,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const where = computeResourcesListWhereForUser(user, {
    createdById: profileId,
  })

  return prismaClient.resource.count({
    where,
  })
}

export type ResourceListItem = Exclude<
  Awaited<ReturnType<typeof getResourcesList>>,
  null
>[number]
