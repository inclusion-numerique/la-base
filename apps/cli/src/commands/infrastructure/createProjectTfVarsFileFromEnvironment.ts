import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { output } from '@app/cli/output'
import { getDirname } from '@app/config/dirname'
import { Command } from '@commander-js/extra-typings'

const { projectStackVariables, projectStackSensitiveVariables } = await import(
  '@app/cdk/ProjectStack'
)

export const createProjectTfVarsFileFromEnvironment = new Command()
  .command('terraform:vars-from-env')
  .description('Write the terraform variables of the CDK project stack')
  .action(async () => {
    const variableNames = [
      ...projectStackVariables,
      ...projectStackSensitiveVariables,
    ]

    const variables = Object.fromEntries(
      variableNames.map((name) => {
        const value = process.env[name]
        if (!value) {
          throw new Error(
            `Variable ${name} is not present in environment but needed as a terraform variable for "project" stack`,
          )
        }

        return [name, value]
      }),
    )

    const tfVariablesFile = path.resolve(
      getDirname(import.meta.url),
      '../../../../../packages/cdk/.tfvars.json',
    )
    await writeFile(tfVariablesFile, JSON.stringify(variables, null, 2))

    output(
      `The ${variableNames.length} terraform variables for stack project have been added to ${tfVariablesFile}`,
    )
  })
