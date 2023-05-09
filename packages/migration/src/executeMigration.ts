import {
  getExistingUsers,
  getLegacyUsers,
  migrateUsers,
} from '@app/migration/modelMigrations/migrateUser'
import { prismaClient } from '@app/web/prismaClient'
import {
  getExistingBases,
  getLegacyBases,
  migrateBase,
} from '@app/migration/modelMigrations/migrateBase'
import {
  createLegacyToNewIdHelper,
  createLegacyToNewKeyHelper,
} from '@app/migration/legacyToNewIdHelper'
import { computeSlugAndUpdateExistingSlugs } from '@app/migration/utils/computeSlugAndUpdateExistingSlugs'
import {
  getExistingResourceSlugs,
  getLegacyResources,
  migrateResource,
} from '@app/migration/modelMigrations/migrateResource'
import { runPromisesInChunks } from '@app/web/utils/runPromisesInChunks'
import {
  getExistingImages,
  getLegacyImages,
  migrateImage,
} from '@app/migration/modelMigrations/migrateImage'
import {
  getExistingUploads,
  getLegacyUploads,
  migrateUpload,
} from '@app/migration/modelMigrations/migrateUpload'

// eslint-disable-next-line no-console
const output = console.log

const chunkSize = 200

const formatDuration = (start: Date, end: Date) =>
  `${((end.getTime() - start.getTime()) / 1000).toFixed(1)}s`

export const executeMigration = async () => {
  const start = new Date()
  output('')
  output('Starting migration')
  output('')

  output('Fetching legacy data and context data in new database')

  const legacyUploads = await getLegacyUploads()
  output(`- Found ${legacyUploads.length} uploads to migrate`)
  const existingUploads = await getExistingUploads()
  output(`- Found ${existingUploads.keyMap.size} already migrated uploads`)
  const legacyUsers = await getLegacyUsers()
  output(`- Found ${legacyUsers.length} users to migrate`)
  const existingUsers = await getExistingUsers()
  output(`- Found ${existingUsers.idMap.size} already migrated users`)
  const legacyBases = await getLegacyBases()
  output(`- Found ${legacyBases.length} bases to migrate`)
  const existingBases = await getExistingBases()
  output(
    `- Found ${existingBases.slugMap.size} existing base slugs for uniqueness checks`,
  )
  output(`- Found ${existingBases.idMap.size} already migrated bases`)
  const legacyResources = await getLegacyResources()
  output(`- Found ${legacyResources.length} resources to migrate`)
  const existingResourceSlugs = await getExistingResourceSlugs()
  output(
    `- Found ${existingResourceSlugs.size} existing resource slugs for uniqueness checks`,
  )
  const legacyImages = await getLegacyImages()
  output(`- Found ${legacyImages.length} images to migrate`)
  const existingImages = await getExistingImages()
  output(`- Found ${existingImages.idMap.size} already migrated images`)

  const endFetchContext = new Date()
  output(`⏱️ Context fetching took ${formatDuration(start, endFetchContext)}`)
  output('')
  output('Executing model migrations')

  output(`- Migrating ${legacyUsers.length} users...`)

  const migratedUsers = await migrateUsers({ transaction: prismaClient })

  output(`- Migrated ${migratedUsers.length} users`)

  const userIdFromLegacyId = createLegacyToNewIdHelper(
    migratedUsers,
    ({ legacyId }) => `User with legacyId ${legacyId} not found`,
  )

  output(`- Migrating uploads...`)

  const migratedUploads = await runPromisesInChunks(
    legacyUploads.map((legacyUpload) =>
      migrateUpload({
        legacyUpload,
        transaction: prismaClient,
      }),
    ),
    chunkSize,
  )
  output(`- Migrated ${migratedUploads.length} uploads`)

  const uploadKeyFromLegacyKey = createLegacyToNewKeyHelper(
    migratedUploads,
    ({ legacyKey }) => `Upload with legacyKey ${legacyKey} not found`,
  )

  output(`- Migrating images...`)

  const migratedImages = await Promise.all(
    legacyImages.map((legacyImage) =>
      migrateImage({
        legacyImage,
        transaction: prismaClient,
        uploadKeyFromLegacyKey,
      }),
    ),
  )
  output(`- Migrated ${migratedImages.length} images`)

  const imageIdFromLegacyId = createLegacyToNewIdHelper(
    migratedImages,
    ({ legacyId }) => `Image with legacyId ${legacyId} not found`,
  )

  output(`- Migrating bases...`)

  const migratedBases = await Promise.all(
    legacyBases.map((legacyBase) => {
      const slug = computeSlugAndUpdateExistingSlugs(
        legacyBase,
        existingBases.slugMap,
      )
      return migrateBase({
        legacyBase,
        transaction: prismaClient,
        slug,
        userIdFromLegacyId,
        imageIdFromLegacyId,
      })
    }),
  )
  output(`- Migrated ${migratedBases.length} bases`)

  const baseIdFromLegacyId = createLegacyToNewIdHelper(
    migratedBases,
    ({ legacyId }) => `Base with legacyId ${legacyId} not found`,
  )

  output(`- Migrating resources...`)

  let migratedResourceCount = 0

  const migratedResources = await runPromisesInChunks(
    legacyResources.map((legacyResource) => {
      const slug = computeSlugAndUpdateExistingSlugs(
        legacyResource,
        existingResourceSlugs,
      )
      return migrateResource({
        legacyResource,
        transaction: prismaClient,
        slug,
        userIdFromLegacyId,
        baseIdFromLegacyId,
        imageIdFromLegacyId,
        uploadKeyFromLegacyKey,
      })
        .then((migratedResource) => {
          migratedResourceCount += 1
          if (migratedResourceCount % 200 === 0) {
            output(
              `-- ${migratedResourceCount} ${(
                (migratedResourceCount * 100) /
                legacyResources.length
              ).toFixed(0)}%`,
            )
          }
          return migratedResource
        })
        .catch((error) => {
          output('Error migrating resource', legacyResource)
          throw error
        })
    }),
    chunkSize,
  )

  output(`- Migrated ${migratedResources.length} resources`)

  const resourceIdFromLegacyId = createLegacyToNewIdHelper(
    migratedResources.map(({ resource }) => resource),
    ({ legacyId }) => `Resource with legacyId ${legacyId} not found`,
  )

  output(`- Updating resource links in contents...`)

  // TODO Move this code in its own file
  const resourceLinkContents = migratedResources.flatMap((migrated) =>
    migrated.contents.filter(
      (
        content,
      ): content is (typeof migratedResources)[number]['contents'][number] & {
        legacyLinkedResourceId: number
      } => !!content.legacyLinkedResourceId,
    ),
  )

  const updatedResourceLinks = await Promise.all(
    resourceLinkContents.map((content) =>
      prismaClient.content.update({
        where: { id: content.id },
        data: {
          linkedResourceId: resourceIdFromLegacyId(
            content.legacyLinkedResourceId,
          ),
        },
        select: {
          id: true,
          legacyLinkedResourceId: true,
          linkedResourceId: true,
        },
      }),
    ),
  )
  output(`- Updated ${updatedResourceLinks.length} resources links`)
  const endModelMigrations = new Date()
  output(
    `⏱️ Model migrations took ${formatDuration(
      endFetchContext,
      endModelMigrations,
    )}`,
  )

  const result = { migratedUsers, migratedBases, migratedResources }

  output('')
  output(
    `👍️ Migrated successfully in ${formatDuration(start, endModelMigrations)}`,
  )
  return { result, time: endModelMigrations.getTime() - start.getTime() }
}
