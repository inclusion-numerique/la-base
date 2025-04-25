import type { Base } from '@prisma/client'
import { createAuthorizer } from '@app/web/authorization/createAuthorizer'
import type { Grantee } from '@app/web/authorization/grantee'
import { type UserSecurityRole } from '@app/web/authorization/userSecurityRole'

export const BaseRoles = {
  BaseCreator: 'BaseCreator',
  BaseAdmin: 'BaseAdmin',
  BaseMember: 'BaseMember',
} as const

export type BaseRole = (typeof BaseRoles)[keyof typeof BaseRoles]

export const BasePermissions = {
  ReadGeneralBaseInformation: 'ReadGeneralBaseInformation',
  WriteBase: 'WriteBase',
  AddBaseMember: 'AddBaseMember',
  AddBaseAdmin: 'AddBaseAdmin',
  ChangeBaseMemberRole: 'ChangeBaseMemberRole',
  RemoveBaseMember: 'RemoveBaseMember',
  DeleteBase: 'DeleteBase',
  ReadBaseData: 'ReadBaseData',
  ReadBaseEmail: 'ReadBaseEmail',
  FollowBase: 'FollowBase',
  UnfollowBase: 'UnfollowBase',
} as const

export const basePermissions = Object.values(BasePermissions)

export type BasePermission =
  (typeof BasePermissions)[keyof typeof BasePermissions]

export const BaseMemberPermissions = {} as const

export type BaseAuthorizationTarget = Pick<
  Base,
  'id' | 'isPublic' | 'emailIsPublic' | 'createdById' | 'deleted'
>

export const getBaseRoles = (
  base: BaseAuthorizationTarget,
  user: Grantee,
): BaseRole[] => {
  if (!user) {
    return []
  }

  const roles: BaseRole[] = []

  if (base.createdById === user.id) {
    roles.push(BaseRoles.BaseCreator)
  }

  const membership = user.bases.find(
    ({ base: { id: baseId } }) => baseId === base.id,
  )

  if (membership) {
    roles.push(BaseRoles.BaseMember)

    if (membership.isAdmin) {
      roles.push(BaseRoles.BaseAdmin)
    }
  }

  return roles
}

export const getBasePermissions = (
  base: BaseAuthorizationTarget,
  roles: (UserSecurityRole | BaseRole)[],
): BasePermission[] => {
  if (base.deleted) {
    return []
  }

  // Admins have all permissions on base
  if (
    roles.includes('Admin') ||
    roles.includes('Support') ||
    roles.includes('BaseAdmin')
  ) {
    return basePermissions
  }

  // Base members have limited permissions
  if (roles.includes('BaseMember')) {
    return [
      BasePermissions.ReadGeneralBaseInformation,
      BasePermissions.WriteBase,
      BasePermissions.AddBaseMember,
      BasePermissions.ReadBaseData,
      BasePermissions.ReadBaseEmail,
      BasePermissions.FollowBase,
      BasePermissions.UnfollowBase,
    ]
  }

  const permissions: BasePermission[] = [
    BasePermissions.ReadGeneralBaseInformation,
  ]

  // Other users can only see public bases
  if (base.isPublic) {
    permissions.push(BasePermissions.ReadBaseData)

    // Any connected user can follow a base
    if (roles.length > 0) {
      permissions.push(BasePermissions.FollowBase, BasePermissions.UnfollowBase)
    }

    if (base.emailIsPublic) {
      permissions.push(BasePermissions.ReadBaseEmail)
    }
  }

  return permissions
}

export const baseAuthorization = createAuthorizer(
  getBaseRoles,
  getBasePermissions,
)
