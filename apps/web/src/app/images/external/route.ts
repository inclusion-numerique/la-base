import crypto from 'node:crypto'
import { type LookupAddress, lookup } from 'node:dns'
import { Agent as HttpAgent } from 'node:http'
import { Agent as HttpsAgent } from 'node:https'
import type { LookupFunction } from 'node:net'
import { getStorageFileInfo } from '@app/web/features/uploads/storage/getStorageFileInfo'
import { getStorageKey } from '@app/web/features/uploads/storage/getStorageKey'
import { getStorageUrl } from '@app/web/features/uploads/storage/getStorageUrl'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { s3 } from '@app/web/server/s3/s3'
import { Upload } from '@aws-sdk/lib-storage'
import * as Sentry from '@sentry/nextjs'
import axios from 'axios'
import { LRUCache } from 'lru-cache'
import type { NextRequest } from 'next/server'
import pThrottle from 'p-throttle'

const notFoundResponse = ({
  statusText = 'Not Found',
}: {
  statusText?: string
} = {}) =>
  new Response('', {
    status: 404,
    statusText,
  })

/**
 * We re-store external media to protect our users of external domains tracking etc...
 *
 * These external media proxy request may make too many DNS queries for
 * scaleway policy (max 20/sec)
 * We implement caching and throttling to avoid too many requests
 */

const throttle = pThrottle({
  limit: 10, // Maximum DNS queries
  interval: 1000, // Per second
})

const dnsCache = new LRUCache<string, string | LookupAddress[]>({
  max: 10_000, // Maximum items in the cache
  ttl: 1000 * 60 * 60 * 24 * 2, // Time-to-live: 2 days
})

const throttledLookup = throttle(lookup)

// Use the throttled function and DNS cache for lookup Agent function
const dnsAgentLookupFunction: LookupFunction = (
  hostname,
  options,
  callback,
) => {
  // First check if we have a cached address
  const cachedAddress = dnsCache.get(hostname)
  if (cachedAddress) {
    callback(null, cachedAddress)
    return
  }

  // If not, we need to throttle the lookup
  throttledLookup(hostname, options, (error, address) => {
    if (error) {
      callback(error, '')
      return
    }

    // Cache the result on success
    dnsCache.set(hostname, address)
    callback(null, address)
  })
}

const httpAgent = new HttpAgent({
  lookup: dnsAgentLookupFunction,
})

const httpsAgent = new HttpsAgent({
  lookup: dnsAgentLookupFunction,
})

const dnsOptimisedAxios = axios.create({
  httpsAgent,
  httpAgent,
})

// We store the external image urls as their hashed url value

const hashSource = (source: string) => {
  return crypto.createHash('sha256').update(source).digest('hex')
}

const getExternalImageStorageKey = (source: string) => {
  return getStorageKey(`external-image/${hashSource(source)}`)
}

export const GET = async (request: NextRequest) => {
  const source = request.nextUrl.searchParams.get('src')

  if (!source) {
    return notFoundResponse()
  }

  const storageKey = getExternalImageStorageKey(source)

  // We check if the image is already stored
  const imageInfo = await getStorageFileInfo({
    key: storageKey,
  })
  const processedImageUrl = getStorageUrl({ key: storageKey })

  if (imageInfo) {
    // We redirect to stored processed image
    return Response.redirect(processedImageUrl, 301)
  }

  // We upload the image to the storage and redirect to it
  try {
    // First we download the image
    const { headers, data, status, statusText } =
      await dnsOptimisedAxios.get<ReadableStream>(source, {
        responseType: 'stream',
      })

    if (!headers || !data) {
      return new Response('', {
        status,
        statusText,
      })
    }

    const contentType = headers['content-type'] as string
    const cacheControl = headers['cache-control'] as string
    const contentLength = headers['content-length']
      ? Number.parseInt(headers['content-length'] as string, 10)
      : undefined

    if (contentLength && contentLength > 10_000_000) {
      return notFoundResponse({
        statusText: 'Image too large',
      })
    }

    try {
      // We store the external image in our storage
      await new Upload({
        client: s3,
        params: {
          Bucket: ServerWebAppConfig.S3.uploadsBucket,
          Key: storageKey,
          Body: data,
          ACL: 'public-read',
          ContentType: contentType,
          Metadata: {
            'original-url': source,
            'original-content-type': contentType,
            'original-cache-control': cacheControl,
          },
        },
      }).done()

      // We redirect to the stored image
      return Response.redirect(processedImageUrl, 301)
    } catch (error) {
      // Upload failed
      Sentry.captureException(error)

      return notFoundResponse({
        statusText: 'Could not cache external image',
      })
    }
  } catch {
    // Get failed - silently fail, external image errors are not our problem
    return notFoundResponse({
      statusText: 'Could not get external image',
    })
  }
}
