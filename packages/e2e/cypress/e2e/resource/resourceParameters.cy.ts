import { givenBase } from '@app/e2e/support/given/givenBase'
import {
  cleanUpAndCreateTestPublishedResource,
  cleanUpAndCreateTestPublishedResourceInProfile,
} from './edition/editionTestUtils'

describe('Utilisateur connecté, lorsque je modifie une ressource, je peux modifer ses parametres', () => {
  /**
   * US
   *  - https://www.notion.so/Board-edd4e7b2a95a4f2facd39c78a1e3a32f?p=19d213c74353488f8bb0ea21cfbb001c&pm=s
   */

  beforeEach(() => {
    cy.intercept('/api/trpc/resource.mutate?*').as('mutation')
    cy.deleteAllData()
  })

  it('Acceptation 1 - Je peux changer la visibilité de ma ressource', () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      signinAsResourceCreator: true,
      visitResourcePage: true,
    })
    cy.testId('resource-edition-button').filter(':visible').click()

    cy.testId('edition-action-bar-more-actions').click()
    cy.testId('edition-action-bar-parameters-modal').click()

    cy.testId('visibility').should(
      'have.text',
      'Visible uniquement par les membres de votre base et les contributeurs que vous avez invités.',
    )

    cy.testId('edit-card-button').eq(1).click()
    cy.testId('visibility-radio-resource-public').click({ force: true })
    cy.testId('edit-card-save-button').click()
    cy.wait('@mutation')

    cy.testId('visibility').should(
      'have.text',
      'Visible par tous les visiteurs.',
    )

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
    )
    cy.testId('resource-public-state-badge').should('have.text', 'Publique')
  })

  it('Acceptation 2 - Si je passe la ressource dans un profil privé, elle devient privée', () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      signinAsResourceCreator: true,
      visitResourcePage: true,
    })

    cy.testId('resource-edition-button').filter(':visible').click()

    cy.testId('edition-action-bar-more-actions').click()
    cy.testId('edition-action-bar-parameters-modal').click()

    cy.testId('visibility').should(
      'have.text',
      'Visible par tous les visiteurs.',
    )

    cy.testId('edit-card-button').eq(0).click()
    cy.testId('resource-base-profil').click({
      force: true,
    })

    cy.testId('edit-card-save-button').click()
    cy.wait('@mutation')

    cy.testId('visibility').should(
      'have.text',
      'Visible uniquement par vous et les contributeurs que vous avez invités.',
    )

    cy.testId('edit-card-button').eq(1).click()
    cy.testId('notice-private-profile').should('exist')
    cy.testId('visibility-radio-resource-public').should('be.disabled')
    cy.testId('visibility-radio-resource-public').should('not.be.checked')
    cy.testId('visibility-radio-resource-private').should('be.checked')

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
    )
    cy.testId('resource-public-state-badge').should('have.text', 'Privée')
  })

  it('Acceptation 2 bis - Resource publique dans un cas impossible', () => {
    cleanUpAndCreateTestPublishedResourceInProfile(
      { isPublic: true },
      true,
      ({ user }) => {
        const base = givenBase({ createdById: user.id, isPublic: false })
        cy.createBase(base)
      },
    )
    cy.testId('resource-edition-button').filter(':visible').click()

    cy.testId('edition-action-bar-more-actions').click()
    cy.testId('edition-action-bar-parameters-modal').click()

    cy.testId('visibility').should(
      'have.text',
      'Visible par tous les visiteurs.',
    )

    cy.testId('edit-card-button').eq(0).click()
    cy.testId('resource-base-0').click({ force: true })

    cy.testId('edit-card-save-button').click()
    cy.wait('@mutation')

    cy.testId('visibility').should(
      'have.text',
      'Visible uniquement par les membres de votre base et les contributeurs que vous avez invités.',
    )
    cy.testId('edit-card-button').eq(1).click()
    cy.testId('visibility-radio-resource-public').should('not.be.checked')
    cy.testId('visibility-radio-resource-private').should('be.checked')

    cy.testId('edit-card-save-button').click()
    cy.wait('@mutation')

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
    )
    cy.testId('resource-public-state-badge').should('have.text', 'Privée')
  })

  it('Acceptation 3 - Si je passe la ressource dans une base privé, elle devient privée', () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      signinAsResourceCreator: true,
      visitResourcePage: true,
      additionalSetup: ({ user }) => {
        const base = givenBase({ createdById: user.id, isPublic: false })
        cy.createBase({ ...base, slug: `${base.slug}-1` })
      },
    })

    cy.testId('resource-edition-button').filter(':visible').click()

    cy.testId('edition-action-bar-more-actions').click()
    cy.testId('edition-action-bar-parameters-modal').click()

    cy.testId('visibility').should(
      'have.text',
      'Visible par tous les visiteurs.',
    )

    cy.testId('edit-card-button').eq(0).click()
    cy.testId('resource-base-1').click({
      force: true,
    })

    cy.testId('edit-card-save-button').click()
    cy.wait('@mutation')

    cy.testId('visibility').should(
      'have.text',
      'Visible uniquement par les membres de votre base et les contributeurs que vous avez invités.',
    )

    cy.testId('edit-card-button').eq(1).click()
    cy.testId('notice-private-base').should('exist')
    cy.testId('visibility-radio-resource-public').should('be.disabled')

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
    )
    cy.testId('resource-public-state-badge').should('have.text', 'Privée')
  })

  it('Acceptation 4 - Je peux changer l’indexation de ma ressource', () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      signinAsResourceCreator: true,
      visitResourcePage: true,
    })
    cy.testId('resource-edition-button').filter(':visible').click()

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

    cy.testId('resource-indexation-themes-ActeursDuNumerique').should('exist')
    cy.testId('resource-indexation-supportTypes-Tutoriel').should('exist')
    cy.testId('resource-indexation-targetAudiences-Adultes').should('exist')
  })

  it("Acceptation 5 - Je peux changer la visibilité des avis pour qu'ils soient privés", () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      signinAsResourceCreator: true,
      visitResourcePage: true,
    })
    cy.testId('resource-edition-button').filter(':visible').click()

    cy.testId('edition-action-bar-more-actions').click()
    cy.testId('edition-action-bar-parameters-modal').click()

    cy.testId('resource-feedback').click()

    cy.wait('@mutation')

    cy.getToast(
      'Les avis sont désactivés pour la ressource Titre d’une ressource sur deux ligne très longues comme comme sur deux lignes',
    )
  })

  it('Acceptation 6 - Je peux supprimer ma ressource', () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      signinAsResourceCreator: true,
      visitResourcePage: true,
    })

    cy.testId('resource-edition-button').filter(':visible').click()

    cy.testId('edition-action-bar-more-actions').click()
    cy.testId('edition-action-bar-parameters-modal').click()

    cy.testId('delete-base-button').click()
    cy.testId('edition-action-bar-delete').click()
    cy.wait('@mutation')

    cy.appUrlShouldBe('/bases/pole-inclusion-numerique-tests-e2e')
    cy.request({
      url: '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
      followRedirect: false,
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(404)

      expect(resp.redirectedToUrl).to.be.undefined
    })
  })
})
