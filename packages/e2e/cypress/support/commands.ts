import '@testing-library/cypress/add-commands'
import type { ResourceProjection } from '@app/web/server/resources/feature/createResourceProjection'
import { appUrl } from '@app/e2e/support/helpers'
import type { Tasks as CustomTasks } from '@app/e2e/tasks/tasks'
import 'cypress-file-upload'
import type { SendResourceCommandsInput } from '@app/e2e/tasks/handlers/resources.tasks'
import type {
  CreateBaseInput,
  CreateCollectionInput,
  CreateUserInput,
} from '@app/e2e/tasks/handlers/user.tasks'
import Timeoutable = Cypress.Timeoutable
import Loggable = Cypress.Loggable

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/**
 * Adding superjson serialization and typescript typing to cy.task
 */
Cypress.Commands.add(
  'execute',
  <T extends keyof CustomTasks>(
    task: T,
    parameters: Parameters<CustomTasks[T]>[0],
    options?: Partial<Loggable & Timeoutable>,
  ) => cy.task(task, parameters, options),
)

Cypress.Commands.add('signin', ({ email }: { email: string }) =>
  cy.execute('createSession', { email }).then((session) => {
    cy.log('Signin session', session)
    cy.setCookie('next-auth.session-token', session.sessionToken)
    return cy.wrap(session.sessionToken)
  }),
)

Cypress.Commands.add('deleteAllData', () => {
  cy.execute('deleteAllData', {})
})

Cypress.Commands.add('resetFixtures', () => {
  cy.execute('resetFixtures', {})
})

Cypress.Commands.add('logout', () => cy.clearCookie('next-auth.session-token'))

Cypress.Commands.add('createUserAndSignin', (user: CreateUserInput) => {
  cy.task('createUser', user)
  return cy.signin(user)
})
Cypress.Commands.add('createUser', (user: CreateUserInput) => {
  cy.task('createUser', user)
})
Cypress.Commands.add(
  'createCollection',
  (collection: CreateCollectionInput) => {
    cy.task('createCollection', collection)
  },
)
Cypress.Commands.add('createBase', (base: CreateBaseInput) => {
  cy.task('createBase', base)
})
Cypress.Commands.add(
  'inviteUserToBase',
  (user: CreateUserInput, baseSlug: string) => {
    cy.task('inviteUserToBase', { user: user.id, slug: baseSlug })
  },
)
Cypress.Commands.add(
  'inviteUserToResource',
  (user: CreateUserInput, resource: string) => {
    cy.task('inviteUserToResource', { user: user.id, slug: resource })
  },
)
Cypress.Commands.add(
  'sendResourceCommands',
  (input: SendResourceCommandsInput) => {
    cy.task('sendResourceCommands', input)
  },
)

Cypress.Commands.add('dsfrStylesShouldBeLoaded', () => {
  cy.get('body').should(
    'have.css',
    'font-family',
    'Marianne, arial, sans-serif',
  )
  cy.get('body').should('have.css', 'color', 'rgb(58, 58, 58)')
})

Cypress.Commands.add('dsfrShouldBeStarted', () => {
  cy.get('html').should('have.attr', 'data-fr-js', 'true')
})

Cypress.Commands.add('dsfrModalsShouldBeBound', () => {
  cy.get('dialog.fr-modal').each((modal) => {
    // TODO There is a regression in the current version of dsfr where this is not sufficient and needs a timeout
    cy.wrap(modal).should('have.attr', 'data-fr-js-modal', 'true')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(120)
  })
})
Cypress.Commands.add('dsfrCollapsesShouldBeBound', () => {
  cy.get('.fr-collapse').each((modal) => {
    // TODO There is a regression in the current version of dsfr where this is not sufficient and needs a timeout
    cy.wrap(modal).should('have.attr', 'data-fr-js-collapse', 'true')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(120)
  })
})
Cypress.Commands.add('testId', (testId: string) =>
  cy.get(`[data-testid="${testId}"]`),
)
Cypress.Commands.add('removeHover', () =>
  // reset hovering by putting mouse away (e.g. here top left corner of body)
  cy.get('body').realHover({ position: 'topLeft' }),
)

