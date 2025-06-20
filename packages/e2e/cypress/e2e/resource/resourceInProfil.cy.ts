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
    cy.testId('indexation-themes-select').select('IntelligenceArtificielle')
    cy.testId('indexation-resource-types-select').select('Article')
    cy.testId('indexation-beneficiaries-select').select('Adultes')
    cy.testId('indexation-professional-sectors-select').select(
      'AidantsEtMediateursNumeriques',
    )
    cy.testId('publish-resource-button').click()

    cy.visit(`/profils/${slug}`)

    cy.contains('Publiques').click()
    cy.contains('Publiques').click()

    cy.testId('resource-card').contains('Modifier')
  })
})
