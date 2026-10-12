import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { output } from '@app/cli/output'
import { getDirname } from '@app/config/dirname'
import { Argument, Command } from '@commander-js/extra-typings'
import {
  optionalInfrastructureVariables,
  optionalProjectInfrastructureVariables,
  requiredInfrastructureVariables,
  requiredProjectInfrastructureVariables,
} from './infrastructureVariables'

const infrastructureDirectory = path.resolve(
  getDirname(import.meta.url),
  '../../../../../infrastructure',
)

const stacks = {
  web: {
    directory: infrastructureDirectory,
    required: requiredInfrastructureVariables,
    optional: optionalInfrastructureVariables,
  },
  project: {
    directory: path.join(infrastructureDirectory, 'project'),
    required: requiredProjectInfrastructureVariables,
    optional: optionalProjectInfrastructureVariables,
  },
} as const

export const createTfVarsFileFromEnvironment = new Command()
  .command('infrastructure:vars-from-env')
  .description(
    'Write the OpenTofu variables of the infrastructure from the environment',
  )
  .addArgument(
    new Argument('[stack]', 'Infrastructure stack')
      .choices(['web', 'project'] as const)
      .default('web' as const),
  )
  .action(async (stack) => {
    const { directory, required, optional } = stacks[stack]
    const missing = required.filter((name) => !process.env[name])

    if (missing.length > 0) {
      throw new Error(
        `Variables missing from the environment but needed by the infrastructure: ${missing.join(', ')}`,
      )
    }

    const variables = Object.fromEntries(
      [...required, ...optional]
        .map((name) => [name, process.env[name]] as const)
        .filter(([, value]) => Boolean(value)),
    )

    const variablesFile = path.join(directory, '.tfvars.json')

    await writeFile(variablesFile, JSON.stringify(variables, null, 2))

    output(
      `${Object.keys(variables).length} infrastructure variables written to ${variablesFile}`,
    )
  })
