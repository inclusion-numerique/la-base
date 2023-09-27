import { v4 } from 'uuid'
import { appUrl, createTestUser } from '@app/e2e/support/helpers'
import { cleanUp } from '../resource/edition/editionTestUtils'

describe('Utilisateur sans droit, je ne peux ni voir et ni editer le profil', () => {
  it('Acceptation 1 - Visiteur sur un profile publique', () => {
    const id = v4()
    cleanUp(true, id)
    cy.logout()

    cy.visit(`/profils/${id}`)
    cy.dsfrShouldBeStarted()
    cy.testId('empty-box').should('exist')
    cy.testId('profile-edition-button').should('not.exist')
    cy.testId('private-profil-box').should('not.exist')
    cy.testId('create-resource-button').should('not.exist')

    cy.visit(`/profils/${id}/editer`)
    cy.url().should('equal', appUrl(`/connexion?suivant=/profils/${id}/editer`))
  })

  it('Acceptation 2 - Visiteur sur un profile privé', () => {
    const id = v4()
    cleanUp(false, id)
    cy.logout()

    cy.visit(`/profils/${id}`)
    cy.dsfrShouldBeStarted()
    cy.testId('empty-box').should('not.exist')
    cy.testId('profile-edition-button').should('not.exist')
    cy.testId('private-profil-box').should('exist')
    cy.testId('create-resource-button').should('not.exist')

    cy.visit(`/profils/${id}/editer`)
    cy.url().should('equal', appUrl(`/connexion?suivant=/profils/${id}/editer`))
  })

  it('Acceptation 3 - Utilisateur connecté sur un profile publique', () => {
    const id = v4()
    cleanUp(true, id)

    const user = createTestUser(true)
    cy.createUserAndSignin(user)

    cy.visit(`/profils/${id}`)
    cy.dsfrShouldBeStarted()
    cy.testId('empty-box').should('exist')
    cy.testId('profile-edition-button').should('not.exist')
    cy.testId('private-profil-box').should('not.exist')
    cy.testId('create-resource-button').should('not.exist')

    cy.visit(`/profils/${id}/editer`)
    cy.url().should('equal', appUrl(`/profils/${id}`))
  })

  it('Acceptation 4 - Utilisateur connecté sur un profile privé', () => {
    const id = v4()
    cleanUp(false, id)

    const user = createTestUser(true)
    cy.createUserAndSignin(user)

    cy.visit(`/profils/${id}`)
    cy.dsfrShouldBeStarted()
    cy.testId('empty-box').should('not.exist')
    cy.testId('profile-edition-button').should('not.exist')
    cy.testId('private-profil-box').should('exist')
    cy.testId('create-resource-button').should('not.exist')

    cy.visit(`/profils/${id}/editer`)
    cy.url().should('equal', appUrl(`/profils/${id}`))
  })

  it('Acceptation 5 - Mon Profil', () => {
    const id = v4()
    cleanUp(false, id)

    cy.visit(`/profils/${id}`)
    cy.dsfrShouldBeStarted()
    cy.testId('empty-box').should('exist')
    cy.testId('profile-edition-button').should('exist')
    cy.testId('private-profil-box').should('not.exist')
    cy.testId('create-resource-button').should('exist')

    cy.visit(`/profils/${id}/editer`)
    cy.url().should('equal', appUrl(`/profils/${id}/editer`))
  })
})
