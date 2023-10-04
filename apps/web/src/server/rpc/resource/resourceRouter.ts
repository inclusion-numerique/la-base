import { v4 } from 'uuid'
import { Resource } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
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
import { forbiddenError } from '@app/web/server/rpc/trpcErrors'
import { UpdateResourceCommandValidation } from '../../resources/parameters'

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
  mutateParameters: protectedProcedure
    .input(UpdateResourceCommandValidation)
    .mutation(async ({ input }) => {
      const resource = {
        ...(await prismaClient.resource.findUnique({
          where: { id: input.id },
        })),
        ...input.data,
      }

      let canBePublic
      if (resource.baseId) {
        const base = await prismaClient.base.findUnique({
          where: { id: resource.baseId },
        })
        canBePublic = base?.isPublic
      } else {
        const user = await prismaClient.user.findUnique({
          where: { id: resource.createdById },
        })
        canBePublic = user?.isPublic
      }

      const enrichedData: Partial<Resource> = { ...input.data }
      if (!canBePublic) {
        enrichedData.isPublic = false
      }

      return prismaClient.resource.update({
        where: { id: input.id },
        data: enrichedData,
      })
    }),
})
