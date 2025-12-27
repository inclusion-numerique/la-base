import { createAuthorizer } from '@app/web/authorization/createAuthorizer'
import type { Grantee } from '@app/web/authorization/grantee'
import {
  type UserSecurityRole,
  UserSecurityRoles,
} from '@app/web/authorization/userSecurityRole'
import type { Resource } from '@prisma/client'

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

  const resourceIsNotInABase = resource.baseId === null

  const resourceIsInABaseAndUserIsAMember =
    resource.baseId &&
    user.bases.some(({ base: { id: baseId } }) => baseId === resource.baseId)

  if (
    resource.createdById === user.id &&
    (resourceIsNotInABase || resourceIsInABaseAndUserIsAMember)
  ) {
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
  isShareToken = false,
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

  // Share token grants ReadResourceContent permission regardless of resource visibility
  if (isShareToken && resource.published) {
    permissions.push(ResourcePermissions.ReadResourceContent)
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
