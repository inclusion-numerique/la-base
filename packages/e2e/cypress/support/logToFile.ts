import fs from 'node:fs'
import path from 'node:path'

/**
 * Only import this file in e2e cypress task management features
 */

const logDirectory = path.resolve(import.meta.dirname, '../../../../var')

export const logFile = path.resolve(logDirectory, 'cypress.log')

fs.mkdirSync(logDirectory, { recursive: true })

export const logToFile = (...content: unknown[]) => {
  const timestamp = new Date().toISOString()
  fs.appendFileSync(
    logFile,
    `${timestamp} - ${JSON.stringify(content, null, 2)}\n`,
  )

  return { result: 4 }
}
