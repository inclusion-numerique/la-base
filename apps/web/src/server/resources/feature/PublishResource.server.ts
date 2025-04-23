import type {
  PublishCommand,
  ResourcePublished,
} from '@app/web/server/resources/feature/PublishResource'
import type { ResourceMutationCommandHandler } from '@app/web/server/resources/feature/ResourceCommandHandler'
import type { ResourceMutationEventApplier } from '@app/web/server/resources/feature/ResourceEventApplier'
import type { ResourceEventSideEffect } from '@app/web/server/resources/feature/ResourceEventSideEffect'
import { sortContents } from '@app/web/server/resources/sortContents'
import { createSlug } from '@app/web/utils/createSlug'
import { findFirstAvailableSlug } from '@app/web/server/slug/findFirstAvailableSlug'

export const handlePublish: ResourceMutationCommandHandler<
  PublishCommand,
  ResourcePublished
> = async (
  { payload: { resourceId: _, ...rest } },
  { resource, persistedResource },
) => {
  const beforeSlug = persistedResource.slug
  const afterSlug = createSlug(resource.title)

  const slugHasChanged = !!afterSlug && beforeSlug !== afterSlug

  const { slug, titleDuplicationCheckSlug } = slugHasChanged
    ? {
        slug: await findFirstAvailableSlug(afterSlug, 'resources'),
        titleDuplicationCheckSlug: afterSlug,
      }
    : { slug: undefined, titleDuplicationCheckSlug: undefined }

  return {
    type: 'Published',
    timestamp: new Date(),
    data: {
      __version: 2,
      slug,
      titleDuplicationCheckSlug,
      ...rest,
    },
  }
}

export const applyResourcePublished: ResourceMutationEventApplier<
  ResourcePublished
> = (
  { timestamp, data: { __version, titleDuplicationCheckSlug, slug, ...rest } },
  resource,
) => ({
  ...resource,
  published: timestamp,
  lastPublished: timestamp,
  updated: timestamp,
  ...(slug && { slug }),
  ...(titleDuplicationCheckSlug && { titleDuplicationCheckSlug }),
  ...rest,
})

export const onPublished: ResourceEventSideEffect<ResourcePublished> = async (
  { timestamp, data: { __version, ...rest } },
  resource,
  { transaction },
) => {
  const newContents = resource.contents
    .map((content, index) => ({
      ...content,
      order: content.order ?? index,
    }))
    .sort(sortContents)

  await transaction.resource.update({
    where: { id: resource.id },
    data: {
      title: resource.title,
      imageId: resource.imageId,
      description: resource.description,
      excerpt: resource.excerpt,
      baseId: resource.baseId,
      // Deleting and recreating contents
      contents: {
        deleteMany: {},
        createMany: { data: newContents },
      },
      ...rest,
      published: timestamp,
      lastPublished: timestamp,
      created: timestamp,
      updated: timestamp,
    },
  })
}
