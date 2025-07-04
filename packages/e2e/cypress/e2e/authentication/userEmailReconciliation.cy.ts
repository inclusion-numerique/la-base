import { goToMostRecentEmailReceived } from '@app/e2e/e2e/goToMostRecentEmailReceived'
import { givenUser } from '@app/e2e/support/given/givenUser'

describe('ETQ Utilisateur, je peux me connecter avec un nouvel email qui a été pré-enregistré', () => {
  // Unique user for this test

  // This user exists in mon compte pro, but not in our db
  const proConnectUser = {
    email: Cypress.env('PROCONNECT_TEST_USER_EMAIL') as string,
    password: Cypress.env('PROCONNECT_TEST_USER_PASSWORD') as string,
    firstName: 'Jean',
    lastName: 'User',
  }

  beforeEach(() => {
    cy.execute('deleteAllData', { email: proConnectUser.email })
  })

  it('Acceptation 1 - Je peux me connecter sur mon ancien compte avec mon nouvel email, par magic link', () => {
    const emailUser = givenUser()

    const { email: newEmail } = givenUser()

    cy.visit('/connexion')
    cy.execute('createUser', emailUser)
    cy.execute('createEmailReconciliation', {
      expectedNewEmail: newEmail,
      oldEmail: emailUser.email,
    })

    cy.log('Signin form fill and submit')
    cy.findByLabelText('Email').type(`${newEmail}{enter}`)

    cy.appUrlShouldBe('/connexion/verification', {
      timeout: 10_000,
    })

    cy.log('Magic link sent confirmation with email displayed')
    cy.contains('Un lien de connexion sécurisé a été envoyé')
    cy.contains(newEmail)

    goToMostRecentEmailReceived({
      subjectInclude: 'Connexion à Les Bases',
    })

    cy.log('Check mail contents')
    // We should not have the email html version in full
    cy.contains('Connexion à Les Bases')
    cy.contains('Se connecter').invoke('attr', 'target', '_self').click()

    // With a valid magic link we should be automatically redirected to homepage, logged in
    cy.log('User should now be signed in')
    cy.appUrlShouldBe('/')
    cy.get('.fr-header__tools')
      .contains(emailUser.firstName)
      .contains(emailUser.lastName)

    cy.get('.fr-header__tools').should('not.contain', 'Se connecter')
  })

  it('Acceptation 2 - Je peux me connecter avec mon nouvel email, par ProConnect', () => {
    cy.visit('/connexion')

    const existingUser = givenUser()
    cy.execute('createUser', existingUser)
    const newEmail = proConnectUser.email

    cy.execute('createEmailReconciliation', {
      expectedNewEmail: newEmail,
      oldEmail: existingUser.email,
    })

    // Cypress deletes some cookies on redirection between domains
    // See https://github.com/cypress-io/cypress/issues/20476
    // Also see https://docs.cypress.io/guides/guides/cross-origin-testing
    // We need to intercept the request to our auth endpoint to memorize the cookies
    // then intercept the request for our auth endpoint during callback to add the cookies back
    let authenticationCookies: string[]

    cy.intercept(/\/api\/auth\/signin\/proconnect/, (request) => {
      request.continue((response) => {
        // Memorize our cookies
        const responseCookies = response.headers['set-cookie']
        authenticationCookies = Array.isArray(responseCookies)
          ? responseCookies
          : [responseCookies]
      })
    })

    cy.get('button[title="S’identifier avec Pro Connect"]').click()
    cy.url().should('contain', 'fca.integ01.dev-agentconnect.fr')

    cy.intercept(/\/api\/auth\/callback/, (request) => {
      // Add our cookies back
      request.headers.cookie = authenticationCookies.join('; ')
    })

    cy.get('#email-input').type(`${newEmail}{enter}`)

    cy.get('#password-input').type(`${proConnectUser.password}{enter}`)

    // Click on the first a link .fr-tile__link

    cy.get('.fr-tile__link').first().click()

    // Cookies are lost in redirect (Cypress issue)
    // https://github.com/cypress-io/cypress/issues/20476#issuecomment-1298486439

    cy.appUrlShouldBe('/')

    cy.get('.fr-header__tools').should('not.contain', 'Se connecter')
    cy.get('.fr-header__tools').should('contain', existingUser.name)
  })
})
