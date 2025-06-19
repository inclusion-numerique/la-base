import type { SessionUser } from '@app/web/auth/sessionUser'

export const canAccessAdministration = (user: SessionUser | null) =>
  user?.role === 'Admin' || user?.role === 'Support'
