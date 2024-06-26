import { v4 } from 'uuid'
import z from 'zod'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { CreateCollectionCommandValidation } from '@app/web/server/collections/createCollection'
import { SaveCollectionValidation } from '@app/web/server/collections/SaveCollection'
import {
  authorizeOrThrow,
  forbiddenError,
  invalidError,
} from '@app/web/server/rpc/trpcErrors'
import {
  collectionIdValidation,
  UpdateCollectionImageCommandValidation,
  UpdateCollectionInformationsCommandValidation,
  UpdateCollectionVisibilityCommandValidation,
} from '@app/web/server/collections/updateCollection'
import { createAvailableSlug } from '@app/web/server/slug/createAvailableSlug'
import { createSlug } from '@app/web/utils/createSlug'
import { findFirstAvailableSlug } from '@app/web/server/slug/findFirstAvailableSlug'
import {
  baseAuthorization,
  BasePermissions,
} from '@app/web/authorization/models/baseAuthorization'
import {
  collectionAuthorization,
  CollectionPermissions,
} from '@app/web/authorization/models/collectionAuthorization'
import { baseAuthorizationTargetSelect } from '@app/web/authorization/models/baseAuthorizationTargetSelect'
import { collectionAuthorizationTargetSelect } from '@app/web/authorization/models/collectionAuthorizationTargetSelect'
import { resourceAuthorizationTargetSelect } from '@app/web/authorization/models/resourceAuthorizationTargetSelect'
import {
  resourceAuthorization,
  ResourcePermissions,
} from '@app/web/authorization/models/resourceAuthorization'

