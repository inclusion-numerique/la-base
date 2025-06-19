import { appendEnvVariablesToDotEnvFile } from '@app/cli/dotEnvFile'
import { output } from '@app/cli/output'
import { Argument, Command } from '@commander-js/extra-typings'

const { getCdkOutput } = await import('@app/cdk/getCdkOutput')

const stacks = ['web', 'project']

export const createDotEnvFromCdk = new Command()
  .command('dotenv:from-cdk')
  .addArgument(new Argument('<stack>', 'cdk stack').choices(stacks))
  .action(async (stack) => {
    if (stack === 'web') {
      const { databaseUrl, webBaseUrl } = await getCdkOutput('web')

      await appendEnvVariablesToDotEnvFile({
        comment: 'From web stack cdk output',
        environmentVariables: [
          {
            name: 'DATABASE_URL',
            value: databaseUrl,
          },
          {
            name: 'WEB_BASE_URL',
            value: webBaseUrl,
          },
        ],
      })
      output('Added web stack variables to .env file')
      return
    }

    throw new Error('Invalid stack provided')
  })
