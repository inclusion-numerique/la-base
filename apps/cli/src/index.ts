import { Command } from '@commander-js/extra-typings'
import { checkDeploymentStatus } from '@app/cli/commands/deployment/checkDeploymentStatus'
import { createGithubDeployment } from '@app/cli/commands/github/createGithubDeployment'
import { deactivateGithubDeployment } from '@app/cli/commands/github/deactivateGithubDeployment'
import { updateGithubDeployment } from '@app/cli/commands/github/updateGithubDeployment'
import { addNextPublicVariablesToDotEnv } from '@app/cli/commands/infrastructure/addNextPublicVariablesToDotEnv'
import { createDotEnvFromCdk } from '@app/cli/commands/infrastructure/createDotEnvFromCdk'
import { createTfVarsFileFromEnvironment } from '@app/cli/commands/infrastructure/createTfVarsFileFromEnvironment'
import { createDotEnvFromSecrets } from '@app/cli/commands/secrets/createDotEnvFromSecrets'
import { getDatabasePasswordSecret } from '@app/cli/commands/secrets/getDatabasePasswordSecret'
import { getSecretValue } from '@app/cli/commands/secrets/getSecretValue'
import { listSecrets } from '@app/cli/commands/secrets/listSecrets'
import { setupDatabaseSecret } from '@app/cli/commands/secrets/setupDatabaseSecret'
import { locallyRestoreLatestMainBackup } from '@app/cli/commands/infrastructure/locallyRestoreLatestMainBackup'
import { addConseillersNumeriquesToBases } from '@app/cli/commands/domain/addConseillersNumeriquesToBases'

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
program.addCommand(locallyRestoreLatestMainBackup)
program.addCommand(addConseillersNumeriquesToBases)

program.parse()
