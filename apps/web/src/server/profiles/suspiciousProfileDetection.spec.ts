import { prismaClient } from '@app/web/prismaClient'
import {
  deleteSuspiciousProfile,
  isSuspiciousProfile,
} from './suspiciousProfileDetection'

// Mock de la fonction deleteProfile
jest.mock('@app/web/server/rpc/profile/deleteProfile', () => ({
  deleteProfile: jest.fn(),
}))

describe('suspiciousProfileDetection', () => {
  const mockUserId = 'test-user-id'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('isSuspiciousProfile', () => {
    it('should return true for a user created exactly 59 minutes ago (boundary inside)', async () => {
      const fiftyNineMinutesAgo = new Date(Date.now() - 59 * 60 * 1000)

      jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue({
        id: mockUserId,
        created: fiftyNineMinutesAgo,
        signedUpAt: fiftyNineMinutesAgo,
        description: 'This is English text',
        website: null,
        facebook: null,
        twitter: null,
        linkedin: null,
      } as any)

      const result = await isSuspiciousProfile(mockUserId)
      expect(result).toBe(true)
    })

    it('should return false for a user created exactly 60 minutes ago (boundary outside)', async () => {
      const exactlyOneHourAgo = new Date(Date.now() - 60 * 60 * 1000)

      jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue({
        id: mockUserId,
        created: exactlyOneHourAgo,
        signedUpAt: exactlyOneHourAgo,
        description: 'This is English text',
        website: null,
        facebook: null,
        twitter: null,
        linkedin: null,
      } as any)

      const result = await isSuspiciousProfile(mockUserId)
      expect(result).toBe(false)
    })

    it('should return false for a user created 60 minutes and 1 second ago (outside)', async () => {
      const oneHourOneSecondAgo = new Date(Date.now() - (60 * 60 * 1000 + 1000))

      jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue({
        id: mockUserId,
        created: oneHourOneSecondAgo,
        signedUpAt: oneHourOneSecondAgo,
        description: 'This is English text',
        website: null,
        facebook: null,
        twitter: null,
        linkedin: null,
      } as any)

      const result = await isSuspiciousProfile(mockUserId)
      expect(result).toBe(false)
    })
    it('should return false for a user created more than 1 hour ago', async () => {
      const oneHourAndOneMinuteAgo = new Date(Date.now() - 61 * 60 * 1000)

      jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue({
        id: mockUserId,
        created: oneHourAndOneMinuteAgo,
        signedUpAt: oneHourAndOneMinuteAgo,
        description: 'This is English text',
        website: 'https://example.com',
        facebook: null,
        twitter: null,
        linkedin: null,
      } as any)

      const result = await isSuspiciousProfile(mockUserId)
      expect(result).toBe(false)
    })

    it('should return true for a recently created user with English description (within 1 hour)', async () => {
      const fiftyNineMinutesAgo = new Date(Date.now() - 59 * 60 * 1000)

      jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue({
        id: mockUserId,
        created: fiftyNineMinutesAgo,
        signedUpAt: fiftyNineMinutesAgo,
        description: 'This is English text with many words',
        website: null,
        facebook: null,
        twitter: null,
        linkedin: null,
      } as any)

      const result = await isSuspiciousProfile(mockUserId)
      expect(result).toBe(true)
    })

    it('should return true for a recently created user with description that is just a link (within 1 hour)', async () => {
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000)

      jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue({
        id: mockUserId,
        created: tenMinutesAgo,
        signedUpAt: tenMinutesAgo,
        description: 'https://example.com',
        website: null,
        facebook: null,
        twitter: null,
        linkedin: null,
      } as any)

      const result = await isSuspiciousProfile(mockUserId)
      expect(result).toBe(true)
    })

    it('should return true for a recently created user with social media links (within 1 hour)', async () => {
      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000)

      jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue({
        id: mockUserId,
        created: thirtyMinutesAgo,
        signedUpAt: thirtyMinutesAgo,
        description: 'Description en français',
        website: 'https://example.com',
        facebook: 'https://facebook.com/user',
        twitter: null,
        linkedin: null,
      } as any)

      const result = await isSuspiciousProfile(mockUserId)
      expect(result).toBe(true)
    })

    it('should return false for a recently created user with French description and no social links (within 1 hour)', async () => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)

      jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue({
        id: mockUserId,
        created: fiveMinutesAgo,
        signedUpAt: fiveMinutesAgo,
        description: 'Description en français sans liens',
        website: null,
        facebook: null,
        twitter: null,
        linkedin: null,
      } as any)

      const result = await isSuspiciousProfile(mockUserId)
      expect(result).toBe(false)
    })

    it('should return false for a recently created user with mixed French/English but more French words (within 1 hour)', async () => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)

      jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue({
        id: mockUserId,
        created: fiveMinutesAgo,
        signedUpAt: fiveMinutesAgo,
        description:
          'Je suis un développeur français qui travaille avec des technologies modernes',
        website: null,
        facebook: null,
        twitter: null,
        linkedin: null,
      } as any)

      const result = await isSuspiciousProfile(mockUserId)
      expect(result).toBe(false)
    })

    it('should return true for a recently created user with mostly English words (within 1 hour)', async () => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)

      jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue({
        id: mockUserId,
        created: fiveMinutesAgo,
        signedUpAt: fiveMinutesAgo,
        description:
          'I am a developer who works with modern technologies and frameworks',
        website: null,
        facebook: null,
        twitter: null,
        linkedin: null,
      } as any)

      const result = await isSuspiciousProfile(mockUserId)
      expect(result).toBe(true)
    })

    it('should return true for a recently created user with 3+ English words even with French (within 1 hour)', async () => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)

      jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue({
        id: mockUserId,
        created: fiveMinutesAgo,
        signedUpAt: fiveMinutesAgo,
        description:
          'Bonjour, I am a developer who works with modern technologies',
        website: null,
        facebook: null,
        twitter: null,
        linkedin: null,
      } as any)

      const result = await isSuspiciousProfile(mockUserId)
      expect(result).toBe(true)
    })

    it('should return false for a user that does not exist', async () => {
      jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue(null)

      const result = await isSuspiciousProfile(mockUserId)
      expect(result).toBe(false)
    })

    it('should return true for a recently created user with LinkedIn profile (within 1 hour)', async () => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)

      jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue({
        id: mockUserId,
        created: fiveMinutesAgo,
        signedUpAt: fiveMinutesAgo,
        description: 'Description en français',
        website: null,
        facebook: null,
        twitter: null,
        linkedin: 'https://linkedin.com/in/user',
      } as any)

      const result = await isSuspiciousProfile(mockUserId)
      expect(result).toBe(true)
    })

    it('Bond Gallery sample: recent account, english HTML link description → suspicious', async () => {
      const created = new Date('2025-10-02T23:56:41.369Z')
      const signedUpAt = new Date('2025-10-02T23:56:41.368Z')
      const updated = new Date('2025-10-02T23:56:41.369Z')
      const nowSpy = jest
        .spyOn(Date, 'now')
        .mockReturnValue(updated.getTime() + 2 * 60 * 1000)

      jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue({
        id: mockUserId,
        created,
        signedUpAt,
        description:
          '<p><a target="_blank" href="https://www.bondgallery.art/">Bond Gallery </a>is a distinctive collaboration platform bringing together artists, craftsmen, and designers from around the globe to create bespoke and unique artwork, artifacts, and furniture.</p><p></p>',
        website: null,
        facebook: null,
        twitter: null,
        linkedin: null,
      } as any)

      const result = await isSuspiciousProfile(mockUserId)
      expect(result).toBe(true)
      nowSpy.mockRestore()
    })

    it('Outright Systems sample: recent account, website present → suspicious', async () => {
      const created = new Date('2025-10-03T05:53:29.917Z')
      const signedUpAt = new Date('2025-10-03T05:53:29.916Z')
      const updated = new Date('2025-10-03T05:53:29.917Z')
      const nowSpy = jest
        .spyOn(Date, 'now')
        .mockReturnValue(updated.getTime() + 3 * 60 * 1000)

      jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue({
        id: mockUserId,
        created,
        signedUpAt,
        description: null,
        website: 'https://www.outrightsystems.org/',
        facebook: null,
        twitter: null,
        linkedin: null,
      } as any)

      const result = await isSuspiciousProfile(mockUserId)
      expect(result).toBe(true)
      nowSpy.mockRestore()
    })

    it('Miracle Healthcare Center sample: recent account, english promo + website → suspicious', async () => {
      const created = new Date('2025-10-06T15:01:39.989Z')
      const signedUpAt = new Date('2025-10-06T15:01:39.988Z')
      const updated = new Date('2025-10-06T15:01:39.989Z')
      const nowSpy = jest
        .spyOn(Date, 'now')
        .mockReturnValue(updated.getTime() + 5 * 60 * 1000)

      jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue({
        id: mockUserId,
        created,
        signedUpAt,
        description:
          '<p>Experience a safe and joyful birth at Miracles Apollo Cradle Hospital, leading birthing and maternity hospital in Sector 14, Gurgaon. Offering expert care for normal and painless pregnancy deliveries. Consult top obstetrician and best gynecologist hospital in gurgaon</p>',
        website: 'https://www.miracleshealth.com/miracles-apollo-cradle-sec-14',
        facebook: null,
        twitter: null,
        linkedin: null,
      } as any)

      const result = await isSuspiciousProfile(mockUserId)
      expect(result).toBe(true)
      nowSpy.mockRestore()
    })

    it('United College sample: recent account, website present → suspicious', async () => {
      const created = new Date('2025-10-06T12:46:48.663Z')
      const signedUpAt = new Date('2025-10-06T12:46:48.662Z')
      const updated = new Date('2025-10-06T12:46:48.663Z')
      const nowSpy = jest
        .spyOn(Date, 'now')
        .mockReturnValue(updated.getTime() + 4 * 60 * 1000)

      jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue({
        id: mockUserId,
        created,
        signedUpAt,
        description: null,
        website:
          'https://unitedcollege.edu.pk/safety-officer-course-in-rawalpindi.php',
        facebook: null,
        twitter: null,
        linkedin: null,
      } as any)

      const result = await isSuspiciousProfile(mockUserId)
      expect(result).toBe(true)
      nowSpy.mockRestore()
    })
  })

  describe('deleteSuspiciousProfile', () => {
    it('should delete profile if it is suspicious', async () => {
      const mockDeleteProfile =
        require('@app/web/server/rpc/profile/deleteProfile').deleteProfile

      jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue({
        id: mockUserId,
        created: new Date(Date.now() - 5 * 60 * 1000),
        signedUpAt: new Date(Date.now() - 5 * 60 * 1000),
        description: 'This is English text',
        website: null,
        facebook: null,
        twitter: null,
        linkedin: null,
      } as any)

      const result = await deleteSuspiciousProfile(mockUserId)

      expect(result).toBe(true)
      expect(mockDeleteProfile).toHaveBeenCalledWith({ id: mockUserId })
    })

    it('should not delete profile if it is not suspicious', async () => {
      const mockDeleteProfile =
        require('@app/web/server/rpc/profile/deleteProfile').deleteProfile

      jest.spyOn(prismaClient.user, 'findUnique').mockResolvedValue({
        id: mockUserId,
        created: new Date(Date.now() - 5 * 60 * 1000),
        signedUpAt: new Date(Date.now() - 5 * 60 * 1000),
        description: 'Description en français sans liens',
        website: null,
        facebook: null,
        twitter: null,
        linkedin: null,
      } as any)

      const result = await deleteSuspiciousProfile(mockUserId)

      expect(result).toBe(false)
      expect(mockDeleteProfile).not.toHaveBeenCalled()
    })
  })
})
