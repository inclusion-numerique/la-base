import { isBrowser } from '@app/web/utils/isBrowser'

export const getServerBaseUrl = (forceAbsolutePath?: boolean) => {
  if (isBrowser && !forceAbsolutePath) {
    // browser can use relative path
    return ''
  }
  if (process.env.BASE_URL) {
    return `https://${process.env.BASE_URL}`
  }

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const getServerUrl = (path: string, forceAbsolutePath?: boolean) =>
  `${getServerBaseUrl(forceAbsolutePath)}${path}`
