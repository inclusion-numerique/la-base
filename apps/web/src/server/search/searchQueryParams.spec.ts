import {
  defaultPaginationParams,
  paginationParamsToUrlQueryParams,
  sanitizeUrlPaginationParams,
} from '@app/web/server/search/searchQueryParams'

describe('searchQueryParams', () => {
  describe('sanitizeUrlPaginationParams', () => {
    it('lit un onglet de ressources valide', () => {
      expect(sanitizeUrlPaginationParams({ onglet: 'privees' }).tab).toBe(
        'privees',
      )
    })

    it('ignore un onglet inconnu', () => {
      expect(
        sanitizeUrlPaginationParams({ onglet: 'archives' }).tab,
      ).toBeUndefined()
    })

    it('ignore un onglet répété', () => {
      expect(
        sanitizeUrlPaginationParams({ onglet: ['privees', 'brouillons'] }).tab,
      ).toBeUndefined()
    })

    it("n'a pas d'onglet par défaut", () => {
      expect(sanitizeUrlPaginationParams({}).tab).toBeUndefined()
    })
  })

  describe('paginationParamsToUrlQueryParams', () => {
    it("garde l'onglet dans l'URL", () => {
      expect(
        paginationParamsToUrlQueryParams({
          ...defaultPaginationParams,
          tab: 'brouillons',
        }).onglet,
      ).toBe('brouillons')
    })

    it("retire l'onglet par défaut de l'URL", () => {
      expect(
        paginationParamsToUrlQueryParams({
          ...defaultPaginationParams,
          tab: 'publiques',
        }).onglet,
      ).toBeUndefined()
    })
  })
})
