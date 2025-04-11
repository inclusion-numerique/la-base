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

    describe('Je peux éditer les liens sans prévisualisation', () => {
      /**
       * US
       *  - https://www.notion.so/Board-de-suivi-2ebf61391d7740968b955c8fa7ffa16d?p=14159706d3dc45c3acc51b187d5453c9&pm=s
       */
      it('Acceptation 1 - Je peux ajouter un lien', () => {
        cy.testId('content-edition_Link-2').should('exist')
        cy.testId('content-edition_Link-3_form').should('not.exist')

        cy.testId('add-content_form').should('not.exist')

        cy.testId('add-content-button').last().click()
        cy.testId('add-Link-content-button').click()

        cy.testId('add-content_form').should('exist')

        cy.testId('add-content_form__submit').click()
        cy.testId('add-content_form').contains("Veuillez renseigner l'URL")

        cy.testId('link-title-input').type("I'm beggin you for mercy")
        cy.testId('link-url-input').type(
          'https://www.youtube.com/watch?v=y7ZEVA5dy-Y',
        )
        cy.testId('link-caption-input').type(
          'Now you think that I{enter}Will be something on the side{enter}But you got to understand that I need a man{enter}Who can take my hands, yes, I do',
        )
        cy.testId('add-content_form').within(() => {
          cy.testId('link-preview').should('not.exist')
        })
        cy.testId('add-content_form__submit').click()

        cy.wait('@mutation')
        cy.testId('resource-edition-state').should('have.text', 'Enregistrée')
        cy.testId('resource-published-state').should('have.text', 'Brouillon')

        cy.testId('add-content_form').should('not.exist')
        cy.testId('content-edition_Link-3').should('exist')

        cy.testId('content-edition_Link-3').within(() => {
          cy.testId('link-preview').should('not.exist')
          cy.get('h2').should('have.text', "I'm beggin you for mercy")
          cy.get('a').should(
            'have.text',
            'https://www.youtube.com/watch?v=y7ZEVA5dy-Y',
          )
        })
      })

      it('Acceptation 2 - Je peux modifier un lien', () => {
        startContentEdition('Link-2')

        cy.testId('content-link').should('not.exist')
        cy.testId('link-title-input').should(
          'have.value',
          'Vous avez vu mon lien',
        )
        cy.testId('link-url-input').should(
          'have.value',
          'https://www.imdb.com/title/tt0357111/',
        )
        cy.testId('link-caption-input').should(
          'have.value',
          'Il est beau hein !',
        )

        cy.testId('link-title-input').type('2')
        cy.testId('link-url-input').type('3')
        cy.testId('link-caption-input').type('4')

        submitValidContentEdition('Link-2')

        cy.testId('content-link').within(() => {
          cy.get('h2').should('have.text', 'Vous avez vu mon lien2')
          cy.testId('link-caption').should('have.text', 'Il est beau hein !4')
          cy.get('a').should(
            'have.text',
            'https://www.imdb.com/title/tt0357111/3',
          )
        })
      })
    })

    describe('Je peux éditer les liens avec prévisualisation', () => {
      it('Acceptation 1 - Je peux ajouter un lien avec prévisualisation', () => {
        cy.testId('content-edition_Link-2').should('exist')
        cy.testId('content-edition_Link-3_form').should('not.exist')

        cy.testId('add-content_form').should('not.exist')

        cy.testId('add-content-button').last().click()
        cy.testId('add-Link-content-button').click()

        cy.testId('add-content_form').should('exist')

        cy.testId('link-title-input').type('Le Git')
        cy.testId('link-url-input').type('https://github.com')
        cy.testId('link-show-preview-checkbox').check({ force: true })
        cy.testId('add-content_form').within(() => {
          cy.testId('link-preview').should('exist')
        })
        cy.testId('add-content_form__submit').click()

        cy.wait('@mutation')
        cy.testId('resource-edition-state').should('have.text', 'Enregistrée')
        cy.testId('resource-published-state').should('have.text', 'Brouillon')

        cy.testId('add-content_form').should('not.exist')
        cy.testId('content-edition_Link-3').should('exist')

        cy.testId('content-edition_Link-3').within(() => {
          cy.get('h2').should('have.text', 'Le Git')
          cy.get('img').should('exist')
          cy.get('a').should('have.attr', 'href', 'https://github.com')
        })
      })
    })
  })
})
