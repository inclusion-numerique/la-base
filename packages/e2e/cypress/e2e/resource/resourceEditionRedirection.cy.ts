import { givenBase } from '@app/e2e/support/given/givenBase'
import { createTestResourceCommands } from '@app/e2e/support/given/givenResourceCommands'
import { givenUser } from '@app/e2e/support/given/givenUser'

describe('ETQ Utilisateur non connecté, lorsque je veux éditer une ressource, on me redirige vers la page de connexion', () => {
  beforeEach(() => {
    cy.execute('deleteAllData', {})
  })

  it('Acceptation 0 - Redirection vers connexion', () => {
    const user = givenUser()
    const base = givenBase({ createdById: user.id, isPublic: false })

    cy.createUser(user)
    cy.createBase(base)
    const [creationCommand] = createTestResourceCommands({ baseId: base.id })

    cy.sendResourceCommands({ user, commands: [creationCommand] }).then(
      ({ slug }) => {
        cy.visit(`/ressources/${slug}/editer`)
        // Ignoring NEXT_REDIRECT error
        Cypress.on('uncaught:exception', () => false)
        cy.appUrlShouldBe(`/connexion?suivant=/ressources/${slug}/editer`)
      },
    )
  })
})
