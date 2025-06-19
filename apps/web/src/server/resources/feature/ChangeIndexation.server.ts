import type {
  ChangeIndexationCommand,
  IndexationChanged,
} from '@app/web/server/resources/feature/ChangeIndexation'
import type { ResourceMutationCommandHandler } from '@app/web/server/resources/feature/ResourceCommandHandler'
import type { ResourceMutationEventApplier } from '@app/web/server/resources/feature/ResourceEventApplier'
import type { ResourceEventSideEffect } from './ResourceEventSideEffect'

export const handleChangeIndexation: ResourceMutationCommandHandler<
  ChangeIndexationCommand,
  IndexationChanged
> = ({ payload: { resourceId: _, ...rest } }) => ({
  type: 'IndexationChanged',
  timestamp: new Date(),
  data: {
    __version: 1,
    ...rest,
  },
})

export const applyIndexationChanged: ResourceMutationEventApplier<
  IndexationChanged
> = ({ data: { __version, ...rest } }, resource) => ({
  ...resource,
  ...rest,
})

export const onIndexationChanged: ResourceEventSideEffect<
  IndexationChanged
> = async ({ data: { __version, ...rest } }, resource, { transaction }) => {
  await transaction.resource.update({
    where: { id: resource.id },
    data: rest,
  })
}
