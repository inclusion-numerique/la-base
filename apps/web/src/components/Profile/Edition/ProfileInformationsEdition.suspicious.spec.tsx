import { prismaClient } from '@app/web/prismaClient'
import { profileRouter } from '@app/web/server/rpc/profile/profileRouter'
import { createTestContext } from '@app/web/test/createTestContext'

// Mock de la fonction deleteSuspiciousProfile pour piloter le comportement logique
jest.mock('@app/web/server/profiles/suspiciousProfileDetection', () => ({
  deleteSuspiciousProfile: jest.fn(),
}))

describe('ProfileInformationsEdition - Suspicious Profile Detection (logic)', () => {
  const mockUser = {
    id: 'test-user-id',
    slug: 'test-user',
    role: 'User' as const,
    email: 'test@example.com',
    emailVerified: new Date(),
  }

  const caller = profileRouter.createCaller(
    createTestContext({ user: mockUser }),
  )

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should throw SUSPICIOUS_PROFILE_DELETED when deleteSuspiciousProfile returns true after updateInformations', async () => {
    const mockDeleteSuspiciousProfile =
      require('@app/web/server/profiles/suspiciousProfileDetection').deleteSuspiciousProfile

    jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue({
      id: mockUser.id,
      slug: mockUser.slug,
      role: 'User',
    } as any)

    jest.spyOn(prismaClient.user, 'update').mockResolvedValue({
      id: mockUser.id,
      slug: mockUser.slug,
      firstName: 'John',
      lastName: 'Doe',
      name: 'John Doe',
    } as any)

    mockDeleteSuspiciousProfile.mockResolvedValue(true)

    await expect(
      caller.updateInformations({
        firstName: 'John',
        lastName: 'Doe',
        department: '24',
        description: 'This is English text',
      }),
    ).rejects.toThrow('SUSPICIOUS_PROFILE_DELETED')

    expect(mockDeleteSuspiciousProfile).toHaveBeenCalledWith(mockUser.id)
  })

  it('should return updated user when deleteSuspiciousProfile returns false after updateInformations', async () => {
    const mockDeleteSuspiciousProfile =
      require('@app/web/server/profiles/suspiciousProfileDetection').deleteSuspiciousProfile

    jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue({
      id: mockUser.id,
      slug: mockUser.slug,
      role: 'User',
    } as any)

    const updatedUser = {
      id: mockUser.id,
      slug: 'updated-user',
      firstName: 'Jane',
      lastName: 'Smith',
      name: 'Jane Smith',
    }
    jest
      .spyOn(prismaClient.user, 'update')
      .mockResolvedValue(updatedUser as any)

    mockDeleteSuspiciousProfile.mockResolvedValue(false)

    const result = await caller.updateInformations({
      firstName: 'Jane',
      lastName: 'Smith',
      department: '24',
      description: 'Description en français',
    })

    expect(result).toEqual(updatedUser)
    expect(mockDeleteSuspiciousProfile).toHaveBeenCalledWith(mockUser.id)
  })
})
