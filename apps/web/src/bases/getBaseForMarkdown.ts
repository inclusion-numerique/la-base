import { prismaClient } from '@app/web/prismaClient'

export const getBaseForMarkdown = async (
  input: { slug: string } | { id: string },
) =>
  prismaClient.base.findUnique({
    where: {
      deleted: null,
      ...('slug' in input ? { slug: input.slug } : { id: input.id }),
    },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      isPublic: true,
    },
  })

export type BaseForMarkdown = Exclude<
  Awaited<ReturnType<typeof getBaseForMarkdown>>,
  null
>
