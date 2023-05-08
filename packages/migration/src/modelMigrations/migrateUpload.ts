import type { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { ListObjectsV2Command } from '@aws-sdk/client-s3'
import mime from 'mime-types'
import { legacyS3Client } from '@app/web/server/s3/legacyS3'
import { ServerWebAppConfig } from '@app/web/webAppConfig'

// There is ~4500 files uploaded dated 2023-05-07
// There is also ~4000 cropped images of low quality that we will discard
export const getLegacyUploads = async () => {
  const legacyUploads = await legacyS3Client.send(
    new ListObjectsV2Command({
      Bucket: ServerWebAppConfig.LegacyS3.uploadsBucket,
      // 1000 is the max allowed by the API
      MaxKeys: 1000,
    }),
  )
  const objects = legacyUploads.Contents ?? []
  let hasNextPage = legacyUploads.NextContinuationToken
  while (hasNextPage) {
    // eslint-disable-next-line no-await-in-loop
    const page = await legacyS3Client.send(
      new ListObjectsV2Command({
        Bucket: ServerWebAppConfig.LegacyS3.uploadsBucket,
        // 1000 is the max allowed by the API
        MaxKeys: 1000,
        ContinuationToken: hasNextPage,
      }),
    )
    hasNextPage = page.NextContinuationToken
    objects.push(...(page.Contents ?? []))
  }

  const withoutCroppedImages = objects.filter(
    (object): object is { Key: string; Size: number; ETag: string } => {
      // Remove low quality cropped image as originals are in the root directory
      if (object?.Key?.startsWith('__sized__/')) {
        return false
      }
      return !!(object.Key && object.Size && object.ETag)
    },
  )

  let totalSize = 0
  for (const object of withoutCroppedImages) {
    totalSize += object.Size
  }
  console.log(
    `- Total size of legacy uploaded files: ${(totalSize / 1_000_000).toFixed(
      0,
    )}MB`,
  )
  return withoutCroppedImages
}

export type LegacyUpload = Awaited<ReturnType<typeof getLegacyUploads>>[0]

export const getExistingUploads = async (): Promise<{
  keyMap: Map<string, string>
}> => {
  const uploads = await prismaClient.upload.findMany({
    select: {
      key: true,
      legacyKey: true,
    },
  })

  const keyMap = new Map<string, string>(
    uploads
      .filter(
        (upload): upload is (typeof uploads)[0] & { legacyKey: string } =>
          !!upload.legacyKey,
      )
      .map(({ key, legacyKey }) => [legacyKey, key]),
  )

  return { keyMap }
}

export type MigrateUploadInput = {
  legacyUpload: LegacyUpload
  transaction: Prisma.TransactionClient
}

export const migrateUpload = async ({
  transaction,
  legacyUpload,
}: MigrateUploadInput) => {
  const data = {
    key: `legacy/${legacyUpload.Key}`,
    legacyKey: legacyUpload.Key,
    name: legacyUpload.Key,
    mimeType: mime.lookup(legacyUpload.Key) || 'application/octet-stream',
    size: legacyUpload.Size,
  } satisfies Parameters<typeof transaction.upload.upsert>[0]['create']

  return transaction.upload.upsert({
    where: { legacyKey: legacyUpload.Key },
    create: data,
    update: data,
    select: { key: true, legacyKey: true },
  })
}
