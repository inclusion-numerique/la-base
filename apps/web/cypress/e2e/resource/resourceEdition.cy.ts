import {
  createTestBase,
  createTestResource,
  createTestUser,
} from '../../support/helpers'

const testDefaultState = () => {
  cy.testId('resource-published-state').should('have.text', 'Privée')
  cy.testId('resource-modification-state').should('not.exist')
  cy.testId('publish-resource-button')
    .should('be.disabled')
    .should('have.text', 'Publier la ressource')
}

describe("Utilisateur connecté, lorsque j'édite une ressource, je peux éditer la base, titre, description", () => {
  /**
   * US
   *  - https://www.notion.so/Utilisateur-qui-dite-une-ressource-je-peux-modifier-les-infos-de-ma-ressource-403c0e6f96c246be8875f4ecb2da5a63
   *    * Parcours
   *  - https://www.figma.com/proto/Rk4NNQVYRBE0bJZ6i5mrfU/La-Base---V.2?node-id=710-110064&scaling=min-zoom&page-id=566%3A89449&starting-point-node-id=617%3A99265
   */

  beforeEach(() => {
    cy.execute('deleteAllData', undefined)
    const user = createTestUser()
    const base = createTestBase(user.id)
    const resource = createTestResource(user.id, base.id)

    cy.createUserAndSignin(user)
    cy.createBase(base)
    cy.createResource(resource)
    cy.visit(`/ressources/${resource.slug}/editer`)

    cy.intercept('/api/trpc/resource.editTitle?*').as('editTitleMutation')
    cy.dsfrShouldBeStarted()
  })

  it("Acceptation 0 - Statut d'édition par défaut", () => {
    testDefaultState()
  })

  it('Acceptation 1 - Edition de la base', () => {
    cy.dsfrModalsShouldBeBound()
    cy.findByRole('dialog').should('not.exist')
    cy.testId('edit-base-button').click()
    cy.findByRole('dialog').as('modal')
    cy.get('@modal').contains('Où souhaitez-vous ajouter cette ressource ?')
  })

  it('Acceptation 2 - Edition du titre', () => {
    cy.testId('edit-title-input').should('not.exist')
    cy.testId('edit-description-input').should('not.exist')
    cy.testId('edit-validation-button').should('not.exist')

    cy.testId('edit-title-button').click()

    cy.testId('edit-title-input').should('exist')
    cy.testId('edit-description-input').should('exist')
    cy.testId('edit-validation-button').should('have.text', 'Valider').click()
    cy.testId('resource-modification-state').should('not.exist')

    // Probably not needed
    cy.wait('@editTitleMutation')
    // No change of status
    testDefaultState()

    cy.testId('edit-title-button').click()
    cy.testId('edit-title-input').clear().type('Titre modifié')
    cy.testId('edit-description-input').clear().type('Description modifiée')
    cy.testId('edit-validation-button').click()

    /* To fast...
    cy.testId('resource-published-state').should(
      'have.text',
      'Brouillon',
    )
    cy.testId('resource-modification-state').should(
      'have.text',
      'Enregistrement',
    )
    */

    cy.wait('@editTitleMutation')
    cy.testId('edit-validation-button').should('not.exist')
    cy.contains('Titre modifié')
    cy.contains('Description modifiée')
    cy.testId('resource-modification-state').should('have.text', 'Enregistré')

    cy.testId('publish-resource-button').should('not.be.disabled').click()

    testDefaultState()
  })
})
