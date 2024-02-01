import type {
  RepublishCommand,
  ResourceRepublished,
} from '@app/web/server/resources/feature/RepublishResource'
import type {
  ResourceCommandSecurityRule,
  ResourceMutationCommandHandler,
} from '@app/web/server/resources/feature/ResourceCommandHandler'
import type { ResourceMutationEventApplier } from '@app/web/server/resources/feature/ResourceEventApplier'
import type { ResourceEventSideEffect } from '@app/web/server/resources/feature/ResourceEventSideEffect'
import { sortContents } from '@app/web/server/resources/sortContents'

export const handleRepublish: ResourceMutationCommandHandler<
  RepublishCommand,
  ResourceRepublished
> = () => ({
  type: 'Republished',
  timestamp: new Date(),
  data: {
    __version: 1,
  },
})

export const republishSecurityRules: ResourceCommandSecurityRule<
  RepublishCommand
> = () => true

export const applyResourceRepublished: ResourceMutationEventApplier<
  ResourceRepublished
> = ({ timestamp }, resource) => ({
  ...resource,
  published: timestamp,
  updated: timestamp,
})

export const onRepublished: ResourceEventSideEffect<
  ResourceRepublished
> = async ({ timestamp }, resource, { transaction }) => {
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
      lastPublished: timestamp,
      updated: timestamp,
    },
  })
}
