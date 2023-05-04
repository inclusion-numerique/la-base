import { v4 } from 'uuid'
import { CreateUserInput } from '../e2e/authentication/user.tasks'

export const appUrl = (path: string) => `${Cypress.config().baseUrl}${path}`

export const createTestUser = () =>
  ({
    email: `test-${v4()}@example.com`,
    firstName: 'Jean',
    lastName: 'Biche',
    name: 'Jean Biche',
    emailVerified: new Date('2023-04-01'),
    isPublic: false,
  } satisfies CreateUserInput)
