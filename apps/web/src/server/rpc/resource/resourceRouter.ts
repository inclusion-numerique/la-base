import { v4 } from 'uuid'
import z from 'zod'
import {
  baseAuthorization,
  BasePermissions,
} from '@app/web/authorization/models/baseAuthorization'
import { baseAuthorizationTargetSelect } from '@app/web/authorization/models/baseAuthorizationTargetSelect'
import {
  collectionAuthorization,
  CollectionPermissions,
} from '@app/web/authorization/models/collectionAuthorization'
import { collectionAuthorizationTargetSelect } from '@app/web/authorization/models/collectionAuthorizationTargetSelect'
import {
  resourceAuthorization,
  ResourcePermissions,
} from '@app/web/authorization/models/resourceAuthorization'
import { resourceAuthorizationTargetSelect } from '@app/web/authorization/models/resourceAuthorizationTargetSelect'
import { prismaClient } from '@app/web/prismaClient'
import {
  CreateResourceCommand,
  CreateResourceCommandClientValidation,
} from '@app/web/server/resources/feature/CreateResource'
import { ResourceMutationCommandsValidation } from '@app/web/server/resources/feature/features'
import { handleResourceCreationCommand } from '@app/web/server/resources/feature/handleResourceCreationCommand'
import { handleResourceMutationCommand } from '@app/web/server/resources/feature/handleResourceMutationCommand'
import { SendResourceFeedbackValidation } from '@app/web/server/resources/sendResourceFeedback'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { authorizeOrThrow, notFoundError } from '@app/web/server/rpc/trpcErrors'

