import { appUrl } from '@app/e2e/support/helpers'
import { cleanUpAndCreateTestResource } from '../resource/edition/editionTestUtils'

describe('Utilisateur connecté, je peux supprimer une base', () => {
  /**
   * US
   *  - https://www.notion.so/Board-de-suivi-2ebf61391d7740968b955c8fa7ffa16d?p=0d04e68a2be14bffb948aa1c4efbd8cc&pm=s
   */

  beforeEach(() => {
    cleanUpAndCreateTestResource()
    cy.intercept('/api/trpc/base.delete?*').as('deleteMutation')
    cy.visit('/bases/conseiller-numérique-france-services-contributions/editer')
    cy.dsfrShouldBeStarted()
  })

  it('Acceptation 1 - le créateur de la base peut la supprimer', () => {
    cy.findByRole('dialog').should('not.exist')

    cy.testId('delete-base-button').click()
    cy.findByRole('dialog').should('exist')

    cy.testId('modal-delete-button').should('be.disabled')
    cy.testId('modal-input').type(
      'Conseiller numérique France Services - contribution',
    )
    cy.testId('modal-delete-button').should('be.disabled')
    cy.testId('modal-input').type('s')
    cy.testId('modal-delete-button').should('not.be.disabled')
    cy.testId('modal-delete-button').click()

    cy.wait('@deleteMutation')
    cy.url().should('equal', appUrl('/'))

    cy.request({
      url: '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
      followRedirect: false,
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(404)
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(resp.redirectedToUrl).to.be.undefined
    })

    cy.request({
      url: '/bases/conseiller-numérique-france-services-contributions',
      followRedirect: false,
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(404)
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(resp.redirectedToUrl).to.be.undefined
    })

    cy.request({
      url: '/bases/conseiller-numérique-france-services-contributions/editer',
      followRedirect: false,
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(404)
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(resp.redirectedToUrl).to.be.undefined
    })
    cy.get('#header-user-menu')
      .contains('Voir mon profil')
      .click({ force: true })

    cy.testId('ressources-menu-button').should(
      'have.text',
      'Mes ressources · 0',
    )
    cy.testId('bases-menu-button').should('have.text', 'Mes bases · 0')
  })
})
