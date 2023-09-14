import { v4 } from 'uuid'
import { cleanUp } from '../resource/edition/editionTestUtils'
import { appUrl, createTestUser } from 'cypress/support/helpers'

describe('Utilisateur sans droit, je ne peux ni voir et ni editer le profil', () => {
  it('Acceptation 1 - Profile publique', () => {
    const id = v4()
    cleanUp(true, id)

    const user = createTestUser(true)
    cy.createUserAndSignin(user)

    cy.visit(`/profils/${id}`)
    cy.dsfrShouldBeStarted()
    cy.testId('empty-box').should('exist')
    cy.testId('profile-edition-button').should('not.exist')
    cy.testId('private-profil-box').should('not.exist')

    cy.visit(`/profils/${id}/editer`)
    cy.url().should('equal', appUrl(`/profils/${id}`))
  })

  it('Acceptation 2 - Profil privé', () => {
    const id = v4()
    cleanUp(false, id)

    const user = createTestUser(true)
    cy.createUserAndSignin(user)

    cy.visit(`/profils/${id}`)
    cy.dsfrShouldBeStarted()
    cy.testId('empty-box').should('not.exist')
    cy.testId('profile-edition-button').should('not.exist')
    cy.testId('private-profil-box').should('exist')

    cy.visit(`/profils/${id}/editer`)
    cy.url().should('equal', appUrl(`/profils/${id}`))
  })

  it('Acceptation 3 - Mon Profil', () => {
    const id = v4()
    cleanUp(false, id)

    cy.visit(`/profils/${id}`)
    cy.dsfrShouldBeStarted()
    cy.testId('empty-box').should('exist')
    cy.testId('profile-edition-button').should('exist')
    cy.testId('private-profil-box').should('not.exist')

    cy.visit(`/profils/${id}/editer`)
    cy.url().should('equal', appUrl(`/profils/${id}/editer`))
  })
})
