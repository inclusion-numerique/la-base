import { prismaClient } from '@app/web/prismaClient'
import { createTestContext } from '@app/web/test/createTestContext'
import { testSessionUser } from '@app/web/test/testSessionUser'
import { profileRouter } from './profileRouter'

// Mock de la fonction deleteSuspiciousProfile
jest.mock('@app/web/server/profiles/suspiciousProfileDetection', () => ({
  deleteSuspiciousProfile: jest.fn(),
}))

describe('profileRouter - updateContacts', () => {
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

  it('should call deleteSuspiciousProfile when updating contacts', async () => {
    const { deleteSuspiciousProfile } = await import(
      '@app/web/server/profiles/suspiciousProfileDetection'
    )

    // Mock de prismaClient.user.findUnique pour retourner un profil valide
    jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue({
      id: mockUserId,
      slug: 'test-user',
      created: new Date(),
      signedUpAt: new Date(),
      description: null,
      website: 'https://example.com',
      facebook: null,
      twitter: null,
      linkedin: null,
    } as any)

    // Mock de prismaClient.user.update pour simuler la mise à jour
    jest
      .spyOn(prismaClient.user, 'update')
      .mockResolvedValue({
        id: mockUserId,
        email: mockUserEmail,
        emailIsPublic: false,
        website: 'https://example.com',
        facebook: null,
        twitter: null,
        linkedin: null,
      } as any)

    // Mock de deleteSuspiciousProfile pour qu'il retourne false (pas de suppression)
    ;(deleteSuspiciousProfile as jest.Mock).mockResolvedValue(false)

    const caller = profileRouter.createCaller(
      createTestContext({ user: mockUser }),
    )

    const result = await caller.updateContacts({
      emailIsPublic: false,
      website: 'https://example.com',
      facebook: '',
      twitter: '',
      linkedin: '',
    })

    // Vérifier que deleteSuspiciousProfile a été appelée avec le bon userId
    expect(deleteSuspiciousProfile).toHaveBeenCalledWith(mockUserId)
    expect(deleteSuspiciousProfile).toHaveBeenCalledTimes(1)

    // Vérifier que la mise à jour s'est bien passée
    expect(result).toBeDefined()
  })

  it('should throw error when deleteSuspiciousProfile returns true', async () => {
    const { deleteSuspiciousProfile } = await import(
      '@app/web/server/profiles/suspiciousProfileDetection'
    )

    // Mock de prismaClient.user.findUnique pour retourner un profil valide
    jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue({
      id: mockUserId,
      slug: 'test-user',
      created: new Date(),
      signedUpAt: new Date(),
      description: null,
      website: 'https://example.com',
      facebook: null,
      twitter: null,
      linkedin: null,
    } as any)

    // Mock de prismaClient.user.update pour simuler la mise à jour
    jest
      .spyOn(prismaClient.user, 'update')
      .mockResolvedValue({
        id: mockUserId,
        email: mockUserEmail,
        emailIsPublic: false,
        website: 'https://example.com',
        facebook: null,
        twitter: null,
        linkedin: null,
      } as any)

    // Mock de deleteSuspiciousProfile pour qu'il retourne true (suppression)
    ;(deleteSuspiciousProfile as jest.Mock).mockResolvedValue(true)

    const caller = profileRouter.createCaller(
      createTestContext({ user: mockUser }),
    )

    // La fonction devrait lancer une erreur pour déclencher la redirection vers la page d'erreur
    await expect(
      caller.updateContacts({
        emailIsPublic: false,
        website: 'https://example.com',
        facebook: '',
        twitter: '',
        linkedin: '',
      }),
    ).rejects.toThrow(
      'Contenu suspect détecté - Ce contenu ne respecte pas la charte de notre plateforme',
    )

    // Vérifier que deleteSuspiciousProfile a été appelée
    expect(deleteSuspiciousProfile).toHaveBeenCalledWith(mockUserId)
    expect(deleteSuspiciousProfile).toHaveBeenCalledTimes(1)
  })
})
