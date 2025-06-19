import { prismaClient } from '@app/web/prismaClient'
import type {
  BaseChanged,
  ChangeBaseCommand,
} from '@app/web/server/resources/feature/ChangeBase'
import type { ResourceMutationCommandHandler } from '@app/web/server/resources/feature/ResourceCommandHandler'
import type { ResourceMutationEventApplier } from '@app/web/server/resources/feature/ResourceEventApplier'
import type { ResourceEventSideEffect } from './ResourceEventSideEffect'

export const handleChangeBase: ResourceMutationCommandHandler<
  ChangeBaseCommand,
  BaseChanged
> = async ({ payload: { resourceId: _, baseId } }, { resource }) => {
  let isPublic: boolean
  if (resource.isPublic) {
    if (baseId) {
      const base = await prismaClient.base.findUnique({
        where: { id: baseId },
      })
      isPublic = !!base && base.isPublic
    } else {
      const user = await prismaClient.user.findUnique({
        where: { id: resource.createdById },
      })
      isPublic = !!user && user.isPublic
    }
  } else {
    isPublic = false
  }

  return {
    type: 'BaseChanged',
    timestamp: new Date(),
    data: {
      __version: 2,
      baseId,
      isPublic,
    },
  }
}

export const applyBaseChanged: ResourceMutationEventApplier<BaseChanged> = (
  event,
  resource,
) => ({
  ...resource,
  isPublic:
    event.data.__version === 1 ? resource.isPublic : event.data.isPublic,
  baseId: event.data.baseId,
  updated: event.timestamp,
})

export const onBaseChanged: ResourceEventSideEffect<BaseChanged> = async (
  { data: { __version, ...rest } },
  resource,
  { transaction },
) => {
  await transaction.resource.update({
    where: { id: resource.id },
    data: rest,
  })
}