export const collectionRouter = router({
  /**
   * A Collection can be saved to a profile or a base.
   * It does not mean the collection itself is being edited, but that it is being saved in a profile or a base.
   */
  save: protectedProcedure
    .input(SaveCollectionValidation)
    .mutation(
      async ({ input: { collectionId, savedById, baseId }, ctx: { user } }) => {
        if (savedById !== user.id) {
          throw forbiddenError()
        }

        if (baseId) {
          const base = await prismaClient.base.findUnique({
            where: { id: baseId },
            select: baseAuthorizationTargetSelect,
          })

          if (!base) {
            throw invalidError('Base not found')
          }

          authorizeOrThrow(
            baseAuthorization(base, user).hasPermission(
              BasePermissions.WriteBase,
            ),
          )
        }

        const collection = await prismaClient.collection.findUnique({
          where: { id: collectionId },
          select: collectionAuthorizationTargetSelect,
        })

        if (!collection) {
          throw invalidError('Collection not found')
        }

        authorizeOrThrow(
          collectionAuthorization(collection, user).hasPermission(
            CollectionPermissions.SaveCollection,
          ),
        )

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
  /**
   * A Collection can be saved/unsaved to a profile or a base.
   * It does not mean the collection itself is being edited, but that it is being saved in a profile or a base.
   */
  unsave: protectedProcedure
    .input(SaveCollectionValidation)
    .mutation(
      async ({ input: { collectionId, savedById, baseId }, ctx: { user } }) => {
        if (savedById !== user.id) {
          throw forbiddenError()
        }
        if (baseId) {
          const base = await prismaClient.base.findUnique({
            where: { id: baseId },
            select: baseAuthorizationTargetSelect,
          })

          if (!base) {
            throw invalidError('Base not found')
          }

          authorizeOrThrow(
            baseAuthorization(base, user).hasPermission(
              BasePermissions.WriteBase,
            ),
          )
        }

        const collection = await prismaClient.collection.findUnique({
          where: { id: collectionId },
          select: collectionAuthorizationTargetSelect,
        })

        if (!collection) {
          throw invalidError('Collection not found')
        }

        authorizeOrThrow(
          collectionAuthorization(collection, user).hasPermission(
            CollectionPermissions.UnsaveCollection,
          ),
        )

        // Collection is saved in profile
        return prismaClient.savedCollection.deleteMany({
          where: baseId
            ? // Remove from base if baseId is provided
              { collectionId, baseId }
            : // Remove from profile if baseId is not provided
              { collectionId, savedById },
        })
      },
    ),
  create: protectedProcedure
    .input(CreateCollectionCommandValidation)
    .mutation(
      async ({
        input: { addResourceId, ...collectionData },
        ctx: { user },
      }) => {
        if (collectionData.baseId) {
          const base = await prismaClient.base.findUnique({
            where: { id: collectionData.baseId },
            select: baseAuthorizationTargetSelect,
          })

          if (!base) {
            throw invalidError('Base not found')
          }

          authorizeOrThrow(
            baseAuthorization(base, user).hasPermission(
              BasePermissions.WriteBase,
            ),
          )
        }

        if (addResourceId) {
          const resource = await prismaClient.resource.findUnique({
            where: { id: addResourceId },
            select: resourceAuthorizationTargetSelect,
          })

          if (!resource) {
            throw invalidError('Resource not found')
          }

          authorizeOrThrow(
            resourceAuthorization(resource, user).hasPermission(
              ResourcePermissions.ReadGeneralResourceInformation,
            ),
          )
        }

        const slug = await createAvailableSlug(
          collectionData.title,
          'collections',
        )

        return prismaClient.collection.create({
          data: {
            ...collectionData,
            slug,
            createdById: user.id,
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
    .mutation(async ({ input: { id, ...informations }, ctx: { user } }) => {
      const collection = await prismaClient.collection.findUnique({
        where: { id, deleted: null },
        select: { slug: true, ...collectionAuthorizationTargetSelect },
      })

      if (!collection) {
        throw invalidError('Collection not found')
      }

      authorizeOrThrow(
        collectionAuthorization(collection, user).hasPermission(
          CollectionPermissions.WriteCollection,
        ),
      )

      const afterSlug = createSlug(informations.title)

      // Get new slug if it has changed
      const slug =
        collection.slug === afterSlug
          ? undefined
          : await findFirstAvailableSlug(afterSlug, 'collections')

      return prismaClient.collection.update({
        where: { id },
        data: { ...informations, slug, updated: new Date() },
      })
    }),
  updateImage: protectedProcedure
    .input(UpdateCollectionImageCommandValidation)
    .mutation(async ({ input: { id, imageId }, ctx: { user } }) => {
      const collection = await prismaClient.collection.findUnique({
        where: { id, deleted: null },
        select: { slug: true, ...collectionAuthorizationTargetSelect },
      })

      if (!collection) {
        throw invalidError('Collection not found')
      }

      authorizeOrThrow(
        collectionAuthorization(collection, user).hasPermission(
          CollectionPermissions.WriteCollection,
        ),
      )
      return prismaClient.collection.update({
        where: { id },
        data: { imageId, updated: new Date() },
      })
    }),
  updateVisibility: protectedProcedure
    .input(UpdateCollectionVisibilityCommandValidation)
    .mutation(async ({ input: { id, isPublic }, ctx: { user } }) => {
      const collection = await prismaClient.collection.findUnique({
        where: { id, deleted: null },
        select: { slug: true, ...collectionAuthorizationTargetSelect },
      })

      if (!collection) {
        throw invalidError('Collection not found')
      }

      authorizeOrThrow(
        collectionAuthorization(collection, user).hasPermission(
          CollectionPermissions.WriteCollection,
        ),
      )
      return prismaClient.collection.update({
        where: { id },
        data: { isPublic, updated: new Date() },
      })
    }),
  delete: protectedProcedure
    .input(z.object({ id: collectionIdValidation }))
    .mutation(async ({ input, ctx: { user } }) => {
      const collection = await prismaClient.collection.findUnique({
        where: { id: input.id, deleted: null },
        select: { slug: true, ...collectionAuthorizationTargetSelect },
      })

      if (!collection) {
        throw invalidError('Collection not found')
      }

      authorizeOrThrow(
        collectionAuthorization(collection, user).hasPermission(
          CollectionPermissions.DeleteCollection,
        ),
      )
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
