import {
  cleanUpAndCreateTestBase,
  cleanUpAndCreateTestBaseAsMember,
} from '@app/e2e/e2e/resource/edition/editionTestUtils'
import { defaultTestBaseSlug } from '@app/e2e/support/given/givenBase'
import { givenUser } from '@app/e2e/support/given/givenUser'

describe('Utilisateur sans droit, je ne peux ni voir et ni editer la base', () => {
  it('Acceptation 1 - Visiteur sur un base publique', () => {
    cleanUpAndCreateTestBase(true)
    cy.logout()

    cy.visit(`/bases/${defaultTestBaseSlug}`)
    cy.dsfrShouldBeStarted()
    cy.testId('empty-box').should('exist')
    cy.testId('base-edition-button').should('not.exist')
    cy.testId('private-base-box').should('not.exist')
    cy.testId('create-resource-button').should('not.exist')

    cy.visit(`/bases/${defaultTestBaseSlug}/membres`)

    cy.testId('base-invite-member-button').should('not.exist')
    cy.testId('member-card').should('exist')

    cy.visit(`/bases/${defaultTestBaseSlug}/editer`)
    cy.appUrlShouldBe(`/connexion?suivant=/bases/${defaultTestBaseSlug}/editer`)
  })

  it('Acceptation 2 - Visiteur sur un base privée', () => {
    cleanUpAndCreateTestBase(false)
    cy.logout()

    cy.visit(`/bases/${defaultTestBaseSlug}`)
    cy.dsfrShouldBeStarted()
    cy.testId('empty-box').should('not.exist')
    cy.testId('base-edition-button').should('not.exist')
    cy.testId('private-base-box').should('exist')
    cy.testId('create-resource-button').should('not.exist')

    cy.visit(`/bases/${defaultTestBaseSlug}/membres`)

    cy.testId('base-invite-member-button').should('not.exist')
    cy.testId('member-card').should('not.exist')
    cy.testId('private-base-box').should('exist')

    cy.visit(`/bases/${defaultTestBaseSlug}/editer`)
    cy.appUrlShouldBe(`/connexion?suivant=/bases/${defaultTestBaseSlug}/editer`)
  })
  it('Acceptation 3 - Utilisateur connecté sur un base publique', () => {
    cleanUpAndCreateTestBase(true)
    const user = givenUser()
    cy.createUserAndSignin(user)

    cy.visit(`/bases/${defaultTestBaseSlug}`)
    cy.dsfrShouldBeStarted()
    cy.testId('empty-box').should('exist')
    cy.testId('base-edition-button').should('not.exist')
    cy.testId('private-base-box').should('not.exist')
    cy.testId('create-resource-button').should('not.exist')
    cy.visit(`/bases/${defaultTestBaseSlug}/membres`)

    cy.testId('base-invite-member-button').should('not.exist')
    cy.testId('member-card').should('exist')

    cy.visit(`/bases/${defaultTestBaseSlug}/editer`)
    cy.appUrlShouldBe(`/bases/${defaultTestBaseSlug}`)
  })

  it('Acceptation 4 - Utilisateur connecté sur un base privée', () => {
    cleanUpAndCreateTestBase(false)
    const user = givenUser()
    cy.createUserAndSignin(user)

    cy.visit(`/bases/${defaultTestBaseSlug}`)
    cy.dsfrShouldBeStarted()
    cy.testId('empty-box').should('not.exist')
    cy.testId('base-edition-button').should('not.exist')
    cy.testId('private-base-box').should('exist')
    cy.testId('create-resource-button').should('not.exist')

    cy.visit(`/bases/${defaultTestBaseSlug}/membres`)

    cy.testId('base-invite-member-button').should('not.exist')
    cy.testId('member-card').should('not.exist')
    cy.testId('private-base-box').should('exist')

    cy.visit(`/bases/${defaultTestBaseSlug}/editer`)
    cy.appUrlShouldBe(`/bases/${defaultTestBaseSlug}`)
  })

  it('Acceptation 5 - Admin de la base', () => {
    cleanUpAndCreateTestBase(false)

    cy.testId('empty-box').should('exist')
    cy.testId('base-edition-button').should('exist')
    cy.testId('private-base-box').should('not.exist')
    cy.testId('create-resource-button').should('exist')

    cy.visit(`/bases/${defaultTestBaseSlug}/membres`)

    cy.testId('base-invite-member-button').should('exist')
    cy.testId('member-card').should('exist')

    cy.visit(`/bases/${defaultTestBaseSlug}/editer`)
    cy.appUrlShouldBe(`/bases/${defaultTestBaseSlug}/editer`)
    cy.testId('delete-base-button').should('exist')
  })

  it('Acceptation 6 - Membre de la base', () => {
    cleanUpAndCreateTestBaseAsMember(false)

    cy.testId('empty-box').should('exist')
    cy.testId('base-edition-button').should('exist')
    cy.testId('private-base-box').should('not.exist')
    cy.testId('create-resource-button').should('exist')

    cy.visit(`/bases/${defaultTestBaseSlug}/membres`)

    cy.testId('base-invite-member-button').should('exist')
    cy.testId('member-card').should('exist')

    cy.visit(`/bases/${defaultTestBaseSlug}/editer`)
    cy.appUrlShouldBe(`/bases/${defaultTestBaseSlug}/editer`)
    cy.testId('delete-base-button').should('not.exist')
  })
})
