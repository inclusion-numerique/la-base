import {
  cleanUpAndCreateTestResource,
  expectActionBarStatusWithDraftEdits,
} from './editionTestUtils'

describe("Utilisateur connecté, lorsque j'édite une ressource", () => {
  describe('Qui a déjà été modifiée, en brouillon', () => {
    beforeEach(() => {
      cleanUpAndCreateTestResource()
    })

    it("Acceptation 0 - Le statut d'édition montre un brouillon avec modifications", () => {
      // Resource has been created, and has 2 contents not published
      expectActionBarStatusWithDraftEdits()
    })

    describe('Je peux éditer la base, titre, description', () => {
      /**
       * US
       *  - https://www.notion.so/Utilisateur-qui-dite-une-ressource-je-peux-modifier-les-infos-de-ma-ressource-403c0e6f96c246be8875f4ecb2da5a63
       *    * Parcours
       *  - https://www.figma.com/proto/Rk4NNQVYRBE0bJZ6i5mrfU/La-Base---V.2?node-id=710-110064&scaling=min-zoom&page-id=566%3A89449&starting-point-node-id=617%3A99265
       */

      it('Acceptation 1 - Edition de la base', () => {
        cy.dsfrModalsShouldBeBound()
        cy.get('#chose-resource-base').should('not.have.attr', 'open')
        cy.testId('edit-base-button').click()
        cy.get('#chose-resource-base').should('have.attr', 'open')
        cy.get('#chose-resource-base').contains(
          'Où souhaitez-vous ajouter cette ressource ?',
        )
      })

      it('Acceptation 2 - Edition du titre', () => {
        cy.testId('edit-title-input').should('not.exist')
        cy.testId('edit-description-input').should('not.exist')
        cy.testId('edit-validation-button').should('not.exist')

        cy.testId('edit-title-button').click()

        cy.testId('edit-title-input').should('exist')
        cy.testId('edit-description-input').should('exist')
        cy.testId('edit-validation-button')
          .should('have.text', 'Valider')
          .click()

        // Probably not needed
        cy.wait('@mutation')

        // No change of status
        expectActionBarStatusWithDraftEdits()

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
        cy.testId('resource-edition-state').should('have.text', 'Enregistrée')
        cy.testId('resource-published-state').should('have.text', 'Brouillon')
      })

      it("Acceptation 3 - Edition de l'image", () => {
        // Intercept image creation mutation (called before modal closes and resource.mutate)
        cy.intercept('/api/trpc/image.create?*').as('imageCreate')

        cy.log("Je vois un call to action pour editer l'image")
        cy.testId('resource-image').should('not.exist')
        cy.testId('resource-image-placeholder').should('exist')
        cy.testId('resource-image-edit-button').should('exist')

        cy.log("J'ouvre la modal d'édition d'image")
        cy.dsfrModalsShouldBeBound()
        cy.testId('resource-image-edit-button').click()
        cy.get('#resource-image-edition').should('have.attr', 'open')

        cy.log('Je selectionne un fichier dans la modal')
        cy.testId('resource-image-file-field').selectFile(
          'cypress/fixtures/test_1px_image.png',
        )

        cy.log("J'enregistre l'image")
        cy.get('#resource-image-edition').contains('Enregistrer').click()

        cy.log('Le fichier est uploadé')
        cy.wait('@imageCreate')
        cy.wait('@mutation')

        cy.log("Je vois l'image")
        cy.testId('resource-image-placeholder').should('not.exist')
        cy.testId('resource-image').should('exist')

        cy.log("Je change l'image")
        cy.testId('resource-image-edit-button').click()
        cy.get('#resource-image-edition').should('have.attr', 'open')
        cy.testId('resource-image-delete').click()
        cy.testId('resource-image-file-field').selectFile(
          'cypress/fixtures/test_1px_image.png',
        )
        cy.get('#resource-image-edition').contains('Enregistrer').click()

        cy.log('Le fichier est changé')
        cy.wait('@imageCreate')
        cy.wait('@mutation')

        cy.log("Je peux supprimer l'image")
        cy.testId('resource-image-edit-button').click()
        cy.get('#resource-image-edition').should('have.attr', 'open')
        cy.testId('resource-image-delete').click()
        cy.get('#resource-image-edition').contains('Enregistrer').click()

        cy.log("L'image est supprimée")
        // No image.create when deleting, just resource.mutate
        cy.wait('@mutation')
        cy.testId('resource-image').should('not.exist')
        cy.testId('resource-image-placeholder').should('exist')
      })
    })
  })
})
