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
      isPublic: true,
      members: {
        select: {
          accepted: true,
          memberId: true,
        },
      },
    },
  },
  contributors: {
    select: {
      contributorId: true,
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
} satisfies Parameters<typeof prismaClient.resource.findUnique>[0]['select']

export const getResource = async (where: { slug: string } | { id: string }) =>
  prismaClient.resource.findFirst({
    select: getResourceSelect,
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

export type Resource = Exclude<Awaited<ReturnType<typeof getResource>>, null>
export type ResourceContent = Resource['contents'][number]
