import type {
  ContentRemoved,
  RemoveContentCommand,
} from '@app/web/server/resources/feature/RemoveContent'
import type { ResourceMutationCommandHandler } from '@app/web/server/resources/feature/ResourceCommandHandler'
import type { ResourceMutationEventApplier } from '@app/web/server/resources/feature/ResourceEventApplier'

export const handleRemoveContent: ResourceMutationCommandHandler<
  RemoveContentCommand,
  ContentRemoved
> = ({ payload: { resourceId: _, ...rest } }) => ({
  type: 'ContentRemoved',
  timestamp: new Date(),
  data: {
    __version: 1,
    ...rest,
  },
})

export const applyContentRemoved: ResourceMutationEventApplier<
  ContentRemoved
> = ({ timestamp, data: { id } }, resource) => {
  const toRemove = resource.contents.find((content) => id === content.id)
  if (!toRemove) {
    return resource
  }

  const removedOrder = toRemove.order

  return {
    ...resource,
    contents: resource.contents
      // Remove from content list
      .filter((content) => id !== content.id)
      // Decrement contents order after removed content
      .map((content) => ({
        ...content,
        order: content.order > removedOrder ? content.order - 1 : content.order,
      })),
    updated: timestamp,
  }
}
