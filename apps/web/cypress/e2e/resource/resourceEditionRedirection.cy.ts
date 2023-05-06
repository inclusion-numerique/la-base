import {
  appUrl,
  createTestBase,
  createTestResource,
  createTestUser,
} from '../../support/helpers'

describe('ETQ Utilisateur non connecté, lorsque je veux éditer une ressource, on me redirige vers la page de connexion', () => {
  beforeEach(() => {
    cy.execute('deleteAllData', undefined)
  })

  it('Acceptation 0 - Redirection vers connexion', () => {
    const user = createTestUser()
    const base = createTestBase(user.id)
    const resource = createTestResource(user.id, base.id)

    cy.createUser(user)
    cy.createBase(base)
    cy.createResource(resource)

    cy.visit(`/ressources/${resource.slug}/editer`)
    // Ignoring NEXT_REDIRECT error
    Cypress.on('uncaught:exception', () => false)

    cy.url().should(
      'equal',
      appUrl(`/connexion?suivant=/ressources/${resource.slug}/editer`),
    )
  })
})
