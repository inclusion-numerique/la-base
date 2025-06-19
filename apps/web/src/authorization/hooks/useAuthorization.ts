import type { Grantee } from '@app/web/authorization/grantee'
import { useCallback } from 'react'

/**
 * This hook allows usage of authorizers in client components
 * without re-rendering or re-computing authorization on each render
 * but only when target or user changes.
 */
export const useAuthorization = <Target, TargetPermissions>(
  authorizer: (
    target: Target,
    user: Grantee,
  ) => (permission: TargetPermissions) => boolean,
  target: Target,
  user: Grantee,
) =>
  useCallback(
    (permission: TargetPermissions) => authorizer(target, user)(permission),
    [authorizer, target, user],
  )
