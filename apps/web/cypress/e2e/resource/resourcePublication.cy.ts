import {
  cleanUpAndCreateTestResource,
  cleanUpAndCreateTestResourceInProfile,
} from './edition/editionTestUtils'
import { appUrl } from 'cypress/support/helpers'

describe('Utilisateur connecté, lorsque je créé une ressource, je peux renseigner la publier', () => {
  /**
   * US
   *  - https://www.notion.so/Board-de-suivi-2ebf61391d7740968b955c8fa7ffa16d?p=d53886ae66f5426a98ca038f8b8a140c&pm=s
   */

  it('Acceptation 1 - Resource publique dans une base publique', () => {
    cleanUpAndCreateTestResource(true)
    cy.testId('publish-resource-button').click()

    cy.testId('indexation-box').should('not.exist')
    cy.testId('contributors-box').should('not.exist')
    cy.testId('visibility-radio-resource-public').should('not.be.checked')
    cy.testId('visibility-radio-resource-private').should('not.be.checked')
    cy.testId('publish-resource-button').should('be.disabled')

    cy.testId('visibility-radio-resource-public').click({ force: true })
    cy.testId('indexation-box').should('exist')
    cy.testId('contributors-box').should('not.exist')

    cy.testId('publish-resource-button').should('be.disabled')
    cy.testId('indexation-themes-select').select('theme-1')
    cy.testId('indexation-support-types-select').select('theme-1')
    cy.testId('indexation-targetAudiences-select').select('theme-1')

    cy.testId('publish-resource-button').click()

    cy.wait('@mutation')
    cy.url().should(
      'contain',
      appUrl(
        `/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes`,
      ),
    )

    cy.testId('resource-public-state-badge').should(
      'have.text',
      'Ressource publique',
    )
  })

  it('Acceptation 2 - Resource privée dans une base publique', () => {
    cleanUpAndCreateTestResource(true)
    cy.testId('publish-resource-button').click()

    cy.testId('indexation-box').should('not.exist')
    cy.testId('contributors-box').should('not.exist')
    cy.testId('visibility-radio-resource-public').should('not.be.checked')
    cy.testId('visibility-radio-resource-private').should('not.be.checked')
    cy.testId('publish-resource-button').should('be.disabled')

    cy.testId('visibility-radio-resource-private').click({ force: true })
    cy.testId('indexation-box').should('not.exist')
    cy.testId('contributors-box').should('exist')

    cy.testId('publish-resource-button').click()

    cy.wait('@mutation')
    cy.url().should(
      'contain',
      appUrl(
        `/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes`,
      ),
    )

    cy.testId('resource-public-state-badge').should(
      'have.text',
      'Ressource privée',
    )
  })

  it('Acceptation 3 - Resource dans une base privée', () => {
    cleanUpAndCreateTestResource()
    cy.testId('publish-resource-button').click()

    cy.testId('indexation-box').should('not.exist')
    cy.testId('contributors-box').should('exist')
    cy.testId('visibility-radio-resource-public').should('not.be.checked')
    cy.testId('visibility-radio-resource-public').should('be.disabled')
    cy.testId('visibility-radio-resource-private').should('be.checked')

    cy.testId('publish-resource-button').click()

    cy.wait('@mutation')
    cy.url().should(
      'contain',
      appUrl(
        `/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes`,
      ),
    )

    cy.testId('resource-public-state-badge').should(
      'have.text',
      'Ressource privée',
    )
  })

  it('Acceptation 4 - Resource dans un profil privée', () => {
    cleanUpAndCreateTestResourceInProfile()
    cy.testId('publish-resource-button').click()

    cy.testId('indexation-box').should('not.exist')
    cy.testId('contributors-box').should('exist')
    cy.testId('visibility-radio-resource-public').should('not.be.checked')
    cy.testId('visibility-radio-resource-public').should('be.disabled')
    cy.testId('visibility-radio-resource-private').should('be.checked')

    cy.testId('publish-resource-button').click()

    cy.wait('@mutation')
    cy.url().should(
      'contain',
      appUrl(
        `/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes`,
      ),
    )

    cy.testId('resource-public-state-badge').should(
      'have.text',
      'Ressource privée',
    )
  })

  it('Acceptation 5 - Resource dans un profil publique', () => {
    cleanUpAndCreateTestResourceInProfile(true)
    cy.testId('publish-resource-button').click()

    cy.testId('indexation-box').should('not.exist')
    cy.testId('contributors-box').should('not.exist')
    cy.testId('visibility-radio-resource-public').should('not.be.checked')
    cy.testId('visibility-radio-resource-private').should('not.be.checked')
    cy.testId('publish-resource-button').should('be.disabled')
  })
})
