import { goToMostRecentEmailReceived } from '@app/e2e/e2e/goToMostRecentEmailReceived'
import { givenBase } from '@app/e2e/support/given/givenBase'
import {
  createTestPublishResourceCommand,
  createTestResourceCommands,
} from '@app/e2e/support/given/givenResourceCommands'
import { givenUser } from '@app/e2e/support/given/givenUser'
import { v4 } from 'uuid'

describe('Utilisateur connecté, je peux signaler une ressource', () => {
  /**
   * US
   *  - https://www.notion.so/Utilisateur-je-peux-signaler-un-contenu-abf59d31e86f47bd934950a6fb366df6?pvs=4
   */

  beforeEach(() => {
    cy.execute('deleteAllData', {})
    cy.intercept('/api/trpc/report.resource?*').as('reportResource')
  })

  it('Acceptation 1 - Je ne peux pas signaler de resource si je ne suis pas connecté', () => {
    const user = givenUser()
    const base = givenBase({ createdById: user.id, isPublic: true })
    const resourceId = v4()
    const commands = createTestResourceCommands({
      baseId: base.id,
      resourceId,
    })
    commands.push(createTestPublishResourceCommand(resourceId, true))

    cy.createUser(user)
    cy.createBase(base)
    cy.sendResourceCommands({ user, commands }).then(({ slug }) => {
      cy.visit(`/ressources/${slug}`)
    })

    cy.findAllByTitle(/signaler la ressource/i)
      .filter(':visible')
      .click()

    cy.appUrlShouldBe(
      '/connexion?suivant=/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
    )
  })

  it('Acceptation 2 - Je peux signaler une resource, et le modérateur est prévenu', () => {
    const user = givenUser()
    const anotherUser = givenUser({
      firstName: 'John',
      lastName: 'Doe',
    })
    const base = givenBase({ createdById: user.id, isPublic: true })
    const resourceId = v4()
    const commands = createTestResourceCommands({
      baseId: base.id,
      resourceId,
    })
    commands.push(createTestPublishResourceCommand(resourceId, true))

    cy.createUserAndSignin(user)
    cy.createBase(base)
    cy.sendResourceCommands({ user, commands }).then(({ slug }) => {
      cy.logout()
      cy.createUserAndSignin(anotherUser)
      cy.visit(`/ressources/${slug}`)
    })

    cy.dsfrModalsShouldBeBound()

    cy.findAllByTitle(/signaler la ressource/i)
      .filter(':visible')
      .click()

    cy.get('#report-resource').should('have.attr', 'open')
    cy.get('#report-resource').within(() => {
      // Should not submit with empty form
      cy.findByRole('button', { name: /signaler/i }).click()

      cy.findByLabelText(/motif du signalement/i).select('Il y a des erreurs')
      cy.findByLabelText(/description du signalement/i).type(
        'La terre n’est pas plate',
      )
      cy.findByRole('button', { name: /signaler/i }).click()
    })

    cy.wait('@reportResource')

    cy.get('#report-resource').should('not.have.attr', 'open')
    cy.findByRole('status').contains(/signalement envoyé/i)

    cy.log('Check that the report was created')
    cy.execute('getResourceReports', { resourceId }).then((reports) => {
      cy.wrap(reports).should('have.length', 1, 'There should be one report')

      const report = reports[0]
      cy.wrap(report.sentBy?.id).should(
        'equal',
        anotherUser.id,
        'Sent by user should be the current user',
      )
      cy.wrap(report.reason).should(
        'equal',
        'Errors',
        'Reason should be "Errors"',
      )
      cy.wrap(report.comment).should(
        'equal',
        'La terre n’est pas plate',
        'Comment should be "La terre n’est pas plate"',
      )
      cy.wrap(report.resource.id).should(
        'equal',
        resourceId,
        'Resource id should be the resource id',
      )
    })

    goToMostRecentEmailReceived({
      subjectInclude: 'Signalement de ressource',
    })

    cy.contains('Titre d’une ressource')
    cy.contains('localhost:3000/ressources/titre-d-une-ressource')
    cy.contains('John Doe')
  })
})
