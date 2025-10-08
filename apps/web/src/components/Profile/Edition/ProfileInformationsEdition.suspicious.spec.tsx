import { prismaClient } from '@app/web/prismaClient'
import { profileRouter } from '@app/web/server/rpc/profile/profileRouter'
import { createTestContext } from '@app/web/test/createTestContext'
import { testSessionUser } from '@app/web/test/testSessionUser'

// Mock de la fonction deleteSuspiciousProfile pour piloter le comportement logique
jest.mock('@app/web/server/profiles/suspiciousProfileDetection', () => ({
  deleteSuspiciousProfile: jest.fn(),
}))

describe('ProfileInformationsEdition - Suspicious Profile Detection (logic)', () => {
  const caller = profileRouter.createCaller(
    createTestContext({ user: testSessionUser }),
  )

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should throw SUSPICIOUS_PROFILE_DELETED when deleteSuspiciousProfile returns true after updateInformations', async () => {
    const mockDeleteSuspiciousProfile =
      require('@app/web/server/profiles/suspiciousProfileDetection').deleteSuspiciousProfile

    jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue({
      id: testSessionUser.id,
      slug: testSessionUser.slug,
      role: 'User',
    } as any)

    jest.spyOn(prismaClient.user, 'update').mockResolvedValue({
      id: testSessionUser.id,
      slug: testSessionUser.slug,
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

    expect(mockDeleteSuspiciousProfile).toHaveBeenCalledWith(testSessionUser.id)
  })

  it('should return updated user when deleteSuspiciousProfile returns false after updateInformations', async () => {
    const mockDeleteSuspiciousProfile =
      require('@app/web/server/profiles/suspiciousProfileDetection').deleteSuspiciousProfile

    jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue({
      id: testSessionUser.id,
      slug: testSessionUser.slug,
      role: 'User',
    } as any)

    const updatedUser = {
      id: testSessionUser.id,
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
    expect(mockDeleteSuspiciousProfile).toHaveBeenCalledWith(testSessionUser.id)
  })
})
