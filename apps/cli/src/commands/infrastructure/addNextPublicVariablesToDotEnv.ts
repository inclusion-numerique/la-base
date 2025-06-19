import { appendEnvVariablesToDotEnvFile } from '@app/cli/dotEnvFile'
import { output } from '@app/cli/output'
import { Argument, Command, Option } from '@commander-js/extra-typings'

export const addNextPublicVariablesToDotEnv = new Command()
  .command('dotenv:add-next-public')
  .addArgument(new Argument('<namespace>', 'deployment namespace'))
  .addOption(new Option('--local', 'local deployment target'))
  .action(async (namespace, { local }) => {
    const targetEnv: 'local' | 'main' | 'preview' = local
      ? 'local'
      : namespace === 'main'
        ? 'main'
        : 'preview'

    output(`Adding next public variables to .env for "${targetEnv}" target`)

    await appendEnvVariablesToDotEnvFile({
      comment: 'Next public environment needed at build time',
      environmentVariables: [
        targetEnv === 'local'
          ? { name: 'NEXT_PUBLIC_SENTRY_DSN', value: '' }
          : { name: 'NEXT_PUBLIC_SENTRY_ENVIRONMENT', value: namespace },
        {
          name: 'NEXT_PUBLIC_PROCONNECT_HOSTNAME',
          value: `$PROCONNECT_${targetEnv.toUpperCase()}_HOSTNAME`,
        },
        {
          name: 'NEXT_PUBLIC_PROCONNECT_CLIENT_ID',
          value: `$PROCONNECT_${targetEnv.toUpperCase()}_CLIENT_ID`,
        },
      ],
    })
  })
