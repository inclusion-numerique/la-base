import { prismaClient } from '@app/web/prismaClient'
import type { ResourceMutationCommand } from '@app/web/server/resources/feature/features'
import { handleResourceCreationCommand } from '@app/web/server/resources/feature/handleResourceCreationCommand'
import { resourceRouter } from '@app/web/server/rpc/resource/resourceRouter'
import { createTestContext } from '@app/web/test/createTestContext'
import { createTestIdTitleAndSlug } from '@app/web/test/createTestIdTitleAndSlug'
import { testSessionUser } from '@app/web/test/testSessionUser'
import { v4 } from 'uuid'

describe('resourceRouter', () => {
  describe('mutate', () => {
    const givenUserId = v4()
    const givenUserEmail = `test+${givenUserId}@inclusion-numerique.anct.gouv.fr`
    const givenUser = {
      ...testSessionUser,
      id: givenUserId,
      email: givenUserEmail,
    }

    const resourcesToDelete: string[] = []

    const executeMutateProcedure = (input: ResourceMutationCommand) =>
      resourceRouter
        .createCaller(createTestContext({ user: givenUser }))
        .mutate(input)

    beforeAll(async () => {
      await prismaClient.user.create({
        data: {
          id: givenUserId,
          email: givenUserEmail,
          slug: `test+${givenUserId}`,
        },
      })
    })

    afterAll(async () => {
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
      await prismaClient.user.delete({
        where: {
          id: givenUserId,
        },
      })
    })

    it('should maintain correct sequence of resource events when performing multiple mutations', async () => {
      const givenResource = createTestIdTitleAndSlug('Test Resource')
      resourcesToDelete.push(givenResource.id)

      await handleResourceCreationCommand(
        {
          name: 'CreateResource',
          payload: {
            resourceId: givenResource.id,
            title: givenResource.title,
            description: 'Initial description',
            baseId: null,
          },
        },
        { user: givenUser },
      )

      await executeMutateProcedure({
        name: 'EditTitleAndDescription',
        payload: {
          resourceId: givenResource.id,
          title: 'Updated Title 1',
          description: 'Updated Description 1',
        },
      })

      await executeMutateProcedure({
        name: 'ChangeVisibility',
        payload: {
          resourceId: givenResource.id,
          isPublic: true,
        },
      })

      const events = await prismaClient.resourceEvent.findMany({
        where: {
          resourceId: givenResource.id,
        },
        orderBy: {
          sequence: 'asc',
        },
      })

      // We want to check that the sequence and type are correct
      expect(events).toHaveLength(3) // creation + 2 mutations
      expect(events[0].type).toBe('Created')
      expect(events[0].sequence).toBe(0)
      expect(events[1].type).toBe('TitleAndDescriptionEdited')
      expect(events[1].sequence).toBe(1)
      expect(events[2].type).toBe('VisibilityChanged')
      expect(events[2].sequence).toBe(2)
    })
  })
})
