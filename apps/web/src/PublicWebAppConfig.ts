/**
 * Public config can be used on client side or server side
 */
import { mainLiveUrl, projectTitle, repositoryUrl } from '@app/config/config'

export const PublicWebAppConfig = {
  Branch: process.env.BRANCH ?? '',
  isMain: process.env.BRANCH === 'main',
  Chromatic: {
    appId: process.env.CHROMATIC_APP_ID ?? '',
  },
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  projectTitle,
  mainLiveUrl,
  repository: repositoryUrl,
  InclusionConnect: {
    hostname: process.env.NEXT_PUBLIC_INCLUSION_CONNECT_HOSTNAME ?? '',
    clientId: process.env.NEXT_PUBLIC_INCLUSION_CONNECT_CLIENT_ID ?? '',
  },
  Sentry: {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN ?? '',
    environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT ?? 'local',
  },
  Matomo: {
    host: process.env.NEXT_PUBLIC_MATOMO_HOST ?? '',
    siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID ?? '',
  },
}
