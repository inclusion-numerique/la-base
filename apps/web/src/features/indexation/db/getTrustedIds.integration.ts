import {
  getTrustedUserIds,
  isTrustedBaseId,
  isTrustedUserId,
} from '@app/web/features/indexation/db/getTrustedIds'
import { prismaClient } from '@app/web/prismaClient'
import { createTestIdTitleAndSlug } from '@app/web/test/createTestIdTitleAndSlug'
import { v4 } from 'uuid'

describe('getTrustedIds', () => {
  const longAgo = new Date('2024-01-01')

  const usersToDelete: string[] = []
  const resourcesToDelete: string[] = []
  const basesToDelete: string[] = []

  const createUser = async ({
    email,
    created = longAgo,
    deleted = null,
  }: {
    email?: string
    created?: Date
    deleted?: Date | null
  } = {}) => {
    const id = v4()
    usersToDelete.push(id)
    await prismaClient.user.create({
      data: {
        id,
        email: email ?? `test+${id}@exemple.com`,
        emailVerified: longAgo,
        slug: `test+${id}`,
        created,
        deleted,
      },
    })
    return id
  }

  const createResource = async ({
    createdById,
    isPublic = true,
    published = longAgo,
    deleted = null,
    viewsCount = 0,
  }: {
    createdById: string
    isPublic?: boolean | null
    published?: Date | null
    deleted?: Date | null
    viewsCount?: number
  }) => {
    const { id, title, slug, titleDuplicationCheckSlug } =
      createTestIdTitleAndSlug('Ressource')
    resourcesToDelete.push(id)
    await prismaClient.resource.create({
      data: {
        id,
        title,
        slug,
        titleDuplicationCheckSlug,
        description: '',
        excerpt: '',
        createdById,
        isPublic,
        published,
        deleted,
        viewsCount,
      },
    })
    return id
  }

  const recommend = (
    resourceId: string,
    sentById: string,
    { rating = 4 }: { rating?: number } = {},
  ) =>
    prismaClient.resourceFeedback.create({
      data: { resourceId, sentById, rating },
    })

  let recommenderId: string

  beforeAll(async () => {
    recommenderId = await createUser()
  })

  afterAll(async () => {
    await prismaClient.baseMembers.deleteMany({
      where: { baseId: { in: basesToDelete } },
    })
    await prismaClient.base.deleteMany({
      where: { id: { in: basesToDelete } },
    })
    // Les avis sont supprimés en cascade avec les ressources
    await prismaClient.resource.deleteMany({
      where: { id: { in: resourcesToDelete } },
    })
    await prismaClient.user.deleteMany({
      where: { id: { in: usersToDelete } },
    })
  })

  it('retourne un ensemble vide sans utilisateur', async () => {
    expect(await getTrustedUserIds([])).toEqual(new Set())
  })

  it('fait confiance à un compte gouv.fr sans ressource', async () => {
    const userId = await createUser({
      email: `test+${v4()}@anct.gouv.fr`,
      created: new Date(),
    })

    expect(await isTrustedUserId(userId)).toBe(true)
  })

  it('cumule les vues des ressources publiques', async () => {
    const userId = await createUser()
    await createResource({ createdById: userId, viewsCount: 600 })
    await createResource({ createdById: userId, viewsCount: 400 })

    expect(await isTrustedUserId(userId)).toBe(true)
  })

  it('ignore les vues des brouillons, des ressources privées et supprimées', async () => {
    const userId = await createUser()
    await createResource({ createdById: userId, viewsCount: 999 })
    await createResource({
      createdById: userId,
      isPublic: null,
      published: null,
      viewsCount: 5000,
    })
    await createResource({
      createdById: userId,
      isPublic: false,
      viewsCount: 5000,
    })
    await createResource({
      createdById: userId,
      deleted: new Date(),
      viewsCount: 5000,
    })

    expect(await isTrustedUserId(userId)).toBe(false)
  })

  it('fait confiance au créateur d’une ressource publique recommandée', async () => {
    const userId = await createUser()
    const resourceId = await createResource({ createdById: userId })
    await recommend(resourceId, recommenderId, { rating: 3 })

    expect(await isTrustedUserId(userId)).toBe(true)
  })

  it('ignore les recommandations sur un brouillon ou une ressource privée', async () => {
    const userId = await createUser()
    const draftId = await createResource({
      createdById: userId,
      isPublic: null,
      published: null,
    })
    const privateId = await createResource({
      createdById: userId,
      isPublic: false,
    })
    await recommend(draftId, recommenderId)
    await recommend(privateId, recommenderId)

    expect(await isTrustedUserId(userId)).toBe(false)
  })

  it('ignore les avis négatifs et les avis supprimés', async () => {
    const userId = await createUser()
    const resourceId = await createResource({ createdById: userId })
    await recommend(resourceId, recommenderId, { rating: 2 })
    const otherRecommenderId = await createUser()
    await prismaClient.resourceFeedback.create({
      data: {
        resourceId,
        sentById: otherRecommenderId,
        rating: 4,
        deleted: new Date(),
      },
    })

    expect(await isTrustedUserId(userId)).toBe(false)
  })

  it('ignore la recommandation du créateur sur sa propre ressource', async () => {
    const userId = await createUser()
    const resourceId = await createResource({ createdById: userId })
    await recommend(resourceId, userId)

    expect(await isTrustedUserId(userId)).toBe(false)
  })

  it('ignore la recommandation d’un contributeur de la ressource', async () => {
    const userId = await createUser()
    const contributorId = await createUser()
    const resourceId = await createResource({ createdById: userId })
    await prismaClient.resourceContributors.create({
      data: { resourceId, contributorId },
    })
    await recommend(resourceId, contributorId)

    expect(await isTrustedUserId(userId)).toBe(false)
  })

  it('ignore la recommandation d’un compte de moins de 30 jours ou supprimé', async () => {
    const userId = await createUser()
    const resourceId = await createResource({ createdById: userId })
    await recommend(resourceId, await createUser({ created: new Date() }))
    await recommend(resourceId, await createUser({ deleted: new Date() }))

    expect(await isTrustedUserId(userId)).toBe(false)
  })

  it('ne fait pas confiance à un compte supprimé', async () => {
    const userId = await createUser({
      email: `test+${v4()}@gouv.fr`,
      deleted: new Date(),
    })

    expect(await isTrustedUserId(userId)).toBe(false)
  })

  it('ne fait pas confiance à un compte de moins de 30 jours, même recommandé', async () => {
    const userId = await createUser({ created: new Date() })
    const resourceId = await createResource({
      createdById: userId,
      viewsCount: 5000,
    })
    await recommend(resourceId, recommenderId)

    expect(await isTrustedUserId(userId)).toBe(false)
  })

  it('fait confiance à une base dont au moins un membre est de confiance', async () => {
    const untrustedId = await createUser()
    const trustedId = await createUser({ email: `test+${v4()}@gouv.fr` })
    const pendingTrustedId = await createUser({
      email: `test+${v4()}@gouv.fr`,
    })

    const createBase = async (
      members: { memberId: string; accepted: Date | null }[],
    ) => {
      const { id, title, slug, titleDuplicationCheckSlug } =
        createTestIdTitleAndSlug('Base')
      basesToDelete.push(id)
      await prismaClient.base.create({
        data: {
          id,
          title,
          slug,
          titleDuplicationCheckSlug,
          isPublic: true,
          createdById: untrustedId,
          members: { createMany: { data: members } },
        },
      })
      return id
    }

    const untrustedBaseId = await createBase([
      { memberId: untrustedId, accepted: longAgo },
      // Une invitation non acceptée ne compte pas
      { memberId: pendingTrustedId, accepted: null },
    ])
    const trustedBaseId = await createBase([
      { memberId: untrustedId, accepted: longAgo },
      { memberId: trustedId, accepted: longAgo },
    ])

    expect(await isTrustedBaseId(untrustedBaseId)).toBe(false)
    expect(await isTrustedBaseId(trustedBaseId)).toBe(true)
  })
})
