import { s3 } from '@app/web/server/s3/s3'
import { CopyObjectCommand } from '@aws-sdk/client-s3'
import { afterBucket } from './getAfterKeyForMainBucketMigration'

export const migrateStorageFile = async ({
  beforeBucket,
  before,
  after,
}: {
  beforeBucket: string
  before: string
  after: string
}) => {
  const copySource = `/${beforeBucket}/${encodeURIComponent(before)}`

  // Our old processed webp image had wrong metadata for ContentType
  // We need to set the correct metadata in this case
  const isWebpImage = before.endsWith('.webp') && before.startsWith('images/')
  const metadataDirective = isWebpImage ? 'REPLACE' : 'COPY'
  const contentType = isWebpImage ? 'image/webp' : undefined

  const result = await s3.send(
    new CopyObjectCommand({
      Bucket: afterBucket,
      Key: after,
      CopySource: copySource,
      MetadataDirective: metadataDirective,
      ContentType: contentType,
      ACL: 'public-read',
    }),
  )

  return result
}
