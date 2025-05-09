import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import * as Sentry from '@sentry/nextjs'

export const initializeSentry = ({ replay }: { replay?: boolean } = {}) => {
  if (!PublicWebAppConfig.Sentry.dsn || process.env.NODE_ENV !== 'production') {
    return
  }

  Sentry.init({
    dsn: PublicWebAppConfig.Sentry.dsn,
    environment: PublicWebAppConfig.Sentry.environment,
    tracesSampleRate: 0.05,
    integrations: replay ? [Sentry.replayIntegration()] : [],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1,
  })
}
