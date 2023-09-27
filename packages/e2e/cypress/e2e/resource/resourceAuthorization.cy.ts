import { v4 } from 'uuid'
import {
  appUrl,
  createTestBase,
  createTestPublishResourceCommand,
  createTestResourceCommands,
  createTestUser,
} from '@app/e2e/support/helpers'
import {
  cleanUp,
  cleanUpAndCreateTestPublishedResource,
} from './edition/editionTestUtils'

describe('Utilisateur sans droit, je ne peux ni voir et ni editer la ressource', () => {
  it('Acceptation 1 - Visiteur sur une ressource publique', () => {
    cleanUpAndCreateTestPublishedResource(true, true)
    cy.logout()

    cy.log('Je peux voir la ressource')
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
    )
    cy.dsfrShouldBeStarted()
    cy.testId('resource-view').should('exist')
    cy.testId('resource-edition-button').should(
      'have.text',
      'Demander à contribuer',
    )
    cy.testId('private-base-box').should('not.exist')

    cy.log('Je ne peux pas editer la ressource')
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/editer',
    )
    cy.url().should(
      'equal',
      appUrl(
        '/connexion?suivant=/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/editer',
      ),
    )

    cy.log('Je ne peux pas publier la ressource')
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/publier',
    )
    cy.url().should(
      'equal',
      appUrl(
        '/connexion?suivant=/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/publier',
      ),
    )
  })

  it('Acceptation 2 - Visiteur sur une ressource privée', () => {
    cleanUpAndCreateTestPublishedResource(true, false)
    cy.logout()

    cy.log('Je peux voir la ressource')
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
    )
    cy.dsfrShouldBeStarted()
    cy.testId('resource-view').should('not.exist')
    cy.testId('resource-edition-button').should('not.exist')
    cy.testId('private-ressource-box').should('exist')

    cy.log('Je ne peux pas editer la ressource')
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/editer',
    )
    cy.url().should(
      'equal',
      appUrl(
        '/connexion?suivant=/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/editer',
      ),
    )
    cy.log('Je ne peux pas publier la ressource')
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/publier',
    )
    cy.url().should(
      'equal',
      appUrl(
        '/connexion?suivant=/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/publier',
      ),
    )
  })

  it('Acceptation 3 - Utilisateur connecté sur une ressource publique', () => {
    cleanUpAndCreateTestPublishedResource(true, true)

    const user = createTestUser()
    cy.createUserAndSignin(user)

    cy.log('Je peux voir la ressource')
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
    )
    cy.dsfrShouldBeStarted()
    cy.testId('resource-view').should('exist')
    cy.testId('resource-edition-button').should(
      'have.text',
      'Demander à contribuer',
    )
    cy.testId('private-base-box').should('not.exist')

    cy.log('Je ne peux pas editer la ressource')
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/editer',
    )
    cy.url().should(
      'equal',
      appUrl(
        '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
      ),
    )

    cy.log('Je ne peux pas publier la ressource')
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/publier',
    )
    cy.url().should(
      'equal',
      appUrl(
        '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
      ),
    )
  })

  it('Acceptation 4 - Utilisateur connecté sur une ressource privée', () => {
    cleanUpAndCreateTestPublishedResource(true, false)

    const user = createTestUser()
    cy.createUserAndSignin(user)

    cy.log('Je peux voir la ressource')
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
    )
    cy.dsfrShouldBeStarted()
    cy.testId('resource-view').should('not.exist')
    cy.testId('resource-edition-button').should('not.exist')
    cy.testId('private-ressource-box').should('exist')

    cy.log('Je ne peux pas editer la ressource')
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/editer',
    )
    cy.url().should(
      'equal',
      appUrl(
        '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
      ),
    )
    cy.log('Je ne peux pas publier la ressource')
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/publier',
    )
    cy.url().should(
      'equal',
      appUrl(
        '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
      ),
    )
  })

  it('Acceptation 5 - Créateur', () => {
    cleanUpAndCreateTestPublishedResource(true, false)

    cy.log('Je peux voir la ressource')
    cy.testId('resource-view').should('exist')
    cy.testId('resource-edition-button').should('have.text', 'Modifier')
    cy.testId('private-base-box').should('not.exist')

    cy.log('Je peux editer la ressource')
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/editer',
    )
    cy.testId('resource-edition').should('exist')

    cy.log('Je peux publier la ressource')
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/publier',
    )
    cy.testId('resource-publication').should('exist')
  })

  it('Acceptation 6 - Membre de la base', () => {
    cleanUp()
    const creator = createTestUser()
    const member = createTestUser()
    cy.createUser(creator)
    cy.createUserAndSignin(member)

    const base = createTestBase(creator.id, false, [member.id])
    const id = v4()
    const commands = createTestResourceCommands({
      baseId: base.id,
      resourceId: id,
    })
    commands.push(createTestPublishResourceCommand(id, false))

    cy.createBase(base)
    cy.sendResourceCommands({ user: creator, commands }).then(({ slug }) => {
      cy.visit(`/ressources/${slug}`)
    })
    cy.dsfrShouldBeStarted()

    cy.log('Je peux voir la ressource')
    cy.testId('resource-view').should('exist')
    cy.testId('resource-edition-button').should('have.text', 'Modifier')
    cy.testId('private-base-box').should('not.exist')

    cy.log('Je peux editer la ressource')
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/editer',
    )
    cy.testId('resource-edition').should('exist')

    cy.log('Je peux publier la ressource')
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/publier',
    )
    cy.testId('resource-publication').should('exist')
  })
})
