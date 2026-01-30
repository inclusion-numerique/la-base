import { output } from '@app/cli/output'
import { prismaClient } from '@app/web/prismaClient'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { s3 } from '@app/web/server/s3/s3'
import { DeleteObjectsCommand } from '@aws-sdk/client-s3'
import type { OrphanedFile } from './types'

export const deleteOrphanedFiles = async ({
  orphans,
  batchSize,
}: {
  orphans: OrphanedFile[]
  batchSize: number
}): Promise<{ deletedCount: number; errorCount: number }> => {
  const bucket = ServerWebAppConfig.S3.uploadsBucket

  // Clean up DB records for orphans that have Upload/Image records
  const keysWithDbRecords = orphans
    .filter(
      (o) =>
        o.category === 'upload-no-image' || o.category === 'image-no-entity',
    )
    .map((o) => o.key)

  if (keysWithDbRecords.length > 0) {
    output(`Nettoyage DB : ${keysWithDbRecords.length} records a supprimer...`)

    // Delete Image records first (FK constraint: Image.uploadKey -> Upload.key)
    const deletedImages = await prismaClient.image.deleteMany({
      where: { uploadKey: { in: keysWithDbRecords } },
    })
    output(`  ${deletedImages.count} records Image supprimes`)

    // Then delete Upload records
    const deletedUploads = await prismaClient.upload.deleteMany({
      where: { key: { in: keysWithDbRecords } },
    })
    output(`  ${deletedUploads.count} records Upload supprimes`)
  }

  // Delete S3 objects in batches
  let deletedCount = 0
  let errorCount = 0
  const totalBatches = Math.ceil(orphans.length / batchSize)

  for (let i = 0; i < orphans.length; i += batchSize) {
    const batch = orphans.slice(i, i + batchSize)
    const batchNumber = Math.floor(i / batchSize) + 1

    try {
      await s3.send(
        new DeleteObjectsCommand({
          Bucket: bucket,
          Delete: {
            Objects: batch.map((o) => ({ Key: o.key })),
            Quiet: true,
          },
        }),
      )
      deletedCount += batch.length
      output(
        `  Batch ${batchNumber}/${totalBatches} : ${batch.length} objets supprimes (${deletedCount}/${orphans.length})`,
      )
    } catch (error) {
      errorCount += batch.length
      output(
        `  Batch ${batchNumber}/${totalBatches} : ERREUR - ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  }

  return { deletedCount, errorCount }
}
