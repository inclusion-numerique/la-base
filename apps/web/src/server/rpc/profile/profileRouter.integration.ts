import { expect } from '@storybook/jest'
import { v4 } from 'uuid'
import { testSessionUser } from '@app/web/test/testSessionUser'
import { profileRouter } from '@app/web/server/rpc/profile/profileRouter'
import { createTestContext } from '@app/web/test/createTestContext'
import {
  UpdateProfileContactsCommand,
  UpdateProfileInformationsCommand,
  UpdateProfileVisibilityCommand,
} from '@app/web/server/profiles/updateProfile'
import { prismaClient } from '@app/web/prismaClient'
import { handleResourceCreationCommand } from '@app/web/server/resources/feature/handleResourceCreationCommand'
import { handleResourceMutationCommand } from '@app/web/server/resources/feature/handleResourceMutationCommand'
import { createTestIdTitleAndSlug } from '@app/web/test/createTestIdTitleAndSlug'
import { createAvailableSlug } from '@app/web/server/slug/createAvailableSlug'

describe('profileRouter', () => {
  // Helper function to easily test procedures

  const givenUserId = v4()
  const givenUserEmail = `test+${givenUserId}@inclusion-numerique.anct.gouv.fr`
  const givenUser = {
    ...testSessionUser,
    id: givenUserId,
    email: givenUserEmail,
  }
  const givenUserSlug = `test+${givenUserId}`

  const basesToDelete: string[] = []
  const collectionsToDelete: string[] = []
  const resourcesToDelete: string[] = []

  const executeUpdateProfilInformationsProcedure = (
    input: UpdateProfileInformationsCommand,
  ) =>
    profileRouter
      .createCaller(createTestContext({ user: givenUser }))
      .updateInformations(input)

  const executeUpdateProfilContactsProcedure = (
    input: UpdateProfileContactsCommand,
  ) =>
    profileRouter
      .createCaller(createTestContext({ user: givenUser }))
      .updateContacts(input)

  const executeDeleteProfilProcedure = () =>
    profileRouter.createCaller(createTestContext({ user: givenUser })).delete()

  beforeAll(async () => {
    await prismaClient.user.create({
      data: {
        id: givenUserId,
        email: givenUserEmail,
        slug: givenUserSlug,
      },
    })
  })

  afterAll(async () => {
    await prismaClient.collection.deleteMany({
      where: {
        id: {
          in: collectionsToDelete,
        },
      },
    })
    await prismaClient.resourceEvent.deleteMany({
      where: {
        resourceId: {
          in: resourcesToDelete,
        },
      },
    })
    await prismaClient.resource.deleteMany({
      where: {
        id: {
          in: resourcesToDelete,
        },
      },
    })
    await prismaClient.base.deleteMany({
      where: {
        id: {
          in: basesToDelete,
        },
      },
    })
    await prismaClient.user.delete({
      where: {
        id: givenUserId,
      },
    })
  })

  describe('updateVisibility', () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const executeMutateProcedure = (input: UpdateProfileVisibilityCommand) =>
      profileRouter
        .createCaller(createTestContext({ user: givenUser }))
        .updateVisibility(input)

    it('should change visibility to private for owned resource and collections that are not in a base without touching models in a base', async () => {
      // Given a public profile with public and private collections and resources
      // TODO helper for integration profile tests
      const givenBase = createTestIdTitleAndSlug('Test')
      const givenPublicCollectionInBase = createTestIdTitleAndSlug(
        'Public collection in base',
      )
      const givenPublicCollection =
        createTestIdTitleAndSlug('Public collection')
      const givenPrivateCollection =
        createTestIdTitleAndSlug('Private collection')

      const givenPublicResourceInBase = createTestIdTitleAndSlug(
        'Public resource in base',
      )
      const givenPublicResource = createTestIdTitleAndSlug('Public resource')
      const givenPrivateResource = createTestIdTitleAndSlug('Private resource')
      const givenDraftResource = createTestIdTitleAndSlug('Draft resource')

      basesToDelete.push(givenBase.id)
      collectionsToDelete.push(
        givenPublicCollectionInBase.id,
        givenPublicCollection.id,
        givenPrivateCollection.id,
      )
      resourcesToDelete.push(
        givenPublicResourceInBase.id,
        givenPublicResource.id,
        givenPrivateResource.id,
        givenDraftResource.id,
      )

      await prismaClient.base.create({
        data: {
          ...givenBase,
          isPublic: true,
          createdById: givenUserId,
          email: givenUserEmail,
          collections: {
            createMany: {
              data: [
                {
                  id: givenPublicCollectionInBase.id,
                  title: givenPublicCollectionInBase.title,
                  slug: await createAvailableSlug(
                    givenPublicCollectionInBase.title,
                    'bases',
                  ),
                  createdById: givenUserId,
                  isPublic: true,
                },
              ],
            },
          },
        },
      })

      await prismaClient.collection.createMany({
        data: [
          {
            id: givenPublicCollection.id,
            title: givenPublicCollection.title,
            slug: await createAvailableSlug(
              givenPublicCollection.title,
              'collections',
            ),
            createdById: givenUserId,
            isPublic: true,
          },
          {
            id: givenPrivateCollection.id,
            title: givenPrivateCollection.title,
            slug: await createAvailableSlug(
              givenPrivateCollection.title,
              'collections',
            ),
            createdById: givenUserId,
            isPublic: false,
          },
        ],
      })

      await handleResourceCreationCommand(
        {
          name: 'CreateResource',
          payload: {
            resourceId: givenPublicResourceInBase.id,
            title: givenPublicResourceInBase.title,
            description: '',
            baseId: givenBase.id,
          },
        },
        { user: givenUser },
      )

      await handleResourceMutationCommand(
        {
          name: 'ChangeVisibility',
          payload: {
            resourceId: givenPublicResourceInBase.id,
            isPublic: true,
          },
        },
        {
          user: givenUser,
        },
      )

      await handleResourceCreationCommand(
        {
          name: 'CreateResource',
          payload: {
            resourceId: givenPublicResource.id,
            title: givenPublicResource.title,
            description: '',
            baseId: null,
          },
        },
        { user: givenUser },
      )

      await handleResourceMutationCommand(
        {
          name: 'ChangeVisibility',
          payload: {
            resourceId: givenPublicResource.id,
            isPublic: true,
          },
        },
        {
          user: givenUser,
        },
      )

      await handleResourceCreationCommand(
        {
          name: 'CreateResource',
          payload: {
            resourceId: givenPrivateResource.id,
            title: givenPrivateResource.title,
            description: '',
            baseId: null,
          },
        },
        { user: givenUser },
      )

      await handleResourceMutationCommand(
        {
          name: 'ChangeVisibility',
          payload: {
            resourceId: givenPrivateResource.id,
            isPublic: false,
          },
        },
        {
          user: givenUser,
        },
      )

      await handleResourceCreationCommand(
        {
          name: 'CreateResource',
          payload: {
            resourceId: givenDraftResource.id,
            title: givenDraftResource.title,
            description: '',
            baseId: null,
          },
        },
        { user: givenUser },
      )

      const profile = await executeMutateProcedure({
        isPublic: false,
      })

      const [
        base,
        publicCollectionInBase,
        publicCollection,
        privateCollection,
        publicResourceInBase,
        publicResource,
        privateResource,
        draftResource,
      ] = await Promise.all([
        prismaClient.base.findUniqueOrThrow({
          where: { id: givenBase.id },
          select: { isPublic: true },
        }),
        prismaClient.collection.findUniqueOrThrow({
          where: { id: givenPublicCollectionInBase.id },
          select: { isPublic: true },
        }),
        prismaClient.collection.findUniqueOrThrow({
          where: { id: givenPublicCollection.id },
          select: { isPublic: true },
        }),
        prismaClient.collection.findUniqueOrThrow({
          where: { id: givenPrivateCollection.id },
          select: { isPublic: true },
        }),
        prismaClient.resource.findUniqueOrThrow({
          where: { id: givenPublicResourceInBase.id },
          select: { isPublic: true },
        }),
        prismaClient.resource.findUniqueOrThrow({
          where: { id: givenPublicResource.id },
          select: { isPublic: true },
        }),
        prismaClient.resource.findUniqueOrThrow({
          where: { id: givenPrivateResource.id },
          select: { isPublic: true },
        }),
        prismaClient.resource.findUniqueOrThrow({
          where: { id: givenDraftResource.id },
          select: { isPublic: true },
        }),
      ])

      await expect(profile.isPublic).toBeFalse()
      await expect(base.isPublic).toBeTrue()
      await expect(publicCollectionInBase.isPublic).toBeTrue()
      await expect(publicCollection.isPublic).toBeFalse()
      await expect(privateCollection.isPublic).toBeFalse()
      await expect(publicResourceInBase.isPublic).toBeTrue()
      await expect(publicResource.isPublic).toBeFalse()
      await expect(privateResource.isPublic).toBeFalse()
      await expect(draftResource.isPublic).toBeNull()
    })
  })

  describe('updateInformations', (): void => {
    it('should change profil firstname, lastname, departement and description', async (): Promise<void> => {
      await executeUpdateProfilInformationsProcedure({
        firstName: 'John',
        lastName: 'Doe',
        department: '24',
        description: 'This is John Doe',
      })

      const user = await prismaClient.user.findUniqueOrThrow({
        where: { id: givenUserId },
      })

      await expect(user.firstName).toBe('John')
      await expect(user.lastName).toBe('Doe')
      await expect(user.name).toBe('John Doe')
      await expect(user.department).toBe('24')
      await expect(user.description).toBe('This is John Doe')
    })
  })

  describe('updateContacts', (): void => {
    it('should change profil contact informations', async (): Promise<void> => {
      await executeUpdateProfilContactsProcedure({
        emailIsPublic: true,
        website: 'https://www.john-doe.com',
        facebook: 'https://www.facebook.com/john-doe',
        twitter: 'https://twitter.com/JDoe',
        linkedin: 'https://www.linkedin.com/in/john-doe',
      })

      const user = await prismaClient.user.findUniqueOrThrow({
        where: { id: givenUserId },
      })

      await expect(user.emailIsPublic).toBe(true)
      await expect(user.website).toBe('https://www.john-doe.com')
      await expect(user.facebook).toBe('https://www.facebook.com/john-doe')
      await expect(user.twitter).toBe('https://twitter.com/JDoe')
      await expect(user.linkedin).toBe('https://www.linkedin.com/in/john-doe')
    })
  })

  describe('delete', (): void => {
    it('should delete user profil', async (): Promise<void> => {
      await executeUpdateProfilInformationsProcedure({
        firstName: 'John',
        lastName: 'Doe',
        department: '24',
        description: 'This is John Doe',
      })

      await executeUpdateProfilContactsProcedure({
        emailIsPublic: true,
        website: 'https://www.john-doe.com',
        facebook: 'https://www.facebook.com/john-doe',
        twitter: 'https://twitter.com/JDoe',
        linkedin: 'https://www.linkedin.com/in/john-doe',
      })

      await executeDeleteProfilProcedure()

      const user = await prismaClient.user.findUniqueOrThrow({
        where: { id: givenUserId },
      })

      const bases = await prismaClient.base.findMany({
        where: { createdById: givenUserId },
      })

      const resources = await prismaClient.resource.findMany({
        where: {
          createdById: givenUserId,
          contributors: { none: {} },
        },
      })

      const collections = await prismaClient.collection.findMany({
        where: {
          createdById: givenUserId,
          savedCollection: { none: {} },
          baseId: null,
        },
      })
      const collectionsInBase = await prismaClient.collection.findMany({
        where: {
          createdById: givenUserId,
          savedCollection: { none: {} },
          baseId: { not: null },
        },
      })

      await expect(user.email).toBe(
        `utilisateur-supprimé+${givenUserId}@lesbases.anct.gouv.fr`,
      )
      await expect(user.firstName).toBeNull()
      await expect(user.lastName).toBeNull()
      await expect(user.name).toBe('Profil supprimé')
      await expect(user.department).toBeNull()
      await expect(user.description).toBeNull()
      await expect(user.emailIsPublic).toBeFalse()
      await expect(user.website).toBeNull()
      await expect(user.facebook).toBeNull()
      await expect(user.twitter).toBeNull()
      await expect(user.linkedin).toBeNull()
      await expect(user.deleted).not.toBeNull()

      await expect(bases.every((base) => base.deleted != null)).toBe(true)
      await expect(
        resources.every((resource) => resource.deleted != null),
      ).toBe(true)
      // Should delete his collections
      await expect(
        collections.every((collection) => collection.deleted != null),
      ).toBe(true)

      // Should not delete collections in bases
      await expect(
        collectionsInBase.every((collection) => collection.deleted == null),
      ).toBe(true)
    })
  })
})
