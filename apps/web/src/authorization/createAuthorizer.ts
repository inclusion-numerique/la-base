import type { Grantee } from '@app/web/authorization/grantee'
import type { UserSecurityRole } from '@app/web/authorization/userSecurityRole'

/**
 * Higher order function that creates an authorizer function
 * that can take one target and grantee
 * and return a function that can check a permission and returns a boolean
 */
export const createAuthorizer =
  <Target, TargetRole, TargetPermission>(
    getRoles: (target: Target, user: Grantee) => TargetRole[],
    getPermissions: (
      target: Target,
      roles: (TargetRole | UserSecurityRole)[],
      ...args: any[]
    ) => TargetPermission[],
  ) =>
  /**
   * Authorizer function that can check a permission for a target and grantee
   * Computes the roles and permissions only once and returns a "has" function
   */
  (target: Target, user: Grantee, ...args: any[]) => {
    const userRoles = user ? [user.role] : []
    const roles = [...getRoles(target, user), ...userRoles]
    const permissions = getPermissions(target, roles, ...args)

    return {
      hasRole: (role: TargetRole | UserSecurityRole) => roles.includes(role),
      hasPermission: (permission: TargetPermission) =>
        permissions.includes(permission),
    }
  }
