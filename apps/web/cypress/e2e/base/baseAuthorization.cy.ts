import { cleanUpAndCreateTestBase } from '../resource/edition/editionTestUtils'
import { appUrl, createTestUser } from 'cypress/support/helpers'

describe('Utilisateur sans droit, je ne peux ni voir et ni editer la base', () => {
  it('Acceptation 1 - Base publique', () => {
    cleanUpAndCreateTestBase(true)
    const user = createTestUser()
    cy.createUserAndSignin(user)

    cy.visit('/bases/conseiller-numérique-france-services-contributions')
    cy.dsfrShouldBeStarted()
    cy.testId('empty-box').should('exist')
    cy.testId('base-edition-button').should('not.exist')
    cy.testId('private-base-box').should('not.exist')

    cy.visit('/bases/conseiller-numérique-france-services-contributions/editer')
    cy.url().should(
      'equal',
      appUrl('/bases/conseiller-numérique-france-services-contributions'),
    )
  })

  it('Acceptation 2 - Base privée', () => {
    cleanUpAndCreateTestBase(false)
    const user = createTestUser()
    cy.createUserAndSignin(user)

    cy.visit('/bases/conseiller-numérique-france-services-contributions')
    cy.dsfrShouldBeStarted()
    cy.testId('empty-box').should('not.exist')
    cy.testId('base-edition-button').should('not.exist')
    cy.testId('private-base-box').should('exist')

    cy.visit('/bases/conseiller-numérique-france-services-contributions/editer')
    cy.url().should(
      'equal',
      appUrl('/bases/conseiller-numérique-france-services-contributions'),
    )
  })

  it('Acceptation 3 - Membre de la base', () => {
    cleanUpAndCreateTestBase(false)

    cy.testId('empty-box').should('exist')
    cy.testId('base-edition-button').should('exist')
    cy.testId('private-base-box').should('not.exist')

    cy.visit('/bases/conseiller-numérique-france-services-contributions/editer')
    cy.url().should(
      'equal',
      appUrl(
        '/bases/conseiller-numérique-france-services-contributions/editer',
      ),
    )
  })
})
