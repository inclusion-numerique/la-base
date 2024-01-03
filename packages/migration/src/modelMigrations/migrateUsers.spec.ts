import { mockReset } from 'jest-mock-extended'
import {
  LegacyUser,
  transformUser,
} from '@app/migration/modelMigrations/migrateUsers'
import { createMockPrisma } from '@app/migration/test/createPrismaMock'

jest.mock('uuid', () => ({ v4: () => '0000' }))

describe('migrateUser', () => {
  const mockTransaction = createMockPrisma()

  beforeEach(() => {
    mockReset(mockTransaction)
  })

  it('should migrate a user', () => {
    const legacyUser = {
      first_name: 'A',
      email: 'a.a@a.a',
      last_name: 'A',
      is_active: true,
      id: BigInt(8),
      is_admin: false,
      is_superuser: false,
      password: 'oui',
      created: new Date('2020-02-02'),
      modified: new Date('2020-02-02'),
      last_login: null,
      cnfs_id: null,
      cnfs_id_organization: null,
      main_user_tags: [
        { main_tag: { category_id: 1n, name: 'tag1' } },
        {
          main_tag: { category_id: 6n, name: 'Département : Puy-de-Dôme (63)' },
        },
      ],
    } satisfies LegacyUser

    expect(
      transformUser({
        legacyUser,
        emailMap: new Map(),
        existingUser: undefined,
      }),
    ).toEqual({
      email: 'a.a@a.a',
      firstName: 'A',
      id: '0000',
      lastName: 'A',
      legacyId: 8,
      name: 'A A',
      department: '63',
      updated: legacyUser.modified,
      created: legacyUser.created,
      emailVerified: legacyUser.created,
      collections: {
        create: {
          title: 'Mes favoris',
          isFavorites: true,
        },
      },
    })
  })
})
