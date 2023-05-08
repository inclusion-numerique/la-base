import {
  LegacyResource,
  migrateResource,
} from '@app/migration/modelMigrations/migrateResource'
import { createMockPrisma } from '@app/migration/test/createPrismaMock'
import { mockReset } from 'jest-mock-extended'
import {
  createLegacyToNewIdHelper,
  createLegacyToNewKeyHelper,
} from '@app/migration/legacyToNewIdHelper'
import { createSlug } from '@app/web/utils/createSlug'

jest.mock('uuid', () => ({ v4: () => '0000' }))

describe('migrateResource', () => {
  const mockTransaction = createMockPrisma()

  beforeEach(() => {
    mockReset(mockTransaction)
  })

  it('should migrate a resource without any content', async () => {
    const legacyResource = {
      id: 1238n,
      title:
        'Diffuser simplement les informations utiles aux habitants de sa commune',
      description:
        "L'Annuaire des Collectivités est un service public numérique développé par l'Incubateur des Territoires ANCT permettant aux communes de disposer d'une interface web centralisant des informations fiables et utiles pour le citoyens : horaires d'ouverture de la mairie, liens vers les démarches administratives (acte de naissance, renouvellement de CNU), présentation des élus...",
      creator_id: 7494n,
      root_base_id: 443n,
      producer_state: 'me',
      is_linked_to_a_territory: false,
      access_requires_user_account: null,
      state: 'public',
      resource_created_on: '02/2023',
      label_details: null,
      label_state: '',
      is_grid_view_enabled: false,
      has_global_license: true,
      license_text_id: null,
      profile_image_id: 740n,
      can_evaluate: true,
      created: new Date('2022-06-30'),
      modified: new Date('2022-06-30'),
      main_contentblock: [],
      main_basesection_resources: [],
      main_contentsection: [],
    } satisfies LegacyResource

    mockTransaction.resource.upsert.mockResolvedValueOnce({
      legacyId: 129,
      id: '0000',
    } as never)

    const result = await migrateResource({
      transaction: mockTransaction,
      legacyResource,
      slug: 'test-slug',
      userIdFromLegacyId: createLegacyToNewIdHelper([
        { legacyId: Number(legacyResource.creator_id), id: '0000' },
      ]),
      baseIdFromLegacyId: createLegacyToNewIdHelper([
        { legacyId: Number(legacyResource.root_base_id), id: 'aaaa' },
      ]),
      uploadKeyFromLegacyKey: createLegacyToNewKeyHelper([]),
      imageIdFromLegacyId: createLegacyToNewIdHelper([
        { legacyId: 740, id: 'bbbb' },
      ]),
    })

    expect(mockTransaction.resource.upsert).toHaveBeenCalledOnceWith({
      create: {
        baseId: 'aaaa',
        createdById: '0000',
        description:
          "L'Annuaire des Collectivités est un service public numérique développé par l'Incubateur des Territoires ANCT permettant aux communes de disposer d'une interface web centralisant des informations fiables et utiles pour le citoyens : horaires d'ouverture de la mairie, liens vers les démarches administratives (acte de naissance, renouvellement de CNU), présentation des élus...",
        id: '0000',
        legacyId: 1238,
        slug: 'test-slug',
        imageId: 'bbbb',
        title: legacyResource.title,
        titleDuplicationCheckSlug: createSlug(legacyResource.title),
        created: legacyResource.created,
        updated: legacyResource.modified,
      },
      select: {
        createdBy: true,
        id: true,
        legacyId: true,
      },
      update: {
        baseId: 'aaaa',
        createdById: '0000',
        description:
          "L'Annuaire des Collectivités est un service public numérique développé par l'Incubateur des Territoires ANCT permettant aux communes de disposer d'une interface web centralisant des informations fiables et utiles pour le citoyens : horaires d'ouverture de la mairie, liens vers les démarches administratives (acte de naissance, renouvellement de CNU), présentation des élus...",
        slug: 'test-slug',
        imageId: 'bbbb',
        title: legacyResource.title,
        titleDuplicationCheckSlug: createSlug(legacyResource.title),
        created: legacyResource.created,
        updated: legacyResource.modified,
      },
      where: {
        legacyId: 1238,
      },
    })

    expect(result).toEqual({
      resource: {
        legacyId: 129,
        id: '0000',
      },
      contents: [],
    })
  })

  // TODO test with content
})
