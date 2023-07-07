import { appUrl } from '../../support/helpers'

describe('ETQ Utilisateur, lorsque je clique sur “Se créer un compte”, je peux créer un compte avec Inclusion Connect', () => {
  /**
   * US https://www.notion.so/ETQ-Utilisateur-lorsque-je-clique-sur-cr-er-un-compte-je-peux-cr-er-un-compte-avec-Inclusion-Con-8f21d24f2f7a4488850161f9a20676b4?pvs=4
   * Parcours https://www.figma.com/file/4wfmwOaKRnMhgiGEF256qS/La-Base---Parcours-utilisateurs?node-id=38%3A998&t=mLwaw4Kkwt7FG9lz-1
   */

  const { email, firstName, lastName, password } = {
    email: Cypress.env('INCLUSION_CONNECT_TEST_USER_EMAIL') as string,
    password: Cypress.env('INCLUSION_CONNECT_TEST_USER_PASSWORD') as string,
    firstName: 'Test Bot',
    lastName: 'Inclusion Numerique',
  }

  before(() => {
    cy.execute('deleteUser', { email })
  })

  it('Acceptation 1 - Création de compte', () => {
    cy.visit('/creer-un-compte')

    // Cypress deletes some cookies on redirection between domains
    // See https://github.com/cypress-io/cypress/issues/20476
    // Also see https://docs.cypress.io/guides/guides/cross-origin-testing
    // We need to intercept the request to our auth endpoint to memorize the cookies
    // then intercept the request for our auth endpoint during callback to add the cookies back
    let authenticationCookies: string[]

    cy.intercept(/\/api\/auth\/signin\/inclusion-connect/, (request) => {
      request.continue((response) => {
        // Memorize our cookies
        const responseCookies = response.headers['set-cookie']
        authenticationCookies = Array.isArray(responseCookies)
          ? responseCookies
          : [responseCookies]
      })
    })

    cy.get('button[title="S\'identifier avec InclusionConnect"]').click()
    cy.url().should('contain', 'connect.inclusion.beta.gouv.fr')

    cy.intercept(/\/api\/auth\/callback/, (request) => {
      // Add our cookies back
      request.headers.cookie = authenticationCookies.join('; ')
    })

    cy.get('input[name="email"]').type(email)

    // Inclusion connect has frontend uncaught exceptions
    Cypress.on('uncaught:exception', () => false)
    cy.get('input[name="password"]').type(`${password}{enter}`)

    // Cookies are lost in redirect (Cypress issue)
    // https://github.com/cypress-io/cypress/issues/20476#issuecomment-1298486439

    cy.url().should('equal', appUrl('/'))
    cy.get('.fr-header__tools').contains(firstName).contains(lastName)

    cy.get('.fr-header__tools').should('not.contain', 'Se connecter')
  })
})