Cypress.Commands.add('getToast', (contains: string | RegExp) =>
  cy.findAllByRole('status').contains(contains),
)

// From https://github.com/cypress-io/cypress/issues/877
Cypress.Commands.add(
  'positionToViewport',
  (
    testId: string,
    position: 'inside' | 'above' | 'below' | 'left' | 'right',
  ) => {
    cy.testId(testId).then(($element) => {
      const height = Cypress.$(cy.state('window')).height()
      const width = Cypress.$(cy.state('window')).width()
      const rect = $element[0].getBoundingClientRect()

      expect(height).to.be.a('number', 'Window height not available')
      expect(width).to.be.a('number', 'Window width not available')
      if (!height || !width) {
        return
      }

      switch (position) {
        case 'inside': {
          expect(rect.top + rect.height / 2).to.be.greaterThan(0)
          expect(rect.top + rect.height / 2).to.be.lessThan(height)
          expect(rect.left + rect.width / 2).to.be.greaterThan(0)
          expect((rect.left, +(rect.width / 2))).to.be.lessThan(width)

          break
        }
        case 'above': {
          expect(rect.top + rect.height / 2).to.be.lessThan(0)

          break
        }
        case 'below': {
          expect(rect.top + rect.height / 2).to.be.greaterThan(height)

          break
        }
        case 'left': {
          expect(rect.left + rect.width / 2).to.be.lessThan(0)

          break
        }
        case 'right': {
          expect(rect.left + rect.width / 2).to.be.greaterThan(width)

          break
        }
        default:
      }
    })
  },
)
Cypress.Commands.add('appUrlShouldBe', (url: string, options) => {
  cy.url().should('equal', appUrl(url), options)
})

Cypress.Commands.add('allowNextRedirectException', () => {
  Cypress.on('uncaught:exception', (error) => {
    if (error.message.includes('NEXT_REDIRECT')) {
      return false
    }
    return true
  })
})

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      execute<T extends keyof CustomTasks>(
        name: T,
        parameters: Parameters<CustomTasks[T]>[0],
      ): Chainable<Awaited<ReturnType<CustomTasks[T]>>>

      createUserAndSignin(user: CreateUserInput): Chainable<string>

      createUser(user: CreateUserInput): Chainable<void>

      createCollection(collection: CreateCollectionInput): Chainable<void>

      createBase(base: CreateBaseInput): Chainable<void>

      inviteUserToBase(user: CreateUserInput, baseSlug: string): Chainable<void>

      inviteUserToResource(
        user: CreateUserInput,
        resource: string,
      ): Chainable<void>

      sendResourceCommands(
        input: SendResourceCommandsInput,
      ): Chainable<ResourceProjection>

      signin(user: { email: string }): Chainable<string>

      deleteAllData(): Chainable<null>

      resetFixtures(): Chainable<null>

      logout(): Chainable<null>

      dsfrStylesShouldBeLoaded(): Chainable<void>

      dsfrShouldBeStarted(): Chainable<void>

      dsfrModalsShouldBeBound(): Chainable<void>

      dsfrCollapsesShouldBeBound(): Chainable<void>

      testId(testId: string): Chainable<JQuery<HTMLElement>>

      removeHover(): Chainable<JQuery<HTMLElement>>

      getToast(contains: string | RegExp): Chainable<JQuery<HTMLElement>>

      positionToViewport(
        testId: string,
        position: 'inside' | 'above' | 'below' | 'left' | 'right',
      ): Chainable<void>

      state(type: string): Chainable<unknown>

      appUrlShouldBe(
        url: string,
        options?: { timeout?: number },
      ): Chainable<void>

      allowNextRedirectException(): Chainable<void>

      //       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}
