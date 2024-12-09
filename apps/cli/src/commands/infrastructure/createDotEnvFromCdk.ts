// eslint-disable-next-line unicorn/prevent-abbreviations
import { Argument, Command } from '@commander-js/extra-typings'
import { appendEnvVariablesToDotEnvFile } from '@app/cli/dotEnvFile'
import { output } from '@app/cli/output'

const { getCdkOutput } = await import('@app/cdk/getCdkOutput')

const stacks = ['web', 'project']

// eslint-disable-next-line unicorn/prevent-abbreviations
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
