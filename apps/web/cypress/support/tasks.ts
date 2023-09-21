import {
  createBase,
  createSession,
  createUser,
  deleteSession,
  deleteUser,
  sendResourceCommands,
  inviteUserTo,
} from '../e2e/authentication/user.tasks'
import { deleteAllData } from '../e2e/deleteAllData'

/**
 * Export of custom tasks that can be run with cy.execute() type safe custom command
 */
export const tasks = {
  createUser,
  createBase,
  sendResourceCommands,
  deleteUser,
  createSession,
  deleteSession,
  deleteAllData,
  inviteUserTo,
}

export type Tasks = typeof tasks
