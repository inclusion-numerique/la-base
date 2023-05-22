import { prismaClient } from '@app/web/prismaClient'

export const getResourceSelect = {
  id: true,
  title: true,
  description: true,
  slug: true,
  published: true,
  created: true,
  updated: true,
  isPublic: true,
  createdById: true,
  legacyId: true,
  createdBy: {
    select: {
      name: true,
      id: true,
    },
  },
  baseId: true,
  base: {
    select: {
      id: true,
      title: true,
      slug: true,
    },
  },
  imageId: true,
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
      imageId: true,
      image: {
        select: {
          id: true,
          altText: true,
        },
      },
      fileKey: true,
      file: {
        select: {
          mimeType: true,
          key: true,
          name: true,
        },
      },
      order: true,
      showPreview: true,
      url: true,
      linkedResourceId: true,
      legacyLinkedResourceId: true,
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

export const getResource = async (where: { slug: string } | { id: string }) =>
  prismaClient.resource.findUnique({
    select: getResourceSelect,
    where,
  })

export type Resource = Exclude<Awaited<ReturnType<typeof getResource>>, null>
export type ResourceContent = Resource['contents'][number]
