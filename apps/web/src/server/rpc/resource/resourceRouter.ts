import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { prismaClient } from '@app/web/prismaClient'
import { v4 } from 'uuid'
import { createSlug } from '@app/web/utils/createSlug'
import { CreateResourceValidation } from '@app/web/server/rpc/resource/createResource'

const createUniqueSlug = async (title: string) => {
  const resourcesCount = await prismaClient.resource.count()
  return `${createSlug(title)}-${resourcesCount + 1}`
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
