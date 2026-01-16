import { defaultTestBaseSlug } from '@app/e2e/support/given/givenBase'
import { appUrl } from '@app/e2e/support/helpers'
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
    cy.testId('ressources-menu-button').click()
    cy.testId('empty-box').should('exist')

    cy.dsfrModalsShouldBeBound()
    cy.log('Create a resource')
    cy.testId('empty-box').contains('Créer une ressource').click()
    cy.get('#create-resource').should('have.attr', 'open')
    cy.get('#create-resource').contains('Créer une nouvelle ressource')
    cy.get('#create-resource')
      .findByLabelText(/^Titre/)
      .type('Un titre')
    cy.get('#create-resource')
      .findByLabelText(/^Description/)
      .type('Une description')
    cy.get('#create-resource')
      .find('button')
      .contains('Commencer l’édition')
      .click()
    cy.appUrlShouldBe(`/ressources/un-titre/editer`)
    cy.get('#create-resource').should('not.have.attr', 'open')

    cy.log('Check new state')
    cy.visit(`/bases/${defaultTestBaseSlug}/ressources`)

    cy.dsfrModalsShouldBeBound()
    cy.testId('resources-list').should('contain', 'Ressources · 1')
    cy.testId('resources-list').should('contain', 'Brouillons · 1')
    cy.testId('resources-list').should('contain', 'Publiques · 0')
    cy.testId('resources-list').should('contain', 'Privées · 0')

    cy.log('Check draft resources')
    cy.contains('button', 'Brouillons').click()
    cy.testId('resources-draft-tab').as('draft')
    cy.get('@draft')
      .find('[data-testid="resource-card"]')
      .should('have.length', 1)

    cy.log('Check public resources empty state')
    cy.contains('button', 'Publiques').click()
    cy.testId('resources-public-tab').as('public')
    cy.get('@public')
      .find('[data-testid="resource-card"]')
      .should('have.length', 0)
    cy.get('@public').should(
      'contain',
      "Vous n'avez pas de ressources publiques.",
    )

    cy.log('Check private resources empty state')
    cy.contains('button', 'Privées').click()
    cy.testId('resources-private-tab').as('private')
    cy.get('@private')
      .find('[data-testid="resource-card"]')
      .should('have.length', 0)
    cy.get('@private').should(
      'contain',
      "Vous n'avez pas de ressources privées.",
    )

    cy.log('Publish resource in private')
    cy.contains('button', 'Brouillons').click()
    cy.testId('resource-card-edit-link').click()
    cy.testId('add-content-button').click()
    cy.testId('add-SectionTitle-content-button').click()
    cy.testId('section-title-input').type('Titre random')
    cy.testId('add-content_form__submit').click()
    cy.testId('publish-resource-button').click()
    cy.appUrlShouldBe(`/ressources/un-titre/publier`)
    cy.testId('visibility-radio-resource-private').click({ force: true })
    cy.intercept('/api/trpc/resource.mutate?*').as('mutation')
    cy.testId('publish-resource-button').click()
    cy.wait('@mutation')
    cy.url().should('contain', appUrl(`/ressources/un-titre`))

    cy.log('Check new state')
    cy.visit(`/bases/${defaultTestBaseSlug}/ressources`)

    cy.dsfrModalsShouldBeBound()
    cy.testId('resources-list').should('contain', 'Ressources · 1')
    cy.testId('resources-list').should('contain', 'Brouillons · 0')
    cy.testId('resources-list').should('contain', 'Publiques · 0')
    cy.testId('resources-list').should('contain', 'Privées · 1')

    cy.log('Check draft resources')
    cy.contains('button', 'Brouillons').click()
    cy.testId('resources-draft-tab').as('draft')
    cy.get('@draft')
      .find('[data-testid="resource-card"]')
      .should('have.length', 0)
    cy.get('@draft').should('contain', "Vous n'avez pas de brouillons.")

    cy.log('Check public resources empty state')
    cy.contains('button', 'Publiques').click()
    cy.testId('resources-public-tab').as('public')
    cy.get('@public')
      .find('[data-testid="resource-card"]')
      .should('have.length', 0)
    cy.get('@public').should(
      'contain',
      "Vous n'avez pas de ressources publiques.",
    )

    cy.log('Check private resources')
    cy.contains('button', 'Privées').click()
    cy.testId('resources-private-tab').as('private')
    cy.get('@private')
      .find('[data-testid="resource-card"]')
      .should('have.length', 1)

    cy.log('Change resource visibility to public')
    cy.visit(`/ressources/un-titre/publier`)

    cy.dsfrModalsShouldBeBound()
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
    cy.url().should('contain', appUrl(`/ressources/un-titre`))

    cy.log('Check new state')
    cy.visit(`/bases/${defaultTestBaseSlug}/ressources`)

    cy.dsfrModalsShouldBeBound()
    cy.testId('resources-list').should('contain', 'Ressources · 1')
    cy.testId('resources-list').should('contain', 'Brouillons · 0')
    cy.testId('resources-list').should('contain', 'Publiques · 1')
    cy.testId('resources-list').should('contain', 'Privées · 0')

    cy.log('Check draft resources')
    cy.contains('button', 'Brouillons').click()
    cy.testId('resources-draft-tab').as('draft')
    cy.get('@draft')
      .find('[data-testid="resource-card"]')
      .should('have.length', 0)
    cy.get('@draft').should('contain', "Vous n'avez pas de brouillons.")

    cy.log('Check public resources')
    cy.contains('button', 'Publiques').click()
    cy.testId('resources-public-tab').as('public')
    cy.get('@public')
      .find('[data-testid="resource-card"]')
      .should('have.length', 1)

    cy.log('Check private resources empty state')
    cy.contains('button', 'Privées').click()
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
