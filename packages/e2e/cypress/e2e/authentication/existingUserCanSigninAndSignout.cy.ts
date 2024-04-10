import { givenUser } from '@app/e2e/support/given/givenUser'
import { goToMostRecentEmailReceived } from '@app/e2e/e2e/goToMostRecentEmailReceived'

describe('ETQ Utilisateur, je peux me connecter à mon compte / me déconnecter', () => {
  /**
   * US https://www.notion.so/ETQ-Utilisateur-je-peux-me-connecter-mon-compte-me-d-connecter-8a4ed652501042fd8445df6a2d2273df?pvs=4
   * Parcours https://www.figma.com/file/4wfmwOaKRnMhgiGEF256qS/La-Base---Parcours-utilisateurs?node-id=38%3A1135&t=mLwaw4Kkwt7FG9lz-1
   */

  // Unique user for this test
  const emailUser = givenUser()
  // This user exists in inclusion connect, but not in our db
  const inclusionConnectUser = {
    email: Cypress.env('INCLUSION_CONNECT_TEST_USER_EMAIL') as string,
    password: Cypress.env('INCLUSION_CONNECT_TEST_USER_PASSWORD') as string,
    firstName: 'Test Bot',
    lastName: 'Inclusion Numerique',
  }

  before(() => {
    cy.execute('deleteUser', { email: inclusionConnectUser.email })
  })

  it('Préliminaire - Les pages de connexions sont accessibles', () => {
    cy.visit('/')
    cy.get('.fr-header__tools').contains('Se connecter').click()
    cy.appUrlShouldBe('/connexion')

    cy.log('Check that the signup CTA is linked correctly')
    cy.contains('Créer un compte').click()
    cy.appUrlShouldBe('/creer-un-compte')

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

  it('Acceptation 1 - Connexion avec Inclusion Connect', () => {
    cy.visit('/connexion')
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

    cy.get('input[name="email"]').type(inclusionConnectUser.email)

    // Inclusion connect has frontend uncaught exceptions
    Cypress.on('uncaught:exception', () => false)
    cy.get('input[name="password"]').type(
      `${inclusionConnectUser.password}{enter}`,
    )

    // Cookies are lost in redirect (Cypress issue)
    // https://github.com/cypress-io/cypress/issues/20476#issuecomment-1298486439

    cy.appUrlShouldBe('/')

    cy.get('.fr-header__tools').should('not.contain', 'Se connecter')

    cy.log('Check that the user can logout')

    cy.dsfrShouldBeStarted()
    cy.dsfrCollapsesShouldBeBound()
    cy.get('.fr-header__tools button[aria-controls="header-user-menu"]')
      .contains(inclusionConnectUser.firstName)
      .contains(inclusionConnectUser.lastName)
      .click()

    cy.get('#header-user-menu').should('be.visible')

    cy.get('#header-user-menu').contains('Se déconnecter').click()
    cy.appUrlShouldBe('/deconnexion')
    cy.contains('Êtes-vous sur de vouloir vous déconnecter ?')
    cy.get('main').contains('Se déconnecter').click()
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
    cy.dsfrCollapsesShouldBeBound()
    cy.get('.fr-header__tools button[aria-controls="header-user-menu"]')
      .contains(emailUser.name)
      .click()
    cy.get('#header-user-menu')
      .should('be.visible')
      .contains('Se déconnecter')
      .click()
    cy.appUrlShouldBe('/deconnexion')
    cy.contains('Êtes-vous sur de vouloir vous déconnecter ?')
    cy.get('main').contains('Se déconnecter').click()
    cy.appUrlShouldBe('/')
    cy.get('.fr-header__tools').contains('Se connecter')
  })
})
