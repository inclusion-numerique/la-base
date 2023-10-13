import { createTestBase, createTestUser } from '@app/web/test/helpers'
import { filterAccess } from './authorization'

describe('Base authorization', () => {
  const admin = createTestUser()
  const member = createTestUser()
  const otherUser = createTestUser()
  describe('Public base', () => {
    const publicBase = createTestBase(admin, true, [admin], [member])

    it('Anyone can access', () => {
      const authorizations = filterAccess(publicBase, otherUser)
      expect(authorizations.authorized).toBe(true)
      expect(authorizations.base).toEqual(publicBase)
    })

    it('Admin is a member and an admin', () => {
      const authorizations = filterAccess(publicBase, admin)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isMember).toBe(true)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isAdmin).toBe(true)
    })

    it('Member is only a member', () => {
      const authorizations = filterAccess(publicBase, member)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isMember).toBe(true)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isAdmin).toBe(false)
    })

    it('Anyone is not a member', () => {
      const authorizations = filterAccess(publicBase, otherUser)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isMember).toBe(false)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isAdmin).toBe(false)
    })

    it('Anyone do not see private email', () => {
      const authorizations = filterAccess(
        { ...publicBase, emailIsPublic: false },
        otherUser,
      )
      expect(authorizations.base).toEqual({
        ...publicBase,
        emailIsPublic: false,
        email: '',
      })
    })

    it('Base member see private email', () => {
      const authorizations = filterAccess(
        { ...publicBase, emailIsPublic: false },
        member,
      )
      expect(authorizations.base).toEqual({
        ...publicBase,
        emailIsPublic: false,
      })
    })
  })

  describe('Private base', () => {
    const privateBase = createTestBase(admin, false, [admin], [member])

    const filteredBase = {
      slug: privateBase.slug,
      title: privateBase.title,
      isPublic: privateBase.isPublic,
      email: privateBase.email,
      image: null,
      coverImage: null,
      _count: { resources: privateBase.resources.length },
    }

    it('Admin can access', () => {
      const authorizations = filterAccess(privateBase, admin)
      expect(authorizations.authorized).toBe(true)
      expect(authorizations.base).toEqual(privateBase)
    })

    it('Member can access', () => {
      const authorizations = filterAccess(privateBase, member)
      expect(authorizations.authorized).toBe(true)
      expect(authorizations.base).toEqual(privateBase)
    })

    it('Anyone can view restricted data', () => {
      const authorizations = filterAccess(privateBase, otherUser)
      expect(authorizations.authorized).toBe(false)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isMember).toBe(undefined)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isAdmin).toBe(undefined)
      expect(authorizations.base).toEqual(filteredBase)
    })

    it('Admin is a member and an admin', () => {
      const authorizations = filterAccess(privateBase, admin)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isMember).toBe(true)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isAdmin).toBe(true)
    })

    it('Member is only a member', () => {
      const authorizations = filterAccess(privateBase, member)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isMember).toBe(true)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isAdmin).toBe(false)
    })

    it('Anyone do not see private email', () => {
      const authorizations = filterAccess(
        { ...privateBase, emailIsPublic: false },
        otherUser,
      )
      expect(authorizations.base).toEqual({
        ...filteredBase,
        email: '',
      })
    })

    it('Base member see private email', () => {
      const authorizations = filterAccess(
        { ...privateBase, emailIsPublic: false },
        member,
      )
      expect(authorizations.base).toEqual({
        ...privateBase,
        emailIsPublic: false,
      })
    })
  })
})
