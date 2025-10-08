import { prismaClient } from '@app/web/prismaClient'
import { createTestContext } from '@app/web/test/createTestContext'
import { testSessionUser } from '@app/web/test/testSessionUser'
import { profileRouter } from './profileRouter'

// Mock de la fonction deleteProfile
jest.mock('@app/web/server/rpc/profile/deleteProfile', () => ({
  deleteProfile: jest.fn(),
}))

// Mock de la fonction deleteSuspiciousProfile
jest.mock('@app/web/server/profiles/suspiciousProfileDetection', () => ({
  deleteSuspiciousProfile: jest.fn(),
}))

describe('profileRouter - Suspicious Profile Detection', () => {
  const mockUserId = testSessionUser.id
  const caller = profileRouter.createCaller(
    createTestContext({ user: testSessionUser }),
  )

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('updateInformations', () => {
    it('should throw SUSPICIOUS_PROFILE_DELETED error when profile is deleted', async () => {
      const mockDeleteSuspiciousProfile =
        require('@app/web/server/profiles/suspiciousProfileDetection').deleteSuspiciousProfile

      // Mock de la recherche du profil
      jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue({
        id: mockUserId,
        slug: testSessionUser.slug,
        role: 'User',
      } as any)

      // Mock de la mise à jour du profil
      jest.spyOn(prismaClient.user, 'update').mockResolvedValue({
        id: mockUserId,
        slug: testSessionUser.slug,
        firstName: 'John',
        lastName: 'Doe',
        name: 'John Doe',
      } as any)

      // Mock de la suppression du profil suspect
      mockDeleteSuspiciousProfile.mockResolvedValue(true)

      await expect(
        caller.updateInformations({
          firstName: 'John',
          lastName: 'Doe',
          department: '24',
          description: 'This is English text',
        }),
      ).rejects.toThrow('SUSPICIOUS_PROFILE_DELETED')

      expect(mockDeleteSuspiciousProfile).toHaveBeenCalledWith(mockUserId)
    })

    it('should return updated user when profile is not suspicious', async () => {
      const mockDeleteSuspiciousProfile =
        require('@app/web/server/profiles/suspiciousProfileDetection').deleteSuspiciousProfile

      // Mock de la recherche du profil
      jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue({
        id: mockUserId,
        slug: testSessionUser.slug,
        role: 'User',
      } as any)

      // Mock de la mise à jour du profil
      const updatedUser = {
        id: mockUserId,
        slug: testSessionUser.slug,
        firstName: 'Jean',
        lastName: 'Dupont',
        name: 'Jean Dupont',
      }
      jest
        .spyOn(prismaClient.user, 'update')
        .mockResolvedValue(updatedUser as any)

      // Mock de la suppression du profil suspect (pas supprimé)
      mockDeleteSuspiciousProfile.mockResolvedValue(false)

      const result = await caller.updateInformations({
        firstName: 'Jean',
        lastName: 'Dupont',
        department: '24',
        description: 'Description en français',
      })

      expect(result).toEqual(updatedUser)
      expect(mockDeleteSuspiciousProfile).toHaveBeenCalledWith(mockUserId)
    })
  })

  describe('updateContacts', () => {
    it('should throw SUSPICIOUS_PROFILE_DELETED error when profile is deleted', async () => {
      const mockDeleteSuspiciousProfile =
        require('@app/web/server/profiles/suspiciousProfileDetection').deleteSuspiciousProfile

      // Mock de la recherche du profil
      jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue({
        id: mockUserId,
        slug: testSessionUser.slug,
        role: 'User',
      } as any)

      // Mock de la mise à jour du profil
      jest.spyOn(prismaClient.user, 'update').mockResolvedValue({
        id: mockUserId,
        slug: 'test-user',
        emailIsPublic: true,
        website: 'https://example.com',
      } as any)

      // Mock de la suppression du profil suspect
      mockDeleteSuspiciousProfile.mockResolvedValue(true)

      await expect(
        caller.updateContacts({
          emailIsPublic: true,
          website: 'https://example.com',
          facebook: '',
          twitter: '',
          linkedin: '',
        }),
      ).rejects.toThrow('SUSPICIOUS_PROFILE_DELETED')

      expect(mockDeleteSuspiciousProfile).toHaveBeenCalledWith(mockUserId)
    })

    it('should return updated user when profile is not suspicious', async () => {
      const mockDeleteSuspiciousProfile =
        require('@app/web/server/profiles/suspiciousProfileDetection').deleteSuspiciousProfile

      // Mock de la recherche du profil
      jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue({
        id: mockUserId,
        slug: 'test-user',
        role: 'User',
      } as any)

      // Mock de la mise à jour du profil
      const updatedUser = {
        id: mockUserId,
        slug: testSessionUser.slug,
        emailIsPublic: false,
        website: null,
        facebook: null,
        twitter: null,
        linkedin: null,
      }
      jest
        .spyOn(prismaClient.user, 'update')
        .mockResolvedValue(updatedUser as any)

      // Mock de la suppression du profil suspect (pas supprimé)
      mockDeleteSuspiciousProfile.mockResolvedValue(false)

      const result = await caller.updateContacts({
        emailIsPublic: false,
        website: '',
        facebook: '',
        twitter: '',
        linkedin: '',
      })

      expect(result).toEqual(updatedUser)
      expect(mockDeleteSuspiciousProfile).toHaveBeenCalledWith(mockUserId)
    })
  })
})
