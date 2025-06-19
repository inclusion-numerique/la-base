import type {
  AddContentCommand,
  ContentAdded,
} from '@app/web/server/resources/feature/AddContent'
import type { ResourceMutationCommandHandler } from '@app/web/server/resources/feature/ResourceCommandHandler'
import type { ResourceMutationEventApplier } from '@app/web/server/resources/feature/ResourceEventApplier'
import { sortContents } from '@app/web/server/resources/sortContents'
import { v4 } from 'uuid'

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
  { timestamp, data: contentAdded },
  resource,
) => {
  const { order, __version, ...rest } = contentAdded

  const reorder = (orderArgument: number) =>
    orderArgument >= contentAdded.order ? orderArgument + 1 : orderArgument

  return {
    ...resource,
    contents: [
      ...resource.contents.map((content) => ({
        ...content,
        order: reorder(content.order ?? resource.contents.length),
      })),
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
        order,
        ...rest,
      },
    ].sort(sortContents),
    updated: timestamp,
  }
}
