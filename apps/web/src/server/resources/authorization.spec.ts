import { createTestResource, createTestUser } from '@app/web/test/helpers'
import { filterAccess } from './authorization'

describe('Resource authorization', () => {
  describe('Public resource', () => {
    const creator = createTestUser()
    const otherUser = createTestUser()
    const publicResource = createTestResource(creator, true)

    it('Not connected can access', () => {
      const authorizations = filterAccess(publicResource, null)
      expect(authorizations.authorized).toBe(true)
      expect(authorizations.resource).toEqual(publicResource)
    })

    it('Anyone can access', () => {
      const authorizations = filterAccess(publicResource, otherUser)
      expect(authorizations.authorized).toBe(true)
      expect(authorizations.resource).toEqual(publicResource)
    })

    it('Creator is a contributor', () => {
      const authorizations = filterAccess(publicResource, creator)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isContributor).toBe(true)
    })

    it('Not connected is not a member', () => {
      const authorizations = filterAccess(publicResource, null)
      expect(authorizations.authorized).toBe(true)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isContributor).toBe(false)
    })

    it('Anyone is not a member', () => {
      const authorizations = filterAccess(publicResource, otherUser)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isContributor).toBe(false)
    })
  })

  describe('Private resource', () => {
    const creator = createTestUser()
    const otherUser = createTestUser()
    const privateResource = createTestResource(creator, false)

    const filteredResource = {
      slug: privateResource.slug,
      title: privateResource.title,
      isPublic: privateResource.isPublic,
      createdBy: privateResource.createdBy,
      base: privateResource.base,
    }

    it('Creator can access', () => {
      const authorizations = filterAccess(privateResource, creator)
      expect(authorizations.authorized).toBe(true)
      expect(authorizations.resource).toEqual(privateResource)
    })

    it('Not connected can view restricted data', () => {
      const authorizations = filterAccess(privateResource, null)
      expect(authorizations.authorized).toBe(false)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isContributor).toBe(undefined)
      expect(authorizations.resource).toEqual(filteredResource)
    })

    it('Anyone can view restricted data', () => {
      const authorizations = filterAccess(privateResource, otherUser)
      expect(authorizations.authorized).toBe(false)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isContributor).toBe(undefined)
      expect(authorizations.resource).toEqual(filteredResource)
    })

    it('Creator is a member', () => {
      const authorizations = filterAccess(privateResource, creator)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isContributor).toBe(true)
    })
  })
})
