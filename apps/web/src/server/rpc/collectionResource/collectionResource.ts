import {
  collectionAuthorization,
  CollectionPermissions,
} from '@app/web/authorization/models/collectionAuthorization'
import { prismaClient } from '@app/web/prismaClient'
import { UpdateCollectionResourcesOrdersCommandValidation } from '@app/web/server/collectionsResources/updateResource'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { authorizeOrThrow, invalidError } from '@app/web/server/rpc/trpcErrors'

export const collectionResourceRouter = router({
  updateOrders: protectedProcedure
    .input(UpdateCollectionResourcesOrdersCommandValidation)
    .mutation(async ({ input, ctx: { user } }) =>
      prismaClient.$transaction(async (tx) =>
        Promise.all(
          input.resources.map(async (res) => {
            const collectionResource = await tx.collectionResource.findUnique({
              where: { id: res.id },
            })

            if (!collectionResource) {
              throw invalidError('Collection resource not found')
            }

            const collection = await tx.collection.findUnique({
              where: { id: collectionResource.collectionId },
            })
            // it should never happens since we have a unique constraint on collectionResource
            // but we need this check for the collectionAuthorization method below
            if (!collection) {
              throw invalidError('Collection not found')
            }

            authorizeOrThrow(
              collectionAuthorization(collection, user).hasPermission(
                CollectionPermissions.WriteCollection,
              ),
            )

            return tx.collectionResource.update({
              where: { id: res.id },
              data: { order: res.order },
            })
          }),
        ),
      ),
    ),
})
