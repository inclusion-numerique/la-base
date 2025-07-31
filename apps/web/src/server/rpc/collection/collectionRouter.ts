import {
  BasePermissions,
  baseAuthorization,
} from '@app/web/authorization/models/baseAuthorization'
import { baseAuthorizationTargetSelect } from '@app/web/authorization/models/baseAuthorizationTargetSelect'
import {
  CollectionPermissions,
  collectionAuthorization,
} from '@app/web/authorization/models/collectionAuthorization'
import { collectionAuthorizationTargetSelect } from '@app/web/authorization/models/collectionAuthorizationTargetSelect'
import {
  ResourcePermissions,
  resourceAuthorization,
} from '@app/web/authorization/models/resourceAuthorization'
import { resourceAuthorizationTargetSelect } from '@app/web/authorization/models/resourceAuthorizationTargetSelect'
import { prismaClient } from '@app/web/prismaClient'
import { CreateCollectionCommandValidation } from '@app/web/server/collections/createCollection'
import {
  UpdateCollectionImageCommandValidation,
  UpdateCollectionInformationsCommandValidation,
  UpdateCollectionOrdersCommandValidation,
  UpdateCollectionVisibilityCommandValidation,
  collectionIdValidation,
} from '@app/web/server/collections/updateCollection'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { authorizeOrThrow, invalidError } from '@app/web/server/rpc/trpcErrors'
import { createAvailableSlug } from '@app/web/server/slug/createAvailableSlug'
import { findFirstAvailableSlug } from '@app/web/server/slug/findFirstAvailableSlug'
import { createSlug } from '@app/web/utils/createSlug'
import { v4 } from 'uuid'
import z from 'zod'

export const collectionRouter = router({
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
  updateOrders: protectedProcedure
    .input(UpdateCollectionOrdersCommandValidation)
    .mutation(async ({ input, ctx: { user } }) =>
      prismaClient.$transaction(async (tx) =>
        Promise.all(
          input.collections.map(async (col) => {
            const collection = await tx.collection.findUnique({
              where: { id: col.id },
            })

            if (!collection) {
              throw invalidError('Collection not found')
            }
            authorizeOrThrow(
              collectionAuthorization(collection, user).hasPermission(
                CollectionPermissions.WriteCollection,
              ),
            )
            return tx.collection.update({
              where: { id: col.id },
              data: { order: col.order },
            })
          }),
        ),
      ),
    ),
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
