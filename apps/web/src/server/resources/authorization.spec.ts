import {
  createTestBase,
  createTestResource,
  createTestUser,
} from '@app/web/test/helpers'
import { filterAccess } from './authorization'

describe('Resource authorization', () => {
  describe('Public resource', () => {
    const creator = createTestUser()
    const otherUser = createTestUser()
    const contributor = createTestUser()
    const publicResource = createTestResource(
      creator,
      true,
      undefined,
      contributor,
    )

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

    it('Creator is an admin', () => {
      const authorizations = filterAccess(publicResource, creator)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isAdmin).toBe(true)
    })

    it('Not connected is not an admin', () => {
      const authorizations = filterAccess(publicResource, null)
      expect(authorizations.authorized).toBe(true)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isAdmin).toBe(false)
    })

    it('Anyone is not an admin', () => {
      const authorizations = filterAccess(publicResource, otherUser)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isAdmin).toBe(false)
    })

    it('Contributor is an admin', () => {
      const authorizations = filterAccess(publicResource, contributor)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isAdmin).toBe(true)
    })
  })

  describe('Resource in a base', () => {
    const creator = createTestUser()
    const otherUser = createTestUser()
    const member = createTestUser()
    const contributor = createTestUser()
    const base = createTestBase(creator, true, [], [member])
    const privateResource = createTestResource(
      creator,
      false,
      base,
      contributor,
    )

    const filteredResource = {
      slug: privateResource.slug,
      title: privateResource.title,
      isPublic: privateResource.isPublic,
      createdBy: privateResource.createdBy,
      published: privateResource.published,
      lastPublished: privateResource.lastPublished,
      base: privateResource.base,
    }

    it('Not connected cannot access', () => {
      const authorizations = filterAccess(privateResource, null)
      expect(authorizations.authorized).toBe(false)
      expect(authorizations.resource).toEqual(filteredResource)
    })

    it('Anyone cannot access', () => {
      const authorizations = filterAccess(privateResource, otherUser)
      expect(authorizations.authorized).toBe(false)
      expect(authorizations.resource).toEqual(filteredResource)
    })

    it('Creator is an admin', () => {
      const authorizations = filterAccess(privateResource, creator)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isAdmin).toBe(true)
    })

    it('Base member is an admin', () => {
      const authorizations = filterAccess(privateResource, member)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isAdmin).toBe(true)
    })

    it('Base pending member cannot access', () => {
      const authorizations = filterAccess(
        {
          ...privateResource,
          base: privateResource.base
            ? {
                ...privateResource.base,
                members: privateResource.base.members.map((x) => ({
                  ...x,
                  accepted: null,
                })),
              }
            : null,
        },
        member,
      )
      expect(authorizations.authorized).toBe(false)
    })

    it('Contributor is an admin', () => {
      const authorizations = filterAccess(privateResource, contributor)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isAdmin).toBe(true)
    })
  })

  describe('Private resource', () => {
    const creator = createTestUser()
    const otherUser = createTestUser()
    const contributor = createTestUser()
    const privateResource = createTestResource(
      creator,
      false,
      undefined,
      contributor,
    )

    const filteredResource = {
      slug: privateResource.slug,
      title: privateResource.title,
      isPublic: privateResource.isPublic,
      createdBy: privateResource.createdBy,
      published: privateResource.published,
      lastPublished: privateResource.lastPublished,
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
      expect(authorizations.isAdmin).toBe(undefined)
      expect(authorizations.resource).toEqual(filteredResource)
    })

    it('Anyone can view restricted data', () => {
      const authorizations = filterAccess(privateResource, otherUser)
      expect(authorizations.authorized).toBe(false)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isAdmin).toBe(undefined)
      expect(authorizations.resource).toEqual(filteredResource)
    })

    it('Creator is an admin', () => {
      const authorizations = filterAccess(privateResource, creator)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isAdmin).toBe(true)
    })

    it('Contributor is an admin', () => {
      const authorizations = filterAccess(privateResource, contributor)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore authorization should be true
      expect(authorizations.isAdmin).toBe(true)
    })
  })
})
