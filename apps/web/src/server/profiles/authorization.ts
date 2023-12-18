import { SessionUser } from '@app/web/auth/sessionUser'
import { ProfilePageData } from './getProfile'

export type FilteredProfile = Pick<
  ProfilePageData,
  | 'id'
  | 'name'
  | 'isPublic'
  | 'email'
  | 'firstName'
  | 'lastName'
  | 'image'
  | '_count'
>

export const filterAccess = (
  profile: ProfilePageData,
  user: SessionUser | null,
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
  const isUser = !!user && user.id === profile.id
  if (profile.isPublic || isUser) {
    return { authorized: true, isUser, profile }
  }

  return {
    authorized: false,
    profile: {
      id: profile.id,
      name: profile.name,
      firstName: profile.firstName,
      lastName: profile.lastName,
      image: profile.image,
      isPublic: profile.isPublic,
      email: profile.email,
      _count: {
        followedBy: profile._count.followedBy,
      },
    },
  }
}
