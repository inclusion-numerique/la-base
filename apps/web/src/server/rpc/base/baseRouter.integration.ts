import { v4 } from 'uuid'
import { testSessionUser } from '@app/web/test/testSessionUser'
import { baseRouter } from '@app/web/server/rpc/base/baseRouter'
import { createTestContext } from '@app/web/test/createTestContext'
import { UpdateBaseVisibilityCommand } from '@app/web/server/bases/updateBase'
import { prismaClient } from '@app/web/prismaClient'
import { handleResourceCreationCommand } from '@app/web/server/resources/feature/handleResourceCreationCommand'
import { handleResourceMutationCommand } from '@app/web/server/resources/feature/handleResourceMutationCommand'
import { createTestIdTitleAndSlug } from '@app/web/test/createTestIdTitleAndSlug'
import { createAvailableSlug } from '@app/web/server/slug/createAvailableSlug'

describe('baseRouter', () => {
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

  describe('mutate', () => {
    describe('UpdateBaseVisibilityCommand', () => {
      const executeUpdateBaseVisibilityProcedure = (input: {
        id: string
        data: UpdateBaseVisibilityCommand
        // eslint-disable-next-line unicorn/consistent-function-scoping
      }) =>
        baseRouter
          .createCaller(createTestContext({ user: givenUser }))
          .mutate(input)

      it('should change visibility to private of children collections and resources', async () => {
        // Given a public base with public and private collections and resources
        // TODO helper for integration base tests
        const givenBase = createTestIdTitleAndSlug('Test')
        const givenPublicCollection =
          createTestIdTitleAndSlug('Public collection')
        const givenPrivateCollection =
          createTestIdTitleAndSlug('Private collection')
        const givenPublicResource = createTestIdTitleAndSlug('Public resource')
        const givenPrivateResource =
          createTestIdTitleAndSlug('Private resource')
        const givenDraftResource = createTestIdTitleAndSlug('Draft resource')

        basesToDelete.push(givenBase.id)
        collectionsToDelete.push(
          givenPublicCollection.id,
          givenPrivateCollection.id,
        )
        resourcesToDelete.push(
          givenPublicResource.id,
          givenPrivateResource.id,
          givenDraftResource.id,
        )

        await prismaClient.base.create({
          data: {
            ...givenBase,
            isPublic: true,
            ownerId: givenUserId,
            email: givenUserEmail,
            collections: {
              createMany: {
                data: [
                  {
                    id: givenPublicCollection.id,
                    title: givenPublicCollection.title,
                    slug: await createAvailableSlug(
                      givenPublicCollection.slug,
                      'collections',
                    ),
                    ownerId: givenUserId,
                    isPublic: true,
                  },
                  {
                    id: givenPrivateCollection.id,
                    title: givenPrivateCollection.title,
                    slug: await createAvailableSlug(
                      givenPrivateCollection.slug,
                      'collections',
                    ),
                    ownerId: givenUserId,
                    isPublic: false,
                  },
                ],
              },
            },
          },
        })

        await handleResourceCreationCommand(
          {
            name: 'CreateResource',
            payload: {
              resourceId: givenPublicResource.id,
              title: givenPublicResource.title,
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
              baseId: givenBase.id,
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
              baseId: givenBase.id,
            },
          },
          { user: givenUser },
        )

        const base = await executeUpdateBaseVisibilityProcedure({
          id: givenBase.id,
          data: {
            isPublic: false,
          },
        })

        const [
          publicCollection,
          privateCollection,
          publicResource,
          privateResource,
          draftResource,
        ] = await Promise.all([
          prismaClient.collection.findUniqueOrThrow({
            where: { id: givenPublicCollection.id },
            select: { isPublic: true },
          }),
          prismaClient.collection.findUniqueOrThrow({
            where: { id: givenPrivateCollection.id },
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

        expect(base.isPublic).toBeFalse()
        expect(publicCollection.isPublic).toBeFalse()
        expect(privateCollection.isPublic).toBeFalse()
        expect(publicResource.isPublic).toBeFalse()
        expect(privateResource.isPublic).toBeFalse()
        expect(draftResource.isPublic).toBeNull()
      })
    })
  })
})
