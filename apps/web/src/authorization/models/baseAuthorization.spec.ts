import type { SessionUserBase } from '@app/web/auth/sessionUser'
import type { Grantee } from '@app/web/authorization/grantee'
import {
  type BaseAuthorizationTarget,
  BasePermissions,
  BaseRoles,
  basePermissions,
  getBasePermissions,
  getBaseRoles,
} from '@app/web/authorization/models/baseAuthorization'
import { UserSecurityRoles } from '@app/web/authorization/userSecurityRole'
import { testSessionUser } from '@app/web/test/testSessionUser'

describe('Authorization - Bases', () => {
  const base = {
    id: 'baseId',
    createdById: 'creator',
    isPublic: false,
    emailIsPublic: false,
    deleted: null,
    slug: 'base-slug',
    title: 'Base title',
    collections: [],
    image: null,
  } satisfies SessionUserBase & BaseAuthorizationTarget

  const user: Grantee = { ...testSessionUser }

  describe('Roles - Bases', () => {
    it('Anonyme, aucun role', () => {
      expect(getBaseRoles(base, null)).toEqual([])
    })

    it('Utilisateur connecté, aucun rôle', () => {
      expect(getBaseRoles(base, user)).toEqual([])
    })

    it('Role créateur', () => {
      expect(getBaseRoles(base, { ...user, id: 'creator' })).toEqual([
        BaseRoles.BaseCreator,
      ])
    })

    it('Role membre', () => {
      expect(
        getBaseRoles(base, {
          ...user,
          bases: [{ base, isAdmin: false }],
        }),
      ).toEqual([BaseRoles.BaseMember])
    })

    it('Role admin', () => {
      expect(
        getBaseRoles(base, {
          ...user,
          bases: [{ base, isAdmin: true }],
        }),
      ).toEqual([BaseRoles.BaseMember, BaseRoles.BaseAdmin])
    })

    it('Role membre et créateur', () => {
      expect(
        getBaseRoles(base, {
          ...user,
          id: 'creator',
          bases: [{ base, isAdmin: false }],
        }),
      ).toEqual([BaseRoles.BaseCreator, BaseRoles.BaseMember])
    })

    it('Role membre admin et créateur', () => {
      expect(
        getBaseRoles(base, {
          ...user,
          id: 'creator',
          bases: [{ base, isAdmin: true }],
        }),
      ).toEqual([
        BaseRoles.BaseCreator,
        BaseRoles.BaseMember,
        BaseRoles.BaseAdmin,
      ])
    })

    it('Membre d’une autre base, aucun role', () => {
      const otherBase = { ...base, id: 'otherBaseId' }
      expect(
        getBaseRoles(otherBase, {
          ...user,
          bases: [{ base, isAdmin: false }],
        }),
      ).toEqual([])
    })
  })

  describe('Permissions - Bases', () => {
    describe('Base supprimée', () => {
      it("Si la base est supprimée, quelque soit mon rôle, je n'ai pas de permissions", () => {
        expect(
          getBasePermissions({ ...base, deleted: new Date() }, [
            UserSecurityRoles.User,
            UserSecurityRoles.Admin,
            UserSecurityRoles.Support,
            BaseRoles.BaseMember,
            BaseRoles.BaseAdmin,
            BaseRoles.BaseCreator,
          ]),
        ).toEqual([])
      })
    })

    describe('Base privée', () => {
      const privateBase = { ...base }

      it.each([
        {
          title: 'Membre admin',
          roles: [UserSecurityRoles.User, BaseRoles.BaseAdmin],
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
        `$title, j’ai toutes les permissions sur une base privée`,
        ({ roles }) => {
          expect(getBasePermissions(privateBase, roles)).toEqual(
            basePermissions,
          )
        },
      )

      it('Membre, je peux éditer une base privée', () => {
        expect(getBasePermissions(privateBase, [BaseRoles.BaseMember])).toEqual(
          [
            BasePermissions.ReadGeneralBaseInformation,
            BasePermissions.WriteBase,
            BasePermissions.AddBaseMember,
            BasePermissions.ReadBaseData,
            BasePermissions.ReadBaseEmail,
            BasePermissions.FollowBase,
            BasePermissions.UnfollowBase,
          ],
        )
      })

      it.each([
        {
          title: 'Visiteur',
          roles: [],
        },
        {
          title: 'Utilisateur connecté',
          roles: [UserSecurityRoles.User],
        },
        {
          title: 'Créateur non membre',
          roles: [BaseRoles.BaseCreator],
        },
      ])(
        '$title, je n’ai pas de permissions sur une base privée',
        ({ roles }) => {
          expect(getBasePermissions(privateBase, roles)).toEqual([
            BasePermissions.ReadGeneralBaseInformation,
          ])
        },
      )
    })

    describe('Base publique', () => {
      const publicBase = { ...base, isPublic: true }

      it.each([
        {
          title: 'Membre admin',
          roles: [UserSecurityRoles.User, BaseRoles.BaseAdmin],
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
        `$title, j’ai toutes les permissions sur une base publique`,
        ({ roles }) => {
          expect(getBasePermissions(publicBase, roles)).toEqual(basePermissions)
        },
      )

      it('Membre, je peux éditer une base publique', () => {
        expect(getBasePermissions(publicBase, [BaseRoles.BaseMember])).toEqual([
          BasePermissions.ReadGeneralBaseInformation,
          BasePermissions.WriteBase,
          BasePermissions.AddBaseMember,
          BasePermissions.ReadBaseData,
          BasePermissions.ReadBaseEmail,
          BasePermissions.FollowBase,
          BasePermissions.UnfollowBase,
        ])
      })

      it('Créateur non membre, je peux voir et suivre une base publique', () => {
        expect(getBasePermissions(publicBase, [BaseRoles.BaseCreator])).toEqual(
          [
            BasePermissions.ReadGeneralBaseInformation,
            BasePermissions.ReadBaseData,
            BasePermissions.FollowBase,
            BasePermissions.UnfollowBase,
          ],
        )
      })

      it('Utilisateur connecté, je peux voir et suivre une base publique', () => {
        expect(
          getBasePermissions(publicBase, [UserSecurityRoles.User]),
        ).toEqual([
          BasePermissions.ReadGeneralBaseInformation,
          BasePermissions.ReadBaseData,
          BasePermissions.FollowBase,
          BasePermissions.UnfollowBase,
        ])
      })

      it('Visiteur, je peux voir une base publique', () => {
        expect(getBasePermissions(publicBase, [])).toEqual([
          BasePermissions.ReadGeneralBaseInformation,
          BasePermissions.ReadBaseData,
        ])
      })
    })

    describe('Base publique avec email public', () => {
      const publicBaseWithPublicEmail = {
        ...base,
        isPublic: true,
        emailIsPublic: true,
      }

      it.each([
        {
          title: 'Membre admin',
          roles: [UserSecurityRoles.User, BaseRoles.BaseAdmin],
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
        `$title, j’ai toutes les permissions sur une base publique avec email public`,
        ({ roles }) => {
          expect(getBasePermissions(publicBaseWithPublicEmail, roles)).toEqual(
            basePermissions,
          )
        },
      )

      it('Membre, je peux éditer une base publique avec email public', () => {
        expect(
          getBasePermissions(publicBaseWithPublicEmail, [BaseRoles.BaseMember]),
        ).toEqual([
          BasePermissions.ReadGeneralBaseInformation,
          BasePermissions.WriteBase,
          BasePermissions.AddBaseMember,
          BasePermissions.ReadBaseData,
          BasePermissions.ReadBaseEmail,
          BasePermissions.FollowBase,
          BasePermissions.UnfollowBase,
        ])
      })

      it('Créateur non membre, je peux voir et suivre une base publique', () => {
        expect(
          getBasePermissions(publicBaseWithPublicEmail, [
            UserSecurityRoles.User,
            BaseRoles.BaseCreator,
          ]),
        ).toEqual([
          BasePermissions.ReadGeneralBaseInformation,
          BasePermissions.ReadBaseData,
          BasePermissions.FollowBase,
          BasePermissions.UnfollowBase,
          BasePermissions.ReadBaseEmail,
        ])
      })

      it('Utilisateur connecté, je peux voir et suivre une base publique avec email public', () => {
        expect(
          getBasePermissions(publicBaseWithPublicEmail, [
            UserSecurityRoles.User,
          ]),
        ).toEqual([
          BasePermissions.ReadGeneralBaseInformation,
          BasePermissions.ReadBaseData,
          BasePermissions.FollowBase,
          BasePermissions.UnfollowBase,
          BasePermissions.ReadBaseEmail,
        ])
      })

      it('Visiteur, je peux voir une base publique avec email public', () => {
        expect(getBasePermissions(publicBaseWithPublicEmail, [])).toEqual([
          BasePermissions.ReadGeneralBaseInformation,
          BasePermissions.ReadBaseData,
          BasePermissions.ReadBaseEmail,
        ])
      })
    })
  })
})
