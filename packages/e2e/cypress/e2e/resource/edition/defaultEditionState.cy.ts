import {
  appUrl,
  createTestBase,
  createTestResourceCommands,
  createTestUser,
} from '../../../support/helpers'

describe("Utilisateur connecté, lorsque j'édite une ressource", () => {
  describe("Qui n'a pas été modifiée après création", () => {
    beforeEach(() => {
      cy.execute('deleteAllData', {})
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
      cy.testId('publish-resource-button').should(
        'have.text',
        'Publier la ressource',
      )
    })

    it('Acceptation 1 - Seulement la premiere edition redirige vers la publication', () => {
      cy.testId('add-content-button').click()
      cy.testId('add-Text-content-button').click()
      cy.testId('Titre 1-button').click()
      cy.testId('text-input').type('Un titre assez stylé')
      cy.testId('add-content_form__submit').click()
      cy.wait('@mutation')

      cy.testId('publish-resource-button')
        .should('have.text', 'Publier la ressource')
        .click()

      cy.url().should(
        'equal',
        appUrl(
          '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/publier',
        ),
      )

      cy.testId('publish-resource-button').click()
      cy.appUrlShouldBe(
        '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
      )

      cy.testId('resource-edition-button').click()
      cy.appUrlShouldBe(
        '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/editer',
      )
      cy.testId('publish-resource-button').should(
        'have.text',
        'Publier les modifications',
      )
      cy.testId('add-content-button').click()
      cy.testId('add-Text-content-button').click()
      cy.testId('Titre 1-button').click()
      cy.testId('text-input').type('Un deuxième titre moins stylé')
      cy.testId('add-content_form__submit').click()
      cy.wait('@mutation')

      cy.testId('publish-resource-button')
        .should('have.text', 'Publier les modifications')
        .click()

      cy.url().should(
        'equal',
        appUrl(
          '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
        ),
      )
    })
  })
})
