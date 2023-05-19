import { v4 } from 'uuid'
import { prismaClient } from '@app/web/prismaClient'
import {
  CreateResourceCommand,
  CreateResourceCommandClientValidation,
} from '@app/web/server/resources/feature/CreateResource'
import { getPersistedResource } from '@app/web/server/resources/feature/PersistedResource'
import {
  ResourceCommandSecurityRule,
  ResourceMutationCommandHandler,
} from '@app/web/server/resources/feature/ResourceCommandHandler'
import {
  applyCreationEvent,
  applyMutationEvent,
} from '@app/web/server/resources/feature/createResourceProjection'
import {
  HistoryEventsForResource,
  MutationHistoryResourceEvent,
  ResourceCommandSecurityRules,
  ResourceCreationCommandHandlers,
  ResourceMutationCommandHandlers,
  ResourceMutationCommandsValidation,
  executeSideEffect,
} from '@app/web/server/resources/feature/features'
import {
  getResourceFromEvents,
  getResourceProjectionContext,
} from '@app/web/server/resources/getResourceFromEvents'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { forbiddenError, notFoundError } from '@app/web/server/rpc/trpcErrors'

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

      const handlerResult = await ResourceCreationCommandHandlers[input.name](
        command,
        {
          user,
        },
      )
      const [creationEvent, ...mutationEvents] = (
        Array.isArray(handlerResult) ? handlerResult : [handlerResult]
      ) as HistoryEventsForResource

      let resource = applyCreationEvent(creationEvent)

      await prismaClient.$transaction(async (transaction) => {
        await executeSideEffect(creationEvent, resource, { transaction })

        await transaction.resourceEvent.create({
          data: {
            id: v4(),
            resourceId: resource.id,
            byId: user.id,
            ...creationEvent,
          },
        })
        for (const event of mutationEvents) {
          resource = applyMutationEvent(event, resource)

          // eslint-disable-next-line no-await-in-loop
          await executeSideEffect(event, resource, { transaction })
          // eslint-disable-next-line no-await-in-loop
          await transaction.resourceEvent.create({
            data: {
              id: v4(),
              resourceId: resource.id,
              byId: user.id,
              ...event,
            },
          })
        }
      })

      const resourceWithContext = await getResourceProjectionContext(resource)

      return {
        resource: resourceWithContext,
        events: [creationEvent, ...mutationEvents],
      }
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

      const { resourceId } = command.payload

      const [initialResource, persistedResource] = await Promise.all([
        getResourceFromEvents({ id: resourceId }),
        getPersistedResource(resourceId),
      ])
      if (!initialResource || !persistedResource) {
        throw notFoundError()
      }

      const handlerResult = await (
        ResourceMutationCommandHandlers[
          command.name
        ] as ResourceMutationCommandHandler<typeof command>
      )(command, { user, resource: initialResource, persistedResource })
      const mutationEvents = (
        Array.isArray(handlerResult) ? handlerResult : [handlerResult]
      ) as MutationHistoryResourceEvent[]

      let resource = initialResource

      await prismaClient.$transaction(async (transaction) => {
        for (const event of mutationEvents) {
          resource = applyMutationEvent(event, resource)

          // eslint-disable-next-line no-await-in-loop
          await executeSideEffect(event, resource, {
            transaction,
            persistedResource,
          })
          // eslint-disable-next-line no-await-in-loop
          await transaction.resourceEvent.create({
            data: {
              id: v4(),
              resourceId: resource.id,
              byId: user.id,
              ...event,
            },
          })
        }
      })
      const resourceWithContext = await getResourceProjectionContext(resource)

      return {
        resource: resourceWithContext,
        events: mutationEvents,
      }
    }),
})
