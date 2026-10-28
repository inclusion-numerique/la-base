import { prismaClient } from '@app/web/prismaClient'
import {
  getBaseResourcesCountByTab,
  getBaseResourcesPaginated,
} from '@app/web/server/bases/getBase'
import { defaultPaginationParams } from '@app/web/server/search/searchQueryParams'
import { createTestIdTitleAndSlug } from '@app/web/test/createTestIdTitleAndSlug'
import { v4 } from 'uuid'

describe('ressources d’une base par onglet', () => {
  const published = new Date('2024-01-01')
  const userId = v4()
  const { id: baseId, ...base } = createTestIdTitleAndSlug('Base')
  const resourceIds: string[] = []

  const createResources = (
    count: number,
    data: { isPublic: boolean | null; published: Date | null },
  ) =>
    Promise.all(
      Array.from({ length: count }, async () => {
        const { id, title, slug, titleDuplicationCheckSlug } =
          createTestIdTitleAndSlug('Ressource')
        resourceIds.push(id)
        await prismaClient.resource.create({
          data: {
            id,
            title,
            slug,
            titleDuplicationCheckSlug,
            description: '',
            excerpt: '',
            createdById: userId,
            baseId,
            ...data,
          },
        })
      }),
    )

  beforeAll(async () => {
    await prismaClient.user.create({
      data: {
        id: userId,
        email: `test+${userId}@exemple.com`,
        slug: `test+${userId}`,
      },
    })
    await prismaClient.base.create({
      data: {
        id: baseId,
        ...base,
        isPublic: true,
        createdById: userId,
        members: {
          create: { memberId: userId, accepted: published, isAdmin: true },
        },
      },
    })
    await createResources(1, { isPublic: true, published })
    await createResources(17, { isPublic: false, published })
    await createResources(2, { isPublic: null, published: null })
  })

  afterAll(async () => {
    await prismaClient.resource.deleteMany({
      where: { id: { in: resourceIds } },
    })
    await prismaClient.baseMembers.deleteMany({ where: { baseId } })
    await prismaClient.base.delete({ where: { id: baseId } })
    await prismaClient.user.delete({ where: { id: userId } })
  })

  it('compte chaque onglet sur toute la base, pas sur la page affichée', async () => {
    expect(await getBaseResourcesCountByTab(baseId, { id: userId })).toEqual({
      publiques: 1,
      privees: 17,
      brouillons: 2,
    })
  })

  it('pagine les ressources privées dans leur onglet', async () => {
    const secondPage = await getBaseResourcesPaginated(
      baseId,
      { id: userId },
      { ...defaultPaginationParams, tab: 'privees', page: 2 },
    )

    expect(secondPage).toHaveLength(1)
    expect(secondPage[0].isPublic).toBe(false)
  })

  it('ne montre que les publiques dans leur onglet', async () => {
    const publics = await getBaseResourcesPaginated(
      baseId,
      { id: userId },
      { ...defaultPaginationParams, tab: 'publiques' },
    )

    expect(publics.map(({ isPublic }) => isPublic)).toEqual([true])
  })
})
