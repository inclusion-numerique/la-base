import { cleanUpAndCreateTestPublishedResource } from '../edition/editionTestUtils'

describe('Lorsque je consulte une ressource, je peux voir la page des avis de la ressource', () => {
  beforeEach(() => {
    cy.intercept('/api/trpc/resource.mutate?*').as('mutation')
    cy.deleteAllData()
  })

  it("Acceptation 1 - Visiteur des avis d'une une ressource qui autorise les avis publics, je vois les avis qui ont été postés", () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      signinAsResourceCreator: false,
      visitResourcePage: true,
      feedbacks: [
        {
          rate: 'non',
          user: { firstName: 'Henri', lastName: 'Dubois' },
        },
        { rate: 'moyen', user: { firstName: 'Michel', lastName: 'Dupond' } },
        {
          rate: 'oui',
          user: { firstName: 'Charles', lastName: 'Orilla' },
        },
        {
          rate: 'beaucoup',
          user: { firstName: 'Thierry', lastName: 'Febvrel' },
        },
      ],
    })

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/avis',
    )

    cy.testId('resource-feedback').eq(0).contains('Très recommandée')
    cy.testId('resource-feedback').eq(1).contains('Recommandée')
    cy.testId('resource-feedback').eq(2).contains('Peu recommandée')
    cy.testId('resource-feedback').eq(3).contains('Non recommandée')
  })

  it("Acceptation 2 - Visiteur des avis d'une une ressource qui n'autorise pas les avis publics, je ne vois qu'une agrégation des avis qui ont été postés", () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      signinAsResourceCreator: true,
      visitResourcePage: true,
      feedbacks: [
        { rate: 'non', user: { firstName: 'Henri', lastName: 'Dubois' } },
        { rate: 'moyen', user: { firstName: 'Michel', lastName: 'Dupond' } },
        { rate: 'oui', user: { firstName: 'Charles', lastName: 'Orilla' } },
        {
          rate: 'beaucoup',
          user: { firstName: 'Thierry', lastName: 'Febvrel' },
        },
      ],
    })

    cy.testId('resource-edition-button').filter(':visible').click()

    cy.testId('edition-action-bar-more-actions').click()
    cy.testId('edition-action-bar-parameters-modal').click()

    cy.testId('resource-feedback').click()

    cy.wait('@mutation')

    cy.logout()

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/avis',
    )
    cy.dsfrShouldBeStarted()

    cy.get('.fr-notice').contains(
      'Commentaires publics désactivés sur cette ressource',
    )

    cy.testId('feedback-count').eq(0).contains('Peu recommandée')
    cy.testId('feedback-count').eq(0).contains('2 Avis')
    cy.testId('feedback-count').eq(1).contains('Recommandée')
    cy.testId('feedback-count').eq(1).contains('1 Avis')
    cy.testId('feedback-count').eq(2).contains('Très recommandée')
    cy.testId('feedback-count').eq(2).contains('1 Avis')
  })

  it.only("Acceptation 3 - Créateur d'une une ressource qui n'autorise pas les avis publics, je vois la liste des avis qui ont été postés", () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      signinAsResourceCreator: true,
      visitResourcePage: true,
      feedbacks: [
        {
          rate: 'non',
          user: { firstName: 'Henri', lastName: 'Dubois', isPublic: true },
        },
        { rate: 'moyen', user: { firstName: 'Michel', lastName: 'Dupond' } },
        { rate: 'oui', user: { firstName: 'Charles', lastName: 'Orilla' } },
        {
          rate: 'beaucoup',
          user: { firstName: 'Thierry', lastName: 'Febvrel' },
        },
      ],
    })

    cy.testId('resource-edition-button').filter(':visible').click()

    cy.testId('edition-action-bar-more-actions').click()
    cy.testId('edition-action-bar-parameters-modal').click()

    cy.testId('resource-feedback').click()

    cy.wait('@mutation')

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/avis',
    )
    cy.dsfrShouldBeStarted()

    cy.get('.fr-notice').contains(
      'Commentaires publics désactivés sur cette ressource',
    )

    cy.testId('resource-feedback').eq(3).contains('Non recommandée')
    cy.testId('resource-feedback').eq(3).contains('Contacter')
    cy.testId('resource-feedback').eq(2).contains('Peu recommandée')
    cy.testId('resource-feedback')
      .eq(2)
      .contains('Contacter')
      .should('not.exist')
    cy.testId('resource-feedback').eq(1).contains('Recommandée')
    cy.testId('resource-feedback')
      .eq(1)
      .contains('Contacter')
      .should('not.exist')
    cy.testId('resource-feedback').eq(0).contains('Très recommandée')
    cy.testId('resource-feedback')
      .eq(0)
      .contains('Contacter')
      .should('not.exist')
  })
})
