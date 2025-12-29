import {
  BasePermissions,
  baseAuthorization,
} from '@app/web/authorization/models/baseAuthorization'
import { baseAuthorizationTargetSelect } from '@app/web/authorization/models/baseAuthorizationTargetSelect'
import {
  ResourcePermissions,
  resourceAuthorization,
} from '@app/web/authorization/models/resourceAuthorization'
import { resourceAuthorizationTargetSelect } from '@app/web/authorization/models/resourceAuthorizationTargetSelect'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { authorizeOrThrow, invalidError } from '@app/web/server/rpc/trpcErrors'
import { UpdateShareableLinkCommandValidation } from '@app/web/server/shareableLink/shareableLink'
import z from 'zod'

export const shareLinkRouter = router({
  shareLink: protectedProcedure
    .input(UpdateShareableLinkCommandValidation)
    .mutation(
      async ({ input: { baseId, resourceId, enabled }, ctx: { user } }) => {
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

          const shareableLink = await prismaClient.shareableLink.findFirst({
            where: { baseId },
          })

          if (!shareableLink) {
            return prismaClient.shareableLink.create({
              data: {
                baseId,
                createdById: user.id,
                enabled: true,
              },
              select: {
                id: true,
              },
            })
          }
          return prismaClient.shareableLink.update({
            where: {
              id: shareableLink.id,
            },
            data: {
              enabled,
            },
            select: {
              id: true,
            },
          })
        }

        if (resourceId) {
          const resource = await prismaClient.resource.findUnique({
            where: { id: resourceId },
            select: resourceAuthorizationTargetSelect,
          })

          if (!resource) {
            throw invalidError('Resource not found')
          }

          authorizeOrThrow(
            resourceAuthorization(resource, user).hasPermission(
              ResourcePermissions.WriteResource,
            ),
          )

          const shareableLink = await prismaClient.shareableLink.findFirst({
            where: { resourceId },
          })

          if (!shareableLink) {
            return prismaClient.shareableLink.create({
              data: {
                resourceId,
                createdById: user.id,
                enabled: true,
              },
              select: {
                id: true,
                resource: {
                  select: {
                    id: true,
                    slug: true,
                  },
                },
              },
            })
          }
          return prismaClient.shareableLink.update({
            where: {
              id: shareableLink.id,
            },
            data: {
              enabled,
            },
            select: {
              id: true,
              resource: {
                select: {
                  id: true,
                  slug: true,
                },
              },
            },
          })
        }

        throw invalidError('Either baseId or resourceId must be provided')
      },
    ),
  isBaseShareableLinkEnabled: protectedProcedure
    .input(z.object({ baseId: z.string() }))
    .query(async ({ input: { baseId }, ctx: { user } }) => {
      const shareableLink = await prismaClient.shareableLink.findFirst({
        where: { baseId },
      })

      return shareableLink?.enabled ?? false
    }),
  rotateShareableLink: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx: { user } }) => {
      const shareableLink = await prismaClient.shareableLink.findFirst({
        where: { id },
        select: {
          id: true,
          baseId: true,
          resourceId: true,
        },
      })
      if (!shareableLink) {
        throw invalidError('Shareable link not found')
      }

      await prismaClient.shareableLink.delete({
        where: { id: shareableLink.id },
      })

      return prismaClient.shareableLink.create({
        data: {
          createdById: user.id,
          enabled: true,
          baseId: shareableLink.baseId,
          resourceId: shareableLink.resourceId,
        },
        select: {
          id: true,
        },
      })
    }),
})
