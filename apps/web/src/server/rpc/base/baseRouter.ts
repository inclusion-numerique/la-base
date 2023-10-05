import z from 'zod'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { CreateBaseCommandValidation } from '@app/web/server/bases/createBase'
import { UpdateBaseCommandValidation } from '@app/web/server/bases/updateBase'
import { handleResourceMutationCommand } from '../../resources/feature/handleResourceMutationCommand'
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
          members: { create: [{ memberId: user.id, isAdmin: true }] },
        },
      })
    }),
  mutate: protectedProcedure
    .input(UpdateBaseCommandValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      if ('isPublic' in input.data && input.data.isPublic === false) {
        const resources = await prismaClient.resource.findMany({
          select: { id: true },
          where: { baseId: input.id, isPublic: true },
        })

        return prismaClient.$transaction(async (transaction) =>
          Promise.all([
            ...resources.map((resource) =>
              handleResourceMutationCommand(
                {
                  name: 'ChangeVisibility',
                  payload: { resourceId: resource.id, isPublic: false },
                },
                { user },
                transaction,
              ),
            ),
            transaction.base.update({
              where: { id: input.id },
              data: input.data,
            }),
          ]),
        )
      }
      return prismaClient.base.update({
        where: { id: input.id },
        data: input.data,
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
