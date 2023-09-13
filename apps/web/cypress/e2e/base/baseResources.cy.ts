import { appUrl } from '../../support/helpers'
import { cleanUpAndCreateTestBase } from '../resource/edition/editionTestUtils'

describe('Utilisateur connecté, lorsque je créé une base, je peux voir ses ressources', () => {
  /**
   * US
   *  - https://www.notion.so/Board-de-suivi-2ebf61391d7740968b955c8fa7ffa16d?p=d0721850f04a4913be642a3a106793ce&pm=s
   */

  beforeEach(() => {
    cleanUpAndCreateTestBase(true)
  })

  it('Acceptation 0 - Empty state', () => {
    cy.testId('base-ressources-empty-state').should('exist')

    cy.log('Create a resource')
    cy.testId('base-ressources-empty-state')
      .contains('Créer une ressource')
      .click()
    cy.findByRole('dialog').as('modal')
    cy.get('@modal').contains('Créer une nouvelle ressource')
    cy.get('@modal')
      .findByLabelText(/^Titre/)
      .type('Un titre')
    cy.get('@modal')
      .findByLabelText(/^Description/)
      .type('Une description')
    cy.get('@modal').find('button').contains('Continuer').click()
    cy.get('@modal').find('label').eq(1).click()
    cy.get('@modal').find('button').contains('Commencer').click()
    cy.url().should('equal', appUrl(`/ressources/un-titre/editer`))
    cy.get('@modal').should('not.exist')

    cy.log('Check new state')
    cy.visit('/bases/conseiller-numérique-france-services-contributions')
    cy.testId('base-resources').should('contain', 'Ressources · 1')
    cy.testId('base-resources').should('contain', 'Brouillons · 1')
    cy.testId('base-resources').should('contain', 'Publiées · 0')
    cy.testId('base-resources').should('contain', 'Privées · 0')

    cy.log('Check draft resources')
    cy.testId('resources-draft-tab').as('draft')
    cy.get('@draft')
      .find('[data-testid="resource-card"]')
      .should('have.length', 1)

    cy.log('Check public resources empty state')
    cy.testId('resources-public-tab').as('public')
    cy.get('@public')
      .find('[data-testid="resource-card"]')
      .should('have.length', 0)
    cy.get('@public').should(
      'contain',
      "Vous n'avez pas de ressources publiées.",
    )

    cy.log('Check private resources empty state')
    cy.testId('resources-private-tab').as('private')
    cy.get('@private')
      .find('[data-testid="resource-card"]')
      .should('have.length', 0)
    cy.get('@private').should(
      'contain',
      "Vous n'avez pas de ressources privées.",
    )

    cy.log('Publish resource in private')
    cy.testId('resource-card-edit-link').click()
    cy.testId('add-content-button').click()
    cy.testId('add-SectionTitle-content-button').click()
    cy.testId('section-title-input').type('Titre random')
    cy.testId('add-content_form__submit').click()
    cy.testId('publish-resource-button').click()
    cy.url().should('equal', appUrl(`/ressources/un-titre/publier`))
    cy.testId('visibility-radio-resource-private').click({ force: true })
    cy.testId('publish-resource-button').click()
    cy.url().should('contain', appUrl(`/ressources/un-titre`))

    cy.log('Check new state')
    cy.visit('/bases/conseiller-numérique-france-services-contributions')
    cy.testId('base-resources').should('contain', 'Ressources · 1')
    cy.testId('base-resources').should('contain', 'Brouillons · 0')
    cy.testId('base-resources').should('contain', 'Publiées · 0')
    cy.testId('base-resources').should('contain', 'Privées · 1')

    cy.log('Check draft resources')
    cy.testId('resources-draft-tab').as('draft')
    cy.get('@draft')
      .find('[data-testid="resource-card"]')
      .should('have.length', 0)
    cy.get('@draft').should('contain', "Vous n'avez pas de brouillons.")

    cy.log('Check public resources empty state')
    cy.testId('resources-public-tab').as('public')
    cy.get('@public')
      .find('[data-testid="resource-card"]')
      .should('have.length', 0)
    cy.get('@public').should(
      'contain',
      "Vous n'avez pas de ressources publiées.",
    )

    cy.log('Check private resources empty state')
    cy.testId('resources-private-tab').as('private')
    cy.get('@private')
      .find('[data-testid="resource-card"]')
      .should('have.length', 1)

    cy.log('Change resource visibility to private')
    cy.visit(`/ressources/un-titre/publier`)
    cy.testId('visibility-radio-resource-public').click({ force: true })
    cy.testId('indexation-themes-select').select('theme-1')
    cy.testId('indexation-support-types-select').select('theme-1')
    cy.testId('indexation-targetAudiences-select').select('theme-1')
    cy.testId('publish-resource-button').click()
    cy.url().should('contain', appUrl(`/ressources/un-titre`))

    cy.log('Check new state')
    cy.visit('/bases/conseiller-numérique-france-services-contributions')
    cy.testId('base-resources').should('contain', 'Ressources · 1')
    cy.testId('base-resources').should('contain', 'Brouillons · 0')
    cy.testId('base-resources').should('contain', 'Publiées · 1')
    cy.testId('base-resources').should('contain', 'Privées · 0')

    cy.log('Check draft resources')
    cy.testId('resources-draft-tab').as('draft')
    cy.get('@draft')
      .find('[data-testid="resource-card"]')
      .should('have.length', 0)
    cy.get('@draft').should('contain', "Vous n'avez pas de brouillons.")

    cy.log('Check public resources empty state')
    cy.testId('resources-public-tab').as('public')
    cy.get('@public')
      .find('[data-testid="resource-card"]')
      .should('have.length', 1)

    cy.log('Check private resources empty state')
    cy.testId('resources-private-tab').as('private')
    cy.get('@private')
      .find('[data-testid="resource-card"]')
      .should('have.length', 0)
    cy.get('@private').should(
      'contain',
      "Vous n'avez pas de ressources privées.",
    )
  })
})
