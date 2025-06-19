import type { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
import type { ResourceCreationCommandHandler } from '@app/web/server/resources/feature/ResourceCommandHandler'
import {
  applyCreationEvent,
  applyMutationEvent,
} from '@app/web/server/resources/feature/createResourceProjection'
import {
  type HistoryEventsForResource,
  type ResourceCreationCommand,
  ResourceCreationCommandHandlers,
  executeSideEffect,
} from '@app/web/server/resources/feature/features'
import { getResourceProjectionContext } from '@app/web/server/resources/getResourceFromEvents'
import { v4 } from 'uuid'

export const handleResourceCreationCommand = async (
  command: ResourceCreationCommand,
  { user }: { user?: Pick<SessionUser, 'id'> },
) => {
  const handlerResult = await (
    ResourceCreationCommandHandlers[
      command.name
    ] as ResourceCreationCommandHandler<typeof command>
  )(command, {
    user,
  })
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
        byId: creationEvent.data.byId,
        ...creationEvent,
      },
    })
    for (const event of mutationEvents) {
      resource = applyMutationEvent(event, resource)

      await executeSideEffect(event, resource, { transaction })

      await transaction.resourceEvent.create({
        data: {
          id: v4(),
          resourceId: resource.id,
          byId: creationEvent.data.byId,
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
}
