import {
  createSession,
  createUser,
  createBase,
  createResource,
  deleteUser,
  deleteSession,
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
  deleteSession,
  deleteAllData,
}

export type Tasks = typeof tasks
