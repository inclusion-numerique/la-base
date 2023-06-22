import {
  cleanUpAndCreateTestResource,
  expectActionBarStatusWithDraftEdits,
} from './editionTestUtils'

describe("Utilisateur connecté, lorsque j'édite une ressource", () => {
  describe('Qui a déjà été modifiée, en brouillon', () => {
    beforeEach(cleanUpAndCreateTestResource)

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
        cy.log("Je vois un call to action pour editer l'image")
        cy.testId('resource-image').should('not.exist')
        cy.testId('resource-image-delete').should('not.exist')

        cy.testId('resource-image-placeholder').should('exist')

        cy.log('Je selectionne un fichier')
        cy.testId('resource-image-file-field').selectFile(
          'cypress/fixtures/test_1px_image.png',
        )

        cy.log('Le fichier est uploadé et changé automatiquement')
        cy.wait('@mutation')

        cy.log("Je vois l'image")
        cy.testId('resource-image-placeholder').should('not.exist')
        cy.testId('resource-image').should('exist')
        cy.testId('resource-image-file-field').should('have.value', '')
        cy.testId('resource-image-delete').should('exist')

        cy.log("Je change l'image")
        cy.testId('resource-image-file-field').selectFile(
          'cypress/fixtures/test_1px_image.png',
        )

        cy.log('Le fichier est changé automatiquement')
        cy.wait('@mutation')

        cy.log("Je peux supprimer l'image")
        cy.testId('resource-image-delete').click()

        cy.log("L'image est supprimée")
        cy.wait('@mutation')
        cy.testId('resource-image').should('not.exist')
        cy.testId('resource-image-delete').should('not.exist')

        cy.log("Le champ est disponible pour modifier l'image")
        cy.testId('resource-image-file-field').should('have.value', '')
      })
    })
  })
})
