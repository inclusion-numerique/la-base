import {
  EditTitleAndDescriptionCommand,
  TitleAndDescriptionEdited,
} from '@app/web/server/resources/feature/EditTitleAndDescription'
import { ResourceMutationCommandHandler } from '@app/web/server/resources/feature/ResourceCommandHandler'
import { ResourceMutationEventApplier } from '@app/web/server/resources/feature/ResourceEventApplier'
import { createSlug } from '@app/web/utils/createSlug'
import { findFirstAvailableSlug } from '@app/web/server/slug/findFirstAvailableSlug'
import { generateResourceExcerpt } from '@app/web/resources/resourceExcerpt'

export const handleEditTitleAndDescription: ResourceMutationCommandHandler<
  EditTitleAndDescriptionCommand,
  TitleAndDescriptionEdited
> = async (
  { payload: { resourceId: _, ...rest } },
  { resource: { slug: beforeSlug } },
) => {
  const afterSlug = createSlug(rest.title)
  const slugHasChanged = !!afterSlug && beforeSlug !== afterSlug

  // To leave slug unchanged, set to undefined for prisma data
  const slug = slugHasChanged
    ? await findFirstAvailableSlug(afterSlug, 'bases')
    : undefined

  return {
    type: 'TitleAndDescriptionEdited',
    timestamp: new Date(),
    data: {
      __version: 1,
      ...rest,
      slug,
    },
  }
}

export const applyTitleAndDescriptionEdited: ResourceMutationEventApplier<
  TitleAndDescriptionEdited
> = (event, resource) => ({
  ...resource,
  title: event.data.title,
  description: event.data.description,
  excerpt: generateResourceExcerpt(event.data.description),
  updated: event.timestamp,
  slug: event.data.slug ?? resource.slug,
})
