import { NextRequest, NextResponse } from 'next/server'
import { prismaClient } from '@app/web/prismaClient'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import sharp from 'sharp'
import { imageCropToRegion, isImageCropped } from '@app/web/utils/imageCrop'
import { legacyS3Client } from '@app/web/server/s3/legacyS3'
import { ServerWebAppConfig } from '@app/web/webAppConfig'
import { s3 } from '@app/web/server/s3/s3'

const notFoundResponse = () =>
  new Response('', {
    status: 404,
  })

// We resize and convert images to webp on the fly.
// TODO Cache results in S3
export const GET = async (request: NextRequest) => {
  const [id, format] =
    request.nextUrl.pathname.split('/').pop()?.split('.') ?? []

  if (!id) {
    return notFoundResponse()
  }

  // We convert to webp or give back the untouched original file
  if (format !== 'webp' && format !== 'original') {
    return notFoundResponse()
  }

  const quality = Number(request.nextUrl.searchParams.get('quality')) || 100
  const targetWidth =
    Number(request.nextUrl.searchParams.get('width')) || undefined

  const image = await prismaClient.image.findUnique({
    where: { id },
    select: {
      cropTop: true,
      cropLeft: true,
      cropWidth: true,
      cropHeight: true,
      upload: {
        select: {
          legacyKey: true,
          key: true,
          mimeType: true,
        },
      },
    },
  })
  if (!image) {
    return notFoundResponse()
  }

  const { command, s3client } = image.upload.legacyKey
    ? {
        command: new GetObjectCommand({
          Bucket: ServerWebAppConfig.LegacyS3.uploadsBucket,
          Key: image.upload.legacyKey,
        }),
        s3client: legacyS3Client,
      }
    : {
        command: new GetObjectCommand({
          Bucket: ServerWebAppConfig.S3.uploadsBucket,
          Key: image.upload.key,
        }),
        s3client: s3,
      }

  const object = await s3client.send(command)

  if (!object.Body) {
    return NextResponse.error()
  }

  if (format === 'original') {
    return new Response(object.Body.transformToWebStream(), {
      status: 200,
      headers: {
        'Content-Type': image.upload.mimeType,
      },
    })
  }

  const sharpImage = sharp(await object.Body.transformToByteArray())
  const { height, width } = await sharpImage.metadata()

  if (!width || !height) {
    // This is an invalid image
    // TODO Tell sentry about it
    return notFoundResponse()
  }

  if (isImageCropped(image)) {
    sharpImage.extract(imageCropToRegion(image, { height, width }))
  }

  // Do not resize if image is smaller than requested target width
  if (targetWidth && width > targetWidth) {
    sharpImage.resize(targetWidth)
  }

  const imageData = await sharpImage.webp({ quality }).toBuffer()

  return new Response(imageData, {
    status: 200,
    headers: {
      'Content-Type': 'image/webp',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
