import { SessionUser } from '@app/web/auth/sessionUser'
import { CollectionPageData } from './getCollection'

export type FilteredCollection = Pick<CollectionPageData, 'title'>

export const filterAccess = (
  collection: CollectionPageData,
  user: SessionUser | null,
):
  | {
      authorized: true
      collection: CollectionPageData
      isOwner: boolean
    }
  | {
      authorized: false
      base: FilteredCollection
    } => {
  const isOwner = !!user && collection.createdBy.id === user.id
  if (collection.isPublic || isOwner) {
    return {
      authorized: true,
      isOwner,
      collection,
    }
  }

  return {
    authorized: false,
    base: {
      title: collection.title,
    },
  }
}
