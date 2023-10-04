import {
  MigrateResourceCommand,
  ResourceMigrated,
} from '@app/web/server/resources/feature/MigrateResource'
import {
  ResourceCommandSecurityRule,
  ResourceCreationCommandHandler,
} from '@app/web/server/resources/feature/ResourceCommandHandler'
import { ResourceCreationEventApplier } from '@app/web/server/resources/feature/ResourceEventApplier'
import { ResourceEventSideEffect } from '@app/web/server/resources/feature/ResourceEventSideEffect'

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

export const migrateResourceSecurityRules: ResourceCommandSecurityRule<
  MigrateResourceCommand
> = () => false

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
    contents,
    ...rest
  },
}) => ({
  id,
  created: new Date(created),
  updated: new Date(updated),
  published: published ? new Date(published) : null,
  createdById: byId,
  ...rest,
  contents: contents.map(
    ({ created: contentCreated, updated: contetUpdated, ...contentRest }) => ({
      created: new Date(contentCreated),
      updated: new Date(contetUpdated),
      ...contentRest,
    }),
  ),
  themes: themes ?? [],
  supportTypes: [],
  targetAudiences: [],
  contributors: [],
})

export const onMigrated: ResourceEventSideEffect<ResourceMigrated> = async (
  { data: { __version, id, byId, legacyId, contents, ...rest } },
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
      ...rest,
      contents: {
        createMany: {
          data: contents,
        },
      },
    },
  })
}
