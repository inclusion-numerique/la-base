import { SessionUser } from '@app/web/auth/sessionUser'
import { ProfilePageData } from './getProfile'

export type FilteredProfile = Pick<
  ProfilePageData,
  | 'id'
  | 'slug'
  | 'name'
  | 'isPublic'
  | 'email'
  | 'firstName'
  | 'lastName'
  | 'image'
  | 'followedBy'
  | '_count'
  | 'emailIsPublic'
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
      isUser: false
      profile: FilteredProfile
    } => {
  const isUser = !!user && user.id === profile.id
  if (profile.isPublic || isUser) {
    return { authorized: true, isUser, profile }
  }

  return {
    authorized: false,
    isUser: false,
    profile: {
      id: profile.id,
      slug: profile.slug,
      name: profile.name,
      firstName: profile.firstName,
      lastName: profile.lastName,
      image: profile.image,
      isPublic: profile.isPublic,
      email: profile.email,
      emailIsPublic: profile.emailIsPublic,
      followedBy: profile.followedBy,
      _count: {
        followedBy: profile._count.followedBy,
      },
    },
  }
}
