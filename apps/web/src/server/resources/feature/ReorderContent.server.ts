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
  const contentsWithUniqueOrders = resource.contents.map((content, index) => ({
    ...content,
    order: index + 1,
  }))

  const normalizedToReorder = contentsWithUniqueOrders.find(
    (content) => id === content.id,
  )
  if (!normalizedToReorder) {
    return resource
  }

  const normalizedOldOrder = normalizedToReorder.order

  const reorder =
    newOrder > normalizedOldOrder
      ? // Moving up contents impacted by reorder
        (order: number) =>
          order > normalizedOldOrder && order <= newOrder ? order - 1 : order
      : // Moving down contents impacted by reorder
        (order: number) =>
          order >= newOrder && order < normalizedOldOrder ? order + 1 : order

  return {
    ...resource,
    contents: contentsWithUniqueOrders
      .map((content) => ({
        ...content,
        order: content.id === id ? newOrder : reorder(content.order),
      }))
      .sort(sortContents),
    updated: timestamp,
  }
}
