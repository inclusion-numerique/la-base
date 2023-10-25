import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { CreateCollectionCommandValidation } from '@app/web/server/collections/createCollection'

export const collectionRouter = router({
  create: protectedProcedure
    .input(CreateCollectionCommandValidation)
    .mutation(async ({ input, ctx: { user } }) =>
      prismaClient.collection.create({
        data: {
          ...input,
          ownerId: user.id,
        },
      }),
    ),
})
