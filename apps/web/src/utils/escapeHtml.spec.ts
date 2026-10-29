import { escapeHtml } from '@app/web/utils/escapeHtml'

describe('escapeHtml', () => {
  it('escapes html special characters', () => {
    expect(
      escapeHtml(`<a href="https://example.com" title='x'>Tom & Jerry</a>`),
    ).toBe(
      '&lt;a href=&quot;https://example.com&quot; title=&#39;x&#39;&gt;Tom &amp; Jerry&lt;/a&gt;',
    )
  })

  it('keeps plain text unchanged', () => {
    expect(escapeHtml('Ressource à vérifier')).toBe('Ressource à vérifier')
  })
})
