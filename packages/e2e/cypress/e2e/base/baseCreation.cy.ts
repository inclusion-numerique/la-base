import { givenUser } from '@app/e2e/support/given/givenUser'
import { appUrl } from '@app/e2e/support/helpers'
import { goToMostRecentEmailReceived } from '../goToMostRecentEmailReceived'
import { cleanUp } from '../resource/edition/editionTestUtils'

describe('Utilisateur connecté, lorsque je créé une base, je peux voir ses ressources', () => {
  /**
   * US
   *  - https://www.notion.so/Board-de-suivi-2ebf61391d7740968b955c8fa7ffa16d?p=d0721850f04a4913be642a3a106793ce&pm=s
   */

  beforeEach(() => {
    cleanUp()
    cy.intercept('/api/trpc/baseMember.accept?*').as('acceptInvitation')
  })

  it('Acceptation 1 - Création de base via profil', () => {
    cy.get('.fr-header__tools button[aria-controls="header_user_menu"]')
      .filter(':visible')
      .click()

    cy.get('.fr-dropdown__pane')
      .filter(':visible')
      .contains('Voir mon profil')
      .click()

    cy.url().should('contain', appUrl('/profils/'))
    cy.testId('bases-menu-button').click()
    cy.testId('create-base-button').click()

    cy.appUrlShouldBe('/bases/creer')
  })

  it('Acceptation 2 - création de base via menu déroulant', () => {
    cy.get('.fr-header__tools button[aria-controls="header_user_menu"]')
      .filter(':visible')
      .click()

    cy.get('.fr-dropdown__pane')
      .filter(':visible')
      .contains('Créer une base')
      .click()

    cy.appUrlShouldBe('/bases/creer')
  })

  it('Acceptation 3 - tentative de création de base avec mauvaise validation', () => {
    cy.visit('/bases/creer')

    cy.scrollTo('bottom')
    cy.positionToViewport('base-title-input', 'above')
    cy.testId('create-button').click()

    cy.positionToViewport('base-title-input', 'inside')
    cy.get('[id=input-form-field__title__error]').should(
      'have.text',
      'Veuillez renseigner le nom de la base',
    )
    // Default value is selected by default
    cy.get('[id=input-form-field__isPublic__error]').should('not.exist')
  })

  it('Acceptation 4 - Création de base valide', () => {
    cy.intercept('/api/trpc/base.create?*').as('mutation')
    cy.visit('/bases/creer')

    cy.testId('base-title-input').type('Ma déclaration')
    cy.testId('visibility-radio-base-public').click({ force: true })
    cy.testId('create-button').click()

    cy.wait('@mutation')
    cy.url().should('contain', appUrl('/bases/ma-declaration'))

    cy.visit('/bases/ma-declaration/membres')
    cy.testId('base-invite-member-button').should('exist')
  })

  it('Acceptation 5 - Annulation de la création', () => {
    cy.visit('/bases/creer')

    cy.dsfrCollapsesShouldBeBound()
    cy.findByRole('dialog').should('not.exist')
    cy.testId('cancel-button').click()

    cy.findByRole('dialog').as('modal')
    cy.get('@modal').contains('Annuler la création de la base')
    cy.testId('back-modal-button').click()
    cy.findByRole('dialog').should('not.exist')
    cy.url().should('contain', appUrl(`/bases/creer`))

    cy.testId('cancel-button').click()
    cy.testId('cancel-modal-button').click()
    cy.url().should('contain', appUrl(`/`))
  })

  it('Acceptation 6 - tentative de création de base avec mauvaises adresses', () => {
    cy.visit('/bases/creer')

    cy.testId('base-title-input').type('Ma déclaration')
    cy.testId('visibility-radio-base-public').click({ force: true })

    cy.testId('invite-member-modal-input').type('t{enter}')

    cy.testId('create-button').click()

    cy.testId('invite-members-error').should(
      'have.text',
      'Merci de vérifier la liste des profils que vous souhaitez inviter.',
    )
  })

  it.only('Acceptation 7 - Création de base avec membres', () => {
    cy.intercept('/api/trpc/profile.searchProfileForMember?*').as('getUser')

    cy.visit('/bases/creer')
    const user = givenUser({ firstName: 'Leila', lastName: 'Huissoud' })
    cy.createUser(user)

    cy.dsfrModalsShouldBeBound()
    cy.testId('base-title-input').type('Ma déclaration')
    cy.testId('visibility-radio-base-public').click({ force: true })

    cy.testId('invite-member-modal-input').type('huissoud')
    cy.wait('@getUser')
    cy.testId('invite-member-modal-input-option-0').click()

    cy.testId('create-button').click()
    cy.visit('/bases/ma-declaration/membres')

    // Leila Huissoud + Jean Biche
    cy.testId('member-card').should('have.length', 2)

    goToMostRecentEmailReceived({
      subjectInclude: 'Invitation à rejoindre la base',
    })

    cy.log('Check mail contents')
    // We should not have the email html version in full
    cy.contains(
      'Vous êtes invité par Jean Biche à rejoindre la base Ma déclaration.',
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
        cy.visit(`/bases/ma-declaration/membres`)
        cy.testId('member-card').should('have.length', 2)
      })
  })
})
