import { goToMostRecentEmailReceived } from '@app/e2e/e2e/goToMostRecentEmailReceived'
import {
  defaultTestBaseSlug,
  defaultTestBaseTitle,
} from '@app/e2e/support/given/givenBase'
import { givenUser } from '@app/e2e/support/given/givenUser'
import { appUrl } from '@app/e2e/support/helpers'
import {
  cleanUpAndCreateTestBase,
  cleanUpAndCreateTestBaseAsMember,
} from '../resource/edition/editionTestUtils'

describe("Utilisateur connecté, je peux gerer les membres d'une base", () => {
  /**
   * US
   *  - https://www.notion.so/Board-edd4e7b2a95a4f2facd39c78a1e3a32f?p=924133a33d914162bdd646c736074046&pm=s
   *  - https://www.notion.so/Board-edd4e7b2a95a4f2facd39c78a1e3a32f?p=37e7756b09e44ac9b7d3c8d2aa274e3b&pm=s
   */

  beforeEach(() => {
    cy.intercept('/api/trpc/profile.searchProfileForMember?*').as('getUser')
    cy.intercept('/api/trpc/baseMember.invite?*').as('invite')
    cy.intercept('/api/trpc/baseMember.accept?*').as('acceptInvitation')
  })

  it("Acceptation 1 - En tant qu'admin je peux inviter un admin", () => {
    cleanUpAndCreateTestBase()
    const user = givenUser()
    cy.createUser(user)

    cy.visit(`/bases/${defaultTestBaseSlug}/membres`)
    cy.testId('member-card').should('have.length', 1)
    cy.dsfrModalsShouldBeBound()
    cy.testId('base-invite-member-button').click()
    cy.testId('invite-member-modal-input').type('jean')
    cy.wait('@getUser')
    cy.testId('invite-member-modal-input-option-0').click()

    cy.testId('base-invite-member-role-select').click()
    cy.testId('base-invite-member-role-member').should('exist')
    cy.testId('base-invite-member-role-admin').should('exist')
    cy.testId('base-invite-member-role-admin').click()

    cy.testId('invite-member-modal-button').click()
    cy.wait('@invite')
    cy.testId('member-card').should('have.length', 1)

    goToMostRecentEmailReceived({
      subjectInclude: 'Invitation à rejoindre la base',
    })

    cy.log('Check mail contents')
    // We should not have the email html version in full
    cy.contains(
      `Vous êtes invité par Jean Biche à rejoindre la base ${defaultTestBaseTitle}.`,
    )
    cy.contains("Voir l'invitation")
      .invoke('attr', 'href')
      .then((href: string | undefined) => {
        if (!href) throw new Error('No invitation URL found in email')
        const emailLinkHref = href.replace(appUrl(''), '')
        cy.contains("Voir l'invitation")
          .invoke('attr', 'target', '_self')
          .click()
        cy.url().should('contain', appUrl('/invitations/base/'))
        cy.signin({ email: user.email })
        cy.reload()
        cy.appUrlShouldBe(emailLinkHref)
        cy.testId('base-invitation-accept-button').click()
        cy.wait('@acceptInvitation')
        cy.visit(`/bases/${defaultTestBaseSlug}/membres`)
        cy.testId('member-card').should('have.length', 2)
      })
  })

  it("Acceptation 2 - En tant qu'admin je peux changer le role d'un membre", () => {
    cleanUpAndCreateTestBase()
    const user = givenUser({
      firstName: 'Alice',
      lastName: 'Membre',
    })
    cy.createUser(user)
    cy.inviteUserToBase(user, defaultTestBaseSlug)

    cy.visit(`/bases/${defaultTestBaseSlug}/membres`)

    cy.testId('member-card').should('have.length', 2)
    cy.testId('remove-member-button').should('have.length', 1)

    cy.testId('member-card-role-select').should('have.value', 'member')
    cy.testId('member-card-role-select').select('admin')

    cy.testId('member-card').should('have.length', 2)
    cy.testId('member-card-role-select').eq(0).should('have.value', 'admin')
    cy.testId('user-session-member-card-role').should(
      'have.text',
      'Administrateur',
    )

    cy.testId('member-card').should('have.length', 2)
    cy.testId('remove-member-button').should('have.length', 1)
    cy.testId('member-card-role-select').eq(0).should('have.value', 'admin')
    cy.testId('user-session-member-card-role').should(
      'have.text',
      'Administrateur',
    )
  })

  it('Acceptation 3 - En tant que membre je peux inviter un membre', () => {
    cleanUpAndCreateTestBaseAsMember()
    const user = givenUser()
    cy.createUser(user)

    cy.visit(`/bases/${defaultTestBaseSlug}/membres`)

    cy.testId('member-card').should('have.length', 2)
    cy.dsfrModalsShouldBeBound()
    cy.testId('base-invite-member-button').click()
    cy.testId('invite-member-modal-input').type('jean')
    cy.wait('@getUser')
    cy.testId('invite-member-modal-input-option-0').click()

    cy.testId('base-invite-member-role-select').click()

    cy.testId('base-invite-member-role-member').should('exist')
    cy.testId('base-invite-member-role-admin').should('not.exist')
    cy.testId('base-invite-member-role-member').click()

    cy.testId('invite-member-modal-button').click()

    cy.wait('@invite')

    goToMostRecentEmailReceived({
      subjectInclude: 'Invitation à rejoindre la base',
    })

    cy.log('Check mail contents')
    // We should not have the email html version in full
    cy.contains(
      `Vous êtes invité par Jean Biche à rejoindre la base ${defaultTestBaseTitle}.`,
    )
    cy.contains("Voir l'invitation")
      .invoke('attr', 'href')
      .then((href: string | undefined) => {
        if (!href) throw new Error('No invitation URL found in email')
        const emailLinkHref = href.replace(appUrl(''), '')
        cy.contains("Voir l'invitation")
          .invoke('attr', 'target', '_self')
          .click()
        cy.url().should('contain', appUrl('/invitations/base/'))
        cy.signin({ email: user.email })
        cy.reload()
        cy.appUrlShouldBe(emailLinkHref)
        cy.testId('base-invitation-accept-button').click()
        cy.wait('@acceptInvitation')
        cy.visit(`/bases/${defaultTestBaseSlug}/membres`)
        cy.testId('member-card').should('have.length', 3)
      })
  })
})
