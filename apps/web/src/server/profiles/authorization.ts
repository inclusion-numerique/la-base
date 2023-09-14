import { SessionUser } from '@app/web/auth/sessionUser'
import { ProfilePageData } from './getProfile'

export type FilteredProfile = Pick<ProfilePageData, 'id' | 'name' | 'isPublic'>

export const filterAccess = (
  profile: ProfilePageData,
  user: SessionUser,
):
  | {
      authorized: true
      isUser: boolean
      profile: ProfilePageData
    }
  | {
      authorized: false
      profile: FilteredProfile
    } => {
  if (profile.isPublic || profile.id === user.id) {
    return { authorized: true, isUser: profile.id === user.id, profile }
  }

  return {
    authorized: false,
    profile: {
      id: profile.id,
      name: profile.name,
      isPublic: profile.isPublic,
    },
  }
}
