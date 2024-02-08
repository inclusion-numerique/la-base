import { createTestProfile, createTestUser } from '@app/web/test/helpers'
import { filterAccess } from './authorization'

describe('Profile authorization', () => {
  describe('Public profile', () => {
    const creator = createTestProfile(true)
    const creatorAsUser = { ...createTestUser(), ...creator }
    const otherUser = createTestUser()

    it('Anyone can access', () => {
      const authorizations = filterAccess(creator, otherUser)
      expect(authorizations.authorized).toBe(true)
      expect(authorizations.profile).toEqual(creator)
    })

    it('Creator is a member', () => {
      const authorizations = filterAccess(creator, creatorAsUser)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isUser).toBe(true)
    })

    it('Anyone is not a member', () => {
      const authorizations = filterAccess(creator, otherUser)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isUser).toBe(false)
    })
  })

  describe('Private profile', () => {
    const creator = createTestProfile(false)
    const creatorAsUser = { ...createTestUser(), ...creator }
    const otherUser = createTestUser()

    const filteredProfile = {
      id: creator.id,
      name: creator.name,
      firstName: creator.firstName,
      lastName: creator.lastName,
      slug: creator.slug,
      isPublic: creator.isPublic,
      emailIsPublic: creator.emailIsPublic,
      email: creator.email,
      image: null,
      followedBy: [],
      _count: {
        followedBy: 0,
      },
    }

    it('Creator can access', () => {
      const authorizations = filterAccess(creator, creatorAsUser)
      expect(authorizations.authorized).toBe(true)
      expect(authorizations.profile).toEqual(creator)
    })

    it('Anyone can view restricted data', () => {
      const authorizations = filterAccess(creator, otherUser)
      expect(authorizations.authorized).toBe(false)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isUser).toBe(false)
      expect(authorizations.profile).toEqual(filteredProfile)
    })

    it('Creator is a member', () => {
      const authorizations = filterAccess(creator, creatorAsUser)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isUser).toBe(true)
    })
  })
})
