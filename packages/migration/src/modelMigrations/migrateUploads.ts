import { prismaClient } from '@app/web/prismaClient'
import { ListObjectsV2Command } from '@aws-sdk/client-s3'
import mime from 'mime-types'
import { legacyS3Client } from '@app/web/server/s3/legacyS3'
import { ServerWebAppConfig } from '@app/web/webAppConfig'
import { output } from '@app/cli/output'
import { chunk } from 'lodash'
import { UpsertCreateType } from '@app/migration/utils/UpsertCreateType'

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

export const transformUpload = ({
  legacyUpload,
}: {
  legacyUpload: LegacyUpload
}) => {
  const data = {
    key: `legacy/${legacyUpload.Key}`,
    legacyKey: legacyUpload.Key,
    name: legacyUpload.Key,
    mimeType: mime.lookup(legacyUpload.Key) || 'application/octet-stream',
    size: legacyUpload.Size,
  } satisfies UpsertCreateType<typeof prismaClient.upload.upsert>

  return data
}

export const migrateUploads = async () => {
  const legacyUploads = await getLegacyUploads()
  output(`- Found ${legacyUploads.length} uploads to migrate`)
  const existingUploads = await getExistingUploads()
  output(`- Found ${existingUploads.keyMap.size} already migrated uploads`)
  const uploadsData = legacyUploads.map((legacyUpload) =>
    transformUpload({
      legacyUpload,
    }),
  )
  const chunkSize = 200
  let migratedUploadCount = 0
  const upserted = await Promise.all(
    chunk(uploadsData, chunkSize).map((uploadChunk) =>
      prismaClient
        .$transaction(
          uploadChunk.map((upload) =>
            prismaClient.upload.upsert({
              where: { legacyKey: upload.legacyKey },
              create: upload,
              update: upload,
              select: { key: true, legacyKey: true },
            }),
          ),
        )
        .then((uploads) => {
          migratedUploadCount += uploads.length
          output(
            `-- ${migratedUploadCount} ${(
              (migratedUploadCount * 100) /
              legacyUploads.length
            ).toFixed(0)}%`,
          )
          return uploads
        }),
    ),
  )
  return upserted.flat()
}