export const resourceRouter = router({
  create: protectedProcedure
    .input(CreateResourceCommandClientValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      // Security is handled in this mutation as it is the responsibility of this layer and not the event sourcing layer
      if (input.payload.baseId) {
        const base = await prismaClient.base.findUnique({
          where: { id: input.payload.baseId },
          select: baseAuthorizationTargetSelect,
        })

        if (!base) {
          throw notFoundError()
        }

        authorizeOrThrow(
          baseAuthorization(base, user).hasPermission(
            BasePermissions.WriteBase,
          ),
        )
      }

      const command: CreateResourceCommand = {
        ...input,
        payload: { ...input.payload, resourceId: v4() },
      }

      return handleResourceCreationCommand(command, { user })
    }),
  delete: protectedProcedure
    .input(z.object({ resourceId: z.string() }))
    .mutation(async ({ input }) => {
      const resource = await prismaClient.resource.findUnique({
        where: { id: input.resourceId },
      })

      if (!resource) {
        throw notFoundError()
      }

      const timestamp = new Date()

      return prismaClient.resource.update({
        where: { id: input.resourceId },
        data: {
          deleted: timestamp,
          updated: timestamp,
        },
      })
    }),
  mutate: protectedProcedure
    .input(ResourceMutationCommandsValidation)
    .mutation(async ({ input: command, ctx: { user } }) => {
      // Security is handled in this mutation as it is the responsibility of this layer and not the event sourcing layer
      const resource = await prismaClient.resource.findUnique({
        where: { id: command.payload.resourceId },
        select: resourceAuthorizationTargetSelect,
      })

      if (!resource) {
        throw notFoundError()
      }

      // Check that the user has write access to the destination base
      if (command.name === 'ChangeBase' && command.payload.baseId) {
        const base = await prismaClient.base.findUnique({
          where: { id: command.payload.baseId },
          select: baseAuthorizationTargetSelect,
        })

        if (!base) {
          throw notFoundError()
        }

        authorizeOrThrow(
          baseAuthorization(base, user).hasPermission(
            BasePermissions.WriteBase,
          ),
        )
      }

      // Check special delete permission
      authorizeOrThrow(
        resourceAuthorization(resource, user).hasPermission(
          command.name === 'Delete'
            ? ResourcePermissions.DeleteResource
            : ResourcePermissions.WriteResource,
        ),
      )

      return handleResourceMutationCommand(command, { user })
    }),
  addToCollection: protectedProcedure
    .input(z.object({ resourceId: z.string(), collectionId: z.string() }))
    .mutation(
      async ({ input: { resourceId, collectionId }, ctx: { user } }) => {
        const collection = await prismaClient.collection.findUnique({
          where: { id: collectionId },
          select: collectionAuthorizationTargetSelect,
        })

        const resource = await prismaClient.resource.findUnique({
          where: { id: resourceId },
          select: resourceAuthorizationTargetSelect,
        })

        if (!collection || !resource) {
          throw notFoundError()
        }

        // Can only add a accessible resource to collection
        authorizeOrThrow(
          resourceAuthorization(resource, user).hasPermission(
            ResourcePermissions.ReadResourceContent,
          ),
        )

        authorizeOrThrow(
          collectionAuthorization(collection, user).hasPermission(
            CollectionPermissions.AddToCollection,
          ),
        )

        const resultCollection = await prismaClient.collection.update({
          where: { id: collectionId },
          data: {
            updated: new Date(),
            resources: {
              create: {
                resourceId,
              },
            },
          },
          select: {
            id: true,
            title: true,
          },
        })

        return {
          resource,
          collection: resultCollection,
        }
      },
    ),
  removeFromCollection: protectedProcedure
    .input(z.object({ resourceId: z.string(), collectionId: z.string() }))
    .mutation(
      async ({ input: { resourceId, collectionId }, ctx: { user } }) => {
        const collection = await prismaClient.collection.findUnique({
          where: { id: collectionId },
          select: collectionAuthorizationTargetSelect,
        })

        const resource = await prismaClient.resource.findUnique({
          where: { id: resourceId },
          select: resourceAuthorizationTargetSelect,
        })

        if (!collection || !resource) {
          throw notFoundError()
        }

        // Can only add a accessible resource to collection
        authorizeOrThrow(
          resourceAuthorization(resource, user).hasPermission(
            ResourcePermissions.ReadResourceContent,
          ),
        )

        authorizeOrThrow(
          collectionAuthorization(collection, user).hasPermission(
            CollectionPermissions.AddToCollection,
          ),
        )

        const resultCollection = await prismaClient.collection.update({
          where: {
            id: collectionId,
          },
          data: {
            updated: new Date(),
            resources: {
              delete: {
                resourceId_collectionId: { collectionId, resourceId },
              },
            },
          },
          select: {
            id: true,
            title: true,
          },
        })

        return {
          resource,
          collection: resultCollection,
        }
      },
    ),
  removeListFromCollection: protectedProcedure
    .input(
      z.object({
        resourcesIds: z.array(z.string()),
        collectionId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx: { user } }) => {
      const { collectionId } = input
      const whereCollectionResourcesMatchInput = {
        OR: input.resourcesIds.map((resourceId) => ({
          AND: { resourceId, collectionId },
        })),
      }

      const collectionResources =
        await prismaClient.collectionResource.findMany({
          where: whereCollectionResourcesMatchInput,
          select: { collection: { select: { id: true } }, resource: {} },
        })

      for (const collectionResource of collectionResources) {
        // eslint-disable-next-line no-await-in-loop
        const collection = await prismaClient.collection.findUnique({
          where: { id: collectionResource.collection.id },
          select: collectionAuthorizationTargetSelect,
        })

        // eslint-disable-next-line no-await-in-loop
        const resource = await prismaClient.resource.findUnique({
          where: { id: collectionResource.resource.id },
          select: resourceAuthorizationTargetSelect,
        })

        if (!collection || !resource) {
          throw notFoundError()
        }

        authorizeOrThrow(
          resourceAuthorization(resource, user).hasPermission(
            ResourcePermissions.ReadResourceContent,
          ),
        )
        authorizeOrThrow(
          collectionAuthorization(collection, user).hasPermission(
            CollectionPermissions.AddToCollection,
          ),
        )
      }
      return prismaClient.collection.update({
        where: { id: collectionId },
        data: {
          updated: new Date(),
          resources: {
            deleteMany: whereCollectionResourcesMatchInput,
          },
        },
        select: { id: true, title: true },
      })
    }),
  feedback: protectedProcedure
    .input(SendResourceFeedbackValidation)
    .mutation(async ({ input, ctx: { user } }) =>
      prismaClient.resourceFeedback.upsert({
        where: {
          sentById_resourceId: {
            sentById: user.id,
            resourceId: input.resourceId,
          },
        },
        create: { ...input, sentById: user.id },
        update: {
          ...input,
          sentById: user.id,
          updated: new Date(),
          deleted: null,
        },
      }),
    ),
  deleteFeedback: protectedProcedure
    .input(z.object({ resourceId: z.string() }))
    .mutation(async ({ input, ctx: { user } }) => {
      const timestamp = new Date()

      return prismaClient.resourceFeedback.update({
        data: {
          deleted: timestamp,
          updated: timestamp,
        },
        where: {
          sentById_resourceId: {
            sentById: user.id,
            resourceId: input.resourceId,
          },
        },
      })
    }),
})
