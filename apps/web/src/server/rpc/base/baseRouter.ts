import z from 'zod'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { prismaClient } from '@app/web/prismaClient'
import { CreateBaseCommandValidation } from './createBase'
import { createUniqueSlug } from './createUniqueSlug'

// TODO - Check user permission
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
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const timestamp = new Date()
      return prismaClient.base.update({
        data: {
          deleted: timestamp,
          updated: timestamp,
        },
        where: { id: input.id },
      })
    }),
})
