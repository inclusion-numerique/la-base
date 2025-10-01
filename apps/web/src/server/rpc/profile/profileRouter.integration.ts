import { prismaClient } from '@app/web/prismaClient'
import type {
  UpdateProfileContactsCommand,
  UpdateProfileInformationsCommand,
  UpdateProfileVisibilityCommand,
} from '@app/web/server/profiles/updateProfile'
import { handleResourceCreationCommand } from '@app/web/server/resources/feature/handleResourceCreationCommand'
import { handleResourceMutationCommand } from '@app/web/server/resources/feature/handleResourceMutationCommand'
import { profileRouter } from '@app/web/server/rpc/profile/profileRouter'
import { createAvailableSlug } from '@app/web/server/slug/createAvailableSlug'
import { createTestContext } from '@app/web/test/createTestContext'
import { createTestIdTitleAndSlug } from '@app/web/test/createTestIdTitleAndSlug'
import { testSessionUser } from '@app/web/test/testSessionUser'
import { v4 } from 'uuid'

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
  const usersToDelete: string[] = []

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

  const executeDeleteProfilProcedure = ({ userId }: { userId: string }) =>
    profileRouter
      .createCaller(createTestContext({ user: givenUser }))
      .delete({ userId })

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
    await prismaClient.user.deleteMany({
      where: {
        id: {
          in: usersToDelete,
        },
      },
    })
  })

  describe('searchProfileForMember', () => {
    const executeSearchProfileForMemberProcedure = (input: {
      query: string
      notInBaseId?: string
      notInResourceId?: string
    }) =>
      profileRouter
        .createCaller(createTestContext({ user: givenUser }))
        .searchProfileForMember(input)

    it('should not return deleted profiles in search results', async () => {
      const deletedUserId = v4()
      const deletedUserEmail = `deleted+${deletedUserId}@inclusion-numerique.anct.gouv.fr`
      const deletedUserSlug = `deleted+${deletedUserId}`

      usersToDelete.push(deletedUserId)

      await prismaClient.user.create({
        data: {
          id: deletedUserId,
          email: deletedUserEmail,
          slug: deletedUserSlug,
          firstName: 'Deleted',
          lastName: 'User',
          name: 'Deleted User',
          emailVerified: new Date(),
          deleted: new Date(),
        },
      })

      const searchResults = await executeSearchProfileForMemberProcedure({
        query: 'Deleted',
      })

      expect(searchResults).toHaveLength(0)
    })

    it('should return non-deleted profiles in search results only', async () => {
      const activeUserId = v4()
      const activeUserEmail = `active+${activeUserId}@inclusion-numerique.anct.gouv.fr`
      const activeUserSlug = `active+${activeUserId}`
      const deletedUserId = v4()
      const deletedUserEmail = `deleted+${deletedUserId}@inclusion-numerique.anct.gouv.fr`
      const deletedUserSlug = `deleted+${deletedUserId}`

      usersToDelete.push(activeUserId)
      usersToDelete.push(deletedUserId)

      await prismaClient.$transaction(async (tx) => {
        await tx.user.create({
          data: {
            id: deletedUserId,
            email: deletedUserEmail,
            slug: deletedUserSlug,
            firstName: 'Deleted',
            lastName: 'User',
            name: 'Deleted User',
            emailVerified: new Date(),
            deleted: new Date(),
          },
        })
        await tx.user.create({
          data: {
            id: activeUserId,
            email: activeUserEmail,
            slug: activeUserSlug,
            firstName: 'Active',
            lastName: 'User',
            name: 'Active User',
            emailVerified: new Date(),
            deleted: null,
          },
        })
      })

      const searchResults = await executeSearchProfileForMemberProcedure({
        query: 'Active',
      })

      expect(searchResults.length).toBe(1)
      expect(searchResults[0].id).toBe(activeUserId)
      expect(searchResults.some((result) => result.id === deletedUserId)).toBe(
        false,
      )
    })
  })

  describe('updateVisibility', () => {
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

      expect(profile.isPublic).toBeFalse()
      expect(base.isPublic).toBeTrue()
      expect(publicCollectionInBase.isPublic).toBeTrue()
      expect(publicCollection.isPublic).toBeFalse()
      expect(privateCollection.isPublic).toBeFalse()
      expect(publicResourceInBase.isPublic).toBeTrue()
      expect(publicResource.isPublic).toBeFalse()
      expect(privateResource.isPublic).toBeFalse()
      expect(draftResource.isPublic).toBeNull()
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

      expect(user.firstName).toBe('John')
      expect(user.lastName).toBe('Doe')
      expect(user.name).toBe('John Doe')
      expect(user.department).toBe('24')
      expect(user.description).toBe('This is John Doe')
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

      expect(user.emailIsPublic).toBe(true)
      expect(user.website).toBe('https://www.john-doe.com')
      expect(user.facebook).toBe('https://www.facebook.com/john-doe')
      expect(user.twitter).toBe('https://twitter.com/JDoe')
      expect(user.linkedin).toBe('https://www.linkedin.com/in/john-doe')
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

      await executeDeleteProfilProcedure({
        userId: givenUserId,
      })

      usersToDelete.push(givenUserId)

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
          baseId: null,
        },
      })
      const collectionsInBase = await prismaClient.collection.findMany({
        where: {
          createdById: givenUserId,
          baseId: { not: null },
        },
      })

      expect(user.email).toBe(
        `utilisateur-supprimé+${givenUserId}@lesbases.anct.gouv.fr`,
      )
      expect(user.firstName).toBeNull()
      expect(user.lastName).toBeNull()
      expect(user.name).toBe('Profil supprimé')
      expect(user.department).toBeNull()
      expect(user.description).toBeNull()
      expect(user.emailIsPublic).toBeFalse()
      expect(user.website).toBeNull()
      expect(user.facebook).toBeNull()
      expect(user.twitter).toBeNull()
      expect(user.linkedin).toBeNull()
      expect(user.deleted).not.toBeNull()

      expect(bases.every((base) => base.deleted != null)).toBe(true)
      expect(resources.every((resource) => resource.deleted != null)).toBe(true)
      // Should delete his collections
      expect(
        collections.every((collection) => collection.deleted != null),
      ).toBe(true)

      // Should not delete collections in bases
      expect(
        collectionsInBase.every((collection) => collection.deleted == null),
      ).toBe(true)
    })

    it('should delete bases if the user is the last member non-deleted and not an admin', async (): Promise<void> => {
      const deletedUserId = v4()
      const deletedUserEmail = `test+${deletedUserId}@inclusion-numerique.anct.gouv.fr`
      const deletedUserSlug = `test+${deletedUserId}`
      const deletedUser = {
        ...testSessionUser,
        id: deletedUserId,
        email: deletedUserEmail,
        slug: deletedUserSlug,
      }
      usersToDelete.push(givenUserId, deletedUser.id)

      // we reset the deleted user to be able to delete it
      await prismaClient.user.update({
        where: { id: givenUserId },
        data: {
          deleted: null,
        },
      })

      await prismaClient.user.create({
        data: {
          id: deletedUser.id,
          email: deletedUser.email,
          slug: deletedUser.slug,
          deleted: new Date(),
        },
      })

      const baseWithSingleMember = createTestIdTitleAndSlug(
        'Base with single member',
      )
      const baseWithMultipleMembers = createTestIdTitleAndSlug(
        'Base with multiple members',
      )
      basesToDelete.push(baseWithMultipleMembers.id, baseWithSingleMember.id)
      await prismaClient.base.create({
        data: {
          ...baseWithSingleMember,
          createdById: givenUserId,
          email: givenUserEmail,
          members: {
            create: {
              memberId: givenUserId,
              isAdmin: false,
              accepted: new Date(),
            },
          },
        },
      })

      await prismaClient.base.create({
        data: {
          ...baseWithMultipleMembers,
          createdById: givenUserId,
          email: givenUserEmail,
          members: {
            create: [
              {
                memberId: givenUserId,
                isAdmin: false,
                accepted: new Date(),
              },
              {
                memberId: deletedUser.id,
                isAdmin: false,
                accepted: new Date(),
              },
            ],
          },
        },
      })

      await executeDeleteProfilProcedure({
        userId: givenUserId,
      })

      const singleMemberBase = await prismaClient.base.findUniqueOrThrow({
        where: { id: baseWithSingleMember.id },
        include: {
          members: { select: { isAdmin: true } },
        },
      })
      const multipleMembersBase = await prismaClient.base.findUniqueOrThrow({
        where: { id: baseWithMultipleMembers.id },
        include: {
          members: { select: { isAdmin: true } },
        },
      })

      expect(singleMemberBase.deleted).not.toBeNull()
      expect(multipleMembersBase.deleted).not.toBeNull()
      expect(singleMemberBase.members.every((member) => member.isAdmin)).toBe(
        false,
      )
      expect(
        multipleMembersBase.members.every((member) => member.isAdmin),
      ).toBe(false)
    })
  })
})
