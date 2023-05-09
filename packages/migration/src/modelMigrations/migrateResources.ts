import { migrationPrismaClient } from '@app/migration/migrationPrismaClient'
import { FindManyItemType } from '@app/migration/utils/findManyItemType'
import { LegacyToNewIdHelper } from '@app/migration/legacyToNewIdHelper'
import { prismaClient } from '@app/web/prismaClient'
import { v4 } from 'uuid'
import {
  computeSlugAndUpdateExistingSlugs,
  SlugToLegacyIdMap,
} from '@app/migration/utils/computeSlugAndUpdateExistingSlugs'
import { transformContent } from '@app/migration/modelMigrations/transformContent'
import { createSlug } from '@app/web/utils/createSlug'
import { output } from '@app/cli/output'
import { chunk } from 'lodash'
import { UpsertCreateType } from '@app/migration/utils/UpsertCreateType'

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
}) => {
  const legacyId = Number(legacyResource.id)

  const data = {
    title: legacyResource.title,
    slug,
    titleDuplicationCheckSlug: createSlug(legacyResource.title),
    description: legacyResource.description ?? '',
    createdById: userIdFromLegacyId(Number(legacyResource.creator_id)),
    baseId: legacyResource.root_base_id
      ? baseIdFromLegacyId(Number(legacyResource.root_base_id))
      : null,
    created: legacyResource.created,
    updated: legacyResource.modified,
    imageId: legacyResource.profile_image_id
      ? imageIdFromLegacyId(Number(legacyResource.profile_image_id))
      : null,
  } satisfies UpsertCreateType<typeof prismaClient.resource.upsert>

  const resourceUpsert = {
    where: { legacyId },
    create: {
      id: v4(),
      legacyId,
      ...data,
    },
    update: data,
    select: { id: true, createdBy: true, legacyId: true },
  } satisfies Parameters<typeof prismaClient.resource.upsert>[0]

  // Instead of merging the content blocks, we delete all the existing ones and recreate them
  const deleteExistingContents = {
    where: { resource: { legacyId } },
  } satisfies Parameters<typeof prismaClient.content.deleteMany>[0]

  const orderedLegacyResourcesOrSectionTitle =
    legacyResource.main_contentsection.flatMap((legacySection) => {
      if (legacySection.title === null) {
        // This is a section without title, it is at the "root" level of the resource
        return legacySection.main_contentblock
      }

      // This is a legacy section with a title, we flatten the structure in the new app and the section becomes a content
      return [legacySection, ...legacySection.main_contentblock]
    })

  const contentsCreate = orderedLegacyResourcesOrSectionTitle.map(
    (legacyContent, index) =>
      transformContent({
        legacyResource,
        legacyContent,
        imageIdFromLegacyId,
        uploadKeyFromLegacyKey,
        order: index,
      }),
  )

  return { resourceUpsert, deleteExistingContents, contentsCreate }
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
  const resourcesOperationsData = legacyResources.map((legacyResource) => {
    const slug = computeSlugAndUpdateExistingSlugs(
      legacyResource,
      existingResourceSlugs,
    )
    return transformResource({
      slug,
      legacyResource,
      userIdFromLegacyId,
      baseIdFromLegacyId,
      imageIdFromLegacyId,
      uploadKeyFromLegacyKey,
    })
  })
  const chunkSize = 200
  let migratedResourceCount = 0
  let migratedContentCount = 0

  const resourceUpserts = resourcesOperationsData.map(
    ({ resourceUpsert }) => resourceUpsert,
  )
  const contentsDelete = resourcesOperationsData.map(
    ({ deleteExistingContents }) => deleteExistingContents,
  )

  const contentsCreateData = resourcesOperationsData.flatMap(
    ({ contentsCreate }) => contentsCreate,
  )

  output(`- Migrating ${resourceUpserts.length} resources`)

  const migratedResources = await Promise.all(
    chunk(resourceUpserts, chunkSize).map((resourceChunk) =>
      prismaClient
        .$transaction(
          resourceChunk.map((params) => prismaClient.resource.upsert(params)),
        )
        .then((resources) => {
          migratedResourceCount += resources.length
          output(
            `-- ${migratedResourceCount} ${(
              (migratedResourceCount * 100) /
              legacyResources.length
            ).toFixed(0)}%`,
          )
          return resources
        }),
    ),
  )

  output(`- Cleaning resource contents before re-creating them`)

  await Promise.all(
    chunk(contentsDelete, chunkSize).map((deleteChunk) =>
      prismaClient.$transaction(
        deleteChunk.map((params) => prismaClient.content.deleteMany(params)),
      ),
    ),
  )
  output(`- Migrating ${contentsCreateData.length} contents`)

  const migratedContents = await Promise.all(
    chunk(contentsCreateData, chunkSize).map((contentsChunk) =>
      prismaClient
        .$transaction(
          contentsChunk.map((data) =>
            prismaClient.content.create({
              data,
              select: {
                id: true,
                legacyContentId: true,
                legacySectionId: true,
                resourceId: true,
                legacyLinkedResourceId: true,
              },
            }),
          ),
        )
        .then((resources) => {
          migratedContentCount += resources.length
          output(
            `-- ${migratedContentCount} ${(
              (migratedContentCount * 100) /
              contentsCreateData.length
            ).toFixed(0)}%`,
          )
          return resources
        }),
    ),
  )

  return {
    migratedResources: migratedResources.flat(),
    migratedContents: migratedContents.flat(),
  }
}
