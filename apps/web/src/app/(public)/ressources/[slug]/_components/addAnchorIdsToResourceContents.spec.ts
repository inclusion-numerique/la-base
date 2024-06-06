import { addAnchorIdsToResourceContents } from './addAnchorIdsToResourceContents'

describe('addAnchorIdsToResourceContents', () => {
  it('should add unique anchor IDs and hrefs to resource contents', () => {
    const contents = [
      { title: 'First Title' },
      { title: 'Second Title' },
      { title: 'First Title' },
    ]

    const result = addAnchorIdsToResourceContents(contents)

    expect(result).toEqual([
      {
        title: 'First Title',
        anchorId: 'first-title',
        anchorHref: '#first-title',
      },
      {
        title: 'Second Title',
        anchorId: 'second-title',
        anchorHref: '#second-title',
      },
      {
        title: 'First Title',
        anchorId: 'first-title-1',
        anchorHref: '#first-title-1',
      },
    ])
  })

  it('should handle contents without a title', () => {
    const contents = [{ title: 'First Title' }, { title: null }, { title: '' }]

    const result = addAnchorIdsToResourceContents(contents)

    expect(result).toEqual([
      {
        title: 'First Title',
        anchorId: 'first-title',
        anchorHref: '#first-title',
      },
      { anchorId: 'contenu-1', anchorHref: '#contenu-1', title: null },
      { anchorId: 'contenu-2', anchorHref: '#contenu-2', title: '' },
    ])
  })

  it('should handle empty contents', () => {
    const result = addAnchorIdsToResourceContents([])

    expect(result).toEqual([])
  })
})
