import { SessionUser } from '@app/web/auth/sessionUser'
import { BasePageData } from './getBase'
import { BaseListItem } from './getBasesList'

export type FilteredBase = Pick<BasePageData, 'slug' | 'title' | 'isPublic'> &
  Pick<BaseListItem, '_count'>

export const filterAccess = (
  base: BasePageData,
  user: SessionUser,
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
  const baseMember = base.members.find((member) => member.member.id === user.id)
  if (base.isPublic || baseMember) {
    return {
      authorized: true,
      isMember: !!baseMember,
      isAdmin: !!baseMember && baseMember.isAdmin,
      base,
    }
  }

  return {
    authorized: false,
    base: {
      slug: base.slug,
      title: base.title,
      isPublic: base.isPublic,
      _count: { resources: base.resources.length },
    },
  }
}
