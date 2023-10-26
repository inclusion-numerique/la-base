import { v4 } from 'uuid'
import z from 'zod'
import {
  CreateResourceCommand,
  CreateResourceCommandClientValidation,
} from '@app/web/server/resources/feature/CreateResource'
import { ResourceCommandSecurityRule } from '@app/web/server/resources/feature/ResourceCommandHandler'
import {
  ResourceCommandSecurityRules,
  ResourceMutationCommandsValidation,
} from '@app/web/server/resources/feature/features'
import { handleResourceCreationCommand } from '@app/web/server/resources/feature/handleResourceCreationCommand'
import { handleResourceMutationCommand } from '@app/web/server/resources/feature/handleResourceMutationCommand'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { forbiddenError, notFoundError } from '@app/web/server/rpc/trpcErrors'
import { prismaClient } from '@app/web/prismaClient'
import { filterAccess as filterCollectionAccess } from '../../collections/authorization'
import { filterAccess as filterBaseAccess } from '../../bases/authorization'
import { collectionSelect } from '../../collections/getCollection'
import { baseSelect } from '../../bases/getBase'

export const resourceRouter = router({
  create: protectedProcedure
    .input(CreateResourceCommandClientValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      const command: CreateResourceCommand = {
        ...input,
        payload: { ...input.payload, resourceId: v4() },
      }

      const securityCheck = await ResourceCommandSecurityRules[input.name](
        command,
        { user },
      )
      if (!securityCheck) {
        throw forbiddenError()
      }

      return handleResourceCreationCommand(command, { user })
    }),
  mutate: protectedProcedure
    .input(ResourceMutationCommandsValidation)
    .mutation(async ({ input: command, ctx: { user } }) => {
      const securityCheck = await (
        ResourceCommandSecurityRules[
          command.name
        ] as ResourceCommandSecurityRule<typeof command>
      )(command, { user })
      if (!securityCheck) {
        throw forbiddenError()
      }

      return handleResourceMutationCommand(command, { user })
    }),
  addToCollection: protectedProcedure
    .input(z.object({ resourceId: z.string(), collectionId: z.string() }))
    .mutation(
      async ({ input: { resourceId, collectionId }, ctx: { user } }) => {
        const collection = await prismaClient.collection.findUnique({
          where: { id: collectionId },
          select: collectionSelect(user),
        })

        const resource = await prismaClient.resource.findUnique({
          where: { id: resourceId },
        })

        if (!collection || !resource) {
          throw notFoundError()
        }

        if (collection.baseId) {
          const base = await prismaClient.base.findUnique({
            where: { id: collection.baseId },
            select: baseSelect(user),
          })
          if (!base) {
            throw notFoundError()
          }

          const authorizations = filterBaseAccess(base, user)
          if (!authorizations.authorized || !authorizations.isMember) {
            throw forbiddenError()
          }
        } else {
          const authorizations = filterCollectionAccess(collection, user)
          if (!authorizations.authorized || !authorizations.isOwner) {
            throw forbiddenError()
          }
        }

        await prismaClient.collection.update({
          where: { id: collectionId },
          data: {
            resources: {
              connect: {
                id: resourceId,
              },
            },
          },
        })
      },
    ),
})
