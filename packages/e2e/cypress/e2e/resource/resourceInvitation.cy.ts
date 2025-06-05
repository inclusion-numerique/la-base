import { goToMostRecentEmailReceived } from '@app/e2e/e2e/goToMostRecentEmailReceived'
import { givenUser } from '@app/e2e/support/given/givenUser'
import { cleanUpAndCreateTestResource } from './edition/editionTestUtils'

describe('Utilisateur connecté, je peux inviter un autre membre à contribuer sur ma ressource', () => {
  /**
   * US
   *  - https://www.notion.so/Board-edd4e7b2a95a4f2facd39c78a1e3a32f?p=654091198cef4d4f9465861154383e0f&pm=s
   */

  beforeEach(() => {
    cy.intercept('/api/trpc/profile.searchProfileForMember?*').as('getUser')
    cy.intercept('/api/trpc/resourceContributor.delete?*').as('delete')
    cy.intercept('/api/trpc/resourceContributor.invite?*').as('invite')
  })

  it.skip('Acceptation 1 - En tant que créateur je peux inviter un contributeur', () => {
    cleanUpAndCreateTestResource()
    const user = givenUser({
      firstName: 'Alice',
      lastName: 'Contributrice',
    })
    cy.createUser(user)
    cy.dsfrCollapsesShouldBeBound()

    cy.testId('edition-action-bar-more-actions').click()
    cy.testId('open-invite-contributor-modal-button').click()

    cy.testId('contributors-creator').should('exist')
    cy.testId('contributors-contributor').should('not.exist')
    cy.testId('invite-member-modal-input').should('be.visible')

    cy.testId('invite-member-modal-input').focus()
    cy.testId('invite-member-modal-input').type('Alice')
    cy.wait('@getUser')
    cy.testId('invite-member-modal-input-option-0').click()

    cy.testId('invite-member-modal-button').click()
    cy.wait('@invite')
    cy.signin({ email: user.email })

    goToMostRecentEmailReceived({
      subjectInclude: 'Invitation à contribuer à la ressource',
    })

    cy.log('Check mail contents')
    // We should not have the email html version in full
    cy.contains(
      'Vous êtes invité par Jean Biche à contribuer à la ressource Titre d’une ressource sur deux ligne très longues comme comme sur deux lignes.',
    )
    cy.contains('Voir la ressource').invoke('attr', 'target', '_self').click()
    cy.appUrlShouldBe(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
    )
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/editer',
    )
    cy.dsfrCollapsesShouldBeBound()
    cy.dsfrModalsShouldBeBound()

    cy.testId('edition-action-bar-more-actions').click()
    cy.testId('open-invite-contributor-modal-button').click()

    cy.testId('contributors-creator').should('exist')
    cy.testId('contributors-contributor').should('exist')
  })

  it('Acceptation 2 - En tant que créateur je peux supprimer un contributeur', () => {
    const contributor = givenUser({
      firstName: 'Alice',
      lastName: 'Contributrice',
    })

    cleanUpAndCreateTestResource(false, () => {
      cy.createUser(contributor)
      cy.inviteUserToResource(
        contributor,
        'titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
      )
    })

    cy.dsfrCollapsesShouldBeBound()
    cy.dsfrModalsShouldBeBound()

    cy.testId('edition-action-bar-more-actions').click()
    cy.testId('open-invite-contributor-modal-button').click()

    cy.testId('contributors-creator').should('exist')
    cy.testId('contributors-contributor').should('exist')
    cy.testId('remove-contributor-button').click()

    cy.wait('@delete')
    cy.testId('contributors-contributor').should('not.exist')

    cy.signin({ email: contributor.email })

    // Expect 404, private draft resource is not reachable
    cy.request({
      url: '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
      failOnStatusCode: false,
    })
      .its('status')
      .should('equal', 404)
  })
})
