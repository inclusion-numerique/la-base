import { Command } from '@commander-js/extra-typings'
import { listSecrets as configListSecrets } from '@app/config/secrets/listSecrets'
import { output } from '@app/cli/output'

/**
 * This command outputs available secrets names
 */

export const listSecrets = new Command()
  .command('secrets:list')
  .action(async () => {
    const { secrets } = await configListSecrets()

    output(secrets.map(({ name }) => name).join('\n'))
  })
