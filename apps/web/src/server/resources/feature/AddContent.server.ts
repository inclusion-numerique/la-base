import { v4 } from 'uuid'
import {
  AddContentCommand,
  ContentAdded,
} from '@app/web/server/resources/feature/AddContent'
import { ResourceMutationCommandHandler } from '@app/web/server/resources/feature/ResourceCommandHandler'
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
      legacyLinkedResourceId: null,
      fileKey: null,
      imageId: null,
      imageAltText: null,
      caption: null,
      url: null,
      showPreview: null,
      linkDescription: null,
      linkTitle: null,
      linkImageUrl: null,
      linkFaviconUrl: null,
      order: resource.contents.length,
      ...rest,
    },
  ],
  updated: timestamp,
})
