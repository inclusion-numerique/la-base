import type { Resource } from '@prisma/client'
import { Grantee } from '@app/web/authorization/grantee'
import {
  UserSecurityRole,
  UserSecurityRoles,
} from '@app/web/authorization/userSecurityRole'
import { createAuthorizer } from '@app/web/authorization/createAuthorizer'

export const ResourceRoles = {
  ResourceCreator: 'ResourceCreator',
  ResourceContributor: 'ResourceContributor',
} as const

export type ResourceRole = (typeof ResourceRoles)[keyof typeof ResourceRoles]

export const ResourcePermissions = {
  ReadGeneralResourceInformation: 'ReadGeneralResourceInformation',
  WriteResource: 'WriteResource',
  DeleteResource: 'DeleteResource',
  ReadResourceContent: 'ReadResourceContent',
  AddResourceContributor: 'AddResourceContributor',
  RemoveResourceContributor: 'RemoveResourceContributor',
  SaveResource: 'SaveResource',
  UnsaveResource: 'UnsaveResource',
  ReportResource: 'ReportResource',
} as const

export const resourcePermissions = Object.values(ResourcePermissions)

export type ResourcePermission =
  (typeof ResourcePermissions)[keyof typeof ResourcePermissions]

export type ResourceAuthorizationTarget = Pick<
  Resource,
  'id' | 'published' | 'isPublic' | 'createdById' | 'baseId' | 'deleted'
>

export const getResourceRoles = (
  resource: ResourceAuthorizationTarget,
  user: Grantee,
): ResourceRole[] => {
  if (!user) {
    return []
  }

  const roles: ResourceRole[] = []

  if (resource.createdById === user.id) {
    roles.push(ResourceRoles.ResourceCreator)
  }

  // Resource contributor
  if (user.resources.some(({ resourceId }) => resourceId === resource.id)) {
    roles.push(ResourceRoles.ResourceContributor)
  } else if (
    // Contributor rules for base members
    resource.baseId &&
    user.bases.some(({ base: { id: baseId } }) => baseId === resource.baseId)
  ) {
    roles.push(ResourceRoles.ResourceContributor)
  }

  return roles
}

export const getResourcePermissions = (
  resource: ResourceAuthorizationTarget,
  roles: (UserSecurityRole | ResourceRole)[],
): ResourcePermission[] => {
  if (resource.deleted) {
    return []
  }

  // Admins and contributors always have all permissions on ressource
  if (
    roles.includes(UserSecurityRoles.Admin) ||
    roles.includes(UserSecurityRoles.Support) ||
    roles.includes(ResourceRoles.ResourceCreator) ||
    roles.includes(ResourceRoles.ResourceContributor)
  ) {
    return resourcePermissions
  }

  const permissions: ResourcePermission[] = []

  // Can see metadata for published private resource
  if (resource.published) {
    permissions.push(ResourcePermissions.ReadGeneralResourceInformation)
  }

  // Other users can only see published public resources
  if (!!resource.published && resource.isPublic) {
    permissions.push(ResourcePermissions.ReadResourceContent)
    // Only connected users can save/unsave or report a published resource
    if (roles.includes(UserSecurityRoles.User)) {
      permissions.push(
        ResourcePermissions.SaveResource,
        ResourcePermissions.UnsaveResource,
        ResourcePermissions.ReportResource,
      )
    }
  }

  return permissions
}

export const resourceAuthorization = createAuthorizer(
  getResourceRoles,
  getResourcePermissions,
)
