import { prismaClient } from '@app/web/prismaClient'

export const getResourceForMarkdown = async (
  input: { slug: string } | { id: string },
) =>
  prismaClient.resource.findUnique({
    where: {
      deleted: null,
      ...('slug' in input ? { slug: input.slug } : { id: input.id }),
    },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      created: true,
      updated: true,
      isPublic: true,
      published: true,
      beneficiaries: true,
      professionalSectors: true,
      resourceTypes: true,
      themes: true,
      contents: {
        select: {
          id: true,
          type: true,
          title: true,
          caption: true,
          imageAltText: true,
          image: {
            select: {
              upload: {
                select: {
                  name: true,
                },
              },
            },
          },
          file: {
            select: {
              name: true,
            },
          },
          linkTitle: true,
          linkDescription: true,
          url: true,
          text: true,
        },
        orderBy: {
          order: 'asc',
        },
      },
    },
  })

export type ResourceForMarkdown = Exclude<
  Awaited<ReturnType<typeof getResourceForMarkdown>>,
  null
>
