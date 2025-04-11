import { appUrl } from '@app/e2e/support/helpers'
import { cleanUpAndCreateTestPublishedResource } from '../edition/editionTestUtils'

describe("Utilisateur sans droit, je peux consulter les avis d'une ressource", () => {
  it('Acceptation 1 - Visiteur sur une ressource publique, je ne vois pas le nombre d’avis d’une ressource sans avis', () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      signinAsResourceCreator: false,
      visitResourcePage: true,
    })

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
    )

    cy.testId('resources-views-and-metadata')
      .contains('Recommandée')
      .should('not.exist')

    cy.testId('resources-views-and-metadata')
      .contains('1 avis')
      .should('not.exist')

    cy.testId('resources-feedbacks').should('not.exist')
  })

  it('Acceptation 2 - Visiteur sur une ressource publique, je peux accéder aux avis par le bouton Je donne mon avis', () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      signinAsResourceCreator: false,
      visitResourcePage: true,
    })

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
    )

    cy.contains('Donner son avis').click()

    cy.url().should(
      'contain',
      appUrl(
        '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/avis',
      ),
    )
  })

  it('Acceptation 3 - Visiteur sur une ressource publique, je vois le nombre d’avis d’une ressource avec avis', () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      signinAsResourceCreator: false,
      visitResourcePage: true,
      feedbacks: [
        {
          comment: 'Good resource',
          rate: 'oui',
          user: { firstName: 'Henri', lastName: 'Dubois' },
        },
      ],
    })

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
    )

    cy.testId('resources-views-and-metadata').contains('Recommandée')
    cy.testId('resources-views-and-metadata').contains('1 avis')

    cy.testId('resources-feedbacks').contains('Recommandée')
    cy.testId('resources-feedbacks').contains('1 Avis sur la ressource')
  })

  it('Acceptation 4 - Visiteur sur une ressource publique, je peux accéder aux avis via les liens 1 avis et voir les avis sur une ressource avec avis', () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      signinAsResourceCreator: false,
      visitResourcePage: true,
      feedbacks: [
        {
          comment: 'Good resource',
          rate: 'oui',
          user: { firstName: 'Henri', lastName: 'Dubois' },
        },
      ],
    })

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
    )

    cy.testId('resources-views-and-metadata').contains('1 avis').click()

    cy.url().should(
      'contain',
      appUrl(
        '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/avis',
      ),
    )

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
    )

    cy.testId('resources-feedbacks').contains('Voir les avis').click()

    cy.url().should(
      'contain',
      appUrl(
        '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/avis',
      ),
    )
  })

  it("Acceptation 5 - Visiteur sur une ressource publique, je peux constater qu'une ressource est peu recommandée pour un non", () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      signinAsResourceCreator: false,
      visitResourcePage: true,
      feedbacks: [
        {
          rate: 'moyen',
          user: { firstName: 'Henri', lastName: 'Dubois' },
        },
      ],
    })

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
    )

    cy.testId('resources-feedbacks').contains('Peu recommandée')
  })

  it("Acceptation 6 - Visiteur sur une ressource publique, je peux constater qu'une ressource est peu recommandée pour un moyen", () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      signinAsResourceCreator: false,
      visitResourcePage: true,
      feedbacks: [
        {
          rate: 'moyen',
          user: { firstName: 'Henri', lastName: 'Dubois' },
        },
      ],
    })

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
    )

    cy.testId('resources-feedbacks').contains('Peu recommandée')
  })

  it("Acceptation 7 - Visiteur sur une ressource publique, je peux constater qu'une ressource est peu recommandée pour un oui", () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      signinAsResourceCreator: false,
      visitResourcePage: true,
      feedbacks: [
        {
          rate: 'oui',
          user: { firstName: 'Henri', lastName: 'Dubois' },
        },
      ],
    })

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
    )

    cy.testId('resources-feedbacks').contains('Recommandée')
  })

  it("Acceptation 8 - Visiteur sur une ressource publique, je peux constater qu'une ressource est peu recommandée pour un beaucoup", () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      signinAsResourceCreator: false,
      visitResourcePage: true,
      feedbacks: [
        {
          rate: 'beaucoup',
          user: { firstName: 'Henri', lastName: 'Dubois' },
        },
      ],
    })

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
    )

    cy.testId('resources-feedbacks').contains('Très recommandée')
  })

  it("Acceptation 9 - Visiteur sur une ressource publique, je peux constater qu'une ressource est non recommandée pour trois non", () => {
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
        { rate: 'non', user: { firstName: 'Michel', lastName: 'Dupond' } },
        { rate: 'non', user: { firstName: 'Jean', lastName: 'Payec' } },
      ],
    })

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
    )

    cy.testId('resources-feedbacks').contains('Non recommandée')
  })

  it("Acceptation 10 - Visiteur sur une ressource publique, je peux constater qu'une ressource est peu recommandée pour deux non et deux moyen", () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      signinAsResourceCreator: false,
      visitResourcePage: true,
      feedbacks: [
        { rate: 'non', user: { firstName: 'Henri', lastName: 'Dubois' } },
        { rate: 'moyen', user: { firstName: 'Michel', lastName: 'Dupond' } },
        { rate: 'non', user: { firstName: 'Jean', lastName: 'Payec' } },
        { rate: 'moyen', user: { firstName: 'Charles', lastName: 'Orilla' } },
      ],
    })

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
    )

    cy.testId('resources-feedbacks').contains('Peu recommandée')
  })

  it("Acceptation 11 - Visiteur sur une ressource publique, je peux constater qu'une ressource est recommandée pour deux oui et un moyen", () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      signinAsResourceCreator: false,
      visitResourcePage: true,
      feedbacks: [
        {
          rate: 'oui',
          user: { firstName: 'Henri', lastName: 'Dubois' },
        },
        {
          rate: 'oui',
          user: { firstName: 'Michel', lastName: 'Dupond' },
        },
        { rate: 'moyen', user: { firstName: 'Charles', lastName: 'Orilla' } },
      ],
    })

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
    )

    cy.testId('resources-feedbacks').contains('Recommandée')
  })

  it("Acceptation 12 - Visiteur sur une ressource publique, je peux constater qu'une ressource est très recommandée pour deux beaucoup et un oui", () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      signinAsResourceCreator: false,
      visitResourcePage: true,
      feedbacks: [
        {
          rate: 'oui',
          user: { firstName: 'Henri', lastName: 'Dubois' },
        },
        { rate: 'beaucoup', user: { firstName: 'Michel', lastName: 'Dupond' } },
        {
          rate: 'beaucoup',
          user: { firstName: 'Charles', lastName: 'Orilla' },
        },
      ],
    })

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
    )

    cy.testId('resources-feedbacks').contains('Très recommandée')
  })
})
