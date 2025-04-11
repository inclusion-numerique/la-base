import { NextRequest } from 'next/server'
import * as Sentry from '@sentry/nextjs'
import { prismaClient } from '@app/web/prismaClient'
import { getImageData } from '@app/web/server/image/getImageData'
import { getOriginalImageData } from '@app/web/server/image/getOriginalImageData'

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

  const quality = Number(request.nextUrl.searchParams.get('quality')) || 100
  const targetWidth =
    Number(request.nextUrl.searchParams.get('width')) || undefined

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
          legacyKey: true,
          mimeType: true,
        },
      },
    },
  })

  if (!image) {
    return notFoundResponse()
  }

  try {
    const imageData =
      format === 'original'
        ? await getOriginalImageData({ image })
        : await getImageData({ image, quality, width: targetWidth })

    return new Response(imageData, {
      status: 200,
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    Sentry.captureException(error)
    return notFoundResponse()
  }
}
