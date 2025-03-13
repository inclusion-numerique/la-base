import type { Collection } from '@prisma/client'
import { createAuthorizer } from '@app/web/authorization/createAuthorizer'
import type { Grantee } from '@app/web/authorization/grantee'
import {
  type UserSecurityRole,
  UserSecurityRoles,
} from '@app/web/authorization/userSecurityRole'

export const CollectionRoles = {
  CollectionCreator: 'CollectionCreator',
  CollectionContributor: 'CollectionContributor',
} as const

export type CollectionRole =
  (typeof CollectionRoles)[keyof typeof CollectionRoles]

export const CollectionPermissions = {
  ReadGeneralCollectionInformation: 'ReadGeneralCollectionInformation',
  WriteCollection: 'WriteCollection',
  DeleteCollection: 'DeleteCollection',
  ReadCollectionContent: 'ReadCollectionContent',
  SaveCollection: 'SaveCollection',
  UnsaveCollection: 'UnsaveCollection',
  AddToCollection: 'AddToCollection',
  RemoveFromCollection: 'RemoveFromCollection',
} as const

export const collectionPermissions = Object.values(CollectionPermissions)

export type CollectionPermission =
  (typeof CollectionPermissions)[keyof typeof CollectionPermissions]

export type CollectionAuthorizationTarget = Pick<
  Collection,
  'id' | 'isPublic' | 'createdById' | 'baseId' | 'deleted'
>

export const getCollectionRoles = (
  collection: CollectionAuthorizationTarget,
  user: Grantee,
): CollectionRole[] => {
  if (!user) {
    return []
  }

  if (collection.createdById === user.id) {
    return [CollectionRoles.CollectionCreator]
  }

  // Contributor rules for base members
  if (
    collection.baseId &&
    user.bases.some(({ base: { id: baseId } }) => baseId === collection.baseId)
  ) {
    return [CollectionRoles.CollectionContributor]
  }

  return []
}

export const getCollectionPermissions = (
  collection: CollectionAuthorizationTarget,
  roles: (UserSecurityRole | CollectionRole)[],
): CollectionPermission[] => {
  if (collection.deleted) {
    return []
  }

  // Admins and contributors always have all permissions on ressource
  if (
    roles.includes('Admin') ||
    roles.includes('Support') ||
    roles.includes('CollectionCreator') ||
    roles.includes('CollectionContributor')
  ) {
    return collectionPermissions
  }

  const permissions: CollectionPermission[] = []

  // Other users can only see published public collections
  if (collection.isPublic) {
    permissions.push(
      CollectionPermissions.ReadGeneralCollectionInformation,
      CollectionPermissions.ReadCollectionContent,
    )

    // Only connected users can save/unsave a public collection
    if (roles.includes(UserSecurityRoles.User)) {
      permissions.push(
        CollectionPermissions.SaveCollection,
        CollectionPermissions.UnsaveCollection,
      )
    }
  }

  if (
    roles.includes('CollectionCreator') ||
    roles.includes('CollectionContributor')
  ) {
    permissions.push(
      CollectionPermissions.WriteCollection,
      CollectionPermissions.DeleteCollection,
      CollectionPermissions.AddToCollection,
      CollectionPermissions.RemoveFromCollection,
    )
  }

  return permissions
}

export const collectionAuthorization = createAuthorizer(
  getCollectionRoles,
  getCollectionPermissions,
)
