/**
 * Public config can be used on client side or server side
 */
import { mainLiveUrl, projectTitle, repositoryUrl } from '@app/config/config'

const isMain = process.env.BRANCH === 'main'

const isDev = process.env.BRANCH === 'dev'
const isLocal = !process.env.BRANCH

const isE2e = !!process.env.IS_E2E
const isPreview = !isMain && !isDev && !isLocal && !isE2e

export const PublicWebAppConfig = {
  Branch: process.env.BRANCH ?? '',
  isMain,
  isDev,
  isLocal,
  isPreview,
  Chromatic: {
    appId: process.env.CHROMATIC_APP_ID ?? '',
  },
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  projectTitle,
  mainLiveUrl,
  repository: repositoryUrl,
  ProConnect: {
    hostname: process.env.NEXT_PUBLIC_PROCONNECT_HOSTNAME ?? '',
    clientId: process.env.NEXT_PUBLIC_PROCONNECT_CLIENT_ID ?? '',
  },
  Sentry: {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN ?? '',
    environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT ?? 'local',
  },
  Matomo: {
    host: process.env.NEXT_PUBLIC_MATOMO_HOST ?? '',
    siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID ?? '',
  },
  FriendlyCaptcha: {
    siteKey: process.env.NEXT_PUBLIC_FRIENDLY_CAPTCHA_SITE_KEY ?? '',
  },
}
