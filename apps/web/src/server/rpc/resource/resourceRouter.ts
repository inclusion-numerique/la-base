import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { prismaClient } from '@app/web/prismaClient'
import { v4 } from 'uuid'
import { createSlug } from '@app/web/utils/createSlug'
import { invalidError } from '@app/web/server/rpc/trpcErrors'
import { CreateResourceValidation } from '@app/web/server/rpc/resource/createResource'

const createUniqueSlug = async (title: string) => {
  const baseSlug = createSlug(title)
  const uniqueSuffix = Math.random().toString(10).slice(2, 8)

  const possibleSlugs = [
    baseSlug,
    `${baseSlug}-${uniqueSuffix.slice(0, 1)}`,
    `${baseSlug}-${uniqueSuffix.slice(0, 2)}`,
    `${baseSlug}-${uniqueSuffix.slice(0, 3)}`,
    `${baseSlug}-${uniqueSuffix.slice(0, 4)}`,
  ]

  const existing = await prismaClient.resource.findMany({
    where: {
      OR: possibleSlugs.map((slug) => ({ slug })),
    },
    select: { slug: true },
  })

  const slug = possibleSlugs.find(
    (possibleSlug) => !existing.some((item) => item.slug === possibleSlug),
  )
  if (!slug) {
    throw invalidError('Failed to generate slug')
  }
  return slug
}

export const resourceRouter = router({
  create: protectedProcedure
    .input(CreateResourceValidation)
    .mutation(
      async ({ input: { baseId, title, description }, ctx: { user } }) => {
        const slug = await createUniqueSlug(title)

        return prismaClient.resource.create({
          data: {
            id: v4(),
            slug,
            title,
            titleDuplicationCheckSlug: createSlug(title),
            description,
            createdById: user.id,
            baseId,
          },
          select: {
            id: true,
            slug: true,
          },
        })
      },
    ),
})
