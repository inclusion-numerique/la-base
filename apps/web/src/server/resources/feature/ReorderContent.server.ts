import {
  ContentReordered,
  ReorderContentCommand,
} from '@app/web/server/resources/feature/ReorderContent'
import { ResourceMutationCommandHandler } from '@app/web/server/resources/feature/ResourceCommandHandler'
import { ResourceMutationEventApplier } from '@app/web/server/resources/feature/ResourceEventApplier'
import { sortContents } from '@app/web/server/resources/sortContents'

export const handleReorderContent: ResourceMutationCommandHandler<
  ReorderContentCommand,
  ContentReordered
> = ({ payload: { resourceId: _, ...rest } }) => ({
  type: 'ContentReordered',
  timestamp: new Date(),
  data: {
    __version: 1,
    ...rest,
  },
})

export const applyContentReordered: ResourceMutationEventApplier<
  ContentReordered
> = ({ timestamp, data: { id, order: newOrder } }, resource) => {
  const toReorder = resource.contents.find((content) => id === content.id)
  if (!toReorder || toReorder.order === newOrder) {
    return resource
  }

  const oldOrder = toReorder.order

  const reorder =
    newOrder > oldOrder
      ? // Moving up contents impacted by reorder
        (order: number) =>
          order > oldOrder && order <= newOrder ? order - 1 : order
      : // Moving down contents impacted by reorder
        (order: number) =>
          order >= newOrder && order < oldOrder ? order + 1 : order

  return {
    ...resource,
    contents: resource.contents
      .map((content) => ({
        ...content,
        order: content.id === id ? newOrder : reorder(content.order),
      }))
      .sort(sortContents),
    updated: timestamp,
  }
}
