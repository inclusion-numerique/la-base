import type { User } from '@prisma/client'
import { Grantee } from '@app/web/authorization/grantee'
import {
  UserSecurityRole,
  UserSecurityRoles,
} from '@app/web/authorization/userSecurityRole'

export const ProfileRoles = {
  ProfileOwner: 'ProfileOwner',
} as const

export type ProfileRole = (typeof ProfileRoles)[keyof typeof ProfileRoles]

export const ProfilePermissions = {
  CreateProfile: 'CreateProfile',
  ReadGeneralProfileInformation: 'ReadGeneralProfileInformation',
  WriteProfile: 'WriteProfile',
  DeleteProfile: 'DeleteProfile',
  ReadProfileEmail: 'ReadProfileEmail',
  ReadProfileData: 'ReadProfileData',
  FollowProfile: 'FollowProfile',
  UnfollowProfile: 'UnfollowProfile',
} as const

export const profilePermissions = Object.values(ProfilePermissions)

export type ProfilePermission =
  (typeof ProfilePermissions)[keyof typeof ProfilePermissions]

export type ProfileAuthorizationTarget = Pick<
  User,
  'id' | 'deleted' | 'isPublic' | 'emailIsPublic'
>

export const getProfileRoles = (
  profile: ProfileAuthorizationTarget,
  user: Grantee,
): ProfileRole[] => {
  if (!user) {
    return []
  }

  if (profile.id === user.id) {
    return [ProfileRoles.ProfileOwner]
  }

  return []
}

export const getProfilePermissions = (
  profile: ProfileAuthorizationTarget,
  roles: (UserSecurityRole | ProfileRole)[],
): ProfilePermission[] => {
  if (profile.deleted) {
    return []
  }

  // Admins and owners always have all permissions on ressource
  if (
    roles.includes('Admin') ||
    roles.includes('Support') ||
    roles.includes('ProfileOwner')
  ) {
    return profilePermissions
  }

  const permissions: ProfilePermission[] = [
    ProfilePermissions.ReadGeneralProfileInformation,
  ]

  // Profile data is only accessible if the profile is public
  if (profile.isPublic) {
    permissions.push(ProfilePermissions.ReadProfileData)

    if (profile.emailIsPublic) {
      permissions.push(ProfilePermissions.ReadProfileEmail)
    }
  }

  // Only connected users can follow/unfollow a profile

  if (roles.includes(UserSecurityRoles.User)) {
    permissions.push(
      ProfilePermissions.FollowProfile,
      ProfilePermissions.UnfollowProfile,
    )
  }

  return permissions
}
