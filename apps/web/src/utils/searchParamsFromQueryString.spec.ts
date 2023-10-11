import { searchParamsFromQueryString } from '@app/web/utils/searchParamsFromQueryString'

describe('searchParamsFromQueryString', () => {
  it('should handle empty query strings', () => {
    expect(searchParamsFromQueryString('')).toEqual({})
  })

  it('should parse single-value keys correctly', () => {
    const query = 'recherche%3Dconseiller&age%3D30'
    expect(searchParamsFromQueryString(query)).toEqual({
      recherche: 'conseiller',
      age: '30',
    })
  })

  it('should parse multi-value keys into arrays', () => {
    const query = 'hobbies=reading&hobbies=swimming'
    expect(searchParamsFromQueryString(query)).toEqual({
      hobbies: ['reading', 'swimming'],
    })
  })

  it('should handle a mix of single and multi-value keys', () => {
    const query = 'name=John&age=30&hobbies=reading&hobbies=swimming'
    expect(searchParamsFromQueryString(query)).toEqual({
      name: 'John',
      age: '30',
      hobbies: ['reading', 'swimming'],
    })
  })
})
