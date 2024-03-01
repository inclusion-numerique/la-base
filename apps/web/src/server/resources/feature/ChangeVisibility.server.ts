import {
  VisibilityChanged,
  ChangeVisibilityCommand,
} from '@app/web/server/resources/feature/ChangeVisibility'
import { ResourceMutationCommandHandler } from '@app/web/server/resources/feature/ResourceCommandHandler'
import { ResourceMutationEventApplier } from '@app/web/server/resources/feature/ResourceEventApplier'
import { ResourceEventSideEffect } from './ResourceEventSideEffect'

export const handleChangeVisibility: ResourceMutationCommandHandler<
  ChangeVisibilityCommand,
  VisibilityChanged
> = ({ payload: { resourceId: _, ...rest } }) => ({
  type: 'VisibilityChanged',
  timestamp: new Date(),
  data: {
    __version: 1,
    ...rest,
  },
})

export const applyVisibilityChanged: ResourceMutationEventApplier<
  VisibilityChanged
> = ({ data: { __version, ...rest } }, resource) => ({
  ...resource,
  ...rest,
})

export const onVisibilityChanged: ResourceEventSideEffect<
  VisibilityChanged
> = async ({ data: { __version, ...rest } }, resource, { transaction }) => {
  await transaction.resource.update({
    where: { id: resource.id },
    data: rest,
  })
}
