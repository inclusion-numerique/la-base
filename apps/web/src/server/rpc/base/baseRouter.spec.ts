import { prismaClient } from '@app/web/prismaClient'
import { createTestContext } from '@app/web/test/createTestContext'
import { testSessionUser } from '@app/web/test/testSessionUser'

// Mock des modules qui utilisent React pour éviter les erreurs Server Components
jest.mock('@app/web/features/base/invitation/emails/invitationEmail', () => ({
  sendInviteMemberEmail: jest.fn(),
}))

// Mock de la fonction deleteSuspiciousBase
jest.mock('@app/web/server/bases/suspiciousBaseDetection', () => ({
  deleteSuspiciousBase: jest.fn(),
}))

// Mock de createAvailableSlug
jest.mock('@app/web/server/slug/createAvailableSlug', () => ({
  createAvailableSlug: jest.fn(),
}))

// Import du router après les mocks
import { baseRouter } from './baseRouter'

describe('baseRouter - create', () => {
  const mockUserId = 'test-user-id'
  const mockUserEmail = 'test@example.com'

  const mockUser = {
    ...testSessionUser,
    id: mockUserId,
    email: mockUserEmail,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call deleteSuspiciousBase when creating a base', async () => {
    const { deleteSuspiciousBase } = await import(
      '@app/web/server/bases/suspiciousBaseDetection'
    )
    const { createAvailableSlug } = await import(
      '@app/web/server/slug/createAvailableSlug'
    )

    // Mock de createAvailableSlug
    ;(createAvailableSlug as jest.Mock).mockResolvedValue('test-base')

    // Mock de prismaClient.user.findMany pour retourner des membres vides
    jest.spyOn(prismaClient.user, 'findMany').mockResolvedValue([])

    // Mock de prismaClient.base.create pour retourner une base
    const mockBase = {
      id: 'test-base-id',
      title: 'Test Base',
      slug: 'test-base',
      created: new Date(),
    }
    jest
      .spyOn(prismaClient.base, 'create')
      .mockResolvedValue(mockBase as any)

    // Mock de deleteSuspiciousBase pour qu'il retourne false (pas de suppression)
    ;(deleteSuspiciousBase as jest.Mock).mockResolvedValue(false)

    const caller = baseRouter.createCaller(
      createTestContext({ user: mockUser }),
    )

    const result = await caller.create({
      title: 'Test Base',
      description: 'Test description',
      members: [],
      email: 'test@example.com',
      emailIsPublic: false,
      website: '',
      facebook: '',
      twitter: '',
      linkedin: '',
      department: '',
      isPublic: false,
    })

    // Vérifier que deleteSuspiciousBase a été appelée avec l'ID de la base créée
    expect(deleteSuspiciousBase).toHaveBeenCalledWith('test-base-id')
    expect(deleteSuspiciousBase).toHaveBeenCalledTimes(1)

    // Vérifier que la base a été créée
    expect(result).toEqual(mockBase)
  })

  it('should throw error when deleteSuspiciousBase returns true', async () => {
    const { deleteSuspiciousBase } = await import(
      '@app/web/server/bases/suspiciousBaseDetection'
    )
    const { createAvailableSlug } = await import(
      '@app/web/server/slug/createAvailableSlug'
    )

    // Mock de createAvailableSlug
    ;(createAvailableSlug as jest.Mock).mockResolvedValue('test-base')

    // Mock de prismaClient.user.findMany pour retourner des membres vides
    jest.spyOn(prismaClient.user, 'findMany').mockResolvedValue([])

    // Mock de prismaClient.base.create pour retourner une base
    const mockBase = {
      id: 'test-base-id',
      title: 'Test Base',
      slug: 'test-base',
      created: new Date(),
    }
    jest
      .spyOn(prismaClient.base, 'create')
      .mockResolvedValue(mockBase as any)

    // Mock de deleteSuspiciousBase pour qu'il retourne true (suppression)
    ;(deleteSuspiciousBase as jest.Mock).mockResolvedValue(true)

    const caller = baseRouter.createCaller(
      createTestContext({ user: mockUser }),
    )

    // La fonction devrait lancer une erreur pour déclencher la redirection vers la page d'erreur
    await expect(
      caller.create({
        title: 'Test Base',
        description: 'Test description',
        members: [],
        email: 'test@example.com',
        emailIsPublic: false,
        website: '',
        facebook: '',
        twitter: '',
        linkedin: '',
        department: '',
        isPublic: false,
      }),
    ).rejects.toThrow(
      'Contenu suspect détecté - Ce contenu ne respecte pas la charte de notre plateforme',
    )

    // Vérifier que deleteSuspiciousBase a été appelée
    expect(deleteSuspiciousBase).toHaveBeenCalledWith('test-base-id')
    expect(deleteSuspiciousBase).toHaveBeenCalledTimes(1)
  })
})
