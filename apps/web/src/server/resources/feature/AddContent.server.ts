import { v4 } from 'uuid'
import {
  AddContentCommand,
  ContentAdded,
} from '@app/web/server/resources/feature/AddContent'
import {
  ResourceCommandHandler,
  ResourceCommandSecurityRule,
} from '@app/web/server/resources/feature/ResourceCommandHandler'
import { ResourceMutationEventApplier } from '@app/web/server/resources/feature/ResourceEventApplier'

export const handleAddContent: ResourceCommandHandler<
  AddContentCommand,
  ContentAdded
> = ({ payload: { resourceId: _, ...rest } }) => ({
  type: 'ContentAdded',
  timestamp: new Date(),
  data: {
    __version: 1,
    id: v4(),
    ...rest,
  },
})

export const addContentSecurityRules: ResourceCommandSecurityRule<
  AddContentCommand
> = () => true

export const applyContentAdded: ResourceMutationEventApplier<ContentAdded> = (
  { timestamp, data },
  resource,
) => ({
  ...resource,
  contents: [
    ...resource.contents,
    {
      ...data,
      linkedResourceId: null,
      fileKey: null,
      imageId: null,
      caption: null,
      url: null,
      showPreview: null,
    },
  ],
  updated: timestamp,
})
