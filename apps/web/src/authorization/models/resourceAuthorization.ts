import type { Resource } from '@prisma/client'
import { Grantee } from '@app/web/authorization/grantee'
import {
  UserSecurityRole,
  UserSecurityRoles,
} from '@app/web/authorization/userSecurityRole'

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

  if (resource.createdById === user.id) {
    return [ResourceRoles.ResourceCreator]
  }

  // Resource contributor
  if (user.resources.some(({ resourceId }) => resourceId === resource.id)) {
    return [ResourceRoles.ResourceContributor]
  }

  // Contributor rules for base members
  if (
    resource.baseId &&
    user.bases.some(({ base: { id: baseId } }) => baseId === resource.baseId)
  ) {
    return [ResourceRoles.ResourceContributor]
  }

  return []
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
    roles.includes('Admin') ||
    roles.includes('Support') ||
    roles.includes('ResourceCreator') ||
    roles.includes('ResourceContributor')
  ) {
    return resourcePermissions
  }

  const permissions: ResourcePermission[] = []

  // Other users can only see published public resources
  if (!!resource.published && resource.isPublic) {
    permissions.push(
      ResourcePermissions.ReadGeneralResourceInformation,
      ResourcePermissions.ReadResourceContent,
    )
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
