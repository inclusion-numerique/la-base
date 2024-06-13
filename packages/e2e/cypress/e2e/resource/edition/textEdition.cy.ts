import {
  cleanUpAndCreateTestResource,
  startContentEdition,
  submitValidContentEdition,
} from './editionTestUtils'

describe("Utilisateur connecté, lorsque j'édite une ressource", () => {
  describe('Qui a déjà été modifiée, en brouillon', () => {
    beforeEach(() => {
      cleanUpAndCreateTestResource()
    })

    describe('Je peux éditer les textes', () => {
      /**
       * US
       *  - https://www.notion.so/Board-de-suivi361391d7740968b955c8fa7ffa16d?p=d9fc268cdaa246258485df3ad9955635&pm=s
       */
      it('Acceptation 1 - Je peux ajouter un texte', () => {
        cy.testId('content-edition_Text-1').should('exist')
        cy.testId('content-edition_Text-1_form').should('not.exist')

        cy.testId('add-content_form').should('not.exist')

        cy.testId('add-content-button').click()
        cy.testId('add-Text-content-button').click()

        cy.testId('add-content_form').should('exist')
        cy.testId('text-input').should('have.value', '')

        cy.testId('add-content_form__submit').click()
        cy.testId('add-content_form').contains('Veuillez renseigner le text')

        cy.testId('Titre 1-button').click()
        cy.testId('text-input').type('Babysitting blues...{enter}')
        cy.testId('Titre 2-button').click()
        cy.testId('text-input').type(
          "C'est le blues de papa maman qui s'en vont au restaurant",
        )

        cy.testId('add-content_form__submit').click()

        cy.wait('@mutation')
        cy.testId('resource-edition-state').should('have.text', 'Enregistrée')
        cy.testId('resource-published-state').should('have.text', 'Brouillon')

        cy.testId('add-content_form').should('not.exist')
        cy.testId('content-edition_Text-3').should('exist')

        cy.testId('content-edition_Text-3').within(() => {
          cy.get('h4').should('have.text', 'Babysitting blues...')
          cy.get('h5').should(
            'have.text',
            "C'est le blues de papa maman qui s'en vont au restaurant",
          )
        })
      })

      it('Acceptation 2 - Je peux modifier un texte', () => {
        startContentEdition('Text-1')

        cy.testId('content-text').should('not.exist')
        cy.testId('content-edition_Text-1_form').should('exist')
        cy.testId('Titre 3-button').click()
        cy.testId('text-input').type(
          "And I don't think that i'll do it again{enter}",
        )
        cy.testId('Titre 3-button').click()

        submitValidContentEdition('Text-1')

        cy.testId('content-edition_Text-1').within(() => {
          cy.get('h6').should(
            'have.text',
            "And I don't think that i'll do it again",
          )
        })
      })
    })
  })
})
