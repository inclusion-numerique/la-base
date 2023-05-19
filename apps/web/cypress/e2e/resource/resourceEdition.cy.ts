import {
  createTestBase,
  createTestResource,
  createTestResourceContents,
  createTestUser,
} from '../../support/helpers'

const testDefaultState = () => {
  cy.testId('resource-published-state').should('have.text', 'Privée')
  cy.testId('resource-edition-state').should('not.exist')
  cy.testId('publish-resource-button')
    .should('be.disabled')
    .should('have.text', 'Publier la ressource')
}

describe("Utilisateur connecté, lorsque j'édite une ressource", () => {
  beforeEach(() => {
    cy.execute('deleteAllData', undefined)
    const user = createTestUser()
    const base = createTestBase(user.id)
    const resource = createTestResource(user.id, base.id)
    const contents = createTestResourceContents()

    cy.createUserAndSignin(user)
    cy.createBase(base)
    cy.createResource(resource)
    cy.createResourceContents({
      contents,
      byId: user.id,
      resourceId: resource.id,
    })
    cy.visit(`/ressources/${resource.slug}/editer`)

    cy.intercept('/api/trpc/resource.mutate?*').as('mutation')
    cy.dsfrShouldBeStarted()
  })

  describe('Je peux éditer la base, titre, description', () => {
    /**
     * US
     *  - https://www.notion.so/Utilisateur-qui-dite-une-ressource-je-peux-modifier-les-infos-de-ma-ressource-403c0e6f96c246be8875f4ecb2da5a63
     *    * Parcours
     *  - https://www.figma.com/proto/Rk4NNQVYRBE0bJZ6i5mrfU/La-Base---V.2?node-id=710-110064&scaling=min-zoom&page-id=566%3A89449&starting-point-node-id=617%3A99265
     */

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
      cy.testId('resource-edition-state').should('not.exist')

      // Probably not needed
      cy.wait('@mutation')
      // No change of status
      testDefaultState()

      cy.testId('edit-title-button').click()
      cy.testId('edit-title-input').clear()
      cy.testId('edit-title-input').type('Titre modifié')
      cy.testId('edit-description-input').clear()
      cy.testId('edit-description-input').type('Description modifiée')
      cy.testId('edit-validation-button').click()

      /* To fast...
    cy.testId('resource-published-state').should(
      'have.text',
      'Brouillon',
      )
      cy.testId('resource-edition-state').should(
        'have.text',
        'Enregistrement',
        )
        */

      cy.wait('@mutation')
      cy.testId('edit-validation-button').should('not.exist')
      cy.contains('Titre modifié')
      cy.contains('Description modifiée')
      cy.testId('resource-edition-state').should('have.text', 'Enregistré')
      cy.testId('resource-published-state').should('have.text', 'Brouillon')
    })
  })

  describe('Je peux éditer les titres de section', () => {
    /**
     * US
     *  - https://www.notion.so/Board-de-suivi-2ebf61391d7740968b955c8fa7ffa16d?p=1ab0b1c59375426aad8ac581a10d5125&pm=s
     */
    it('Should add section title', () => {
      cy.testId('content-SectionTitle-edition-form').should('not.exist')
      cy.testId('content-SectionTitle-edition').should('have.length', 1)

      cy.testId('add-content-button').click()
      cy.testId('add-SectionTitle-content-button').click()

      cy.testId('content-SectionTitle-edition-form').should('exist')
      cy.testId('section-title-input').should('have.value', '')

      cy.testId('content-validation-button').click()
      cy.testId('content-SectionTitle-edition-form').contains(
        'Veuillez renseigner le titre',
      )

      cy.testId('section-title-input').type("Ca c'est vraiment toi !")
      cy.testId('section-title-input').should(
        'have.value',
        "Ca c'est vraiment toi !",
      )

      cy.testId('content-validation-button').click()

      cy.wait('@mutation')
      cy.testId('resource-edition-state').should('have.text', 'Enregistré')
      cy.testId('resource-published-state').should('have.text', 'Brouillon')

      cy.testId('content-SectionTitle-edition-form').should('not.exist')
      cy.testId('content-SectionTitle-edition').should('have.length', 2)
      cy.testId('content-section-title')
        .eq(1)
        .should('have.text', "Ca c'est vraiment toi !")
    })

    it('Should edit section title', () => {
      cy.testId('content-SectionTitle-edition-form').should('not.exist')
      cy.testId('content-edition-button').should('not.be.visible')

      cy.testId('content-section-title').realHover()
      cy.testId('content-edition-button').should('be.visible')
      cy.testId('content-edition-button').click()
      cy.removeHover()

      cy.testId('content-section-title').should('not.exist')
      cy.testId('content-SectionTitle-edition-form').should('exist')
      cy.testId('section-title-input').should(
        'have.value',
        'Et ca continue encore et encore...',
      )
      cy.testId('section-title-input').clear()
      cy.testId('section-title-input').type("C'est que le début")

      cy.testId('content-validation-button').click()

      cy.wait('@mutation')
      cy.testId('resource-edition-state').should('have.text', 'Enregistré')
      cy.testId('resource-published-state').should('have.text', 'Brouillon')

      cy.testId('content-edition-button').should('not.be.visible')
      cy.testId('content-SectionTitle-edition-form').should('not.exist')
      cy.testId('content-SectionTitle-edition').should('exist')
      cy.testId('content-section-title').should(
        'have.text',
        "C'est que le début",
      )
    })
  })
})
