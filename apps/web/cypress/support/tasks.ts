import {
  createSession,
  createUser,
  createBase,
  createResource,
  deleteUser,
} from '../e2e/authentication/user.tasks'
import { deleteAllData } from '../e2e/deleteAllData'

/**
 * Export of custom tasks that can be run with cy.execute() type safe custom command
 */
export const tasks = {
  createUser,
  createBase,
  createResource,
  deleteUser,
  createSession,
  deleteAllData,
}

export type Tasks = typeof tasks
