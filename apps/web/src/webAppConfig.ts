import { mainLiveUrl, projectTitle, repositoryUrl } from '@app/config/config'

const NodeEnvironment = process.env.NODE_ENV

/**
 * Necessary environment variables for web app are listed here.
 */

/**
 * Only use ServerWebAppConfig on server side
 * It contains secrets that must not be sent to the client
 */

const emailServer = `smtp://${process.env.SMTP_USERNAME ?? ''}:${
  process.env.SMTP_PASSWORD ?? ''
}@${process.env.SMTP_SERVER ?? ''}:${process.env.SMTP_PORT ?? ''}`

export const ServerWebAppConfig = {
  NodeEnv: NodeEnvironment,
  Branch: process.env.BRANCH ?? '',
  Namespace: process.env.NAMESPACE ?? '',
  isMain: process.env.BRANCH === 'main',
  Chromatic: {
    appId: process.env.CHROMATIC_APP_ID ?? '',
  },
  Email: {
    server: emailServer,
    from: `${process.env.EMAIL_FROM_NAME ?? ''} <${
      process.env.EMAIL_FROM_ADDRESS ?? ''
    }>`,
  },
  S3: {
    uploadsBucket: process.env.UPLOADS_BUCKET ?? '',
    host: process.env.S3_HOST ?? '',
    region: process.env.SCW_DEFAULT_REGION ?? '',
    accessKey: process.env.SCW_ACCESS_KEY ?? '',
    secretKey: process.env.SCW_SECRET_KEY ?? '',
  },
  LegacyS3: {
    uploadsBucket: process.env.LEGACY_UPLOADS_S3_BUCKET ?? '',
    host: process.env.LEGACY_UPLOADS_S3_HOST ?? '',
    region: 'legacy',
    accessKey: process.env.LEGACY_UPLOADS_S3_ACCESS_KEY ?? '',
    secretKey: process.env.LEGACY_UPLOADS_S3_SECRET_KEY ?? '',
  },
  Cockpit: {
    metricsUrl: process.env.COCKPIT_METRICS_URL ?? '',
    logsUrl: process.env.COCKPIT_LOGS_URL ?? '',
    alertManagerUrl: process.env.COCKPIT_ALERT_MANAGER_URL ?? '',
    grafanaUrl: process.env.COCKPIT_GRAFANA_URL ?? '',
  },
  InclusionConnect: {
    clientSecret: process.env.INCLUSION_CONNECT_CLIENT_SECRET ?? '',
  },
}

/**
 * Public config can be used on client side or server side
 */

export const PublicWebAppConfig = {
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  projectTitle,
  mainLiveUrl,
  repository: repositoryUrl,
  InclusionConnect: {
    iss: process.env.NEXT_PUBLIC_INCLUSION_CONNECT_ISS ?? '',
    issuer: process.env.NEXT_PUBLIC_INCLUSION_CONNECT_ISSUER ?? '',
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
