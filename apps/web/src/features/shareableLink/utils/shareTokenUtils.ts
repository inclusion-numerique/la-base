import { isShareableLinkToken } from './isShareToken'

/**
 * Appends share token to URL if token exists
 */
export const appendShareToken = (url: string, token?: string): string => {
  if (!token || !isShareableLinkToken(token)) {
    return url
  }

  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}token=${token}`
}
