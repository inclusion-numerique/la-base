import { computeBranchNamespace } from '@app/cli/branchNamespace'
import {
  imageNameForBranch,
  isProtectedImage,
  orphanImages,
  retentionCount,
  tagsBeyondTheMostRecent,
} from './registryRetention'

const tag = (name: string, createdAt: string) => ({
  id: `id-${name}`,
  name,
  createdAt,
})

describe('registryRetention', () => {
  describe('tagsBeyondTheMostRecent', () => {
    it('keeps the most recent tags and returns the older ones', () => {
      const tags = [
        tag('b', '2026-10-02T00:00:00Z'),
        tag('d', '2026-10-04T00:00:00Z'),
        tag('a', '2026-10-01T00:00:00Z'),
        tag('c', '2026-10-03T00:00:00Z'),
      ]

      expect(tagsBeyondTheMostRecent(tags, 2).map(({ name }) => name)).toEqual([
        'b',
        'a',
      ])
    })

    it('counts a tag returned twice by the paginated API only once', () => {
      const tags = [
        tag('c', '2026-10-03T00:00:00Z'),
        tag('b', '2026-10-02T00:00:00Z'),
        tag('b', '2026-10-02T00:00:00Z'),
        tag('a', '2026-10-01T00:00:00Z'),
      ]

      expect(tagsBeyondTheMostRecent(tags, 1).map(({ name }) => name)).toEqual([
        'b',
        'a',
      ])
    })

    it('returns nothing when there are fewer tags than kept', () => {
      expect(
        tagsBeyondTheMostRecent([tag('a', '2026-10-01T00:00:00Z')], 5),
      ).toEqual([])
    })
  })

  describe('imageNameForBranch', () => {
    it('names the image after the namespace of the branch, like the build does', () => {
      expect(imageNameForBranch('la-base-web-', 'fix/filterLieux')).toBe(
        `la-base-web-${computeBranchNamespace('fix/filterLieux')}`,
      )
    })

    it('keeps the images of main and dev under their historical names', () => {
      expect(imageNameForBranch('la-base-web-', 'main')).toBe(
        'la-base-web-main',
      )
      expect(imageNameForBranch('la-base-web-', 'dev')).toBe('la-base-web-dev')
    })

    it('gives distinct images to branches that only differ by a slash or a hyphen', () => {
      expect(imageNameForBranch('la-base-web-', 'feat/a-b')).not.toBe(
        imageNameForBranch('la-base-web-', 'feat/a/b'),
      )
    })
  })

  describe('retentionCount', () => {
    it('reads a positive integer', () => {
      expect(retentionCount('10', '--keep-main')).toBe(10)
    })

    it.each(['nope', '0', '-1', '1.5', ''])('rejects "%s"', (value) => {
      expect(() => retentionCount(value, '--keep-main')).toThrow(
        '--keep-main must be a positive integer',
      )
    })
  })

  describe('isProtectedImage', () => {
    const prefix = 'la-base-web-'
    const protectedBranches = ['main', 'dev']

    it('protects the images of main and dev', () => {
      expect(
        isProtectedImage({ prefix, branch: 'main', protectedBranches }),
      ).toBe(true)
      expect(
        isProtectedImage({ prefix, branch: 'dev', protectedBranches }),
      ).toBe(true)
    })

    it('does not mistake a branch spelled like main for main, as their images differ', () => {
      expect(
        isProtectedImage({ prefix, branch: 'MAIN', protectedBranches }),
      ).toBe(false)
    })

    it('does not protect a preview branch', () => {
      expect(
        isProtectedImage({ prefix, branch: 'feat/main', protectedBranches }),
      ).toBe(false)
    })
  })

  describe('orphanImages', () => {
    const prefix = 'la-base-web-'
    const image = (name: string) => ({ id: `id-${name}`, name })

    it('returns the images whose branch no longer exists', () => {
      const images = [
        image(`${prefix}main`),
        image(`${prefix}dev`),
        image(imageNameForBranch(prefix, 'feat/ouverte')),
        image(imageNameForBranch(prefix, 'fix/supprimee')),
      ]

      expect(
        orphanImages({
          images,
          prefix,
          branches: ['main', 'feat/ouverte'],
          permanentBranches: ['main', 'dev'],
        }).map(({ name }) => name),
      ).toEqual([imageNameForBranch(prefix, 'fix/supprimee')])
    })

    it('ignores the images that do not belong to the web application', () => {
      expect(
        orphanImages({
          images: [image('autre-image')],
          prefix,
          branches: [],
          permanentBranches: ['main', 'dev'],
        }),
      ).toEqual([])
    })
  })
})
