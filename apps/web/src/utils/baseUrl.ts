import { isBrowser } from '@app/web/utils/isBrowser'

export type GetServerUrlOptions = {
  absolutePath?: boolean // Force absolute path including protocol and hostname instead of relative path
}

export const getServerBaseUrl = (options?: GetServerUrlOptions) => {
  if (isBrowser && !options?.absolutePath) {
    // browser can use relative path
    return ''
  }
  if (process.env.BASE_URL) {
    return `https://${process.env.BASE_URL}`
  }

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const getServerUrl = (path: string, options?: GetServerUrlOptions) =>
  `${getServerBaseUrl(options)}${path}`
