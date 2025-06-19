import { appendFile } from 'node:fs/promises'
import path from 'node:path'
import { getDirname } from '@app/config/dirname'

export type DotEnvVariable = { name: string; value: string }

// Appends text after a new line

export const appendTextToDotEnvFile = async (text: string) => {
  const dotenvFile = path.resolve(getDirname(import.meta.url), '../../../.env')
  await appendFile(dotenvFile, `\n${text}\n`)
}

export const appendEnvVariablesToDotEnvFile = async ({
  comment,
  environmentVariables,
}: {
  comment?: string
  environmentVariables: DotEnvVariable[]
}) => {
  const now = new Date().toISOString()
  const banner = `
###
# The following variables have been automatically appended on ${now} 
# ${comment?.split('\n').join('\n# ') ?? ''}
###
`

  const footer = `
###
# End ${now}
###
`

  const variablesText = environmentVariables
    .map(({ name, value }) => `${name}="${value}"`)
    .join('\n')

  return appendTextToDotEnvFile(`${banner}\n${variablesText}\n${footer}`)
}
