import { output } from '@app/cli/output'
import { prismaClient } from '@app/web/prismaClient'
import type { MigrateResourceCommand } from '@app/web/server/resources/feature/MigrateResource'
import type { ResourceProjection } from '@app/web/server/resources/feature/createResourceProjection'
import { handleResourceCreationCommand } from '@app/web/server/resources/feature/handleResourceCreationCommand'
import { createSlug } from '@app/web/utils/createSlug'
import { chunk } from 'lodash'
import { v4 } from 'uuid'
import type { FindManyItemType } from '@app/migration/utils/findManyItemType'
import {
  computeSlugAndUpdateExistingSlugs,
  SlugToLegacyIdMap,
} from '@app/migration/utils/computeSlugAndUpdateExistingSlugs'
import { transformContent } from '@app/migration/modelMigrations/transformContent'
import { migrationPrismaClient } from '@app/migration/migrationPrismaClient'
import type { LegacyToNewIdHelper } from '@app/migration/legacyToNewIdHelper'
import { getThemesFromLegacyTags } from '@app/migration/modelMigrations/legacyResourcesThemeResourceMapping'
import { legacyBasesIdsToTransformToProfile } from '@app/migration/modelMigrations/legacyBasesToTransformToProfile'

export const getLegacyResources = async () => {
  const all = await migrationPrismaClient.main_resource.findMany({
    include: {
      main_basesection_resources: true,
      // Each content seems to be inside a section. With a null title if at the "root", or with a "title" if inside a section
      main_contentsection: {
        orderBy: { order: 'asc' },
        include: {
          main_contentblock: {
            orderBy: { order: 'asc' },
            include: {
              main_filecontent: true,
              main_linkcontent: true,
              main_linkedresourcecontent: true,
              main_textcontent: true,
            },
          },
        },
      },
      main_resource_tags: {
        select: {
          tag_id: true,
        },
      },
      // TODO Do not know if this is useful
      main_contentblock: true,
    },
    orderBy: {
      id: 'asc',
    },
  })

  // We put resources that depends on other at the end of the migration process

  const linkedResources: typeof all = []
  const dependencyFree: typeof all = []
  const withLinkedResources: typeof all = []

  const linkedResourceIds = new Set<bigint>()
  const withLinkedResourceIds = new Set<bigint>()

  for (const resource of all) {
    for (const section of resource.main_contentsection) {
      for (const [index, block] of section.main_contentblock.entries()) {
        const linkedResourceId =
          block.main_linkedresourcecontent?.linked_resource_id
        if (!linkedResourceId) {
          continue
        }
        // We DO NOT migrate contents that link to the same resource
        if (linkedResourceId === resource.id) {
          section.main_contentblock = section.main_contentblock.filter(
            (_block, _blockIndex) => _blockIndex !== index,
          )
          continue
        }
        linkedResourceIds.add(linkedResourceId)
        withLinkedResourceIds.add(resource.id)
      }
    }
  }

  for (const resource of all) {
    if (linkedResourceIds.has(resource.id)) {
      linkedResources.push(resource)
      continue
    }
    if (withLinkedResourceIds.has(resource.id)) {
      withLinkedResources.push(resource)
      continue
    }
    dependencyFree.push(resource)
  }

  return [...linkedResources, ...dependencyFree, ...withLinkedResources]
}

export type LegacyResource = FindManyItemType<typeof getLegacyResources>

export const getExistingResourceSlugs = (): Promise<SlugToLegacyIdMap> =>
  prismaClient.resource
    .findMany({ select: { slug: true, legacyId: true } })
    .then(
      (resources) =>
        new Map(resources.map(({ slug, legacyId }) => [slug, legacyId])),
    )

