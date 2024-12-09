import { Agent as HttpAgent } from 'node:http'
import { Agent as HttpsAgent } from 'node:https'
import { lookup, type LookupAddress } from 'node:dns'
import type { LookupFunction } from 'node:net'
import type { NextRequest } from 'next/server'
import axios from 'axios'
import * as Sentry from '@sentry/nextjs'
import { LRUCache } from 'lru-cache'
import pThrottle from 'p-throttle'

const notFoundResponse = () =>
  new Response('', {
    status: 404,
  })

/**
 * We proxy external media to protect our users of external domains tracking etc...
 *
 * These external media proxy request are making too many DNS queries for
 * scaleway policy (max 20/sec)
 *
 * We implement caching and throttling to avoid too many requests
 */

const throttle = pThrottle({
  limit: 10, // Maximum DNS queries
  interval: 1000, // Per second
})

const dnsCache = new LRUCache<string, string | LookupAddress[]>({
  max: 10_000, // Maximum items in the cache
  ttl: 1000 * 60 * 60 * 24 * 3, // Time-to-live: 3 days
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

export const GET = async (request: NextRequest) => {
  const source = request.nextUrl.searchParams.get('src')

  if (!source) {
    return notFoundResponse()
  }

  try {
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

    return new Response(data, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': cacheControl || 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    Sentry.captureException(error)
    return notFoundResponse()
  }
}
