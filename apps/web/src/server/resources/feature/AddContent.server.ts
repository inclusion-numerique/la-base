import { v4 } from 'uuid'
import {
  AddContentCommand,
  ContentAdded,
} from '@app/web/server/resources/feature/AddContent'
import {
  ResourceCommandSecurityRule,
  ResourceMutationCommandHandler,
} from '@app/web/server/resources/feature/ResourceCommandHandler'
import { ResourceMutationEventApplier } from '@app/web/server/resources/feature/ResourceEventApplier'

export const handleAddContent: ResourceMutationCommandHandler<
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
  { timestamp, data: { __version, ...rest } },
  resource,
) => ({
  ...resource,
  contents: [
    ...resource.contents,
    {
      title: null,
      text: null,
      linkedResourceId: null,
      fileKey: null,
      imageId: null,
      caption: null,
      url: null,
      showPreview: null,
      order: resource.contents.length,
      ...rest,
    },
  ],
  updated: timestamp,
})
