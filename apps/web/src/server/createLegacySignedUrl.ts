import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { legacyS3Client } from '@app/web/server/s3/legacyS3'

export const createLegacySignedUrl = async ({
  key,
  bucket,
}: {
  key: string
  bucket: string
}): Promise<{ url: string }> => {
  // Signed URL
  const url = await getSignedUrl(
    legacyS3Client,
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
