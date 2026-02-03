import type { Grantee } from '@app/web/authorization/grantee'
import {
  getProfilePermissions,
  getProfileRoles,
  type ProfileAuthorizationTarget,
  ProfilePermissions,
  ProfileRoles,
  profilePermissions,
} from '@app/web/authorization/models/profileAuthorization'
import { UserSecurityRoles } from '@app/web/authorization/userSecurityRole'
import { testSessionUser } from '@app/web/test/testSessionUser'

describe('Authorization - Profils', () => {
  const profile = {
    id: 'profile',
    isPublic: false,
    emailIsPublic: false,
    deleted: null,
  } satisfies ProfileAuthorizationTarget

  const user = { ...testSessionUser } satisfies Grantee

  describe('Roles - Profil', () => {
    it('Anonyme, aucun role', () => {
      expect(getProfileRoles(profile, null)).toEqual([])
    })

    it('Utilisateur connecté, aucun rôle', () => {
      expect(getProfileRoles(profile, user)).toEqual([])
    })

    it('Role propriétaire', () => {
      expect(getProfileRoles(profile, { ...user, id: 'profile' })).toEqual([
        ProfileRoles.ProfileOwner,
      ])
    })
  })

  describe('Permissions - Profil', () => {
    describe('Profil supprimé', () => {
      it("Si le profil est supprimé, quelque soit mon rôle, je n'ai pas de permissions", () => {
        expect(
          getProfilePermissions({ ...profile, deleted: new Date() }, [
            UserSecurityRoles.User,
            UserSecurityRoles.Admin,
            UserSecurityRoles.Support,
            ProfileRoles.ProfileOwner,
          ]),
        ).toEqual([])
      })
    })

    describe('Profil privé', () => {
      const privateProfile = {
        ...profile,
        isPublic: false,
        emailIsPublic: true,
        published: new Date(),
      }

      it.each([
        {
          title: 'Propriétaire',
          roles: [UserSecurityRoles.User, ProfileRoles.ProfileOwner],
        },
        {
          title: 'Support',
          roles: [UserSecurityRoles.Support],
        },
        {
          title: 'Admin',
          roles: [UserSecurityRoles.Admin],
        },
      ])(
        `$title, j’ai toutes les permissions sur un profil privé`,
        ({ roles }) => {
          expect(getProfilePermissions(privateProfile, roles)).toEqual(
            profilePermissions,
          )
        },
      )

      it.each([
        {
          title: 'Visiteur',
          roles: [],
        },
        {
          title: 'Utilisateur connecté',
          roles: [UserSecurityRoles.User],
        },
      ])('$title, je peux voir les infos générales d’un profil', () => {
        expect(getProfilePermissions(privateProfile, [])).toEqual([
          ProfilePermissions.ReadGeneralProfileInformation,
        ])
      })
    })

    describe('Profil public', () => {
      const publicProfile = {
        ...profile,
        isPublic: true,
        emailIsPublic: false,
      }

      it.each([
        {
          title: 'Propriétaire',
          roles: [UserSecurityRoles.User, ProfileRoles.ProfileOwner],
        },
        {
          title: 'Support',
          roles: [UserSecurityRoles.Support],
        },
        {
          title: 'Admin',
          roles: [UserSecurityRoles.Admin],
        },
      ])(
        `$title, j’ai toutes les permissions sur un profil public`,
        ({ roles }) => {
          expect(getProfilePermissions(publicProfile, roles)).toEqual(
            profilePermissions,
          )
        },
      )

      it('Visiteur, je peux voir les infos générales et données d’un profil public', () => {
        expect(getProfilePermissions(publicProfile, [])).toEqual([
          ProfilePermissions.ReadGeneralProfileInformation,
          ProfilePermissions.ReadProfileData,
        ])
      })

      it('Utilisateur connecté, je peux voir les données et suivre un profil public', () => {
        expect(
          getProfilePermissions(publicProfile, [UserSecurityRoles.User]),
        ).toEqual([
          ProfilePermissions.ReadGeneralProfileInformation,
          ProfilePermissions.ReadProfileData,
          ProfilePermissions.FollowProfile,
          ProfilePermissions.UnfollowProfile,
        ])
      })
    })

    describe('Profil public avec email public', () => {
      const publicProfileWithPublicEmail = {
        ...profile,
        isPublic: true,
        emailIsPublic: true,
      }

      it.each([
        {
          title: 'Propriétaire',
          roles: [UserSecurityRoles.User, ProfileRoles.ProfileOwner],
        },
        {
          title: 'Support',
          roles: [UserSecurityRoles.Support],
        },
        {
          title: 'Admin',
          roles: [UserSecurityRoles.Admin],
        },
      ])(
        `$title, j’ai toutes les permissions sur un profil public avec email public`,
        ({ roles }) => {
          expect(
            getProfilePermissions(publicProfileWithPublicEmail, roles),
          ).toEqual(profilePermissions)
        },
      )

      it('Visiteur, je peux voir les infos générales, données et email d’un profil public avec email public', () => {
        expect(getProfilePermissions(publicProfileWithPublicEmail, [])).toEqual(
          [
            ProfilePermissions.ReadGeneralProfileInformation,
            ProfilePermissions.ReadProfileData,
            ProfilePermissions.ReadProfileEmail,
          ],
        )
      })

      it('Utilisateur connecté, je peux voir les données et suivre un profil public avec email public', () => {
        expect(
          getProfilePermissions(publicProfileWithPublicEmail, [
            UserSecurityRoles.User,
          ]),
        ).toEqual([
          ProfilePermissions.ReadGeneralProfileInformation,
          ProfilePermissions.ReadProfileData,
          ProfilePermissions.ReadProfileEmail,
          ProfilePermissions.FollowProfile,
          ProfilePermissions.UnfollowProfile,
        ])
      })
    })
  })
})
