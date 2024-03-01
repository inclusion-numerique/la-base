import {
  ContentEdited,
  EditContentCommand,
} from '@app/web/server/resources/feature/EditContent'
import { ResourceMutationCommandHandler } from '@app/web/server/resources/feature/ResourceCommandHandler'
import { ResourceMutationEventApplier } from '@app/web/server/resources/feature/ResourceEventApplier'

export const handleEditContent: ResourceMutationCommandHandler<
  EditContentCommand,
  ContentEdited
> = ({ payload: { resourceId: _, ...rest } }) => ({
  type: 'ContentEdited',
  timestamp: new Date(),
  data: {
    __version: 1,
    ...rest,
  },
})

export const applyContentEdited: ResourceMutationEventApplier<ContentEdited> = (
  { timestamp, data: { __version, id, ...otherData } },
  resource,
) => ({
  ...resource,
  contents: resource.contents.map((content) => {
    if (id === content.id) {
      return {
        ...content,
        ...otherData,
      }
    }
    return content
  }),
  updated: timestamp,
})
