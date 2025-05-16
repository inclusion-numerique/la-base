import { toTitleCase } from './toTitleCase'

describe('toTitleCase', () => {
  it('returns null when the input is null', () => {
    expect(toTitleCase(null)).toBeNull()
  })

  it('returns undefined when the input is undefined', () => {
    expect(toTitleCase(undefined)).toBeUndefined()
  })

  it('capitalizes the first letter of each word and makes the rest lowercase', () => {
    expect(toTitleCase('the quick brown fox')).toBe('The Quick Brown Fox')
  })

  it('handles mixed case inputs correctly', () => {
    expect(toTitleCase('tHe QuiCK bROwn fOX')).toBe('The Quick Brown Fox')
  })

  it('handles hyphenated words correctly', () => {
    expect(toTitleCase('JEAN-MICHEL')).toBe('Jean-Michel')
  })

  it('works with single word', () => {
    expect(toTitleCase('fox')).toBe('Fox')
  })

  it('returns an empty string when input is empty', () => {
    expect(toTitleCase('')).toBe('')
  })

  it('manages words with apostrophes correctly', () => {
    expect(toTitleCase("o'reilly")).toBe("O'Reilly")
  })

  it('handles strings with non-alphabetic characters correctly', () => {
    expect(toTitleCase('1234')).toBe('1234')
    expect(toTitleCase('foo-bar baz')).toBe('Foo-Bar Baz')
  })

  it('handles special connecting words correctly', () => {
    expect(toTitleCase('foo de bar')).toBe('Foo de Bar')
    expect(toTitleCase('foo des bar')).toBe('Foo des Bar')
    expect(toTitleCase('foo d’bar')).toBe('Foo d’Bar')
    expect(toTitleCase("foo l'bar")).toBe("Foo l'Bar")
    expect(toTitleCase('JEAN-JACQUES DE LA BOURRE DE L’OUEST')).toBe(
      'Jean-Jacques de la Bourre de l’Ouest',
    )
  })
})
