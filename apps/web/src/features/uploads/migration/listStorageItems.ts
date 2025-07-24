import { s3 } from '@app/web/server/s3/s3'
import { isDefinedAndNotNull } from '@app/web/utils/isDefinedAndNotNull'
import {
  ListObjectsV2Command,
  ObjectStorageClass,
  Owner,
} from '@aws-sdk/client-s3'
import {
  afterBucket,
  beforeLegacyBucket,
  beforeMainBucket,
  getAfterKeyForMainBucketMigration,
} from './getAfterKeyForMainBucketMigration'

export type StoredItem = {
  Key: string
  LastModified?: Date | undefined
  ETag?: string | undefined
  Size?: number | undefined
  StorageClass?: ObjectStorageClass | undefined
  Owner?: Owner | undefined
}

const listItems = async ({
  bucket,
  continuationToken,
}: {
  bucket: string
  continuationToken?: string
}): Promise<{ items: StoredItem[]; nextContinuationToken?: string }> => {
  const response = await s3.send(
    new ListObjectsV2Command({
      Bucket: bucket,
      ContinuationToken: continuationToken,
    }),
  )

  const items =
    response.Contents?.filter((object): object is StoredItem =>
      isDefinedAndNotNull(object.Key),
    ) ?? []

  const nextContinuationToken = response.NextContinuationToken

  return {
    items,
    nextContinuationToken,
  }
}

const recursiveListItems = async ({
  bucket,
}: {
  bucket: string
}): Promise<{ items: StoredItem[] }> => {
  const initialKeys = await listItems({
    bucket,
  })

  let items = initialKeys.items
  let nextContinuationToken = initialKeys.nextContinuationToken

  while (nextContinuationToken) {
    const keysPage = await listItems({
      bucket,
      continuationToken: nextContinuationToken,
    })
    items = [...items, ...keysPage.items]
    nextContinuationToken = keysPage.nextContinuationToken
  }

  return { items }
}

export const listStorageItems = async () => {
  const [mainItems, legacyItems, afterItems] = await Promise.all([
    recursiveListItems({ bucket: beforeMainBucket }),
    recursiveListItems({ bucket: beforeLegacyBucket }),
    recursiveListItems({ bucket: afterBucket }),
  ])

  // Main keys will be migrated to afterBucket with the key : `/main/${mainKey}`
  // Legacy keys will be migrated to afterBucket with the same key as they already start with `/legacy/`

  const afterKeysSet = new Set(afterItems.items.map((item) => item.Key))

  const mainItemsToMigrate = mainItems.items
    .map((item) => ({
      item,
      afterKey: getAfterKeyForMainBucketMigration(item.Key),
    }))
    .filter(({ afterKey }) => !afterKeysSet.has(afterKey))

  const legacyItemsToMigrate = legacyItems.items
    .map((item) => ({ item, afterKey: `legacy/${item.Key}` }))
    .filter(({ afterKey }) => !afterKeysSet.has(afterKey))

  return {
    mainItems,
    legacyItems,
    afterItems,
    mainItemsToMigrate,
    legacyItemsToMigrate,
  }
}
