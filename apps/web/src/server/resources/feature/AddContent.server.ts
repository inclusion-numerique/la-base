import { v4 } from 'uuid'
import {
  AddContentCommand,
  ContentAdded,
} from '@app/web/server/resources/feature/AddContent'
import { ResourceMutationCommandHandler } from '@app/web/server/resources/feature/ResourceCommandHandler'
import { ResourceMutationEventApplier } from '@app/web/server/resources/feature/ResourceEventApplier'
import { sortContents } from '@app/web/server/resources/sortContents'

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
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { order, __version, ...rest } = contentAdded

  const reorder = (orderArgument: number) =>
    orderArgument >= contentAdded.order ? orderArgument + 1 : orderArgument

  return {
    ...resource,
    contents: [
      ...resource.contents.map((content) => ({
        ...content,
        order: reorder(content.order),
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
