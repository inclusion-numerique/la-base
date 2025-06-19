import { output } from '@app/cli/output'
import { findSecretByName } from '@app/config/secrets/findSecretByName'
import { getSecretValue as configGetSecretValue } from '@app/config/secrets/getSecretValue'
import { listSecrets } from '@app/config/secrets/listSecrets'
import { Argument, Command } from '@commander-js/extra-typings'

/**
 * This command outputs available secrets names
 */

export const getSecretValue = new Command()
  .command('secrets:get')
  .addArgument(new Argument('<name>', 'Name of the secret'))
  .action(async (name) => {
    const { secrets } = await listSecrets()
    const { id } = findSecretByName(secrets, name)
    const value = await configGetSecretValue({ id })

    output(value)
  })
