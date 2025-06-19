import {
  createTestPublishResourceCommand,
  createTestResourceCommands,
} from '@app/e2e/support/given/givenResourceCommands'
import { v4 } from 'uuid'
import { cleanUpAndCreateTestPublishedResourceInProfile } from '../resource/edition/editionTestUtils'

describe('Utilisateur connecté, je peux modifier mon profile', () => {
  beforeEach(() => {
    cy.intercept('/api/trpc/profile.updateVisibility?*').as('mutation')
  })

  it('Acceptation 1 - Modification de la visibilité', () => {
    const {
      user: { slug },
    } = cleanUpAndCreateTestPublishedResourceInProfile(
      { isPublic: true },
      false,
      ({ user }) => {
        const resourceId = v4()
        const commands = createTestResourceCommands({
          resourceId,
        })
        commands.push(createTestPublishResourceCommand(resourceId, false))
        cy.sendResourceCommands({ user, commands })
      },
    )

    cy.visit(`/profils/${slug}/modifier`)
    cy.dsfrShouldBeStarted()
    cy.testId('visibility').should(
      'have.text',
      'Tout le monde peut vous suivre et visiter votre page profil pour y retrouver vos contenus publics.',
    )

    cy.testId('visibilite-edit-card-button').eq(0).click()

    cy.testId('visibility-radio-profile-private').click({ force: true })
    cy.testId('editable-card-form-save-button').click()
    cy.wait('@mutation')

    cy.testId('visibility').should(
      'have.text',
      'Les contenus & informations de votre page profil sont masqués aux visiteurs.',
    )
  })

  it('Acceptation 2 - Modification de la visibilité avec ressource publique', () => {
    const {
      user: { slug },
    } = cleanUpAndCreateTestPublishedResourceInProfile(
      { isPublic: true },
      true,
      ({ user }) => {
        const resourceId = v4()
        const commands = createTestResourceCommands({
          resourceId,
        })
        commands.push(createTestPublishResourceCommand(resourceId, false))
        cy.sendResourceCommands({ user, commands })
      },
    )
    cy.testId('resource-public-state-badge').should('have.text', 'Publique')

    cy.visit(`/profils/${slug}/modifier`)
    cy.dsfrShouldBeStarted()

    cy.testId('visibility').should(
      'have.text',
      'Tout le monde peut vous suivre et visiter votre page profil pour y retrouver vos contenus publics.',
    )

    cy.testId('visibilite-edit-card-button').eq(0).click()
    cy.testId('visibility-radio-profile-private').click({ force: true })
    cy.testId('editable-card-form-save-button').click()

    cy.testId('visibility-modal-continue-button').click()
    cy.wait('@mutation')

    cy.testId('visibility').should(
      'have.text',
      'Les contenus & informations de votre page profil sont masqués aux visiteurs.',
    )

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
    )
    cy.testId('resource-public-state-badge').should('have.text', 'Privée')
  })
})
