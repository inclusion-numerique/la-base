import { mockReset } from 'jest-mock-extended'
import {
  createLegacyToNewIdHelper,
  createLegacyToNewKeyHelper,
} from '@app/migration/legacyToNewIdHelper'
import {
  LegacyResource,
  transformResource,
} from '@app/migration/modelMigrations/migrateResources'
import { createMockPrisma } from '@app/migration/test/createPrismaMock'
import { SupportType, TargetAudience, Theme } from '@prisma/client'

jest.mock('uuid', () => ({ v4: () => 'testuuid' }))

describe('migrateResource', () => {
  const mockTransaction = createMockPrisma()

  beforeEach(() => {
    mockReset(mockTransaction)
  })

  it('should migrate a resource without any content', () => {
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
      created: new Date('2022-03-30'),
      modified: new Date('2022-06-30'),
      main_contentblock: [],
      main_basesection_resources: [],
      main_contentsection: [],
      main_resource_tags: [
        // Themes
        {
          tag_id: 91n,
        },
        {
          tag_id: 89n,
        },
        {
          tag_id: 78n,
        },
        // Support
        {
          tag_id: 27n,
        },
        {
          tag_id: 45n,
        },
        {
          tag_id: 33n,
        },
        // Target audience
        {
          tag_id: 145n,
        },
        {
          tag_id: 134n,
        },
      ],
    } satisfies LegacyResource

    const result = transformResource({
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
      migratedResourcesByLegacyId: new Map(),
    })

    expect(result).toEqual({
      name: 'MigrateResource',
      payload: {
        resourceId: 'testuuid',
        baseId: 'aaaa',
        byId: '0000',
        contents: [],
        themes: [Theme.MaitriseDesOutilsNumeriques, Theme.SobrieteNumerique],
        supportTypes: [SupportType.Annuaire, SupportType.Tutoriel],
        targetAudiences: [TargetAudience.AdministrationsEtablissementsPublics],
        created: legacyResource.created,
        updated: legacyResource.modified,
        published: legacyResource.modified,
        description:
          "L'Annuaire des Collectivités est un service public numérique développé par l'Incubateur des Territoires ANCT permettant aux communes de disposer d'une interface web centralisant des informations fiables et utiles pour le citoyens : horaires d'ouverture de la mairie, liens vers les démarches administratives (acte de naissance, renouvellement de CNU), présentation des élus...",
        imageId: 'bbbb',
        isPublic: true,
        legacyId: 1238,
        slug: 'test-slug',
        title:
          'Diffuser simplement les informations utiles aux habitants de sa commune',
        titleDuplicationCheckSlug:
          'diffuser-simplement-les-informations-utiles-aux-habitants-de-sa-commune',
      },
    })
  })

  // TODO test with content
})
