import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { shouldDropSentryEvent } from '@app/web/utils/sentryFilter'
import * as Sentry from '@sentry/nextjs'

/**
 * Session Replay a été retiré : l'option `replay` n'était activée par aucun appelant, et
 * `replayIntegration` n'existe pas dans le bundle edge de @sentry/nextjs. Webpack se
 * contentait d'un avertissement, Turbopack en fait une erreur de build.
 */
export const initializeSentry = () => {
  if (!PublicWebAppConfig.Sentry.dsn || process.env.NODE_ENV !== 'production') {
    return
  }

  Sentry.init({
    dsn: PublicWebAppConfig.Sentry.dsn,
    environment: PublicWebAppConfig.Sentry.environment,
    tracesSampleRate: 0.05,
    beforeSend(event, hint) {
      if (shouldDropSentryEvent({ event, hint })) {
        return null // Drop the event
      }
      return event // Process other events normally
    },
  })
}
