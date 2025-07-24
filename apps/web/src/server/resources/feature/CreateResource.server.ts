import { generateResourceExcerpt } from '@app/web/resources/resourceExcerpt'
import type {
  CreateResourceCommand,
  ResourceCreated,
} from '@app/web/server/resources/feature/CreateResource'
import type { ResourceCreationCommandHandler } from '@app/web/server/resources/feature/ResourceCommandHandler'
import type { ResourceCreationEventApplier } from '@app/web/server/resources/feature/ResourceEventApplier'
import type { ResourceEventSideEffect } from '@app/web/server/resources/feature/ResourceEventSideEffect'
import { createAvailableSlug } from '@app/web/server/slug/createAvailableSlug'
import { createSlug } from '@app/web/utils/createSlug'
import { ResourceLicence } from '@prisma/client'

export const handleCreateResource: ResourceCreationCommandHandler<
  CreateResourceCommand,
  ResourceCreated
> = async ({ payload }, { user }) => {
  const slug = await createAvailableSlug(payload.title, 'resources')
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

export const applyResourceCreated: ResourceCreationEventApplier<
  ResourceCreated
> = ({ timestamp, data: { id, slug, title, description, baseId, byId } }) => ({
  id,
  slug,
  title,
  description,
  excerpt: generateResourceExcerpt(description),
  baseId,
  legacyId: null,
  created: timestamp,
  updated: timestamp,
  published: null,
  deleted: null,
  lastPublished: null,
  licence: ResourceLicence.ETALAB_2_0,
  createdById: byId,
  imageId: null,
  isPublic: null,
  contents: [],
  themes: [],
  resourceTypes: [],
  beneficiaries: [],
  professionalSectors: [],
  contributors: [],
  collections: [],
  viewsCount: 0,
  _count: {
    collections: 0,
    resourceFeedback: 0,
  },
  resourceFeedback: [],
  feedbackAverage: 0,
  feedbackCount: {
    total: 0,
    notRecommended: 0,
    moderatelyRecommended: 0,
    recommended: 0,
    highlyRecommended: 0,
  },
  publicFeedback: true,
})

export const onCreated: ResourceEventSideEffect<ResourceCreated> = async (
  event,
  _resource,
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
      excerpt: generateResourceExcerpt(event.data.description),
      baseId: event.data.baseId,
      created: event.timestamp,
      updated: event.timestamp,
      createdById: event.data.byId,
      isPublic: null,
    },
  })
}
