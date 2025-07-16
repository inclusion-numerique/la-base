import { getStorageFileInfo } from '@app/web/features/uploads/storage/getStorageFileInfo'
import { getStorageUrl } from '@app/web/features/uploads/storage/getStorageUrl'
import { prismaClient } from '@app/web/prismaClient'
import { getProcessedImageKey } from '@app/web/server/image/getProcessedImageKey'
import { processAndStoreImage } from '@app/web/server/image/processAndStoreImage'
import type { NextRequest } from 'next/server'

const notFoundResponse = () =>
  new Response('', {
    status: 404,
  })

// We resize and convert images to webp on the fly and cache the result.
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
  const image = await prismaClient.image.findUnique({
    where: { id },
    select: {
      id: true,
      uploadKey: true,
      cropTop: true,
      cropLeft: true,
      cropWidth: true,
      cropHeight: true,
      upload: {
        select: {
          mimeType: true,
        },
      },
    },
  })

  if (!image) {
    return notFoundResponse()
  }

  if (format === 'original') {
    // We redirect to the storage url of the original upload file
    return Response.redirect(getStorageUrl({ key: image.uploadKey }), 301)
  }

  // We want a processed image
  const quality = Number(request.nextUrl.searchParams.get('quality')) || 100
  const targetWidth =
    Number(request.nextUrl.searchParams.get('width')) || undefined

  // First we check that it has already been processed
  const processedImageKey = getProcessedImageKey({
    image,
    quality,
    width: targetWidth,
  })

  const imageInfo = await getStorageFileInfo({
    key: processedImageKey,
  })

  const processedImageUrl = getStorageUrl({ key: processedImageKey })

  if (imageInfo) {
    // We redirect to stored processed image
    return Response.redirect(processedImageUrl, 301)
  }

  // If image has not been processed, we process it, store it, and redirect to it
  await processAndStoreImage({
    image,
    quality,
    width: targetWidth,
    processedImageKey,
  })

  return Response.redirect(processedImageUrl, 301)
}
