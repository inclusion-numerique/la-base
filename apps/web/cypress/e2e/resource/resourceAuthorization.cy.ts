import { cleanUpAndCreateTestPublishedResource } from './edition/editionTestUtils'
import { appUrl, createTestUser } from 'cypress/support/helpers'

describe('Utilisateur sans droit, je ne peux ni voir et ni editer la ressource', () => {
  it('Acceptation 1 - Ressource publique', () => {
    cleanUpAndCreateTestPublishedResource(true, true)
    const user = createTestUser()
    cy.createUserAndSignin(user)

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
    )
    cy.dsfrShouldBeStarted()
    cy.testId('resource-view').should('exist')
    cy.testId('resource-edition-button').should(
      'have.text',
      'Demander à contribuer',
    )
    cy.testId('private-base-box').should('not.exist')

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/editer',
    )
    cy.url().should(
      'equal',
      appUrl(
        '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
      ),
    )

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/publier',
    )
    cy.url().should(
      'equal',
      appUrl(
        '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
      ),
    )
  })

  it('Acceptation 2 - Ressource privée', () => {
    cleanUpAndCreateTestPublishedResource(true, false)
    const user = createTestUser()
    cy.createUserAndSignin(user)

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
    )
    cy.dsfrShouldBeStarted()
    cy.testId('resource-view').should('not.exist')
    cy.testId('resource-edition-button').should('not.exist')
    cy.testId('private-ressource-box').should('exist')

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/editer',
    )
    cy.url().should(
      'equal',
      appUrl(
        '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
      ),
    )

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/publier',
    )
    cy.url().should(
      'equal',
      appUrl(
        '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
      ),
    )
  })

  it('Acceptation 3 - Contributeur', () => {
    cleanUpAndCreateTestPublishedResource(true, false)

    cy.testId('resource-view').should('exist')
    cy.testId('resource-edition-button').should('have.text', 'Modifier')
    cy.testId('private-base-box').should('not.exist')

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/editer',
    )
    cy.testId('resource-edition').should('exist')

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/publier',
    )
    cy.testId('resource-publication').should('exist')
  })
})
