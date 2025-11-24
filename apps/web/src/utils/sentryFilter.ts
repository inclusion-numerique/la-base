import type { Event, EventHint } from '@sentry/nextjs'

export type SentryFilterRule = {
  path: string
  statusCode: number
}

/**
 * Configuration for Sentry events to ignore.
 * Events matching a path and status code will be dropped.
 */
export const sentryFilterRules: SentryFilterRule[] = [
  {
    path: '/images/external',
    statusCode: 404,
  },
]

/**
 * Checks if a Sentry event should be dropped based on filter rules.
 * Returns true if the event should be dropped (filtered out).
 */
export const shouldDropSentryEvent = ({
  event,
  hint,
}: {
  event: Event
  hint: EventHint
}): boolean => {
  const requestUrl = event.request?.url

  if (!requestUrl) {
    return false
  }

  for (const rule of sentryFilterRules) {
    if (!requestUrl.includes(rule.path)) {
      continue
    }

    // Check response status code
    const statusCode = event.contexts?.response?.status_code
    if (statusCode === rule.statusCode) {
      return true
    }

    // Check if exception message indicates the status code
    const statusCodeString = rule.statusCode.toString()
    if (
      event.exception?.values?.[0]?.value?.includes(statusCodeString) ||
      event.message?.includes(statusCodeString) ||
      (hint.originalException instanceof Error &&
        hint.originalException.message.includes(statusCodeString))
    ) {
      return true
    }
  }

  return false
}

/**
 * Checks if a request error should be dropped based on filter rules.
 * Returns true if the error should be dropped (not captured).
 */
export const shouldDropRequestError = ({
  error,
  pathname,
}: {
  error: unknown
  pathname: string
}): boolean => {
  for (const rule of sentryFilterRules) {
    if (!pathname.includes(rule.path)) {
      continue
    }

    const statusCodeString = rule.statusCode.toString()

    // Check if error message indicates the status code
    if (
      error instanceof Error &&
      (error.message.includes(statusCodeString) ||
        error.message.includes('Not Found') ||
        error.name === 'NotFoundError')
    ) {
      return true
    }

    // Check for Response objects with matching status
    if (
      error &&
      typeof error === 'object' &&
      'status' in error &&
      error.status === rule.statusCode
    ) {
      return true
    }
  }

  return false
}
