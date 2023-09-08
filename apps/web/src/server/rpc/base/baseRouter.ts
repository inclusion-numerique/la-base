import z from 'zod'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { prismaClient } from '@app/web/prismaClient'
import { handleResourceMutationCommand } from '../../resources/feature/handleResourceMutationCommand'
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
    .mutation(async ({ input, ctx: { user } }) => {
      const timestamp = new Date()
      const resources = await prismaClient.resource.findMany({
        select: { id: true },
        where: { baseId: input.id },
      })
      return prismaClient.$transaction(async (transaction) =>
        Promise.all([
          transaction.base.update({
            data: {
              deleted: timestamp,
              updated: timestamp,
            },
            where: { id: input.id },
          }),
          ...resources.map((resource) =>
            handleResourceMutationCommand(
              {
                name: 'Delete',
                payload: {
                  resourceId: resource.id,
                },
              },
              { user },
              transaction,
            ),
          ),
        ]),
      )
    }),
})
