import { prismaClient } from '@app/web/prismaClient'
import {
  createLegacyToNewIdHelper,
  createLegacyToNewKeyHelper,
} from '@app/migration/legacyToNewIdHelper'
import {
  getExistingBases,
  getLegacyBases,
  migrateBases,
} from '@app/migration/modelMigrations/migrateBases'
import {
  getExistingImages,
  getLegacyImages,
  migrateImage,
} from '@app/migration/modelMigrations/migrateImage'
import {
  getExistingResourceSlugs,
  getLegacyResources,
  migrateResources,
} from '@app/migration/modelMigrations/migrateResources'
import { migrateUploads } from '@app/migration/modelMigrations/migrateUploads'
import { migrateUsers } from '@app/migration/modelMigrations/migrateUsers'
import { migrateBaseMembers } from '@app/migration/modelMigrations/migrateBaseMembers'
import { migrateResourceContributors } from '@app/migration/modelMigrations/migrateResourceContributors'
import { updateBaseAndProfileVisibility } from '@app/migration/modelMigrations/updateBaseAndProfileVisibility'

// eslint-disable-next-line no-console
const output = console.log

const formatDuration = (start: Date, end: Date) =>
  `${((end.getTime() - start.getTime()) / 1000).toFixed(1)}s`

export const executeMigration = async () => {
  const start = new Date()
  output('')
  output('Starting migration')
  output('')

  output('Fetching legacy data and context data in new database')

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

  output(`- Migrating users...`)

  const migratedUsers = await migrateUsers()

  output(`- Migrated ${migratedUsers.length} users`)

  const userIdFromLegacyId = createLegacyToNewIdHelper(
    migratedUsers,
    ({ legacyId }) => `User with legacyId ${legacyId} not found`,
  )

  output(`- Migrating uploads...`)

  const migratedUploads = await migrateUploads()
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

  const migratedBases = await migrateBases({
    legacyBases,
    existingBases,
    userIdFromLegacyId,
    imageIdFromLegacyId,
    transaction: prismaClient,
  })

  output(`- Migrated ${migratedBases.length} bases`)

  const baseIdFromLegacyId = createLegacyToNewIdHelper(
    migratedBases,
    ({ legacyId }) => `Base with legacyId ${legacyId} not found`,
  )

  output(`- Migrating resources...`)

  const { migratedResources, migratedContents } = await migrateResources({
    userIdFromLegacyId,
    baseIdFromLegacyId,
    imageIdFromLegacyId,
    uploadKeyFromLegacyKey,
    existingResourceSlugs,
    legacyResources,
  })

  const resourceIdFromLegacyId = createLegacyToNewIdHelper(
    migratedResources,
    ({ legacyId }) => `Resource with legacyId ${legacyId} not found`,
  )

  output(`- Migrated ${migratedResources.length} resources`)
  output(`- Migrated ${migratedContents.length} contents`)

  output(`- Migrating base members...`)
  const migratedBaseMembers = await migrateBaseMembers({
    userIdFromLegacyId,
    baseIdFromLegacyId,
  })

  output(`- Migrated ${migratedBaseMembers.length} base members`)

  output(`- Migrating resource contributors...`)
  const migratedResourceContributors = await migrateResourceContributors({
    userIdFromLegacyId,
    resourceIdFromLegacyId,
  })

  output(
    `- Migrated ${migratedResourceContributors.length} resource contributors`,
  )

  output(`- Updating base and profile visibility for public resources...`)
  const updatedVisibility = await updateBaseAndProfileVisibility()
  output('- Updated visibility for:')
  output(`  - ${updatedVisibility.updatedBases.count} bases`)
  output(`  - ${updatedVisibility.updatedProfiles.count} profiles`)

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
