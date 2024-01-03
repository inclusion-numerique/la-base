import { mockReset } from 'jest-mock-extended'
import { createSlug } from '@app/web/utils/createSlug'
import { createLegacyToNewIdHelper } from '@app/migration/legacyToNewIdHelper'
import {
  LegacyBase,
  migrateBase,
} from '@app/migration/modelMigrations/migrateBases'
import { createMockPrisma } from '@app/migration/test/createPrismaMock'

jest.mock('uuid', () => ({ v4: () => '0000' }))

describe('migrateBase', () => {
  const mockTransaction = createMockPrisma()

  beforeEach(() => {
    mockReset(mockTransaction)
  })

  it('should migrate a base', async () => {
    const legacyBase = {
      id: 129n,
      created: new Date('2022-06-30'),
      modified: new Date('2022-06-30'),
      title: 'Memory',
      owner_id: 136n,
      contact: 'a@a.a',
      contact_state: 'private',
      description:
        "proposition de jeu type memory pour l'animation d'atelier de manière dé-connecté",
      state: 'private',
      profile_image_id: 34n,
      is_certified: false,
      cover_image_id: null,
      national_cartography_website: null,
      social_media_facebook: 'https://facebook.fr',
      social_media_linkedin: 'https://linkedin.fr',
      social_media_mastodon: null,
      social_media_twitter: 'https://twitter.fr',
      website: 'https://website.fr',
      own_resource_count: 1,
      pinned_resources_count: 3,
      visit_count: 14,
      show_latest_additions: true,
      bookmarked_count: 6,
      main_base_tags: [
        { main_tag: { category_id: 1n, name: 'tag1' } },
        {
          main_tag: { category_id: 6n, name: 'Département : Puy-de-Dôme (63)' },
        },
      ],
    } satisfies LegacyBase

    mockTransaction.base.upsert.mockResolvedValueOnce({
      legacyId: 129,
      id: '0000',
      ownerId: '0000',
    } as never)

    const result = await migrateBase({
      transaction: mockTransaction,
      legacyBase,
      slug: 'test-slug',
      userIdFromLegacyId: createLegacyToNewIdHelper([
        { legacyId: Number(legacyBase.owner_id), id: '0000' },
      ]),
      imageIdFromLegacyId: createLegacyToNewIdHelper([
        { legacyId: Number(legacyBase.profile_image_id), id: '1111' },
      ]),
      userEmailFromLegacyId: createLegacyToNewIdHelper([
        { legacyId: Number(legacyBase.owner_id), id: 'a@a.a' },
      ]),
    })

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockTransaction.base.upsert).toHaveBeenCalledExactlyOnceWith({
      where: {
        legacyId: 129,
      },
      update: {
        description:
          "proposition de jeu type memory pour l'animation d'atelier de manière dé-connecté",
        ownerId: '0000',
        imageId: '1111',
        coverImageId: null,
        slug: 'test-slug',
        titleDuplicationCheckSlug: createSlug(legacyBase.title),
        title: legacyBase.title,
        created: legacyBase.created,
        updated: legacyBase.modified,
        department: '63',
        email: 'a@a.a',
        emailIsPublic: true,
        isPublic: false,
        facebook: 'https://facebook.fr',
        linkedin: 'https://linkedin.fr',
        twitter: 'https://twitter.fr',
        website: 'https://website.fr',
      },
      create: {
        description:
          "proposition de jeu type memory pour l'animation d'atelier de manière dé-connecté",
        id: '0000',
        legacyId: 129,
        ownerId: '0000',
        imageId: '1111',
        coverImageId: null,
        slug: 'test-slug',
        titleDuplicationCheckSlug: createSlug(legacyBase.title),
        title: legacyBase.title,
        created: legacyBase.created,
        updated: legacyBase.modified,
        department: '63',
        email: 'a@a.a',
        emailIsPublic: true,
        isPublic: false,
        facebook: 'https://facebook.fr',
        linkedin: 'https://linkedin.fr',
        twitter: 'https://twitter.fr',
        website: 'https://website.fr',
      },
      select: {
        id: true,
        legacyId: true,
        ownerId: true,
      },
    })

    expect(result).toEqual({
      legacyId: 129,
      id: '0000',
      ownerId: '0000',
    })
  })
})
