import { cleanUpAndCreateTestBase } from '../resource/edition/editionTestUtils'

describe('Utilisateur connecté, je peux modifier ma base', () => {
  /**
   * US
   *  - https://www.notion.so/Board-edd4e7b2a95a4f2facd39c78a1e3a32f?p=ecb4e3fda4e44f66a1ff64e88a54174b&pm=s
   */

  beforeEach(() => {
    cleanUpAndCreateTestBase()
    cy.intercept('/api/trpc/base.mutate?*').as('mutation')
    cy.visit('/bases/conseiller-numérique-france-services-contributions/editer')
    cy.dsfrShouldBeStarted()
  })

  it('Acceptation 1 - Modification des informations', () => {
    cy.testId('edit-card-button').eq(0).click()

    cy.testId('base-title-input').clear()
    cy.testId('base-title-input').type('La quete')
    cy.testId('base-department-select').select('93 - Seine-Saint-Denis')
    cy.testId('base-description-input').clear()
    cy.testId('base-description-input').type(
      "Ce qui compte c'est pas l'arrivée c'est la quete",
    )

    cy.testId('edit-card-save-button').click()
    cy.wait('@mutation')

    cy.testId('base-information-title').should('have.text', 'La quete')
    cy.testId('base-information-department').should(
      'have.text',
      '93 - Seine-Saint-Denis',
    )
    cy.testId('base-information-description').should(
      'have.text',
      "Ce qui compte c'est pas l'arrivée c'est la quete",
    )
  })

  it('Acceptation 2 - Modification des informations avec erreurs', () => {
    cy.testId('edit-card-button').eq(0).click()

    cy.testId('base-title-input').clear()

    cy.testId('edit-card-save-button').click()
    cy.get('[id=input-form-field__title__error]').should(
      'have.text',
      'Veuillez renseigner le nom de la base',
    )
  })

  it('Acceptation 3 - Modification des contacts', () => {
    cy.testId('edit-card-button').eq(1).click()

    cy.testId('base-email-input').clear()
    cy.testId('base-email-input').type('orel@s.an')
    cy.testId('base-website-input').type('https://website.fr')
    cy.testId('base-linkedin-input').type('https://linkedin.fr')
    cy.testId('base-twitter-input').type('https://twitter.fr')
    cy.testId('base-facebook-input').type('https://facebook.fr')

    cy.testId('edit-card-save-button').click()
    cy.wait('@mutation')

    cy.testId('base-contacts-email').should('have.text', 'orel@s.an')
    cy.testId('base-contacts-website').should('have.text', 'https://website.fr')
    cy.testId('base-contacts-linkedin').should(
      'have.text',
      'https://linkedin.fr',
    )
    cy.testId('base-contacts-twitter').should('have.text', 'https://twitter.fr')
    cy.testId('base-contacts-facebook').should(
      'have.text',
      'https://facebook.fr',
    )
  })

  it('Acceptation 4 - Modification des contacts avec erreurs', () => {
    cy.testId('edit-card-button').eq(1).click()

    cy.testId('base-email-input').clear()

    cy.testId('edit-card-save-button').click()
    cy.get('[id=input-form-field__email__error]').should(
      'have.text',
      'Veuillez entrer une adresse e-mail valide',
    )
  })

  it('Acceptation 5 - Modification de la visibilité', () => {
    cy.testId('base-visibility').should(
      'have.text',
      'Votre base est privée. Vous pouvez passez votre base en publique si vous le souhaitez.',
    )

    cy.testId('edit-card-button').eq(2).click()

    cy.testId('visibility-radio-base-public').click({ force: true })
    cy.testId('edit-card-save-button').click()
    cy.wait('@mutation')

    cy.testId('base-visibility').should(
      'have.text',
      'Votre base est publique. Vous pouvez passez votre base en privée si vous le souhaitez.',
    )
  })
})
