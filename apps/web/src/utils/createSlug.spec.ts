import { createSlug } from '@app/web/utils/createSlug'

describe('createSlug', () => {
  it('should create a simple slug', () => {
    expect(createSlug('Hello World')).toEqual('hello-world')
  })

  it('should create a simple from special chars', () => {
    expect(
      createSlug(
        'Exemple de titre avec des caractères spéciaux genre ", \', ’, &, @, #, 🧠; / (4_20), +, *, %, $, [, ]',
      ),
    ).toEqual(
      'exemple-de-titre-avec-des-caracteres-speciaux-genre-et-4_20-plus-percent-dollar',
    )
  })
})
