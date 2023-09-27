import { appUrl, createTestUser } from '@app/e2e/support/helpers'
import {
  cleanUpAndCreateTestBase,
  cleanUpAndCreateTestBaseAsMember,
} from '@app/e2e/e2e/resource/edition/editionTestUtils'

describe('Utilisateur sans droit, je ne peux ni voir et ni editer la base', () => {
  it('Acceptation 1 - Visiteur sur un base publique', () => {
    cleanUpAndCreateTestBase(true)
    cy.logout()

    cy.visit('/bases/conseiller-numérique-france-services-contributions')
    cy.dsfrShouldBeStarted()
    cy.testId('empty-box').should('exist')
    cy.testId('base-edition-button').should('not.exist')
    cy.testId('private-base-box').should('not.exist')
    cy.testId('create-resource-button').should('not.exist')

    cy.visit(
      '/bases/conseiller-numérique-france-services-contributions/membres',
    )
    cy.testId('base-invite-member-button').should('not.exist')
    cy.testId('member-card-admin').should('not.exist')
    cy.testId('profile-card').should('exist')

    cy.visit('/bases/conseiller-numérique-france-services-contributions/editer')
    cy.url().should(
      'equal',
      appUrl(
        '/connexion?suivant=/bases/conseiller-numérique-france-services-contributions/editer',
      ),
    )
  })

  it('Acceptation 2 - Visiteur sur un base privée', () => {
    cleanUpAndCreateTestBase(false)
    cy.logout()

    cy.visit('/bases/conseiller-numérique-france-services-contributions')
    cy.dsfrShouldBeStarted()
    cy.testId('empty-box').should('not.exist')
    cy.testId('base-edition-button').should('not.exist')
    cy.testId('private-base-box').should('exist')
    cy.testId('create-resource-button').should('not.exist')

    cy.visit(
      '/bases/conseiller-numérique-france-services-contributions/membres',
    )
    cy.testId('base-invite-member-button').should('not.exist')
    cy.testId('member-card-admin').should('not.exist')
    cy.testId('profile-card').should('not.exist')
    cy.testId('private-base-box').should('exist')

    cy.visit('/bases/conseiller-numérique-france-services-contributions/editer')
    cy.url().should(
      'equal',
      appUrl(
        '/connexion?suivant=/bases/conseiller-numérique-france-services-contributions/editer',
      ),
    )
  })
  it('Acceptation 3 - Utilisateur connecté sur un base publique', () => {
    cleanUpAndCreateTestBase(true)
    const user = createTestUser()
    cy.createUserAndSignin(user)

    cy.visit('/bases/conseiller-numérique-france-services-contributions')
    cy.dsfrShouldBeStarted()
    cy.testId('empty-box').should('exist')
    cy.testId('base-edition-button').should('not.exist')
    cy.testId('private-base-box').should('not.exist')
    cy.testId('create-resource-button').should('not.exist')

    cy.visit(
      '/bases/conseiller-numérique-france-services-contributions/membres',
    )
    cy.testId('base-invite-member-button').should('not.exist')
    cy.testId('member-card-admin').should('not.exist')
    cy.testId('profile-card').should('exist')

    cy.visit('/bases/conseiller-numérique-france-services-contributions/editer')
    cy.url().should(
      'equal',
      appUrl('/bases/conseiller-numérique-france-services-contributions'),
    )
  })

  it('Acceptation 4 - Utilisateur connecté sur un base privée', () => {
    cleanUpAndCreateTestBase(false)
    const user = createTestUser()
    cy.createUserAndSignin(user)

    cy.visit('/bases/conseiller-numérique-france-services-contributions')
    cy.dsfrShouldBeStarted()
    cy.testId('empty-box').should('not.exist')
    cy.testId('base-edition-button').should('not.exist')
    cy.testId('private-base-box').should('exist')
    cy.testId('create-resource-button').should('not.exist')

    cy.visit(
      '/bases/conseiller-numérique-france-services-contributions/membres',
    )
    cy.testId('base-invite-member-button').should('not.exist')
    cy.testId('member-card-admin').should('not.exist')
    cy.testId('profile-card').should('not.exist')
    cy.testId('private-base-box').should('exist')

    cy.visit('/bases/conseiller-numérique-france-services-contributions/editer')
    cy.url().should(
      'equal',
      appUrl('/bases/conseiller-numérique-france-services-contributions'),
    )
  })

  it('Acceptation 5 - Admin de la base', () => {
    cleanUpAndCreateTestBase(false)

    cy.testId('empty-box').should('exist')
    cy.testId('base-edition-button').should('exist')
    cy.testId('private-base-box').should('not.exist')
    cy.testId('create-resource-button').should('exist')

    cy.visit(
      '/bases/conseiller-numérique-france-services-contributions/membres',
    )
    cy.testId('base-invite-member-button').should('exist')
    cy.testId('member-card-admin').should('exist')
    cy.testId('profile-card').should('not.exist')

    cy.visit('/bases/conseiller-numérique-france-services-contributions/editer')
    cy.url().should(
      'equal',
      appUrl(
        '/bases/conseiller-numérique-france-services-contributions/editer',
      ),
    )
    cy.testId('delete-base-button').should('exist')
  })

  it('Acceptation 5 - Membre de la base', () => {
    cleanUpAndCreateTestBaseAsMember(false)

    cy.testId('empty-box').should('exist')
    cy.testId('base-edition-button').should('exist')
    cy.testId('private-base-box').should('not.exist')
    cy.testId('create-resource-button').should('exist')

    cy.visit(
      '/bases/conseiller-numérique-france-services-contributions/membres',
    )
    cy.testId('base-invite-member-button').should('exist')
    cy.testId('member-card-admin').should('not.exist')
    cy.testId('profile-card').should('exist')

    cy.visit('/bases/conseiller-numérique-france-services-contributions/editer')
    cy.url().should(
      'equal',
      appUrl(
        '/bases/conseiller-numérique-france-services-contributions/editer',
      ),
    )
    cy.testId('delete-base-button').should('not.exist')
  })
})
