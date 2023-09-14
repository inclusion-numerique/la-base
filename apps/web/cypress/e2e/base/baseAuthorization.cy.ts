import { cleanUpAndCreateTestBase } from '../resource/edition/editionTestUtils'
import { appUrl, createTestUser } from 'cypress/support/helpers'

describe('Utilisateur sans droit, je ne peux ni voir et ni editer la base', () => {
  it('Acceptation 1 - Base publique', () => {
    cleanUpAndCreateTestBase(true)
    const user = createTestUser()
    cy.createUserAndSignin(user)

    cy.visit('/bases/conseiller-numérique-france-services-contributions')
    cy.dsfrShouldBeStarted()
    cy.testId('base-ressources-empty-state').should('exist')
    cy.testId('base-edition-button').should('not.exist')
    cy.testId('private-base-information').should('not.exist')

    cy.visit('/bases/conseiller-numérique-france-services-contributions/editer')
    cy.url().should(
      'equal',
      appUrl('/bases/conseiller-numérique-france-services-contributions'),
    )
  })

  it('Acceptation 1 - Base privée', () => {
    cleanUpAndCreateTestBase(false)
    const user = createTestUser()
    cy.createUserAndSignin(user)

    cy.visit('/bases/conseiller-numérique-france-services-contributions')
    cy.dsfrShouldBeStarted()
    cy.testId('base-ressources-empty-state').should('not.exist')
    cy.testId('base-edition-button').should('not.exist')
    cy.testId('private-base-information').should('exist')

    cy.visit('/bases/conseiller-numérique-france-services-contributions/editer')
    cy.url().should(
      'equal',
      appUrl('/bases/conseiller-numérique-france-services-contributions'),
    )
  })
})
