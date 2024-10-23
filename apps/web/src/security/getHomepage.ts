import type { SessionUser } from '@app/web/auth/sessionUser'

export const getHomepage = (user?: Pick<SessionUser, 'id'> | null) => {
  if (!user) {
    return '/'
  }

  return '/'
}

export const getLoginRedirectUrl = (user?: Pick<SessionUser, 'id'> | null) => {
  if (!user) {
    return '/connexion'
  }

  return '/'
}
