import { v4 } from 'uuid'
import { givenUser } from '@app/e2e/support/given/givenUser'
import { givenBase } from '@app/e2e/support/given/givenBase'
import {
  createTestPublishResourceCommand,
  createTestResourceCommands,
} from '@app/e2e/support/given/givenResourceCommands'
import {
  cleanUp,
  cleanUpAndCreateTestPublishedResource,
} from './edition/editionTestUtils'

describe('Utilisateur sans droit, je ne peux ni voir et ni editer la ressource', () => {
  it('Acceptation 1 - Visiteur sur une ressource publique', () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      signinAsResourceOwner: true,
      visitResourcePage: true,
    })

    cy.logout()

    cy.log('Je peux voir la ressource')
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
    )
    cy.dsfrShouldBeStarted()
    cy.testId('resource-view').should('exist')
    cy.testId('resource-edition-button').should('not.exist')
    cy.testId('private-base-box').should('not.exist')

    cy.log('Je ne peux pas editer la ressource')
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/editer',
    )
    cy.appUrlShouldBe(
      '/connexion?suivant=/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/editer',
    )

    cy.log('Je ne peux pas publier la ressource')
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/publier',
    )
    cy.appUrlShouldBe(
      '/connexion?suivant=/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/publier',
    )
  })

  it('Acceptation 2 - Visiteur sur une ressource privée', () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      signinAsResourceOwner: true,
      visitResourcePage: true,
    })
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
    cy.appUrlShouldBe(
      '/connexion?suivant=/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/editer',
    )
    cy.log('Je ne peux pas publier la ressource')
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/publier',
    )
    cy.appUrlShouldBe(
      '/connexion?suivant=/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/publier',
    )
  })

  it('Acceptation 3 - Utilisateur connecté sur une ressource publique', () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      signinAsResourceOwner: true,
      visitResourcePage: true,
    })

    const user = givenUser()
    cy.createUserAndSignin(user)

    cy.log('Je peux voir la ressource')
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
    )
    cy.dsfrShouldBeStarted()
    cy.testId('resource-view').should('exist')
    cy.testId('resource-edition-button').should('not.exist')
    cy.testId('private-base-box').should('not.exist')

    cy.log('Je ne peux pas editer la ressource')
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/editer',
    )
    cy.appUrlShouldBe(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
    )

    cy.log('Je ne peux pas publier la ressource')
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/publier',
    )
    cy.appUrlShouldBe(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
    )
  })

  it('Acceptation 4 - Utilisateur connecté sur une ressource privée', () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      signinAsResourceOwner: true,
      visitResourcePage: true,
    })

    const user = givenUser()
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
    cy.appUrlShouldBe(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
    )
    cy.log('Je ne peux pas publier la ressource')
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/publier',
    )
    cy.appUrlShouldBe(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
    )
  })

  it('Acceptation 5 - Créateur', () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: false,
      signinAsResourceOwner: true,
      visitResourcePage: true,
    })

    cy.log('Je peux voir la ressource')
    cy.testId('resource-view').should('exist')
    cy.testId('resource-edition-button')
      .filter(':visible')
      .should('have.text', 'Modifier')
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
    const creator = givenUser()
    const member = givenUser()
    cy.createUser(creator)
    cy.createUserAndSignin(member)

    const base = givenBase(
      { ownerId: creator.id, isPublic: false },
      { acceptedMemberIds: [member.id] },
    )
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
    cy.testId('resource-edition-button')
      .filter(':visible')
      .should('have.text', 'Modifier')
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

  it('Acceptation 7 - Contributeur', () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: false,
      signinAsResourceOwner: true,
      visitResourcePage: true,
    })
    const contributor = givenUser()
    cy.createUser(contributor)
    cy.inviteUserToResource(
      contributor,
      'titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
    )

    cy.signin({ email: contributor.email })
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
    )
    cy.dsfrShouldBeStarted()
    cy.log('Je peux voir la ressource')
    cy.testId('resource-view').should('exist')
    cy.testId('resource-edition-button')
      .filter(':visible')
      .should('have.text', 'Modifier')
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
