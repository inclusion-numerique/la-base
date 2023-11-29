/**
 * Allows to specify a deployed application / database target for the CLI.
 */
import * as process from 'node:process'
import { Option } from '@commander-js/extra-typings'
import { output } from '@app/cli/output'

export const DeploymentTargetOption = new Option(
  '--deployment <branch>',
  'Deployment branch or namespace e.g. dev, feat-stuff, main',
)

export const configureDeploymentTarget = async ({
  deployment,
}: {
  deployment?: string
}) => {
  if (!deployment) {
    return
  }
  output(`🚀 Deployment target: ${deployment}`)
  if (deployment === 'main') {
    output(
      '⚠️  You are executing a cli on MAIN PRODUCTION ENVIRONMENT, you have 5 seconds to abort ⚠️',
    )
    await new Promise((resolve) => {
      setTimeout(resolve, 5000)
    })
    output('Continuing')
  }

  const cliEnvDeploymentTargetBranch =
    process.env.CLI_TARGET_DEPLOYMENT_BRANCH ?? ''

  const cliEnvDeploymentDatabaseUrl =
    process.env.CLI_TARGET_DEPLOYMENT_DATABASE_URL ?? ''

  if (deployment !== cliEnvDeploymentTargetBranch) {
    output(`⚠️  Your .env file is not configured for targetting ${deployment}:`)
    output(
      `-> In your .env file: CLI_TARGET_DEPLOYMENT_BRANCH=${cliEnvDeploymentTargetBranch}`,
    )
    output(
      `Please check and update your .env or cli --deployment option to be able to run cli on ${deployment} target`,
    )

    process.exit(1)
    return
  }

  process.env.DATABASE_URL = cliEnvDeploymentDatabaseUrl

  output('Configured database for deployment target')
}
