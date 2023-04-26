import { PublicWebAppConfig } from '@app/web/webAppConfig'
import * as Sentry from '@sentry/nextjs'

export const initializeSentry = () => {
  if (!PublicWebAppConfig.Sentry.dsn || process.env.NODE_ENV !== 'production') {
    return
  }

  Sentry.init({
    dsn: PublicWebAppConfig.Sentry.dsn,
    environment: PublicWebAppConfig.Sentry.environment,
    tracesSampleRate: 1,
  })
}