export const transformResource = ({
  legacyResource,
  slug,
  userIdFromLegacyId,
  baseIdFromLegacyId,
  imageIdFromLegacyId,
  uploadKeyFromLegacyKey,
  migratedResourcesByLegacyId,
}: {
  legacyResource: LegacyResource
  userIdFromLegacyId: LegacyToNewIdHelper
  baseIdFromLegacyId: LegacyToNewIdHelper
  imageIdFromLegacyId: LegacyToNewIdHelper
  uploadKeyFromLegacyKey: (legacyKey: string) => string
  migratedResourcesByLegacyId: Map<number, ResourceProjection>
  // Deduplicated slug
  slug: string
}):
  | MigrateResourceCommand
  | { error: string; legacyResource: LegacyResource } => {
  const legacyId = Number(legacyResource.id)

  if (!legacyResource.creator_id) {
    return { error: 'No creator', legacyResource }
  }

  // Some v1 base are "personal bases" that will be migrated as profile onlly resources
  const legacyBaseId = legacyResource.root_base_id
    ? Number(legacyResource.root_base_id)
    : null

  const baseId = legacyBaseId
    ? // Remove base id foreign key if it is a base that will be migrated as profile only
      legacyBasesIdsToTransformToProfile.has(legacyBaseId)
      ? null
      : // Use the new base id if it is a base that will be migrated as a base
        baseIdFromLegacyId(legacyBaseId)
    : null

  const payload = {
    resourceId: v4(),
    legacyId,
    title: legacyResource.title,
    slug,
    themes: getThemesFromLegacyTags(legacyResource.main_resource_tags),
    titleDuplicationCheckSlug: createSlug(legacyResource.title),
    description: legacyResource.description ?? '',
    byId: userIdFromLegacyId(Number(legacyResource.creator_id)),
    baseId,
    created: legacyResource.created,
    updated: legacyResource.modified,
    imageId: legacyResource.profile_image_id
      ? imageIdFromLegacyId(Number(legacyResource.profile_image_id))
      : null,
    contents: [] as MigrateResourceCommand['payload']['contents'],
    isPublic: legacyResource.state === 'public',
    published:
      legacyResource.state === 'draft' ? null : legacyResource.modified,
  } satisfies MigrateResourceCommand['payload']

  const orderedLegacyResourcesOrSectionTitle =
    legacyResource.main_contentsection.flatMap((legacySection) => {
      if (legacySection.title === null) {
        // This is a section without title, it is at the "root" level of the resource
        return legacySection.main_contentblock
      }

      // This is a legacy section with a title, we flatten the structure in the new app and the section becomes a content
      return [legacySection, ...legacySection.main_contentblock]
    })

  for (const [
    index,
    content,
  ] of orderedLegacyResourcesOrSectionTitle.entries()) {
    const transformedContent = transformContent({
      legacyContent: content,
      imageIdFromLegacyId,
      uploadKeyFromLegacyKey,
      order: index,
      migratedResourcesByLegacyId,
    })
    if (!transformedContent) {
      continue
    }
    payload.contents.push(transformedContent)
  }

  return {
    name: 'MigrateResource',
    payload,
  }
}

export const migrateResources = async ({
  userIdFromLegacyId,
  baseIdFromLegacyId,
  imageIdFromLegacyId,
  uploadKeyFromLegacyKey,
  existingResourceSlugs,
  legacyResources,
}: {
  userIdFromLegacyId: LegacyToNewIdHelper
  baseIdFromLegacyId: LegacyToNewIdHelper
  imageIdFromLegacyId: LegacyToNewIdHelper
  uploadKeyFromLegacyKey: (legacyKey: string) => string
  existingResourceSlugs: SlugToLegacyIdMap
  legacyResources: LegacyResource[]
}) => {
  output(`- Found ${legacyResources.length} resources to migrate`)
  const migratedResourcesByLegacyId = new Map<number, ResourceProjection>()

  const legacyResourceToCommand = (legacyResource: LegacyResource) => {
    const slug = computeSlugAndUpdateExistingSlugs(
      legacyResource,
      existingResourceSlugs,
    )
    const command = transformResource({
      slug,
      legacyResource,
      userIdFromLegacyId,
      baseIdFromLegacyId,
      imageIdFromLegacyId,
      uploadKeyFromLegacyKey,
      migratedResourcesByLegacyId,
    })

    if ('error' in command) {
      output(
        `-- ⚠️ Could not migrate resource ${legacyResource.id}: ${command.error}`,
        legacyResource,
      )
    }
    return command
  }

  const filterCommand = (
    command:
      | MigrateResourceCommand
      | { error: string; legacyResource: LegacyResource },
  ): command is Exclude<
    ReturnType<typeof transformResource>,
    {
      error: string
      legacyResource: LegacyResource
    }
  > => !('error' in command)

  const migratedResources: ResourceProjection[] = []
  const migratedContents: (ResourceProjection['contents'][number] & {
    resourceId: string
  })[] = []

  output(`- Migrating ${legacyResources.length} resources`)

  const executeCommand = async (command: MigrateResourceCommand) => {
    const result = await handleResourceCreationCommand(command, {
      user: undefined,
    })
    migratedResourcesByLegacyId.set(command.payload.legacyId, result.resource)
    migratedResources.push(result.resource)
    migratedContents.push(
      ...result.resource.contents.map((content) => ({
        ...content,
        resourceId: result.resource.id,
      })),
    )
    if (migratedResources.length % 25 === 0) {
      output(
        `-- ${migratedResources.length} ${(
          (migratedResources.length * 100) /
          legacyResources.length
        ).toFixed(0)}%`,
      )
    }
  }

  const chunkSize = 50
  for (const resourcesChunk of chunk(legacyResources, chunkSize)) {
    const commands = resourcesChunk
      .map(legacyResourceToCommand)
      .filter(filterCommand)

    // eslint-disable-next-line no-await-in-loop
    await Promise.all(commands.map(executeCommand))
  }

  return {
    migratedResources,
    migratedContents,
  }
}
