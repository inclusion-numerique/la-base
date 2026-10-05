import {
  addUserContentRelToLinks,
  userContentLinkRel,
} from '@app/ui/utils/userContentLinks'

describe('addUserContentRelToLinks', () => {
  it('adds nofollow ugc rel to links stored without rel', () => {
    expect(
      addUserContentRelToLinks(
        '<p>Voir <a target="_blank" href="https://exemple.fr/">ce site</a></p>',
      ),
    ).toEqual(
      `<p>Voir <a rel="${userContentLinkRel}" target="_blank" href="https://exemple.fr/">ce site</a></p>`,
    )
  })

  it('puts its rel first, as the first of duplicated attributes wins', () => {
    expect(
      addUserContentRelToLinks(
        '<a href="https://exemple.fr/" rel="noopener noreferrer">lien</a>',
      ),
    ).toEqual(
      `<a rel="${userContentLinkRel}" href="https://exemple.fr/" rel="noopener noreferrer">lien</a>`,
    )
  })

  it('cannot be escaped by a href containing a rel', () => {
    expect(
      addUserContentRelToLinks('<a href="https://exemple.fr/? rel=x">lien</a>'),
    ).toEqual(
      `<a rel="${userContentLinkRel}" href="https://exemple.fr/? rel=x">lien</a>`,
    )
  })

  it('rewrites every link of the html', () => {
    const html = addUserContentRelToLinks(
      '<a href="https://un.fr/">1</a> et <A HREF="https://deux.fr/">2</A>',
    )

    expect(html.match(/rel="nofollow ugc noopener noreferrer"/g)).toHaveLength(
      2,
    )
  })

  it('does not touch other tags starting with a', () => {
    const html = '<p><abbr title="Agence">ANCT</abbr> <aside>texte</aside></p>'

    expect(addUserContentRelToLinks(html)).toEqual(html)
  })

  it('keeps html without links unchanged', () => {
    expect(addUserContentRelToLinks('<p>Texte</p>')).toEqual('<p>Texte</p>')
  })
})
