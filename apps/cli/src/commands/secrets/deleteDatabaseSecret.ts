import { output } from '@app/cli/output'
import { databasePasswordSecretName } from '@app/config/secrets/databasePasswordSecretName'
import { deleteSecret } from '@app/config/secrets/deleteSecret'
import { listSecrets } from '@app/config/secrets/listSecrets'
import { Argument, Command } from '@commander-js/extra-typings'

export const deleteDatabaseSecret = new Command()
  .command('secrets:database:delete')
  .description('Delete the database password secret of a preview namespace')
  .addArgument(new Argument('<namespace>', 'Namespace of the preview'))
  .action(async (namespace) => {
    if (['', 'main', 'dev'].includes(namespace)) {
      throw new Error(
        `The database password secret of "${namespace}" is never deleted`,
      )
    }

    const secretName = databasePasswordSecretName(namespace)
    const { secrets } = await listSecrets()
    const secret = secrets.find(({ name }) => name === secretName)

    if (!secret) {
      output(`No secret ${secretName}`)
      return
    }

    await deleteSecret(secret.id)

    output(`Secret ${secretName} deleted`)
  })
