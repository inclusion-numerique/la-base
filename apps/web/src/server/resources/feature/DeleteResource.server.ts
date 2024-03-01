import type {
  DeleteCommand,
  ResourceDeleted,
} from '@app/web/server/resources/feature/DeleteResource'
import type { ResourceMutationCommandHandler } from '@app/web/server/resources/feature/ResourceCommandHandler'
import type { ResourceMutationEventApplier } from '@app/web/server/resources/feature/ResourceEventApplier'
import type { ResourceEventSideEffect } from '@app/web/server/resources/feature/ResourceEventSideEffect'

export const handleDelete: ResourceMutationCommandHandler<
  DeleteCommand,
  ResourceDeleted
> = () => ({
  type: 'Deleted',
  timestamp: new Date(),
  data: {
    __version: 1,
  },
})

export const applyResourceDeleted: ResourceMutationEventApplier<
  ResourceDeleted
> = ({ timestamp }, resource) => ({
  ...resource,
  deleted: timestamp,
})

export const onDeleted: ResourceEventSideEffect<ResourceDeleted> = async (
  { timestamp },
  resource,
  { transaction },
) => {
  await transaction.resource.update({
    where: { id: resource.id },
    data: {
      deleted: timestamp,
      updated: timestamp,
    },
  })
}
