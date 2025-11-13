import { initializeSentry } from '@app/web/sentry'
import { shouldDropRequestError } from '@app/web/utils/sentryFilter'
import * as Sentry from '@sentry/nextjs'

/**
 * See https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 * and
 * https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
 */
export async function register() {
  initializeSentry()
}

export const onRequestError = (
  error: unknown,
  request: { pathname: string },
) => {
  if (shouldDropRequestError({ error, pathname: request.pathname })) {
    return // Don't capture this error
  }
  // Capture other errors normally
  // Adapt Next.js request format to Sentry's expected format
  Sentry.captureRequestError(
    error,
    {
      path: request.pathname,
      method: 'GET', // Default since we don't have method info
      headers: {},
    },
    {
      routerKind: 'app',
      routePath: request.pathname,
      routeType: 'route',
    },
  )
}
