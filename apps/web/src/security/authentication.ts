import type { NextRequest } from 'next/server'

export const secureSessionCookie = '__Secure-next-auth.session-token'
export const sessionCookie = 'next-auth.session-token'

export const sessionTokenFromCookies = (
  cookies: Partial<{ [key: string]: string }>,
): string | null =>
  cookies[secureSessionCookie] ?? cookies[sessionCookie] ?? null

export const sessionTokenFromRequestCookies = (
  cookies: NextRequest['cookies'],
): string | null =>
  cookies.get(secureSessionCookie)?.value ??
  cookies.get(sessionCookie)?.value ??
  null
