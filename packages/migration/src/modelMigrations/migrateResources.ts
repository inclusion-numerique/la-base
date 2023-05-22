import { chunk } from 'lodash'
import { v4 } from 'uuid'
import { output } from '@app/cli/output'
import { LegacyToNewIdHelper } from '@app/migration/legacyToNewIdHelper'
import { migrationPrismaClient } from '@app/migration/migrationPrismaClient'
import { transformContent } from '@app/migration/modelMigrations/transformContent'
import {
  SlugToLegacyIdMap,
  computeSlugAndUpdateExistingSlugs,
} from '@app/migration/utils/computeSlugAndUpdateExistingSlugs'
import { FindManyItemType } from '@app/migration/utils/findManyItemType'
import { prismaClient } from '@app/web/prismaClient'
import { MigrateResourceCommand } from '@app/web/server/resources/feature/MigrateResource'
import { ResourceProjection } from '@app/web/server/resources/feature/createResourceProjection'
import { handleResourceCreationCommand } from '@app/web/server/resources/feature/handleResourceCreationCommand'
import { createSlug } from '@app/web/utils/createSlug'

export const getLegacyResources = () =>
  migrationPrismaClient.main_resource.findMany({
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
      // TODO Do not know if this is useful
      main_contentblock: true,
    },
  })

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
}: {
  legacyResource: LegacyResource
  userIdFromLegacyId: LegacyToNewIdHelper
  baseIdFromLegacyId: LegacyToNewIdHelper
  imageIdFromLegacyId: LegacyToNewIdHelper
  uploadKeyFromLegacyKey: (legacyKey: string) => string
  // Deduplicated slug
  slug: string
}):
  | MigrateResourceCommand
  | { error: string; legacyResource: LegacyResource } => {
  const legacyId = Number(legacyResource.id)

  if (!legacyResource.creator_id) {
    return { error: 'No creator', legacyResource }
  }

  const payload = {
    resourceId: v4(),
    legacyId,
    title: legacyResource.title,
    slug,
    titleDuplicationCheckSlug: createSlug(legacyResource.title),
    description: legacyResource.description ?? '',
    byId: userIdFromLegacyId(Number(legacyResource.creator_id)),
    baseId: legacyResource.root_base_id
      ? baseIdFromLegacyId(Number(legacyResource.root_base_id))
      : null,
    created: legacyResource.created,
    updated: legacyResource.modified,
    imageId: legacyResource.profile_image_id
      ? imageIdFromLegacyId(Number(legacyResource.profile_image_id))
      : null,
    contents: [] as MigrateResourceCommand['payload']['contents'],
    // TODO what rule for this ?
    isPublic: true,
    published: legacyResource.modified,
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
    payload.contents.push(
      transformContent({
        legacyContent: content,
        imageIdFromLegacyId,
        uploadKeyFromLegacyKey,
        order: index,
      }),
    )
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
}: {
  userIdFromLegacyId: LegacyToNewIdHelper
  baseIdFromLegacyId: LegacyToNewIdHelper
  imageIdFromLegacyId: LegacyToNewIdHelper
  uploadKeyFromLegacyKey: (legacyKey: string) => string
  existingResourceSlugs: SlugToLegacyIdMap
}) => {
  const legacyResources = await getLegacyResources()
  output(`- Found ${legacyResources.length} resources to migrate`)
  const commands = legacyResources
    .map((legacyResource) => {
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
      })

      if ('error' in command) {
        output(
          `-- ⚠️ Could not migrate resource ${legacyResource.id}: ${command.error}`,
          legacyResource,
        )
      }
      return command
    })
    .filter(
      (
        command,
      ): command is Exclude<
        ReturnType<typeof transformResource>,
        {
          error: string
          legacyResource: LegacyResource
        }
      > => !('error' in command),
    )
  const chunkSize = 10
  let migratedResourceCount = 0
  const migratedContents: ResourceProjection['contents'] = []

  output(`- Migrating ${commands.length} resources`)

  const migratedResources = await Promise.all(
    chunk(commands, chunkSize).map((commandChunk) =>
      Promise.all(
        commandChunk.map((command) =>
          handleResourceCreationCommand(command, { user: undefined }),
        ),
      ).then((results) => {
        migratedResourceCount += results.length
        for (const result of results) {
          migratedContents.push(...result.resource.contents)
        }
        output(
          `-- ${migratedResourceCount} ${(
            (migratedResourceCount * 100) /
            legacyResources.length
          ).toFixed(0)}%`,
        )
        return results.map(({ resource }) => resource)
      }),
    ),
  )

  return {
    migratedResources: migratedResources.flat(),
    migratedContents,
  }
}
