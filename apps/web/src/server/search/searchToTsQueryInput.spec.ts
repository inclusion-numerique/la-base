import { searchToTsQueryInput } from '@app/web/server/search/searchToTsQueryInput'

describe('searchToTsQueryInput', () => {
  test('handles null and empty strings', () => {
    expect(searchToTsQueryInput(null)).toBe(null)
    expect(searchToTsQueryInput('')).toBe(null)
  })

  test('handles basic alphanumeric strings', () => {
    expect(searchToTsQueryInput('word anotherWord')).toBe(
      'word:* & anotherWord:*',
    )
  })

  test('removes special characters but not accented ones', () => {
    expect(searchToTsQueryInput('w@#ord!@#$$% éè|&à')).toBe('word:* & éèà:*')
  })

  test('handles strings with leading/trailing white spaces', () => {
    expect(searchToTsQueryInput(' word ')).toBe('word:*')
  })

  test('removes quotes', () => {
    expect(searchToTsQueryInput("par l'impact, pour l’hiver")).toBe(
      'par:* & l:* & impact:* & pour:* & l:* & hiver:*',
    )
  })
})
