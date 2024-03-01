import {
  EditImageCommand,
  ImageEdited,
} from '@app/web/server/resources/feature/EditImage'
import { ResourceMutationCommandHandler } from '@app/web/server/resources/feature/ResourceCommandHandler'
import { ResourceMutationEventApplier } from '@app/web/server/resources/feature/ResourceEventApplier'

export const handleEditImage: ResourceMutationCommandHandler<
  EditImageCommand,
  ImageEdited
> = ({ payload: { resourceId: _, ...rest } }) => ({
  type: 'ImageEdited',
  timestamp: new Date(),
  data: {
    __version: 1,
    ...rest,
  },
})

export const applyImageEdited: ResourceMutationEventApplier<ImageEdited> = (
  event,
  resource,
) => ({
  ...resource,
  imageId: event.data.imageId,
  updated: event.timestamp,
})
