import { cleanUpAndCreateTestCollectionAndResource } from '../resource/edition/editionTestUtils'

describe('Utilisateur connecté, je peux gerer mes collections', () => {
  /**
   * US
   *  - https://www.notion.so/Board-de-suivi-2ebf61391d7740968b955c8fa7ffa16d?p=385282e0c7bd418599147759eb11feae&pm=s
   */
  beforeEach(() => {
    cy.intercept('/api/trpc/resource.addToCollection?*').as('mutation')
  })

  it('Acceptation 1 : ajout d’une ressource à la collection d’un profil sans collection et non membre de base', () => {
    const ids = cleanUpAndCreateTestCollectionAndResource()
    cy.testId('save-resource-in-collection-button').click()

    cy.testId('add-in-collection-section').should('have.length', 1)
    cy.testId('added-in-collection-button').should('have.length', 0)
    cy.testId('add-in-collection-button').should('have.length', 1)

    cy.testId('add-in-collection-button').click()

    cy.testId('save-resource-in-collection-button').click()
    cy.wait('@mutation')

    cy.testId('add-in-collection-section').should('have.length', 1)
    cy.testId('added-in-collection-button').should('have.length', 1)
    cy.testId('add-in-collection-button').should('have.length', 0)

    cy.visit(`/profils/${ids.user}/collections`)
    cy.testId('collection-card-link').click()

    cy.testId('resource-card').should('have.length', 1)
  })

  it('Acceptation 2 : ajout d’une ressource à la collection d’un profil avec collections et non membre de base', () => {
    const ids = cleanUpAndCreateTestCollectionAndResource(true)
    cy.testId('save-resource-in-collection-button').click()

    cy.testId('add-in-collection-section').should('have.length', 2)
    cy.testId('added-in-collection-button').should('have.length', 0)
    cy.testId('add-in-collection-button').should('have.length', 2)

    cy.testId('add-in-collection-button').eq(1).click()

    cy.testId('save-resource-in-collection-button').click()
    cy.wait('@mutation')

    cy.testId('add-in-collection-section').should('have.length', 2)
    cy.testId('added-in-collection-button').should('have.length', 1)
    cy.testId('add-in-collection-button').should('have.length', 1)

    cy.visit(`/profils/${ids.user}/collections`)
    cy.dsfrShouldBeStarted()
    cy.testId('collection-card-link').should('have.length', 2)
    cy.testId('collection-card-link').eq(0).click()
    cy.testId('resource-card').should('have.length', 1)

    cy.visit(`/profils/${ids.user}/collections`)
    cy.dsfrShouldBeStarted()
    cy.testId('collection-card-link').should('have.length', 2)
    cy.testId('collection-card-link').eq(1).click()
    cy.testId('resource-card').should('have.length', 0)
  })

  it('Acceptation 3 : ajout d’une ressource à la collection d’un profil avec collections et membre de base', () => {
    const ids = cleanUpAndCreateTestCollectionAndResource(true, true)
    cy.testId('save-resource-in-collection-button').click()

    cy.testId('add-in-collection-bases').should('have.length', 3)
    cy.testId('back-to-bases-button').should('not.exist')
    cy.testId('add-in-collection-bases').eq(2).click()

    cy.testId('base-without-collection').should('exist')
    cy.testId('add-in-collection-section').should('not.exist')
    cy.testId('back-to-bases-button').click()

    cy.testId('back-to-bases-button').should('not.exist')
    cy.testId('add-in-collection-bases').eq(1).click()

    cy.testId('base-without-collection').should('not.exist')
    cy.testId('add-in-collection-section').should('have.length', 2)
    cy.testId('added-in-collection-button').should('have.length', 0)
    cy.testId('add-in-collection-button').should('have.length', 2)

    cy.testId('add-in-collection-button').eq(1).click()
    cy.wait('@mutation')

    cy.visit(`/bases/${ids.baseWithCollection}/collections`)
    cy.dsfrShouldBeStarted()
    cy.testId('collection-card-link').should('have.length', 2)
    cy.testId('collection-card-link').eq(0).click()
    cy.testId('resource-card').should('have.length', 1)

    cy.visit(`/bases/${ids.baseWithCollection}/collections`)
    cy.dsfrShouldBeStarted()
    cy.testId('collection-card-link').should('have.length', 2)
    cy.testId('collection-card-link').eq(1).click()
    cy.testId('resource-card').should('have.length', 0)
  })
})
