import { v4 } from 'uuid'
import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
import { getPersistedResource } from '@app/web/server/resources/feature/PersistedResource'
import { ResourceMutationCommandHandler } from '@app/web/server/resources/feature/ResourceCommandHandler'
import { applyMutationEvent } from '@app/web/server/resources/feature/createResourceProjection'
import {
  MutationHistoryResourceEvent,
  ResourceMutationCommand,
  ResourceMutationCommandHandlers,
  executeSideEffect,
} from '@app/web/server/resources/feature/features'
import {
  getResourceFromEvents,
  getResourceProjectionContext,
} from '@app/web/server/resources/getResourceFromEvents'
import { notFoundError } from '@app/web/server/rpc/trpcErrors'
import { PrismaTransaction } from '@app/web/utils/prismaTypes'

export const handleResourceMutationCommand = async (
  command: ResourceMutationCommand,
  { user }: { user?: Pick<SessionUser, 'id'> },
  transaction?: PrismaTransaction,
) => {
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

  const transactionEvents = async (t: PrismaTransaction) => {
    for (const event of mutationEvents) {
      resource = applyMutationEvent(event, resource)

      // eslint-disable-next-line no-await-in-loop
      await executeSideEffect(event, resource, {
        transaction: t,
        persistedResource,
      })
      // eslint-disable-next-line no-await-in-loop
      await t.resourceEvent.create({
        data: {
          id: v4(),
          resourceId: resource.id,
          byId: user?.id,
          ...event,
        },
      })
    }

    await t.resource.update({
      where: { id: resource.id },
      data: { updated: resource.updated },
    })
  }

  await (transaction
    ? transactionEvents(transaction)
    : prismaClient.$transaction(transactionEvents))

  const resourceWithContext = await getResourceProjectionContext(resource)
  return {
    resource: resourceWithContext,
    events: mutationEvents,
  }
}
