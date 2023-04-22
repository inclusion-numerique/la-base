import { Command } from '@commander-js/extra-typings'
import { createDotEnvFromSecrets } from '@lb/cli/commands/secrets/createDotEnvFromSecrets'
import { createGithubDeployment } from '@lb/cli/commands/github/createGithubDeployment'
import { updateGithubDeployment } from '@lb/cli/commands/github/updateGithubDeployment'
import { deactivateGithubDeployment } from '@lb/cli/commands/github/deactivateGithubDeployment'
import { createDotEnvFromCdk } from '@lb/cli/commands/infrastructure/createDotEnvFromCdk'
import { listSecrets } from '@lb/cli/commands/secrets/listSecrets'
import { getSecretValue } from '@lb/cli/commands/secrets/getSecretValue'
import { setupDatabaseSecret } from '@lb/cli/commands/secrets/setupDatabaseSecret'
import { createTfVarsFileFromEnvironment } from '@lb/cli/commands/infrastructure/createTfVarsFileFromEnvironment'
import { checkDeploymentStatus } from '@lb/cli/commands/deployment/checkDeploymentStatus'
import { getDatabasePasswordSecret } from '@lb/cli/commands/secrets/getDatabasePasswordSecret'
import { addNextPublicVariablesToDotEnv } from '@lb/cli/commands/infrastructure/addNextPublicVariablesToDotEnv'
import { importLegacyDatabase } from '@lb/cli/commands/legacy/importLegacyDatabase'

const program = new Command()

program.addCommand(listSecrets)
program.addCommand(getSecretValue)
program.addCommand(setupDatabaseSecret)
program.addCommand(getDatabasePasswordSecret)
program.addCommand(createDotEnvFromCdk)
program.addCommand(createDotEnvFromSecrets)
program.addCommand(addNextPublicVariablesToDotEnv)
program.addCommand(createGithubDeployment)
program.addCommand(updateGithubDeployment)
program.addCommand(deactivateGithubDeployment)
program.addCommand(createTfVarsFileFromEnvironment)
program.addCommand(checkDeploymentStatus)
program.addCommand(importLegacyDatabase)

program.parse()
