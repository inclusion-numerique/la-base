import { prismaClient } from '@app/web/prismaClient'

export const getResourcesList = async (take?: number, skip?: number) =>
  prismaClient.resource.findMany({
    select: {
      title: true,
      slug: true,
      created: true,
      updated: true,
      description: true,
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
        },
      },
    },
    orderBy: [
      {
        created: 'desc',
      },
    ],
    skip,
    take,
  })

export type ResourceListItem = Exclude<
  Awaited<ReturnType<typeof getResourcesList>>,
  null
>[number]

export const getResource = async (slug: string) =>
  prismaClient.resource.findUnique({
    select: {
      title: true,
      description: true,
      slug: true,
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
        },
      },
    },
    where: {
      slug,
    },
  })

export type Resource = Exclude<Awaited<ReturnType<typeof getResource>>, null>
