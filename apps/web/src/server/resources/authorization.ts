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
      isAdmin: boolean
      resource: Resource
    }
  | {
      authorized: false
      resource: FilteredResource
    } => {
  const isCreator = !!user && resource.createdById === user.id
  const isBaseMember =
    !!user &&
    !!resource.base &&
    resource.base.members.some(
      (member) => member.accepted !== null && member.memberId === user.id,
    )
  if (resource.isPublic || isCreator || isBaseMember) {
    return {
      authorized: true,
      isAdmin: isCreator || isBaseMember,
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
