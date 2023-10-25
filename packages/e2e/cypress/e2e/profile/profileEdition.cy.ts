import { v4 } from 'uuid'
import {
  createTestPublishResourceCommand,
  createTestResourceCommands,
} from '@app/e2e/support/helpers'
import { cleanUpAndCreateTestPublishedResourceInProfile } from '../resource/edition/editionTestUtils'

describe('Utilisateur connecté, je peux modifier mon profile', () => {
  beforeEach(() => {
    cy.intercept('/api/trpc/profile.mutate?*').as('mutation')
  })

  it('Acceptation 1 - Modification de la visibilité', () => {
    const id = v4()
    cleanUpAndCreateTestPublishedResourceInProfile(
      { isPublic: true, id },
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

    cy.visit(`/profils/${id}/modifier`)
    cy.dsfrShouldBeStarted()
    cy.testId('profile-visibility').should(
      'have.text',
      'Votre profil est public. Vous pouvez passer votre profil en privé si vous le souhaitez.',
    )

    cy.testId('edit-card-button').eq(0).click()

    cy.testId('visibility-radio-profile-private').click({ force: true })
    cy.testId('edit-card-save-button').click()
    cy.wait('@mutation')

    cy.testId('profile-visibility').should(
      'have.text',
      'Votre profil est privé. Vous pouvez passer votre profil en public si vous le souhaitez.',
    )
  })

  it('Acceptation 2 - Modification de la visibilité avec ressource publique', () => {
    const id = v4()
    cleanUpAndCreateTestPublishedResourceInProfile(
      { isPublic: true, id },
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
    cy.testId('resource-public-state-badge').should(
      'have.text',
      'Ressource publique',
    )

    cy.visit(`/profils/${id}/modifier`)
    cy.dsfrShouldBeStarted()

    cy.testId('profile-visibility').should(
      'have.text',
      'Votre profil est public. Vous pouvez passer votre profil en privé si vous le souhaitez.',
    )

    cy.testId('edit-card-button').eq(0).click()
    cy.testId('visibility-radio-profile-private').click({ force: true })
    cy.testId('edit-card-save-button').click()

    cy.testId('visibility-modal-continue-button').click()
    cy.wait('@mutation')

    cy.testId('profile-visibility').should(
      'have.text',
      'Votre profil est privé. Vous pouvez passer votre profil en public si vous le souhaitez.',
    )

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
    )
    cy.testId('resource-public-state-badge').should(
      'have.text',
      'Ressource privée',
    )
  })
})
