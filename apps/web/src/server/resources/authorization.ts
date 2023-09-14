import { SessionUser } from '@app/web/auth/sessionUser'
import { Resource } from './getResource'

export type FilteredResource = Pick<
  Resource,
  'slug' | 'title' | 'isPublic' | 'createdBy' | 'base'
>

export const filterAccess = (
  resource: Resource,
  user: SessionUser | null,
):
  | {
      authorized: true
      isContributor: boolean
      resource: Resource
    }
  | {
      authorized: false
      resource: FilteredResource
    } => {
  if (resource.isPublic || (user && resource.createdById === user.id)) {
    return {
      authorized: true,
      isContributor: !!user && resource.createdById === user.id,
      resource,
    }
  }

  return {
    authorized: false,
    resource: {
      slug: resource.slug,
      title: resource.title,
      isPublic: resource.isPublic,
      createdBy: resource.createdBy,
      base: resource.base,
    },
  }
}
