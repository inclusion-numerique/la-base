import { isBrowser } from '@app/web/utils/isBrowser'

export type GetServerUrlOptions = {
  absolutePath?: boolean // Force absolute path including protocol and hostname instead of relative path
}

export const getServerBaseUrl = (options?: GetServerUrlOptions) => {
  if (isBrowser && !options?.absolutePath) {
    // browser can use relative path
    return ''
  }

  // Client-side with absolutePath: use window.location.origin
  if (isBrowser && options?.absolutePath) {
    return window.location.origin
  }

  // Server-side: use BASE_URL env var
  if (process.env.BASE_URL) {
    return `https://${process.env.BASE_URL}`
  }

  // assume localhost (dev)
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const getServerUrl = (path: string, options?: GetServerUrlOptions) =>
  `${getServerBaseUrl(options)}${path}`
