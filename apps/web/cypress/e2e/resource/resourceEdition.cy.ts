import {
  createTestBase,
  createTestResourceCommands,
  createTestUser,
} from '../../support/helpers'

describe("Utilisateur connecté, lorsque j'édite une ressource", () => {
  describe("Qui n'a pas été modifiée après création", () => {
    beforeEach(() => {
      cy.execute('deleteAllData', undefined)
      const user = createTestUser()
      const base = createTestBase(user.id)
      const [creationCommand] = createTestResourceCommands({ baseId: base.id })

      cy.createUserAndSignin(user)
      cy.createBase(base)
      cy.sendResourceCommands({ user, commands: [creationCommand] }).then(
        ({ slug }) => {
          cy.visit(`/ressources/${slug}/editer`)
        },
      )

      cy.intercept('/api/trpc/resource.mutate?*').as('mutation')
      cy.dsfrShouldBeStarted()
    })

    it("Acceptation 0 - Le statut d'édition montre un brouillon sans modifications", () => {
      // Resource has been created, and has 2 contents not published
      cy.testId('resource-published-state').should('have.text', 'Brouillon')
      cy.testId('resource-edition-state').should('not.exist')
      cy.testId('publish-resource-button')
        .should('be.disabled')
        .should('have.text', 'Publier la ressource')
    })
  })

  describe('Qui a déjà été modifiée, en brouillon', () => {
    beforeEach(() => {
      cy.execute('deleteAllData', undefined)
      const user = createTestUser()
      const base = createTestBase(user.id)
      const commands = createTestResourceCommands({ baseId: base.id })

      cy.createUserAndSignin(user)
      cy.createBase(base)
      cy.sendResourceCommands({ user, commands }).then(({ slug }) => {
        cy.visit(`/ressources/${slug}/editer`)
      })

      cy.intercept('/api/trpc/resource.mutate?*').as('mutation')
      cy.dsfrShouldBeStarted()
    })

    const expectActionBarStatusWithDraftEdits = () => {
      cy.testId('resource-published-state').should('have.text', 'Brouillon')
      cy.testId('resource-edition-state').should('have.text', 'Enregistré')
      cy.testId('publish-resource-button')
        .should('not.be.disabled')
        .should('have.text', 'Publier la ressource')
    }

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
        cy.testId('resource-edition-state').should('have.text', 'Enregistré')
        cy.testId('resource-published-state').should('have.text', 'Brouillon')
      })
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
        cy.testId('resource-edition-state').should('have.text', 'Enregistré')
        cy.testId('resource-published-state').should('have.text', 'Brouillon')

        cy.testId('add-content_form').should('not.exist')
        cy.testId('content-edition_SectionTitle-2').should('exist')

        cy.testId('content-section-title')
          .eq(1)
          .should('have.text', "Ca c'est vraiment toi !")
      })

      it('Acceptation 2 - Je peux modifier un titre de section', () => {
        cy.testId('content-edition_SectionTitle-0').should('exist')
        cy.testId('content-edition_SectionTitle-0_form').should('not.exist')

        cy.testId('content-edition_SectionTitle-0_edit-button').should(
          'not.be.visible',
        )

        cy.testId('content-edition_SectionTitle-0').realHover()
        cy.testId('content-edition_SectionTitle-0_edit-button').should(
          'be.visible',
        )
        cy.testId('content-edition_SectionTitle-0_edit-button').click()
        cy.removeHover()

        cy.testId('content-section-title').should('not.exist')
        cy.testId('content-edition_SectionTitle-0_form').should('exist')
        cy.testId('section-title-input').should(
          'have.value',
          'Mon premier titre de section',
        )
        cy.testId('section-title-input').clear()
        cy.testId('section-title-input').type("C'est que le début{enter}")

        cy.wait('@mutation')
        cy.testId('resource-edition-state').should('have.text', 'Enregistré')
        cy.testId('resource-published-state').should('have.text', 'Brouillon')

        cy.testId('content-edition_SectionTitle-0_edit-button').should(
          'not.be.visible',
        )
        cy.testId('content-edition_SectionTitle-0_form').should('not.exist')
        cy.testId('content-edition_SectionTitle-0').should('exist')
        cy.testId('content-section-title').should(
          'have.text',
          "C'est que le début",
        )
      })
    })

    describe('Je peux éditer les textes', () => {
      /**
       * US
       *  - https://www.notion.so/Board-de-suivi-2ebf61391d7740968b955c8fa7ffa16d?p=d9fc268cdaa246258485df3ad9955635&pm=s
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

        cy.testId('Titre 2-button').click()
        cy.testId('text-input').type('Babysitting blues...{enter}')
        cy.testId('Titre 3-button').click()
        cy.testId('text-input').type(
          "C'est le blues de papa maman qui s'en vont au restaurant",
        )

        cy.testId('add-content_form__submit').click()

        cy.wait('@mutation')
        cy.testId('resource-edition-state').should('have.text', 'Enregistré')
        cy.testId('resource-published-state').should('have.text', 'Brouillon')

        cy.testId('add-content_form').should('not.exist')
        cy.testId('content-edition_Text-2').should('exist')

        cy.testId('content-edition_Text-2').within(($div) => {
          cy.get('h2').should('have.text', 'Babysitting blues...')
          cy.get('h3').should(
            'have.text',
            "C'est le blues de papa maman qui s'en vont au restaurant",
          )
        })
      })

      it.only('Acceptation 2 - Je peux modifier un titre de section', () => {
        cy.testId('content-edition_Text-1').should('exist')
        cy.testId('content-edition_Text-1_form').should('not.exist')

        cy.testId('content-edition_Text-1_edit-button').should('not.be.visible')

        cy.testId('content-edition_Text-1').realHover()
        cy.testId('content-edition_Text-1_edit-button').should('be.visible')
        cy.testId('content-edition_Text-1_edit-button').click()
        cy.removeHover()

        cy.testId('content-text').should('not.exist')
        cy.testId('content-edition_Text-1_form').should('exist')
        cy.testId('Titre 4-button').click()
        cy.testId('text-input').type(
          "And I don't think that i'll do it again{enter}",
        )
        cy.testId('Titre 4-button').click()

        cy.testId('content-edition_Text-1_form__submit').click()
        cy.wait('@mutation')

        cy.testId('resource-edition-state').should('have.text', 'Enregistré')
        cy.testId('resource-published-state').should('have.text', 'Brouillon')

        cy.testId('content-edition_Text-1_edit-button').should('not.be.visible')
        cy.testId('content-edition_Text-1_form').should('not.exist')
        cy.testId('content-edition_Text-1').should('exist')
        cy.testId('content-edition_Text-1').within(() => {
          cy.get('h4').should(
            'have.text',
            "And I don't think that i'll do it again",
          )
        })
      })
    })
  })
})
