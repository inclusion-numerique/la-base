import { prismaClient } from '@app/web/prismaClient'

export const getResourcesSlug = async () =>
  prismaClient.resource.findMany({
    select: { slug: true },
  })

export const getResourcesList = async () =>
  prismaClient.resource.findMany({
    select: {
      title: true,
      slug: true,
    },
    orderBy: [
      {
        created: 'desc',
      },
    ],
  })

export const getResource = async (slug: string) =>
  prismaClient.resource.findUnique({
    select: {
      title: true,
    },
    where: {
      slug,
    },
  })

export type ResourceItem = Exclude<
  Awaited<ReturnType<typeof getResourcesList>>,
  null
>[number]

export type Resource = Exclude<Awaited<ReturnType<typeof getResource>>, null>
