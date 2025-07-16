import { cleanUpAndCreateTestResourceInProfile } from './edition/editionTestUtils'

describe('Utilisateur connecté, lorsque je créé une ressource, je peux la retrouver dans les ressources publiques de mon profil', () => {
  it('Acceptation 1 - Resource publique apparait dans les ressources publiques du profil', () => {
    const {
      user: { slug },
    } = cleanUpAndCreateTestResourceInProfile(true)

    cy.testId('publish-resource-button').click()

    cy.testId('indexation-box').should('not.exist')
    cy.testId('contributors-box').should('not.exist')
    cy.testId('visibility-radio-resource-public').click({ force: true })
    cy.testId('indexation-themes-select').click()
    cy.testId('indexation-themes-select-IntelligenceArtificielle').click()
    cy.testId('indexation-themes-select-apply').click()
    cy.testId('indexation-resource-types-select').click()
    cy.testId('indexation-resource-types-select-Article').click()
    cy.testId('indexation-beneficiaries-select').click()
    cy.testId('indexation-beneficiaries-select-Adultes').click()
    cy.testId('indexation-professional-sectors-select').click()
    cy.testId(
      'indexation-professional-sectors-select-AidantsEtMediateursNumeriques',
    ).click()

    cy.testId('publish-resource-button').click()

    cy.visit(`/profils/${slug}`)

    cy.contains('Publiques').click()
    cy.contains('Publiques').click()

    cy.testId('resource-card').contains('Modifier')
  })
})
