import {
  EditTitleAndDescriptionCommand,
  TitleAndDescriptionEdited,
} from '@app/web/server/resources/feature/EditTitleAndDescription'
import {
  ResourceCommandSecurityRule,
  ResourceMutationCommandHandler,
} from '@app/web/server/resources/feature/ResourceCommandHandler'
import { ResourceMutationEventApplier } from '@app/web/server/resources/feature/ResourceEventApplier'

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

export const editTitleAndDescriptionSecurityRules: ResourceCommandSecurityRule<
  EditTitleAndDescriptionCommand
> = () => true

export const applyTitleAndDescriptionEdited: ResourceMutationEventApplier<
  TitleAndDescriptionEdited
> = (event, resource) => ({
  ...resource,
  title: event.data.title,
  description: event.data.description,
  updated: event.timestamp,
})
