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

export const getResourceSelect = {
  id: true,
  title: true,
  description: true,
  slug: true,
  created: true,
  updated: true,
  isPublic: true,
  contents: {
    select: {
      title: true,
      type: true,
      caption: true,
      altText: true,
      image: true,
      file: true,
      showPreview: true,
      url: true,
      linkedResource: {
        select: {
          slug: true,
          title: true,
          description: true,
        },
      },
      text: true,
    },
    orderBy: { order: 'asc' },
  },
  createdBy: {
    select: {
      name: true,
      id: true,
    },
  },
  baseId: true,
  base: {
    select: {
      title: true,
      slug: true,
    },
  },
} satisfies Parameters<typeof prismaClient.resource.findUnique>[0]['select']

export const getResource = async (slug: string) =>
  prismaClient.resource.findUnique({
    select: getResourceSelect,
    where: {
      slug,
    },
  })

export type Resource = Exclude<Awaited<ReturnType<typeof getResource>>, null>
export type ResourceContent = Resource['contents'][number]
