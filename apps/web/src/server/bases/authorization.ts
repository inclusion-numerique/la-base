import { SessionUser } from '@app/web/auth/sessionUser'
import { BasePageData } from './getBase'

export type FilteredBase = Pick<BasePageData, 'slug' | 'title' | 'isPublic'> & {
  _count: {
    resources: number
  }
}

export const filterAccess = (
  base: BasePageData,
  user: SessionUser,
):
  | {
      authorized: true
      isMember: boolean
      base: BasePageData
    }
  | {
      authorized: false
      base: FilteredBase
    } => {
  if (base.isPublic || base.ownerId === user.id) {
    return { authorized: true, isMember: base.ownerId === user.id, base }
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
