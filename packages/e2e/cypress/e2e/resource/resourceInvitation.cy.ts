import { appUrl, createTestUser } from '@app/e2e/support/helpers'
import { cleanUpAndCreateTestResource } from './edition/editionTestUtils'

describe('Utilisateur connecté, je peux inviter un autre membre à contribuer sur ma ressource', () => {
  /**
   * US
   *  - https://www.notion.so/Board-edd4e7b2a95a4f2facd39c78a1e3a32f?p=654091198cef4d4f9465861154383e0f&pm=s
   */

  beforeEach(() => {
    cy.intercept('/api/trpc/profile.getMatchingUsers?*').as('getUser')
    cy.intercept('/api/trpc/resourceContributor.delete?*').as('delete')
    cy.intercept('/api/trpc/resourceContributor.invite?*').as('invite')
  })

  it('Acceptation 1 - En tant que créateur je peux inviter un contributeur', () => {
    cleanUpAndCreateTestResource()
    const user = createTestUser({
      firstName: 'Alice',
      lastName: 'Contributrice',
    })
    cy.createUser(user)
    cy.dsfrCollapsesShouldBeBound()

    cy.testId('edition-action-bar-more-actions').click()
    cy.testId('edition-action-bar-invite-contributors-modal').click()

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
    cy.log('Go check emails in maildev server')
    // Go to maildev server to checkout the email and get the magic link
    cy.visit('localhost:1080')
    cy.get('.email-list li a').first().click()

    cy.get('.email-meta .subject').should(
      'contain',
      'Invitation à contribuer à la ressource',
    )

    // Cypress does not work well with iframes, we go to the html source of the email that is
    // included in the iframe preview of maildev ui
    cy.url().then((url) => {
      const emailPath = url.split('#').at(-1)
      if (!emailPath) {
        throw new Error('Could not find email content path from maildev url')
      }
      cy.visit(`localhost:1080${emailPath}/html`)
    })

    cy.log('Check mail contents')
    // We should not have the email html version in full
    cy.contains(
      'Vous êtes invité par Jean Biche à contribuer à la ressource Titre d’une ressource sur deux ligne très longues comme comme sur deux lignes.',
    )
    cy.contains('Voir la ressource').invoke('attr', 'target', '_self').click()
    cy.url().should(
      'equal',
      appUrl(
        '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
      ),
    )
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/editer',
    )
    cy.dsfrCollapsesShouldBeBound()

    cy.testId('edition-action-bar-more-actions').click()
    cy.testId('edition-action-bar-invite-contributors-modal').click()

    cy.testId('contributors-creator').should('exist')
    cy.testId('contributors-contributor').should('exist')
  })

  it('Acceptation 2 - En tant que créateur je peux supprimer un contributeur', () => {
    const contributor = createTestUser({
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

    cy.testId('edition-action-bar-more-actions').click()
    cy.testId('edition-action-bar-invite-contributors-modal').click()

    cy.testId('contributors-creator').should('exist')
    cy.testId('contributors-contributor').should('exist')
    cy.testId('remove-contributor-button').click()

    cy.wait('@delete')
    cy.testId('contributors-contributor').should('not.exist')

    cy.signin({ email: contributor.email })
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
    )

    cy.testId('resource-view').should('not.exist')
    cy.testId('resource-edition-button').should('not.exist')
    cy.testId('private-ressource-box').should('exist')
  })
})
