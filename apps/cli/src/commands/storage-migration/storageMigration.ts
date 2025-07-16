import { output } from '@app/cli/output'
import {
  beforeLegacyBucket,
  beforeMainBucket,
} from '@app/web/features/uploads/migration/getAfterKeyForMainBucketMigration'
import { listStorageItems } from '@app/web/features/uploads/migration/listStorageItems'
import { migrateStorageFile } from '@app/web/features/uploads/migration/migrateStorageFile'
import { Command } from '@commander-js/extra-typings'
import { chunk } from 'lodash-es'

/**
 * Idempotent migration command from separate buckets for each environment
 * to a unique shared bucket with prefixed keys per environment.
 */
export const migrateStorage = new Command()
  .command('storage-migration:migrate')
  .action(async () => {
    const allItems = await listStorageItems()

    output(`Already migrated: ${allItems.afterItems.items.length}`)
    output(`Legacy items total: ${allItems.legacyItems.items.length}`)
    output(
      `-> Legacy items to migrate: ${allItems.legacyItemsToMigrate.length}`,
    )
    output(`Main items total: ${allItems.mainItems.items.length}`)
    output(`-> Main items to migrate: ${allItems.mainItemsToMigrate.length}`)

    const chunkSize = 15

    // First we migrate legacy items
    const legacyItemsChunks = chunk(allItems.legacyItemsToMigrate, chunkSize)
    for (const itemsChunkIndex in legacyItemsChunks) {
      const items = legacyItemsChunks[itemsChunkIndex]
      await Promise.all(
        items.map(async (item, itemIndex) => {
          await migrateStorageFile({
            beforeBucket: beforeLegacyBucket,
            before: item.item.Key,
            after: item.afterKey,
          })
          output(
            `legacy ${
              Number.parseInt(itemsChunkIndex, 10) * chunkSize + itemIndex + 1
            }/${allItems.legacyItemsToMigrate.length} migrated ${item.item.Key} to ${item.afterKey}`,
          )
        }),
      )
    }

    // Migrate main items
    const mainItemsChunks = chunk(allItems.mainItemsToMigrate, chunkSize)
    for (const itemsChunkIndex in mainItemsChunks) {
      const items = mainItemsChunks[itemsChunkIndex]
      await Promise.all(
        items.map(async (item, itemIndex) => {
          await migrateStorageFile({
            beforeBucket: beforeMainBucket,
            before: item.item.Key,
            after: item.afterKey,
          })
          output(
            `main ${
              Number.parseInt(itemsChunkIndex, 10) * chunkSize + itemIndex + 1
            }/${allItems.mainItemsToMigrate.length} migrated ${item.item.Key} to ${item.afterKey}`,
          )
        }),
      )
    }
  })
