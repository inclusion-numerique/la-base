import { goToMostRecentEmailReceived } from '@app/e2e/e2e/goToMostRecentEmailReceived'
import { givenUser } from '@app/e2e/support/given/givenUser'

describe('ETQ Utilisateur, je peux me connecter à mon compte / me déconnecter', () => {
  /**
   * US https://www.notion.so/ETQ-Utilisateur-je-peux-me-connecter-mon-compte-me-d-connecter-8a4ed652501042fd8445df6a2d2273df?pvs=4
   * Parcours https://www.figma.com/file/4wfmwOaKRnMhgiGEF256qS/La-Base---Parcours-utilisateurs?node-id=38%3A1135&t=mLwaw4Kkwt7FG9lz-1
   */
  // Unique user for this test
  const emailUser = givenUser()

  // This user exists in mon compte pro, but not in our db
  const proConnectUser = {
    email: Cypress.env('PROCONNECT_TEST_USER_EMAIL') as string,
    password: Cypress.env('PROCONNECT_TEST_USER_PASSWORD') as string,
    firstName: 'Jean',
    lastName: 'User',
  }

  before(() => {
    cy.execute('deleteAllData', {})
  })

  it('Préliminaire - Les pages de connexions sont accessibles', () => {
    cy.visit('/')
    cy.get('.fr-header__tools').contains('Se connecter').click()
    cy.appUrlShouldBe('/connexion')

    cy.log('Check that the signup CTA is linked correctly')
    cy.contains('Créer un compte').click()
    cy.appUrlShouldBe('/creer-un-compte?suivant=/connexion/suivant')

    cy.log('Check that the signin CTA is linked correctly')
    cy.findByRole('main')
      .contains(/^Se connecter$/)
      .click()
    cy.appUrlShouldBe('/connexion')
  })

  it('Acceptation 0 - La connexion redirige vers la création de compte pour un nouvel utilisateur', () => {
    cy.visit('/connexion')

    cy.log('We should not be able to login with unexisting user email')
    cy.get('input[id="input-form-field__email"]')
      .should('have.length', 1)
      .type(`${emailUser.email}{enter}`)

    cy.appUrlShouldBe(
      `/creer-un-compte?raison=connexion-sans-compte&email=${emailUser.email}`,
    )

    cy.contains('Se créer un compte avec son email')

    cy.log(
      'Create account using email. It should be pre-completed after failed login attempt',
    )
    cy.get('input[id="input-form-field__email"]').should(
      'have.value',
      emailUser.email,
    )
  })

  it('Acceptation 1 - Connexion avec ProConnect', () => {
    cy.visit('/connexion')
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

    cy.get('button[title="S’identifier avec ProConnect"]').click()
    cy.url().should('contain', 'fca.integ01.dev-agentconnect.fr')

    cy.intercept(/\/api\/auth\/callback/, (request) => {
      // Add our cookies back
      request.headers.cookie = authenticationCookies.join('; ')
    })

    cy.get('#email-input').type(`${proConnectUser.email}{enter}`)

    cy.get('#password-input').type(`${proConnectUser.password}{enter}`)

    // Click on the first a link .fr-tile__link

    cy.get('.fr-tile__link').first().click()

    // Cookies are lost in redirect (Cypress issue)
    // https://github.com/cypress-io/cypress/issues/20476#issuecomment-1298486439

    cy.appUrlShouldBe('/cgu/mise-a-jour')
    cy.testId('accept-cgu-button').click()

    // Accept onboarding
    cy.visit('/')
    cy.appUrlShouldBe('/fil-d-actualite/onboarding')
    cy.contains('Revenir plus tard').click()

    cy.get('.fr-header__tools').should('not.contain', 'Se connecter')

    cy.log('Check that the user can logout')

    cy.dsfrShouldBeStarted()
    cy.dsfrCollapsesShouldBeBound()
    cy.get(
      '.fr-header__tools button[aria-controls="header_user_menu"].fr-dropdown__btn',
    )
      .filter(':visible')
      .contains(proConnectUser.firstName)
      .contains(proConnectUser.lastName)
      .click()

    cy.get('#header_user_menu.fr-dropdown__pane')
      .should('be.visible')
      .contains('Se déconnecter')
      .click()

    cy.appUrlShouldBe('/deconnexion')
    cy.contains('Êtes-vous sûr·e de vouloir vous déconnecter ?')
    cy.get('main').contains('Se déconnecter').click()

    // Identity provider logout flow
    cy.url().should(
      'contain',
      'https://identite-sandbox.proconnect.gouv.fr/oauth/logout',
    )
    cy.appUrlShouldBe('/')

    cy.get('.fr-header__tools').contains('Se connecter')
  })

  it('Acceptation 2 - Connexion avec email', () => {
    cy.visit('/connexion')
    cy.execute('createUser', emailUser)
    const { email, firstName, lastName } = emailUser

    cy.log('Signin form fill and submit')
    cy.findByLabelText('Email').type(`${email}{enter}`)

    cy.appUrlShouldBe('/connexion/verification', {
      timeout: 10_000,
    })

    cy.log('Magic link sent confirmation with email displayed')
    cy.contains('Un lien de connexion sécurisé a été envoyé')
    cy.contains(email)

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
    cy.get('.fr-header__tools').contains(firstName).contains(lastName)

    cy.get('.fr-header__tools').should('not.contain', 'Se connecter')

    cy.log('Check that the user can logout')

    cy.dsfrShouldBeStarted()
    cy.get(
      '.fr-header__tools button[aria-controls="header_user_menu"].fr-dropdown__btn',
    )
      .filter(':visible')
      .contains(emailUser.name)
      .click()

    cy.get('#header_user_menu.fr-dropdown__pane')
      .should('be.visible')
      .contains('Se déconnecter')
      .click()

    cy.appUrlShouldBe('/deconnexion')
    cy.contains('Êtes-vous sûr·e de vouloir vous déconnecter ?')
    cy.get('main').contains('Se déconnecter').click()

    // Identity provider logout flow should be skipped
    cy.url().should(
      'not.contain',
      'https://app-sandbox.moncomptepro.beta.gouv.fr/oauth/logout',
    )
    cy.appUrlShouldBe('/')

    cy.get('.fr-header__tools').contains('Se connecter')
  })
})
