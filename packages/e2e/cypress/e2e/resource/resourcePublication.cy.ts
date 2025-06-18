import { appUrl } from '@app/e2e/support/helpers'
import {
  cleanUpAndCreateTestResource,
  cleanUpAndCreateTestResourceInProfile,
} from './edition/editionTestUtils'

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
    cy.testId('notice-private-base').should('not.exist')
    cy.testId('notice-private-profile').should('not.exist')
    cy.testId('visibility-radio-resource-public').should('not.be.checked')
    cy.testId('visibility-radio-resource-private').should('not.be.checked')

    cy.testId('visibility-radio-resource-public').click({ force: true })
    cy.testId('indexation-box').should('exist')
    cy.testId('contributors-box').should('not.exist')

    cy.testId('indexation-themes-select').select('IntelligenceArtificielle')
    cy.testId('indexation-resource-types-select').select('Article')
    cy.testId('indexation-targetAudiences-select').select('Particuliers')

    cy.testId('publish-resource-button').click()

    cy.wait('@mutation')
    cy.url().should(
      'contain',
      appUrl(
        `/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes`,
      ),
    )

    cy.testId('resource-public-state-badge').should('have.text', 'Publique')
  })

  it('Acceptation 2 - Resource privée dans une base publique', () => {
    cleanUpAndCreateTestResource(true)

    cy.intercept('/api/trpc/profile.searchProfileForMember?*').as('getUser')
    cy.intercept('/api/trpc/resourceContributor.delete?*').as('delete')
    cy.intercept('/api/trpc/resourceContributor.invite?*').as('invite')

    cy.testId('publish-resource-button').click()

    cy.testId('indexation-box').should('not.exist')
    cy.testId('contributors-box').should('not.exist')
    cy.testId('notice-private-base').should('not.exist')
    cy.testId('notice-private-profile').should('not.exist')
    cy.testId('visibility-radio-resource-public').should('not.be.checked')
    cy.testId('visibility-radio-resource-private').should('not.be.checked')

    cy.testId('visibility-radio-resource-private').click({ force: true })
    cy.testId('indexation-box').should('not.exist')
    cy.testId('contributors-box').should('exist')

    cy.testId('contributors-box').within(() => {
      cy.testId('contributors-creator').should('exist')
      cy.testId('contributors-contributor').should('not.exist')
      cy.testId('invite-member-modal-input').type('jean')
      cy.wait('@getUser')
      cy.testId('invite-member-modal-input-option-0').click()
      cy.testId('invite-member-modal-button').click()
      cy.wait('@invite')
    })

    cy.testId('publish-resource-button').click()

    cy.wait('@mutation')
    cy.url().should(
      'contain',
      appUrl(
        `/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes`,
      ),
    )

    cy.testId('resource-public-state-badge').should('have.text', 'Privée')
  })

  it('Acceptation 3 - Resource dans une base privée', () => {
    cleanUpAndCreateTestResource()
    cy.testId('publish-resource-button').click()

    cy.testId('indexation-box').should('not.exist')
    cy.testId('contributors-box').should('exist')
    cy.testId('notice-private-base').should('exist')
    cy.testId('notice-private-profile').should('not.exist')
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

    cy.testId('resource-public-state-badge').should('have.text', 'Privée')
  })

  it('Acceptation 4 - Resource dans un profil privée', () => {
    cleanUpAndCreateTestResourceInProfile(false)
    cy.testId('publish-resource-button').click()

    cy.testId('indexation-box').should('not.exist')
    cy.testId('contributors-box').should('exist')
    cy.testId('notice-private-base').should('not.exist')
    cy.testId('notice-private-profile').should('exist')
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

    cy.testId('resource-public-state-badge').should('have.text', 'Privée')
  })

  it.skip('Acceptation 5 - Resource dans un profil publique', () => {
    cleanUpAndCreateTestResourceInProfile(true)
    cy.testId('publish-resource-button').click()

    cy.testId('indexation-box').should('not.exist')
    cy.testId('contributors-box').should('not.exist')
    cy.testId('visibility-radio-resource-public').should('not.be.checked')
    cy.testId('visibility-radio-resource-private').should('not.be.checked')

    cy.testId('publish-resource-button').click()
    cy.testId('input-form-field__isPublic__error').should('exist')
    cy.testId('input-form-field__isPublic__error').should(
      'have.text',
      'Veuillez specifier la visibilité de la ressource',
    )
  })

  it('Acceptation 6 - Resource publique dans un cas impossible', () => {
    cleanUpAndCreateTestResourceInProfile(true, true)
    cy.testId('publish-resource-button').click()

    cy.testId('indexation-box').should('not.exist')
    cy.testId('contributors-box').should('not.exist')
    cy.testId('notice-private-base').should('not.exist')
    cy.testId('notice-private-profile').should('not.exist')
    cy.testId('visibility-radio-resource-public').should('not.be.checked')
    cy.testId('visibility-radio-resource-private').should('not.be.checked')

    cy.testId('visibility-radio-resource-public').click({ force: true })
    cy.testId('indexation-box').should('exist')
    cy.testId('contributors-box').should('not.exist')

    cy.testId('edit-base-button').click()
    cy.testId('resource-base-0').click({ force: true })
    cy.testId('validate-base-button').click()

    cy.testId('visibility-radio-resource-public').should('not.be.checked')
    cy.testId('visibility-radio-resource-private').should('be.checked')
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

    cy.testId('resource-public-state-badge').should('have.text', 'Privée')
  })
})
