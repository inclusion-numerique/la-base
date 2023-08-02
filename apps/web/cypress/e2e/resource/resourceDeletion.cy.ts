import { cleanUpAndCreateTestResource } from './edition/editionTestUtils'
import { appUrl } from 'cypress/support/helpers'

describe("Utilisateur connecté, lorsque j'édite une ressource, je peux la supprimer", () => {
  beforeEach(cleanUpAndCreateTestResource)

  /**
   * US
   *  - https://www.notion.so/Utilisateur-qui-dite-une-ressource-je-peux-supprimer-ma-ressource-33e7c97d015c44f0a1c0050780886ade
   */
  it('Acceptation 1 - Suppression et redirection', () => {
    cy.testId('edition-action-bar-more-actions').click()
    cy.testId('edition-action-bar-delete-modal').click()

    cy.testId('edition-action-bar-delete').click()
    cy.wait('@mutation')

    cy.url().should('equal', appUrl('/ressources'))
    cy.testId('resource-card').should('not.exist')

    cy.request({
      url: '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
      followRedirect: false,
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(404)
      expect(resp.redirectedToUrl).to.eq(undefined)
    })

    cy.request({
      url: '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/editer',
      followRedirect: false,
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(404)
      expect(resp.redirectedToUrl).to.eq(undefined)
    })
  })
})
