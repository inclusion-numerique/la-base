import type { SessionUser } from '@app/web/auth/sessionUser'
import type { Grantee } from '@app/web/authorization/grantee'
import {
  type CollectionAuthorizationTarget,
  CollectionPermissions,
  CollectionRoles,
  collectionPermissions,
  getCollectionPermissions,
  getCollectionRoles,
} from '@app/web/authorization/models/collectionAuthorization'
import { UserSecurityRoles } from '@app/web/authorization/userSecurityRole'
import { testSessionUser } from '@app/web/test/testSessionUser'

describe('Authorization - Collections', () => {
  const collection = {
    id: 'collection',
    baseId: null,
    createdById: 'creator',
    isPublic: false,
    deleted: null,
  } satisfies CollectionAuthorizationTarget

  const basePublique = {
    id: 'basePublique',
    isPublic: true,
    collections: [],
    slug: 'base-publique',
    title: 'Base publique',
    image: null,
  } satisfies SessionUser['bases'][number]['base']

  const basePrivee = {
    id: 'basePrivee',
    isPublic: false,
    collections: [],
    slug: 'base-privee',
    title: 'Base privée',
    image: null,
  } satisfies SessionUser['bases'][number]['base']

  const user = { ...testSessionUser } satisfies Grantee

  describe('Roles - Collections', () => {
    it('Anonyme, aucun role', () => {
      expect(getCollectionRoles(collection, null)).toEqual([])
    })

    it('Utilisateur connecté, aucun rôle', () => {
      expect(getCollectionRoles(collection, user)).toEqual([])
    })

    it('Role créateur', () => {
      expect(
        getCollectionRoles(collection, { ...user, id: 'creator' }),
      ).toEqual([CollectionRoles.CollectionCreator])
    })

    it('Membre de la base de la collection, je suis contributeur', () => {
      expect(
        getCollectionRoles(
          { ...collection, baseId: basePrivee.id },
          { ...user, bases: [{ base: basePrivee, isAdmin: false }] },
        ),
      ).toEqual([CollectionRoles.CollectionContributor])
    })

    it('Membre admin de la base de la collection, je suis contributeur', () => {
      expect(
        getCollectionRoles(
          { ...collection, baseId: basePrivee.id },
          { ...user, bases: [{ base: basePrivee, isAdmin: true }] },
        ),
      ).toEqual([CollectionRoles.CollectionContributor])
    })

    it('Membre d’une autre base que celle de la collection, aucun role', () => {
      expect(
        getCollectionRoles(
          { ...collection, baseId: basePrivee.id },
          { ...user, bases: [{ base: basePublique, isAdmin: false }] },
        ),
      ).toEqual([])
    })
  })

  describe('Permissions - Collections', () => {
    describe('Collection supprimée', () => {
      it("Si la collection est supprimée, quelque soit mon rôle, je n'ai pas de permissions", () => {
        expect(
          getCollectionPermissions({ ...collection, deleted: new Date() }, [
            UserSecurityRoles.User,
            UserSecurityRoles.Admin,
            UserSecurityRoles.Support,
            CollectionRoles.CollectionContributor,
            CollectionRoles.CollectionCreator,
          ]),
        ).toEqual([])
      })
    })

    describe('Collection privée', () => {
      const privateCollection = {
        ...collection,
        isPublic: false,
      }

      it.each([
        {
          title: 'Créateur',
          roles: [UserSecurityRoles.User, CollectionRoles.CollectionCreator],
        },
        {
          title: 'Contributeur',
          roles: [
            UserSecurityRoles.User,
            CollectionRoles.CollectionContributor,
          ],
        },
        {
          title: 'Support',
          roles: [UserSecurityRoles.Support],
        },
        {
          title: 'Admin',
          roles: [UserSecurityRoles.Admin],
        },
      ])(`$title, j’ai toutes les permissions sur une collection privée`, ({
        roles,
      }) => {
        expect(getCollectionPermissions(privateCollection, roles)).toEqual(
          collectionPermissions,
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
      ])('$title, je n’ai pas de permissions sur une collection privée', ({
        roles,
      }) => {
        expect(getCollectionPermissions(privateCollection, roles)).toEqual([])
      })
    })

    describe('Collection publique', () => {
      const publicCollection = {
        ...collection,
        isPublic: true,
      }

      it.each([
        {
          title: 'Créateur',
          roles: [UserSecurityRoles.User, CollectionRoles.CollectionCreator],
        },
        {
          title: 'Contributeur',
          roles: [
            UserSecurityRoles.User,
            CollectionRoles.CollectionContributor,
          ],
        },
        {
          title: 'Support',
          roles: [UserSecurityRoles.Support],
        },
        {
          title: 'Admin',
          roles: [UserSecurityRoles.Admin],
        },
      ])(`$title, j’ai toutes les permissions sur une collection publique`, ({
        roles,
      }) => {
        expect(getCollectionPermissions(publicCollection, roles)).toEqual(
          collectionPermissions,
        )
      })

      it('Utilisateur connecté, je peux voir et enregistrer une collection publique', () => {
        expect(
          getCollectionPermissions(publicCollection, [UserSecurityRoles.User]),
        ).toEqual([
          CollectionPermissions.ReadGeneralCollectionInformation,
          CollectionPermissions.ReadCollectionContent,
          CollectionPermissions.SaveCollection,
          CollectionPermissions.UnsaveCollection,
        ])
      })

      it('Visiteur, je peux voir une collection publique', () => {
        expect(getCollectionPermissions(publicCollection, [])).toEqual([
          CollectionPermissions.ReadGeneralCollectionInformation,
          CollectionPermissions.ReadCollectionContent,
        ])
      })
    })
  })
})
