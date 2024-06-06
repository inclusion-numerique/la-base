import {
  MigrateResourceCommand,
  ResourceMigrated,
} from '@app/web/server/resources/feature/MigrateResource'
import { ResourceCreationCommandHandler } from '@app/web/server/resources/feature/ResourceCommandHandler'
import { ResourceCreationEventApplier } from '@app/web/server/resources/feature/ResourceEventApplier'
import { ResourceEventSideEffect } from '@app/web/server/resources/feature/ResourceEventSideEffect'
import { generateResourceExcerpt } from '@app/web/resources/resourceExcerpt'

export const handleMigrateResource: ResourceCreationCommandHandler<
  MigrateResourceCommand,
  ResourceMigrated
> = ({
  payload: {
    resourceId,
    title,
    created,
    updated,
    published,
    contents,
    ...rest
  },
}) => {
  const timestamp = new Date()

  return [
    {
      type: 'Migrated',
      timestamp,
      data: {
        __version: 1,
        title,
        created: created.toISOString(),
        updated: updated.toISOString(),
        published: published?.toISOString() ?? null,
        id: resourceId,
        contents: contents.map(
          ({
            created: contentCreated,
            updated: contentUpdated,
            ...contentRest
          }) => ({
            created: contentCreated.toISOString(),
            updated: contentUpdated.toISOString(),
            ...contentRest,
          }),
        ),
        ...rest,
      },
    },
  ]
}

export const applyResourceMigrated: ResourceCreationEventApplier<
  ResourceMigrated
> = ({
  data: {
    __version,
    id,
    byId,
    created,
    updated,
    published,
    themes,
    targetAudiences,
    supportTypes,
    contents,
    description,
    ...rest
  },
}) => ({
  id,
  created: new Date(created),
  updated: new Date(updated),
  deleted: null,
  published: published ? new Date(published) : null,
  lastPublished: published ? new Date(published) : null,
  createdById: byId,
  description,
  excerpt: generateResourceExcerpt(description),
  ...rest,
  contents: contents.map(
    ({ created: contentCreated, updated: contetUpdated, ...contentRest }) => ({
      created: new Date(contentCreated),
      updated: new Date(contetUpdated),
      ...contentRest,
    }),
  ),
  themes: themes ?? [],
  supportTypes: supportTypes ?? [],
  targetAudiences: targetAudiences ?? [],
  contributors: [],
  collections: [],
  _count: {
    collections: 0,
    views: 0,
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

export const onMigrated: ResourceEventSideEffect<ResourceMigrated> = async (
  { data: { __version, id, byId, legacyId, contents, description, ...rest } },
  resource,
  { transaction },
) => {
  const existing = await transaction.resource.findUnique({
    where: { legacyId },
    select: { id: true },
  })
  if (existing) {
    await transaction.resourceEvent.deleteMany({
      where: { resourceId: existing.id },
    })
    await transaction.resource.delete({
      where: {
        legacyId,
      },
    })
  }
  await transaction.resource.create({
    data: {
      id,
      legacyId,
      createdById: byId,
      description,
      excerpt: generateResourceExcerpt(description),
      ...rest,
      contents: {
        createMany: {
          data: contents,
        },
      },
    },
  })
}
