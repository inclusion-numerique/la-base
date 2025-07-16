// Do a s3 head request to get the file info

import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { s3 } from '@app/web/server/s3/s3'
import { HeadObjectCommand } from '@aws-sdk/client-s3'

export type StorageFileInfo = {
  size: number
  mimeType: string
} | null

/**
 * Check if a file exists in the storage and return its info
 */
export const getStorageFileInfo = async ({ key }: { key: string }) => {
  try {
    const response = await s3.send(
      new HeadObjectCommand({
        Bucket: ServerWebAppConfig.S3.uploadsBucket,
        Key: key,
      }),
    )

    return {
      size: response.ContentLength,
      mimeType: response.ContentType,
    }
  } catch (error) {
    if (error instanceof Error && error.name === 'NotFound') {
      return null
    }
    throw error
  }
}
