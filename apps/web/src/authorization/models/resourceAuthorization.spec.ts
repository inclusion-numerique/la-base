import { Grantee } from '@app/web/authorization/grantee'
import { testSessionUser } from '@app/web/test/testSessionUser'
import {
  getResourcePermissions,
  getResourceRoles,
  ResourceAuthorizationTarget,
  ResourcePermissions,
  resourcePermissions,
  ResourceRoles,
} from '@app/web/authorization/models/resourceAuthorization'
import { SessionUser } from '@app/web/auth/sessionUser'
import { UserSecurityRoles } from '@app/web/authorization/userSecurityRole'

describe('Authorization - Ressources', () => {
  const resource = {
    id: 'resource',
    baseId: null,
    createdById: 'creator',
    isPublic: false,
    published: null,
    deleted: null,
  } satisfies ResourceAuthorizationTarget

  const basePublique = {
    id: 'basePublique',
    isPublic: true,
    collections: [],
    slug: 'base-publique',
    savedCollections: [],
    title: 'Base publique',
  } satisfies SessionUser['bases'][number]['base']

  const basePrivee = {
    id: 'basePrivee',
    isPublic: false,
    collections: [],
    slug: 'base-privee',
    savedCollections: [],
    title: 'Base privée',
  } satisfies SessionUser['bases'][number]['base']

  const user = { ...testSessionUser } satisfies Grantee

  describe('Roles - Ressources', () => {
    it('Anonyme, aucun role', () => {
      expect(getResourceRoles(resource, null)).toEqual([])
    })

    it('Utilisateur connecté, aucun rôle', () => {
      expect(getResourceRoles(resource, user)).toEqual([])
    })

    it('Role créateur', () => {
      expect(getResourceRoles(resource, { ...user, id: 'creator' })).toEqual([
        ResourceRoles.ResourceCreator,
      ])
    })

    it('Role contributeur', () => {
      expect(
        getResourceRoles(resource, {
          ...user,
          resources: [{ resourceId: 'resource' }],
        }),
      ).toEqual([ResourceRoles.ResourceContributor])
    })

    it('Membre de la base de la ressource, je suis contributeur', () => {
      expect(
        getResourceRoles(
          { ...resource, baseId: basePrivee.id },
          { ...user, bases: [{ base: basePrivee, isAdmin: false }] },
        ),
      ).toEqual([ResourceRoles.ResourceContributor])
    })

    it('Membre admin de la base de la ressource, je suis contributeur', () => {
      expect(
        getResourceRoles(
          { ...resource, baseId: basePrivee.id },
          { ...user, bases: [{ base: basePrivee, isAdmin: true }] },
        ),
      ).toEqual([ResourceRoles.ResourceContributor])
    })

    it('Membre d’une autre base que celle de la ressource, aucun role', () => {
      expect(
        getResourceRoles(
          { ...resource, baseId: basePrivee.id },
          { ...user, bases: [{ base: basePublique, isAdmin: false }] },
        ),
      ).toEqual([])
    })
  })

  describe('Permissions - Ressources', () => {
    describe('Ressource supprimée', () => {
      it("Si la ressource est supprimée, quelque soit mon rôle, je n'ai pas de permissions", () => {
        expect(
          getResourcePermissions({ ...resource, deleted: new Date() }, [
            UserSecurityRoles.User,
            UserSecurityRoles.Admin,
            UserSecurityRoles.Support,
            ResourceRoles.ResourceContributor,
            ResourceRoles.ResourceCreator,
          ]),
        ).toEqual([])
      })
    })

    describe('Ressource en brouillon', () => {
      const draftResource = { ...resource, isPublic: true }

      it.each([
        {
          title: 'Créateur',
          roles: [UserSecurityRoles.User, ResourceRoles.ResourceCreator],
        },
        {
          title: 'Contributeur',
          roles: [UserSecurityRoles.User, ResourceRoles.ResourceContributor],
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
        `$title, j’ai toutes les permissions sur une ressource en brouillon`,
        ({ roles }) => {
          expect(getResourcePermissions(draftResource, roles)).toEqual(
            resourcePermissions,
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
      ])(
        '$title, je n’ai pas de permissions sur une ressource en brouillon',
        ({ roles }) => {
          expect(getResourcePermissions(draftResource, roles)).toEqual([])
        },
      )
    })

    describe('Ressource privée', () => {
      const privateResource = {
        ...resource,
        isPublic: false,
        published: new Date(),
      }

      it.each([
        {
          title: 'Créateur',
          roles: [UserSecurityRoles.User, ResourceRoles.ResourceCreator],
        },
        {
          title: 'Contributeur',
          roles: [UserSecurityRoles.User, ResourceRoles.ResourceContributor],
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
        `$title, j’ai toutes les permissions sur une ressource privée`,
        ({ roles }) => {
          expect(getResourcePermissions(privateResource, roles)).toEqual(
            resourcePermissions,
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
      ])(
        '$title, je n’ai pas de permissions sur une ressource privée',
        ({ roles }) => {
          expect(getResourcePermissions(privateResource, roles)).toEqual([
            ResourcePermissions.ReadGeneralResourceInformation,
          ])
        },
      )
    })

    describe('Ressource publique', () => {
      const publicResource = {
        ...resource,
        isPublic: true,
        published: new Date(),
      }

      it.each([
        {
          title: 'Créateur',
          roles: [UserSecurityRoles.User, ResourceRoles.ResourceCreator],
        },
        {
          title: 'Contributeur',
          roles: [UserSecurityRoles.User, ResourceRoles.ResourceContributor],
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
        `$title, j’ai toutes les permissions sur une ressource publique`,
        ({ roles }) => {
          expect(getResourcePermissions(publicResource, roles)).toEqual(
            resourcePermissions,
          )
        },
      )

      it('Utilisateur connecté, je peux voir, signaler et enregistrer une ressource publique', () => {
        expect(
          getResourcePermissions(publicResource, [UserSecurityRoles.User]),
        ).toEqual([
          ResourcePermissions.ReadGeneralResourceInformation,
          ResourcePermissions.ReadResourceContent,
          ResourcePermissions.SaveResource,
          ResourcePermissions.UnsaveResource,
          ResourcePermissions.ReportResource,
        ])
      })

      it('Visiteur, je peux voir une ressource publique', () => {
        expect(getResourcePermissions(publicResource, [])).toEqual([
          ResourcePermissions.ReadGeneralResourceInformation,
          ResourcePermissions.ReadResourceContent,
        ])
      })
    })
  })
})
