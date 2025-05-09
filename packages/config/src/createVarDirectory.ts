import { existsSync, mkdirSync } from 'node:fs'
import { varDirectory } from './varDirectory'

/**
 * Creates project var directory if it doesn't exist
 */

export const createVarDirectory = () => {
  // Check if the directory exists synchronously
  if (!existsSync(varDirectory)) {
    // If it doesn't exist, create it synchronously
    mkdirSync(varDirectory, { recursive: true })
  }
}
