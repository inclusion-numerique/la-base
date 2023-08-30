import { createUniqueSlug } from '@app/web/server/resources/createUniqueSlug'
import {
  CreateResourceCommand,
  ResourceCreated,
} from '@app/web/server/resources/feature/CreateResource'
import {
  ResourceCommandSecurityRule,
  ResourceCreationCommandHandler,
} from '@app/web/server/resources/feature/ResourceCommandHandler'
import { ResourceCreationEventApplier } from '@app/web/server/resources/feature/ResourceEventApplier'
import { ResourceEventSideEffect } from '@app/web/server/resources/feature/ResourceEventSideEffect'
import { createSlug } from '@app/web/utils/createSlug'

export const handleCreateResource: ResourceCreationCommandHandler<
  CreateResourceCommand,
  ResourceCreated
> = async ({ payload }, { user }) => {
  const slug = await createUniqueSlug(payload.title)
  const { resourceId, ...rest } = payload

  if (!user) {
    throw new Error('Create resource command must have a user in context')
  }
  return {
    type: 'Created',
    timestamp: new Date(),
    data: {
      __version: 1,
      slug,
      titleDuplicationCheckSlug: createSlug(payload.title),
      id: resourceId,
      byId: user.id,
      ...rest,
    },
  }
}

export const createResourceSecurityRules: ResourceCommandSecurityRule<
  CreateResourceCommand
> = () => true

export const applyResourceCreated: ResourceCreationEventApplier<
  ResourceCreated
> = ({ timestamp, data: { id, slug, title, description, baseId, byId } }) => ({
  id,
  slug,
  title,
  description,
  baseId,
  legacyId: null,
  created: timestamp,
  updated: timestamp,
  published: null,
  createdById: byId,
  imageId: null,
  isPublic: null,
  contents: [],
  themes: [],
  supportTypes: [],
  targetAudiences: [],
})

export const onCreated: ResourceEventSideEffect<ResourceCreated> = async (
  event,
  resource,
  { transaction },
) => {
  await transaction.resource.create({
    data: {
      id: event.data.id,
      slug: event.data.slug,
      titleDuplicationCheckSlug: createSlug(event.data.title),
      published: null,
      title: event.data.title,
      description: event.data.description,
      baseId: event.data.baseId,
      created: event.timestamp,
      updated: event.timestamp,
      createdById: event.data.byId,
      isPublic: false,
    },
  })
}
