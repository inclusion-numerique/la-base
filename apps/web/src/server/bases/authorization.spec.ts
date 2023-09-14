import { createTestBase, createTestUser } from '@app/web/test/helpers'
import { filterAccess } from './authorization'

describe('Base authorization', () => {
  describe('Public base', () => {
    const creator = createTestUser()
    const otherUser = createTestUser()
    const publicBase = createTestBase(creator, true)

    it('Anyone can access', () => {
      const authorizations = filterAccess(publicBase, otherUser)
      expect(authorizations.authorized).toBe(true)
      expect(authorizations.base).toEqual(publicBase)
    })

    it('Creator is a member', () => {
      const authorizations = filterAccess(publicBase, creator)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isMember).toBe(true)
    })

    it('Anyone is not a member', () => {
      const authorizations = filterAccess(publicBase, otherUser)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isMember).toBe(false)
    })
  })

  describe('Private base', () => {
    const creator = createTestUser()
    const otherUser = createTestUser()
    const privateBase = createTestBase(creator, false)

    const filteredBase = {
      slug: privateBase.slug,
      title: privateBase.title,
      isPublic: privateBase.isPublic,
      _count: { resources: privateBase.resources.length },
    }

    it('Creator can access', () => {
      const authorizations = filterAccess(privateBase, creator)
      expect(authorizations.authorized).toBe(true)
      expect(authorizations.base).toEqual(privateBase)
    })

    it('Anyone can view restricted data', () => {
      const authorizations = filterAccess(privateBase, otherUser)
      expect(authorizations.authorized).toBe(false)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isMember).toBe(undefined)
      expect(authorizations.base).toEqual(filteredBase)
    })

    it('Creator is a member', () => {
      const authorizations = filterAccess(privateBase, creator)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isMember).toBe(true)
    })
  })
})
