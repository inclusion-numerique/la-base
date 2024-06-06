import { givenUser } from '@app/e2e/support/given/givenUser'
import {
  hasOpenedOnboardingV2Cookie,
  hasSeenOnboardingV2Cookie,
} from '@app/web/app/nouveautes/onboardingV2Cookie'

describe('Onboarding V2', () => {
  before(() => {
    cy.deleteAllData()
  })

  it('Je ne suis pas redirigé si je ne suis pas connecté', () => {
    Cypress.Cookies.debug(true)
    cy.setCookie(hasSeenOnboardingV2Cookie, 'true')
    cy.setCookie(hasOpenedOnboardingV2Cookie, 'true')
    cy.visit('/')
    cy.dsfrShouldBeStarted()
    cy.appUrlShouldBe('/')
  })

  it('Je ne suis pas redirigé si je ne suis pas un utilisateur migré', () => {
    Cypress.Cookies.debug(true)
    const user = givenUser()
    cy.createUserAndSignin(user)
    cy.visit('/')
    cy.dsfrShouldBeStarted()

    cy.getCookie(hasSeenOnboardingV2Cookie).should('not.exist')
    cy.getCookie(hasOpenedOnboardingV2Cookie).should('not.exist')
    cy.appUrlShouldBe('/')
  })

  // it('Je suis redirigé si je suis un utilisateur migré', () => {
  //   Cypress.Cookies.debug(true)
  //   const user = givenUser({ legacyId: 42 })
  //   cy.createUserAndSignin(user)
  //   cy.visit('/')
  //
  //   cy.dsfrShouldBeStarted()
  //
  //   cy.appUrlShouldBe('/nouveautes')
  //
  //   cy.getCookie(hasOpenedOnboardingV2Cookie).should('exist')
  // })

  it('Je ne suis pas redirigé si j’ai déjà terminé l’onboarding', () => {
    Cypress.Cookies.debug(true)
    const user = givenUser({ legacyId: 43, hasSeenV2Onboarding: new Date() })
    cy.createUserAndSignin(user)
    cy.visit('/')

    cy.getCookie(hasSeenOnboardingV2Cookie).should('not.exist')
    cy.getCookie(hasOpenedOnboardingV2Cookie).should('not.exist')
    cy.dsfrShouldBeStarted()

    cy.appUrlShouldBe('/')
  })

  it('Je ne suis pas redirigé si j’ai déjà ouvert l’onboarding récemment', () => {
    Cypress.Cookies.debug(true)
    const user = givenUser({ legacyId: 44 })
    cy.createUserAndSignin(user)
    cy.setCookie(hasOpenedOnboardingV2Cookie, 'true')
    cy.visit('/')

    cy.getCookie(hasSeenOnboardingV2Cookie).should('not.exist')
    cy.dsfrShouldBeStarted()

    cy.appUrlShouldBe('/')
  })

  it('Je ne suis pas redirigé si j’ai déjà terminé l’onboarding avant de me connecter', () => {
    Cypress.Cookies.debug(true)
    const user = givenUser({ legacyId: 45 })
    cy.createUser(user)
    cy.visit('/')

    cy.visit('/nouveautes')
    cy.findByRole('link', { name: /découvrir/i }).click()
    cy.appUrlShouldBe('/nouveautes/profil')
    cy.findByRole('link', { name: /suivant/i }).click()
    cy.appUrlShouldBe('/nouveautes/editeur')
    cy.findByRole('link', { name: /suivant/i }).click()
    cy.appUrlShouldBe('/nouveautes/recherche')
    cy.findByRole('link', { name: /suivant/i }).click()
    cy.appUrlShouldBe('/nouveautes/thematiques')
    cy.findByRole('link', { name: /suivant/i }).click()
    cy.appUrlShouldBe('/nouveautes/mobile')
    cy.findByRole('button', { name: /j’ai compris/i }).click()

    cy.appUrlShouldBe('/')
    cy.getCookie(hasSeenOnboardingV2Cookie).should('exist')
    cy.getCookie(hasOpenedOnboardingV2Cookie).should('exist')
    cy.dsfrShouldBeStarted()

    cy.signin(user)

    cy.appUrlShouldBe('/')
  })
})
