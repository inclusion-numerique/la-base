import {
  defaultTestBaseSlug,
  defaultTestBaseTitle,
} from '@app/e2e/support/given/givenBase'
import { cleanUpAndCreateTestResource } from '../resource/edition/editionTestUtils'

describe('Utilisateur connecté, je peux supprimer une base', () => {
  /**
   * US
   *  - https://www.notion.so/Board-de-suivi-2ebf61391d7740968b955c8fa7ffa16d?p=0d04e68a2be14bffb948aa1c4efbd8cc&pm=s
   */

  beforeEach(() => {
    cleanUpAndCreateTestResource()
    cy.intercept('/api/trpc/base.delete?*').as('deleteMutation')
    cy.visit(`/bases/${defaultTestBaseSlug}/editer`)
    cy.dsfrShouldBeStarted()
  })

  it('Acceptation 1 - le créateur de la base peut la supprimer', () => {
    const { user } = cleanUpAndCreateTestResource()
    cy.intercept('/api/trpc/base.delete?*').as('deleteMutation')
    cy.visit(`/bases/${defaultTestBaseSlug}/editer`)
    cy.dsfrShouldBeStarted()

    cy.get('#delete-base').should('not.be.visible')

    cy.testId('delete-base-button').click()
    cy.get('#delete-base').should('be.visible')

    const truncatedTitle = defaultTestBaseTitle.slice(0, -1)
    const lastChar = defaultTestBaseTitle.slice(-1)

    cy.testId('modal-delete-button').should('be.disabled')
    cy.testId('modal-input').type(truncatedTitle)
    cy.testId('modal-delete-button').should('be.disabled')
    cy.testId('modal-input').type(lastChar)
    cy.testId('modal-delete-button').should('not.be.disabled')
    cy.testId('modal-delete-button').click()

    cy.wait('@deleteMutation')
    cy.appUrlShouldBe(`/profils/${user.slug}/bases`)

    cy.request({
      url: '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
      followRedirect: false,
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(404)

      expect(resp.redirectedToUrl).to.be.undefined
    })

    cy.request({
      url: `/bases/${defaultTestBaseSlug}`,
      followRedirect: false,
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(404)

      expect(resp.redirectedToUrl).to.be.undefined
    })

    cy.request({
      url: `/bases/${defaultTestBaseSlug}/editer`,
      followRedirect: false,
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(404)

      expect(resp.redirectedToUrl).to.be.undefined
    })
    cy.get('#header_user_menu')
      .contains('Voir mon profil')
      .click({ force: true })

    cy.testId('ressources-menu-button').should(
      'have.text',
      'Mes ressources · 0',
    )
    cy.testId('bases-menu-button').should('have.text', 'Mes bases · 0')
  })
})
