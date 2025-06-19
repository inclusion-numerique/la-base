import { appendEnvVariablesToDotEnvFile } from '@app/cli/dotEnvFile'
import { output } from '@app/cli/output'
import { getSecretValue } from '@app/config/secrets/getSecretValue'
import { listSecrets } from '@app/config/secrets/listSecrets'
import { Command } from '@commander-js/extra-typings'

/**
 * This command fetches secrets from Secret Vault using scaleway keys and put them into .env
 */

export const createDotEnvFromSecrets = new Command()
  .command('dotenv:from-secrets')
  .action(async () => {
    const list = await listSecrets()

    const environmentVariables = await Promise.all(
      list.secrets.map(async ({ name, id }) => {
        const value = await getSecretValue({ id })
        return { name, value }
      }),
    )

    await appendEnvVariablesToDotEnvFile({
      comment: 'Secrets variables',
      environmentVariables,
    })

    output(`${environmentVariables.length} secrets added to .env file`)
  })
