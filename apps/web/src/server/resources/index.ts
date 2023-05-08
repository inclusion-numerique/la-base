import { prismaClient } from '@app/web/prismaClient'

export const getResourcesList = async (take?: number, skip?: number) =>
  prismaClient.resource.findMany({
    select: {
      title: true,
      slug: true,
      created: true,
      updated: true,
      description: true,
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
  createdBy: {
    select: {
      name: true,
      id: true,
    },
  },
  base: {
    select: {
      id: true,
      title: true,
      slug: true,
    },
  },
  image: {
    select: {
      id: true,
      altText: true,
    },
  },
  contents: {
    select: {
      id: true,
      title: true,
      type: true,
      caption: true,
      image: {
        select: {
          id: true,
          altText: true,
        },
      },
      file: {
        select: {
          mimeType: true,
          key: true,
          name: true,
        },
      },
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
