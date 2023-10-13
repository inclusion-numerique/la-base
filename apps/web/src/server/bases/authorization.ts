import { SessionUser } from '@app/web/auth/sessionUser'
import { BasePageData } from './getBase'
import { BaseListItem } from './getBasesList'

export type FilteredBase = Pick<
  BasePageData,
  'slug' | 'title' | 'isPublic' | 'email' | 'image' | 'coverImage'
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
            email: base.emailIsPublic ? base.email : '',
          },
    }
  }

  return {
    authorized: false,
    base: {
      slug: base.slug,
      title: base.title,
      isPublic: base.isPublic,
      image: base.image,
      coverImage: base.coverImage,
      email: base.emailIsPublic ? base.email : '',
      _count: { resources: base.resources.length },
    },
  }
}
