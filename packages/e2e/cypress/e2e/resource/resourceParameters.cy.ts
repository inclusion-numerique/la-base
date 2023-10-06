import { createTestBase } from '@app/e2e/support/helpers'
import { cleanUpAndCreateTestPublishedResource } from './edition/editionTestUtils'

describe('Utilisateur connecté, lorsque je modifie une ressource, je peux modifer ses parametres', () => {
  /**
   * US
   *  - https://www.notion.so/Board-edd4e7b2a95a4f2facd39c78a1e3a32f?p=19d213c74353488f8bb0ea21cfbb001c&pm=s
   */

  beforeEach(() => {
    cy.intercept('/api/trpc/resource.mutate?*').as('mutation')
  })

  it('Acceptation 1 - Je peux changer la visibilité de ma ressource', () => {
    cleanUpAndCreateTestPublishedResource(true)
    cy.testId('resource-edition-button').click()

    cy.testId('edition-action-bar-more-actions').click()
    cy.testId('edition-action-bar-parameters-modal').click()

    cy.testId('resource-visibility').should(
      'have.text',
      'Votre ressource est privée. Vous pouvez passez votre ressource en publique si vous le souhaitez.',
    )

    cy.testId('edit-card-button').eq(1).click()
    cy.testId('visibility-radio-resource-public').click({ force: true })
    cy.testId('edit-card-save-button').click()
    cy.wait('@mutation')

    cy.testId('resource-visibility').should(
      'have.text',
      'Votre ressource est publique. Vous pouvez passez votre ressource en privée si vous le souhaitez.',
    )

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
    )
    cy.testId('resource-public-state-badge').should(
      'have.text',
      'Ressource publique',
    )
  })

  it('Acceptation 2 - Si je passe la ressource dans un profil privé, elle devient privée', () => {
    cleanUpAndCreateTestPublishedResource(true, true)
    cy.testId('resource-edition-button').click()

    cy.testId('edition-action-bar-more-actions').click()
    cy.testId('edition-action-bar-parameters-modal').click()

    cy.testId('resource-visibility').should(
      'have.text',
      'Votre ressource est publique. Vous pouvez passez votre ressource en privée si vous le souhaitez.',
    )

    cy.testId('edit-card-button').eq(0).click()
    cy.testId('resource-base-profil').click({
      force: true,
    })

    cy.testId('edit-card-save-button').click()
    cy.wait('@mutation')

    cy.testId('resource-visibility').should(
      'have.text',
      'Votre ressource est privée. Vous pouvez passez votre ressource en publique si vous le souhaitez.',
    )

    cy.testId('edit-card-button').eq(1).click()
    cy.testId('notice-private-profile').should('exist')
    cy.testId('visibility-radio-resource-public').should('be.disabled')

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
    )
    cy.testId('resource-public-state-badge').should(
      'have.text',
      'Ressource privée',
    )
  })

  it('Acceptation 3 - Si je passe la ressource dans une base privé, elle devient privée', () => {
    cleanUpAndCreateTestPublishedResource(true, true, ({ user }) => {
      const base = createTestBase(user.id, false)
      cy.createBase({ ...base, slug: `${base.slug}-1` })
    })
    cy.testId('resource-edition-button').click()

    cy.testId('edition-action-bar-more-actions').click()
    cy.testId('edition-action-bar-parameters-modal').click()

    cy.testId('resource-visibility').should(
      'have.text',
      'Votre ressource est publique. Vous pouvez passez votre ressource en privée si vous le souhaitez.',
    )

    cy.testId('edit-card-button').eq(0).click()
    cy.testId('resource-base-1').click({
      force: true,
    })

    cy.testId('edit-card-save-button').click()
    cy.wait('@mutation')

    cy.testId('resource-visibility').should(
      'have.text',
      'Votre ressource est privée. Vous pouvez passez votre ressource en publique si vous le souhaitez.',
    )

    cy.testId('edit-card-button').eq(1).click()
    cy.testId('notice-private-base').should('exist')
    cy.testId('visibility-radio-resource-public').should('be.disabled')

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
    )
    cy.testId('resource-public-state-badge').should(
      'have.text',
      'Ressource privée',
    )
  })

  it("Acceptation 4 - Je peux changer l'indexation de ma ressource", () => {
    cleanUpAndCreateTestPublishedResource(true, true)
    cy.testId('resource-edition-button').click()

    cy.testId('edition-action-bar-more-actions').click()
    cy.testId('edition-action-bar-parameters-modal').click()

    cy.testId('resource-empty-indexation').should('not.exist')
    cy.testId('edit-card-button').eq(2).click()

    // Remove existing indexation values created with cleanUpAndCreateTestPublishedResource()
    cy.testId('indexation-themes-select-DemarchesEtServicesEnLigne').click()
    cy.testId('indexation-support-types-select-Article').click()
    cy.testId('indexation-targetAudiences-select-Particuliers').click()
    cy.testId('indexation-targetAudiences-select-AidantsNumeriques').click()

    cy.testId('edit-card-save-button').click()
    cy.wait('@mutation')

    cy.testId('resource-empty-indexation').should('exist')
    cy.testId('edit-card-button').eq(2).click()
    cy.testId('indexation-themes-select').select('ActeursDuNumerique')
    cy.testId('indexation-support-types-select').select('Tutoriel')
    cy.testId('indexation-targetAudiences-select').select('Adultes')
    cy.testId('edit-card-save-button').click()
    cy.wait('@mutation')

    cy.testId('resource-empty-indexation').should('not.exist')
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
    )

    cy.testId('resource-indexation-Thématiques-Acteurs du numérique').should(
      'exist',
    )
    cy.testId('resource-indexation-Type de support-Tutoriel').should('exist')
    cy.testId('resource-indexation-Publics cibles-Adultes').should('exist')
  })

  it('Acceptation 5 - Je peux changer supprimer ma ressource', () => {
    cleanUpAndCreateTestPublishedResource(true)
    cy.testId('resource-edition-button').click()

    cy.testId('edition-action-bar-more-actions').click()
    cy.testId('edition-action-bar-parameters-modal').click()

    cy.testId('delete-base-button').click()
    cy.testId('edition-action-bar-delete').click()
    cy.wait('@mutation')

    cy.appUrlShouldBe('/')
    cy.request({
      url: '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
      followRedirect: false,
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(404)
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(resp.redirectedToUrl).to.be.undefined
    })
  })
})
