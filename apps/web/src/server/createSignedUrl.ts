import { s3 } from '@app/web/server/s3/s3'
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { nanoid } from 'nanoid'

export const createSignedGetUrl = async ({
  key,
  bucket,
}: {
  key: string
  bucket: string
}): Promise<{ url: string }> => {
  // Signed URL
  const url = await getSignedUrl(
    s3,
    new GetObjectCommand({
      Key: key,
      Bucket: bucket,
    }),
    {
      expiresIn: 600,
    },
  )
  return { url }
}

export const createSignedUploadUrl = async ({
  directory,
  name,
  mimeType,
  bucket,
  visibility = 'private',
}: {
  name: string
  mimeType: string
  directory: string
  bucket: string
  visibility: 'public' | 'private'
}): Promise<{ url: string; key: string }> => {
  const key = `${directory}/${nanoid()}_${name}`

  // Signed URL
  const url = await getSignedUrl(
    s3,
    new PutObjectCommand({
      Key: key,
      Bucket: bucket,
      ContentType: mimeType,
      ACL: visibility === 'public' ? 'public-read' : undefined,
    }),
    { expiresIn: 3600 },
  )
  return { url, key }
}
