import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { prismaClient } from '@app/web/prismaClient'
import { CreateBaseCommandValidation } from './createBase'
import { createUniqueSlug } from './createUniqueSlug'

export const baseRouter = router({
  create: protectedProcedure
    .input(CreateBaseCommandValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      const slug = await createUniqueSlug(input.title)

      return prismaClient.base.create({
        data: {
          ...input,
          slug,
          titleDuplicationCheckSlug: slug,
          ownerId: user.id,
        },
      })
    }),
})
