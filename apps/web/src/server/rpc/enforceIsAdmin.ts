import { SessionUser } from '@app/web/auth/sessionUser'
import { forbiddenError } from '@app/web/server/rpc/trpcErrors'

// assertion functions cannot be arrow functions
export function enforceIsAdmin<T extends Pick<SessionUser, 'role'> | null>(
  user: T,
): asserts user is T & {
  role: 'Admin'
} {
  if (user?.role !== 'Admin') {
    throw forbiddenError()
  }
}
