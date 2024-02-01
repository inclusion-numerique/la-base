import { v4 } from 'uuid'
import z from 'zod'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { CreateCollectionCommandValidation } from '@app/web/server/collections/createCollection'
import { SaveCollectionValidation } from '@app/web/server/collections/SaveCollection'
import { forbiddenError, invalidError } from '@app/web/server/rpc/trpcErrors'
import {
  collectionIdValidation,
  UpdateCollectionImageCommandValidation,
  UpdateCollectionInformationsCommandValidation,
  UpdateCollectionVisibilityCommandValidation,
} from '@app/web/server/collections/updateCollection'
import { createAvailableSlug } from '@app/web/server/slug/createAvailableSlug'
import { createSlug } from '@app/web/utils/createSlug'
import { findFirstAvailableSlug } from '@app/web/server/slug/findFirstAvailableSlug'

export const collectionRouter = router({
  save: protectedProcedure
    .input(SaveCollectionValidation)
    .mutation(
      ({ input: { collectionId, savedById, baseId }, ctx: { user } }) => {
        // TODO Security based on collection visibility for the ctx user

        if (savedById !== user.id) {
          throw forbiddenError()
        }

        return prismaClient.savedCollection.create({
          data: { collectionId, savedById, baseId },
          select: {
            id: true,
            base: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        })
      },
    ),
  unsave: protectedProcedure
    .input(SaveCollectionValidation)
    .mutation(async ({ input: { collectionId, savedById, baseId } }) => {
      // TODO Security based on collection visibility and base membership for (the ctx user
      // TODO If collection is saved in a base, then the user must be a member of that base

      if (baseId) {
        return prismaClient.savedCollection.deleteMany({
          where: { collectionId, baseId },
        })
      }

      // Collection is saved in profile
      return prismaClient.savedCollection.deleteMany({
        where: { collectionId, savedById, baseId: null },
      })
    }),
  create: protectedProcedure
    .input(CreateCollectionCommandValidation)
    .mutation(
      async ({
        input: { addResourceId, ...collectionData },
        ctx: { user },
      }) => {
        // TODO Security on baseId

        const slug = await createAvailableSlug(
          collectionData.title,
          'collections',
        )

        return prismaClient.collection.create({
          data: {
            ...collectionData,
            slug,
            ownerId: user.id,
            resources: addResourceId
              ? {
                  create: {
                    id: v4(),
                    resourceId: addResourceId,
                    added: new Date(),
                  },
                }
              : undefined,
          },
        })
      },
    ),
  updateInformations: protectedProcedure
    .input(UpdateCollectionInformationsCommandValidation)
    .mutation(async ({ input: { id, ...informations } }) => {
      // TODO Security check and mutualise security for all update mutations

      const collection = await prismaClient.collection.findUnique({
        where: { id, deleted: null },
        select: { slug: true },
      })

      if (!collection) {
        throw invalidError('Collection not found')
      }

      const afterSlug = createSlug(informations.title)

      // Get new slug if it has changed
      const slug =
        collection.slug === afterSlug
          ? undefined
          : await findFirstAvailableSlug(afterSlug, 'collections')

      return prismaClient.collection.update({
        where: { id },
        data: { ...informations, slug },
      })
    }),
  updateImage: protectedProcedure
    .input(UpdateCollectionImageCommandValidation)
    .mutation(async ({ input: { id, imageId } }) =>
      prismaClient.collection.update({
        where: { id },
        data: { imageId },
      }),
    ),
  updateVisibility: protectedProcedure
    .input(UpdateCollectionVisibilityCommandValidation)
    .mutation(async ({ input: { id, isPublic } }) =>
      prismaClient.collection.update({
        where: { id },
        data: { isPublic },
      }),
    ),
  delete: protectedProcedure
    .input(z.object({ id: collectionIdValidation }))
    .mutation(async ({ input }) => {
      const timestamp = new Date()
      return prismaClient.collection.update({
        where: { id: input.id },
        data: {
          deleted: timestamp,
          updated: timestamp,
        },
      })
    }),
})
