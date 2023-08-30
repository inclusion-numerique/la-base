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

    describe('Je peux éditer les titres de section', () => {
      /**
       * US
       *  - https://www.notion.so/Board-de-suivi-2ebf61391d7740968b955c8fa7ffa16d?p=1ab0b1c59375426aad8ac581a10d5125&pm=s
       */
      it('Acceptation 1 - Je peux ajouter un titre de section', () => {
        cy.testId('content-edition_SectionTitle-0').should('exist')
        cy.testId('content-edition_SectionTitle-0_form').should('not.exist')

        cy.testId('add-content_form').should('not.exist')

        cy.testId('add-content-button').click()
        cy.testId('add-SectionTitle-content-button').click()

        cy.testId('add-content_form').should('exist')
        cy.testId('section-title-input').should('have.value', '')

        cy.testId('add-content_form__submit').click()
        cy.testId('add-content_form').contains('Veuillez renseigner le titre')

        cy.testId('section-title-input').type("Ca c'est vraiment toi !")
        cy.testId('section-title-input').should(
          'have.value',
          "Ca c'est vraiment toi !",
        )

        cy.testId('add-content_form__submit').click()

        cy.wait('@mutation')
        cy.testId('resource-edition-state').should('have.text', 'Enregistrée')
        cy.testId('resource-published-state').should('have.text', 'Brouillon')

        cy.testId('add-content_form').should('not.exist')
        cy.testId('content-edition_SectionTitle-3').should('exist')

        cy.testId('content-section-title')
          .eq(1)
          .should('have.text', "Ca c'est vraiment toi !")
      })

      it('Acceptation 2 - Je peux modifier un titre de section', () => {
        startContentEdition('SectionTitle-0')

        cy.testId('content-section-title').should('not.exist')
        cy.testId('content-edition_SectionTitle-0_form').should('exist')
        cy.testId('section-title-input').should(
          'have.value',
          'Mon premier titre de section',
        )
        cy.testId('section-title-input').clear()
        cy.testId('section-title-input').type("C'est que le début")

        submitValidContentEdition('SectionTitle-0')

        cy.testId('content-section-title').should(
          'have.text',
          "C'est que le début",
        )
      })
    })
  })
})
