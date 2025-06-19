import { generateResourceExcerpt } from '@app/web/resources/resourceExcerpt'
import type {
  EditTitleAndDescriptionCommand,
  TitleAndDescriptionEdited,
} from '@app/web/server/resources/feature/EditTitleAndDescription'
import type { ResourceMutationCommandHandler } from '@app/web/server/resources/feature/ResourceCommandHandler'
import type { ResourceMutationEventApplier } from '@app/web/server/resources/feature/ResourceEventApplier'

export const handleEditTitleAndDescription: ResourceMutationCommandHandler<
  EditTitleAndDescriptionCommand,
  TitleAndDescriptionEdited
> = ({ payload: { resourceId: _, ...rest } }) => ({
  type: 'TitleAndDescriptionEdited',
  timestamp: new Date(),
  data: {
    __version: 1,
    ...rest,
  },
})

export const applyTitleAndDescriptionEdited: ResourceMutationEventApplier<
  TitleAndDescriptionEdited
> = (event, resource) => ({
  ...resource,
  title: event.data.title,
  description: event.data.description,
  excerpt: generateResourceExcerpt(event.data.description),
  updated: event.timestamp,
})
