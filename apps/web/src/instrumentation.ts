import { initializeSentry } from '@app/web/sentry'
import { shouldDropRequestError } from '@app/web/utils/sentryFilter'
import * as Sentry from '@sentry/nextjs'
import type { Instrumentation } from 'next'

/**
 * See https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 * and
 * https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
 */
export async function register() {
  initializeSentry()
}

/**
 * Next nomme ce champ `path`, et fournit aussi la méthode et les en-têtes. Le paramètre
 * était déclaré `{ pathname }` : la valeur lue était donc toujours `undefined`, et le
 * filtre échouait sur « Cannot read properties of undefined (reading 'includes') » à
 * chaque erreur de requête — aucune n'a jamais atteint Sentry.
 */
export const onRequestError: Instrumentation.onRequestError = (
  error,
  request,
  context,
) => {
  if (shouldDropRequestError({ error, pathname: request.path })) {
    return // Don't capture this error
  }
  // Capture other errors normally
  Sentry.captureRequestError(error, request, context)
}
