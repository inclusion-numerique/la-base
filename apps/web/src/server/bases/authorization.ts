import { SessionUser } from '@app/web/auth/sessionUser'
import { BasePageData } from './getBase'
import { BaseListItem } from './getBasesList'

export type FilteredBase = Pick<
  BasePageData,
  | 'id'
  | 'slug'
  | 'title'
  | 'isPublic'
  | 'email'
  | 'image'
  | 'coverImage'
  | 'followedBy'
  | 'emailIsPublic'
> &
  Pick<BaseListItem, '_count'>

export const filterAccess = (
  base: BasePageData,
  user: SessionUser | null,
):
  | {
      authorized: true
      isMember: boolean
      isAdmin: boolean
      base: BasePageData
    }
  | {
      authorized: false
      base: FilteredBase
      isMember: false
      isAdmin: false
    } => {
  const baseMember =
    user && base.members.find((member) => member.member.id === user.id)
  if (base.isPublic || baseMember) {
    return {
      authorized: true,
      isMember: !!baseMember,
      isAdmin: !!baseMember && baseMember.isAdmin,
      base: baseMember
        ? base
        : {
            ...base,
            email: base.email,
          },
    }
  }

  return {
    authorized: false,
    isAdmin: false,
    isMember: false,
    base: {
      id: base.id,
      slug: base.slug,
      title: base.title,
      isPublic: base.isPublic,
      image: base.image,
      coverImage: base.coverImage,
      email: base.email,
      emailIsPublic: base.emailIsPublic,
      followedBy: base.followedBy,
      _count: {
        resources: base.resources.length,
        followedBy: base._count.followedBy,
      },
    },
  }
}
