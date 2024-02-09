import { SessionUser } from '@app/web/auth/sessionUser'
import {
  CollectionRole,
  CollectionRoles,
  getCollectionRoles,
} from '../../authorization/models/collectionAuthorization'
import { CollectionPageData } from './getCollection'

export type FilteredCollection = Pick<CollectionPageData, 'title'>

type AccessGranted = {
  authorized: true
  collection: CollectionPageData
  canUpdate: boolean
}

type AccessDenied = {
  authorized: false
  base: FilteredCollection
}

const authorizedRoles = new Set([
  CollectionRoles.CollectionCreator,
  CollectionRoles.CollectionContributor,
])

const hasAuthorizedRole = (roles: CollectionRole[]) =>
  roles.some((role) => authorizedRoles.has(role))

export const filterAccess = (
  collection: CollectionPageData,
  user: SessionUser | null,
): AccessGranted | AccessDenied => {
  const canUpdate = hasAuthorizedRole(
    getCollectionRoles(
      { ...collection, createdById: collection.createdBy.id },
      user,
    ),
  )

  return collection.isPublic || canUpdate
    ? { authorized: true, canUpdate, collection }
    : { authorized: false, base: { title: collection.title } }
}
