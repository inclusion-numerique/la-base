import { cleanUp } from '../resource/edition/editionTestUtils'
import { appUrl } from 'cypress/support/helpers'

describe('Utilisateur connecté, lorsque je créé une base, je peux voir ses ressources', () => {
  /**
   * US
   *  - https://www.notion.so/Board-de-suivi-2ebf61391d7740968b955c8fa7ffa16d?p=d0721850f04a4913be642a3a106793ce&pm=s
   */

  beforeEach(() => {
    cleanUp()
  })

  it('Acceptation 1 - Création de base via profil', () => {
    cy.get('.fr-header__tools button[aria-controls="header-user-menu"]').click()
    cy.get('#header-user-menu').contains('Voir mon profil').click()

    cy.url().should('contain', appUrl('/profils/'))
    cy.testId('bases-menu-button').click()
    cy.testId('create-base-button').click()

    cy.url().should('equal', appUrl('/bases/creer'))
  })

  it('Acceptation 2 - création de base via menu déroulant', () => {
    cy.get('.fr-header__tools button[aria-controls="header-user-menu"]').click()
    cy.get('#header-user-menu').contains('Créer une base').click()

    cy.url().should('equal', appUrl('/bases/creer'))
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
    cy.get('[id=input-form-field__email__error]').should(
      'have.text',
      'Veuillez renseigner une adresse e-mail',
    )
    cy.get('[id=input-form-field__isPublic__error]').should(
      'have.text',
      'Veuillez spécifier la visibilité de la base',
    )
  })

  it('Acceptation 4 - Création de base valide', () => {
    cy.intercept('/api/trpc/base.create?*').as('mutation')
    cy.visit('/bases/creer')

    cy.testId('base-title-input').type('Ma déclaration')
    cy.testId('base-email-input').type('france@gall.fr')
    cy.testId('visibility-radio-base-public').click({ force: true })
    cy.testId('create-button').click()

    cy.wait('@mutation')
    cy.url().should('contain', appUrl(`/bases/ma-declaration`))
  })

  it('Acceptation 5 - Annulation de la création', () => {
    cy.visit('/bases/creer')

    cy.wait(1000)
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
})
