import { createUniqueSlug } from '@app/web/server/resources/createUniqueSlug'
import type {
  PublishCommand,
  ResourcePublished,
} from '@app/web/server/resources/feature/PublishResource'
import type {
  ResourceCommandSecurityRule,
  ResourceMutationCommandHandler,
} from '@app/web/server/resources/feature/ResourceCommandHandler'
import type { ResourceMutationEventApplier } from '@app/web/server/resources/feature/ResourceEventApplier'
import type { ResourceEventSideEffect } from '@app/web/server/resources/feature/ResourceEventSideEffect'
import { sortContents } from '@app/web/server/resources/sortContents'
import { createSlug } from '@app/web/utils/createSlug'

export const handlePublish: ResourceMutationCommandHandler<
  PublishCommand,
  ResourcePublished
> = async (
  { payload: { resourceId: _, ...rest } },
  { resource, persistedResource },
) => {
  const { slug, titleDuplicationCheckSlug } =
    persistedResource.title === resource.title
      ? { slug: undefined, titleDuplicationCheckSlug: undefined }
      : {
          slug: await createUniqueSlug(resource.title, resource.id),
          titleDuplicationCheckSlug: createSlug(resource.title),
        }
  return {
    type: 'Published',
    timestamp: new Date(),
    data: {
      __version: 1,
      slug,
      titleDuplicationCheckSlug,
      ...rest,
    },
  }
}

export const publishSecurityRules: ResourceCommandSecurityRule<
  PublishCommand
> = () => true

export const applyResourcePublished: ResourceMutationEventApplier<
  ResourcePublished
> = (
  { timestamp, data: { __version, titleDuplicationCheckSlug, slug, ...rest } },
  resource,
) => ({
  ...resource,
  published: timestamp,
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
  const newContents = resource.contents.sort(sortContents).map((content) => ({
    ...content,
  }))

  await transaction.resource.update({
    where: { id: resource.id },
    data: {
      title: resource.title,
      imageId: resource.imageId,
      description: resource.description,
      baseId: resource.baseId,
      // Deleting and recreating contents
      contents: {
        deleteMany: {},
        createMany: { data: newContents },
      },
      ...rest,
      published: timestamp,
      created: timestamp,
      updated: timestamp,
    },
  })
}
