import {
  getLegacyUsers,
  migrateUser,
} from '@app/migration/modelMigrations/migrateUser'
import { prismaClient } from '@app/web/prismaClient'
import {
  getExistingBaseSlugs,
  getLegacyBases,
  migrateBase,
} from '@app/migration/modelMigrations/migrateBase'
import { createLegacyToNewIdHelper } from '@app/migration/legacyToNewIdHelper'
import { computeSlugAndUpdateExistingSlugs } from '@app/migration/utils/computeSlugAndUpdateExistingSlugs'
import {
  getExistingResourceSlugs,
  getLegacyResources,
  migrateResource,
} from '@app/migration/modelMigrations/migrateResource'

// eslint-disable-next-line no-console
const output = console.log

export const executeMigration = async () => {
  const start = new Date()
  output('')
  output('Starting migration')
  output('')

  output('Fetching legacy data and context data in new database')
  const legacyUsers = await getLegacyUsers()
  output(`- Found ${legacyUsers.length} users to migrate`)
  const legacyBases = await getLegacyBases()
  output(`- Found ${legacyBases.length} bases to migrate`)
  const existingBaseSlugs = await getExistingBaseSlugs()
  output(
    `- Found ${existingBaseSlugs.size} existing base slugs for uniqueness checks`,
  )
  const legacyResources = await getLegacyResources()
  output(`- Found ${legacyResources.length} resources to migrate`)
  const existingResourceSlugs = await getExistingResourceSlugs()
  output(
    `- Found ${existingResourceSlugs.size} existing resource slugs for uniqueness checks`,
  )

  output('')
  output('Executing model migrations transaction')
  const result = await prismaClient.$transaction(async (transaction) => {
    output(`- Migrating users...`)

    const migratedUsers = await Promise.all(
      legacyUsers.map((legacyUser, index) =>
        migrateUser({ legacyUser, transaction })
          .catch((error) => {
            output('Error migrating user', legacyUser)
            throw error
          })
          .then((migratedUser) => {
            if (index % 100 === 0) {
              output(
                `-- Migrated ${index + 1} users ${(
                  (index + 1) /
                  legacyUsers.length
                ).toFixed(0)}%`,
              )
            }
            return migratedUser
          }),
      ),
    )
    output(`- Migrated ${migratedUsers.length} users`)

    const userIdFromLegacyId = createLegacyToNewIdHelper(
      migratedUsers,
      ({ legacyId }) => `User with legacyId ${legacyId} not found`,
    )

    output(`- Migrating bases...`)

    const migratedBases = await Promise.all(
      legacyBases.map((legacyBase) => {
        const slug = computeSlugAndUpdateExistingSlugs(
          legacyBase,
          existingBaseSlugs,
        )
        return migrateBase({
          legacyBase,
          transaction,
          slug,
          userIdFromLegacyId,
        })
      }),
    )
    output(`- Migrated ${migratedBases.length} bases`)

    const baseIdFromLegacyId = createLegacyToNewIdHelper(
      migratedBases,
      ({ legacyId }) => `Base with legacyId ${legacyId} not found`,
    )

    output(`- Migrating resources...`)
    const migratedResources = await Promise.all(
      legacyResources.map((legacyResource) => {
        const slug = computeSlugAndUpdateExistingSlugs(
          legacyResource,
          existingResourceSlugs,
        )
        return migrateResource({
          legacyResource,
          transaction,
          slug,
          userIdFromLegacyId,
          baseIdFromLegacyId,
        })
      }),
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
        transaction.content.update({
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

    return { migratedUsers, migratedBases, migratedResources }
  })

  const end = new Date()

  return { result, time: end.getTime() - start.getTime() }
}
