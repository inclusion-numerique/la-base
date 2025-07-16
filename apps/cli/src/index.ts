import { checkDeploymentStatus } from '@app/cli/commands/deployment/checkDeploymentStatus'
import { addConseillersNumeriquesToBases } from '@app/cli/commands/domain/addConseillersNumeriquesToBases'
import { removeInactiveConseillersNumeriques } from '@app/cli/commands/domain/removeInactiveConseillersNumeriques'
import { createGithubDeployment } from '@app/cli/commands/github/createGithubDeployment'
import { deactivateGithubDeployment } from '@app/cli/commands/github/deactivateGithubDeployment'
import { updateGithubDeployment } from '@app/cli/commands/github/updateGithubDeployment'
import { addNextPublicVariablesToDotEnv } from '@app/cli/commands/infrastructure/addNextPublicVariablesToDotEnv'
import { createDotEnvFromCdk } from '@app/cli/commands/infrastructure/createDotEnvFromCdk'
import { createTfVarsFileFromEnvironment } from '@app/cli/commands/infrastructure/createTfVarsFileFromEnvironment'
import { locallyRestoreLatestMainBackup } from '@app/cli/commands/infrastructure/locallyRestoreLatestMainBackup'
import { executeJobApiCommand } from '@app/cli/commands/jobs/executeJobApiCommand'
import { executeJobCommand } from '@app/cli/commands/jobs/executeJobCommand'
import { createDotEnvFromSecrets } from '@app/cli/commands/secrets/createDotEnvFromSecrets'
import { getDatabasePasswordSecret } from '@app/cli/commands/secrets/getDatabasePasswordSecret'
import { getSecretValue } from '@app/cli/commands/secrets/getSecretValue'
import { listSecrets } from '@app/cli/commands/secrets/listSecrets'
import { setupDatabaseSecret } from '@app/cli/commands/secrets/setupDatabaseSecret'
import { Command } from '@commander-js/extra-typings'
import { migrateStorage } from './commands/storage-migration/storageMigration'

const program = new Command()

program.addCommand(executeJobCommand)
program.addCommand(executeJobApiCommand)
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
program.addCommand(removeInactiveConseillersNumeriques)
program.addCommand(migrateStorage)

program.parse()
