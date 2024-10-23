import { NextRequest, NextResponse } from 'next/server'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import {
  isLegacyRequest,
  redirectLegacyPathToCurrentUrl,
} from '@app/web/legacyRedirection/legacyRedirection'
import { output } from '@app/web/utils/output'
import {
  jobTriggerInfoFromRequest,
  rewriteTriggerToJobEndpoint,
} from '@app/web/jobs/jobTriggerMiddleware'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'

const nodeEnvironment = process.env.NODE_ENV
const isCI = !!process.env.CI
const isProduction = nodeEnvironment === 'production'

const contentSecurityPolicy = `
  default-src 'self' https://matomo.incubateur.anct.gouv.fr https://sentry.incubateur.net;
  script-src 'self' https://matomo.incubateur.anct.gouv.fr 'unsafe-inline' 'unsafe-eval';
  script-src-attr 'none';
  style-src 'self' https: 'unsafe-inline';
  img-src 'self' data: blob:;
  frame-src https://www.youtube-nocookie.com/;
  object-src 'none';
  connect-src 'self' blob: https://${ServerWebAppConfig.S3.uploadsBucket}.${
    ServerWebAppConfig.S3.host
  } https://${PublicWebAppConfig.ProConnect.hostname} https://matomo.incubateur.anct.gouv.fr https://sentry.incubateur.net https://openmaptiles.geo.data.gouv.fr https://openmaptiles.github.io https://aides-territoires.beta.gouv.fr https://recherche-entreprises.api.gouv.fr https://api-adresse.data.gouv.fr;
  worker-src 'self' blob:;
  font-src 'self' https: data:;
  frame-ancestors 'self' https://matomo.incubateur.anct.gouv.fr;
  form-action 'self';
  base-uri 'self';
  ${isProduction ? 'upgrade-insecure-requests true;' : ''}
`
  .replaceAll(/\s{2,}/g, ' ')
  .trim()

const shouldRedirectToHttps = ({
  forwardedProto,
}: {
  forwardedProto: string | null
}) =>
  isProduction &&
  !isCI &&
  // We redirect if protocol is not secure https
  forwardedProto === 'http'

const redirectToHttps = ({
  httpsBase,
  requestUrl,
}: {
  httpsBase: string
  requestUrl: URL
}) => {
  const path = `${requestUrl.pathname}${requestUrl.search}`
  const redirectTo = `${httpsBase}${path}`

  output.info(
    `HTTP protocol - redirecting to ${httpsBase}${requestUrl.pathname}${requestUrl.search}`,
  )

  return NextResponse.redirect(redirectTo, { status: 308 })
}

const shouldRedirectToBaseDomain = ({
  baseUrl,
  requestHost,
}: {
  requestHost: string | null
  baseUrl: string | undefined
}) => !!baseUrl && requestHost !== baseUrl

const redirectToBaseDomain = ({
  httpsBase,
  requestUrl,
  requestHost,
}: {
  httpsBase: string
  requestUrl: URL
  requestHost: string | null
}) => {
  const path = `${requestUrl.pathname}${requestUrl.search}`
  const redirectTo = `${httpsBase}${path}`

  output.info(
    `Secondary domain request ${requestHost} - Redirecting to base domain ${redirectTo}`,
  )

  return NextResponse.redirect(redirectTo, { status: 308 })
}

const middleware = (request: NextRequest) => {
  const forwardedProto = request.headers.get('X-Forwarded-Proto')
  const requestHost = request.headers.get('host')
  const baseUrl = process.env.BASE_URL ?? ''

  const jobTriggerInfo = jobTriggerInfoFromRequest({
    request,
    requestHost,
  })
  if (jobTriggerInfo) {
    return rewriteTriggerToJobEndpoint({ baseUrl, request })
  }

  /**
   * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
   * The MDN documentation states "Note: This is more secure than simply
   * configuring a HTTP to HTTPS (301) redirect on your server, where the
   * initial HTTP connection is still vulnerable to a man-in-the-middle attack."
   * But they keep applying this redirect in recommended SSL configs: https://ssl-config.mozilla.org/
   */
  if (shouldRedirectToHttps({ forwardedProto })) {
    // Always redirect to same domain as we may have custom rules for each domain
    const httpsBase = `https://${requestHost ?? ''}`
    const requestUrl = new URL(request.url)

    return redirectToHttps({
      httpsBase,
      requestUrl,
    })
  }

  /**
   * Old domain requests redirect to new paths
   */
  if (isLegacyRequest({ requestHost })) {
    const httpsBase = `https://${baseUrl ?? ''}`
    const requestUrl = new URL(request.url)

    return redirectLegacyPathToCurrentUrl({ httpsBase, requestUrl })
  }

  /**
   * If we have different domain pointed to our service, redirect to the base domain by default
   */
  if (shouldRedirectToBaseDomain({ baseUrl, requestHost })) {
    const httpsBase = `https://${baseUrl ?? ''}`
    const requestUrl = new URL(request.url)

    return redirectToBaseDomain({
      httpsBase,
      requestUrl,
      requestHost,
    })
  }

  const response = NextResponse.next()

  if (nodeEnvironment === 'development') {
    response.headers.append('Access-Control-Allow-Headers', '*')
    response.headers.append('Access-Control-Allow-Origin', '*')
  }

  response.headers.append('X-Frame-Options', 'DENY')
  response.headers.append('X-Content-Type-Options', 'nosniff')
  response.headers.append('X-XSS-Protection', '1; mode=block')
  response.headers.delete('X-Powered-By')
  response.headers.append('Strict-Transport-Security', 'max-age=63072000')

  response.headers.append('Content-Security-Policy', contentSecurityPolicy)

  return response
}

export default middleware
