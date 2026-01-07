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
import { getResourceNotificationRecipients } from '@app/web/server/notifications/getResourceNotificationRecipients'
import { SendResourceFeedbackCommentValidation } from '@app/web/server/resourceFeedbackComment/sendResourceFeedbackComment'
import { UpdateResourceFeedbackCommentValidation } from '@app/web/server/resourceFeedbackComment/updateResourceFeedbackComment'
import {
  type CreateResourceCommand,
  CreateResourceCommandClientValidation,
} from '@app/web/server/resources/feature/CreateResource'
import { ResourceMutationCommandsValidation } from '@app/web/server/resources/feature/features'
import { handleResourceCreationCommand } from '@app/web/server/resources/feature/handleResourceCreationCommand'
import { handleResourceMutationCommand } from '@app/web/server/resources/feature/handleResourceMutationCommand'
import { SendResourceFeedbackValidation } from '@app/web/server/resources/sendResourceFeedback'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { authorizeOrThrow, notFoundError } from '@app/web/server/rpc/trpcErrors'
import { NotificationType } from '@prisma/client'
import { v4 } from 'uuid'
import z from 'zod'

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
            : command.name === 'Publish'
              ? ResourcePermissions.WriteResource
              : ResourcePermissions.WriteResource,
        ),
      )

      const result = await handleResourceMutationCommand(command, { user })

      const recipientUserIds = await getResourceNotificationRecipients(
        resource.id,
        user.id,
      )

      if (recipientUserIds.length > 0) {
        let notificationType: NotificationType

        if (command.name === 'Delete') {
          notificationType = 'ResourceDeletion'
        } else if (command.name === 'Publish') {
          notificationType = 'ResourcePublication'
        } else {
          notificationType = 'ResourceModification'
        }

        await Promise.all(
          recipientUserIds.map((userId) =>
            prismaClient.notification.create({
              data: {
                userId,
                type: notificationType,
                resourceId: resource.id,
                initiatorId: user.id,
                baseId: resource.baseId,
              },
            }),
          ),
        )
      }

      return result
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
        const collection = await prismaClient.collection.findUnique({
          where: { id: collectionResource.collection.id },
          select: collectionAuthorizationTargetSelect,
        })

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
    .mutation(async ({ input, ctx: { user } }) => {
      const resource = await prismaClient.resource.findUnique({
        where: { id: input.resourceId },
        select: { createdById: true },
      })

      if (!resource) {
        throw notFoundError()
      }

      const feedback = await prismaClient.resourceFeedback.upsert({
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
      })

      if (resource.createdById !== user.id) {
        await prismaClient.notification.create({
          data: {
            userId: resource.createdById,
            type: 'ResourceFeedback',
            resourceId: input.resourceId,
            initiatorId: user.id,
          },
        })
      }

      return feedback
    }),
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
  addFeedbackComment: protectedProcedure
    .input(SendResourceFeedbackCommentValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      const feedback = await prismaClient.resourceFeedback.findUnique({
        where: {
          sentById_resourceId: {
            sentById: input.feedbackSentById,
            resourceId: input.feedbackResourceId,
          },
        },
        select: {
          resource: {
            select: resourceAuthorizationTargetSelect,
          },
        },
      })

      if (!feedback) {
        throw notFoundError()
      }

      await prismaClient.resourceFeedbackComment.create({
        data: {
          content: input.content,
          feedbackSentById: input.feedbackSentById,
          feedbackResourceId: input.feedbackResourceId,
          parentCommentId: input.parentCommentId,
          authorId: user.id,
        },
      })

      // notification receiver
      let notificationUserId: string | null = null

      if (input.parentCommentId) {
        const parentComment =
          await prismaClient.resourceFeedbackComment.findUnique({
            where: { id: input.parentCommentId },
            select: { authorId: true },
          })
        if (parentComment && parentComment.authorId !== user.id) {
          notificationUserId = parentComment.authorId
        }
      } else if (input.feedbackSentById !== user.id) {
        notificationUserId = input.feedbackSentById
      }

      if (notificationUserId) {
        await prismaClient.notification.create({
          data: {
            userId: notificationUserId,
            type: 'ResourceComment',
            resourceId: feedback.resource.id,
            initiatorId: user.id,
          },
        })
      }
    }),
  deleteFeedbackComment: protectedProcedure
    .input(z.object({ commentId: z.string().uuid() }))
    .mutation(async ({ input, ctx: { user } }) => {
      const comment = await prismaClient.resourceFeedbackComment.findUnique({
        where: { id: input.commentId },
        select: {
          id: true,
          authorId: true,
        },
      })

      if (!comment || comment.authorId !== user.id) {
        throw notFoundError()
      }

      const timestamp = new Date()

      return prismaClient.resourceFeedbackComment.update({
        where: { id: input.commentId },
        data: {
          deleted: timestamp,
          updated: timestamp,
        },
      })
    }),

  updateFeedbackComment: protectedProcedure
    .input(UpdateResourceFeedbackCommentValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      const comment = await prismaClient.resourceFeedbackComment.findUnique({
        where: { id: input.commentId },
        select: {
          id: true,
          authorId: true,
        },
      })

      if (!comment || comment.authorId !== user.id) {
        throw notFoundError()
      }

      const timestamp = new Date()

      return prismaClient.resourceFeedbackComment.update({
        where: { id: input.commentId },
        data: {
          content: input.content,
          updated: timestamp,
        },
      })
    }),
})
