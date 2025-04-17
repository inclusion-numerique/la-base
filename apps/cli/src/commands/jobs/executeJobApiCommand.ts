import { mainRootDomain, previewRootDomain } from '@app/config/config'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { executeJobApiTokenHeader } from '@app/web/app/api/jobs/executeJobApiTokenHeader'
import { jobExecutors } from '@app/web/jobs/jobExecutors'
import { Argument, Command } from '@commander-js/extra-typings'
import axios from 'axios'
import { output } from '@app/cli/output'
import { DeploymentTargetOption } from '@app/cli/deploymentTarget'

export const executeJobApiCommand = new Command()
  .command('job:api:execute')
  .addArgument(
    new Argument('<name>', 'Job name').choices(Object.keys(jobExecutors)),
  )
  .addArgument(new Argument('[data]', 'Job data'))
  .addOption(DeploymentTargetOption)
  .action(async (name, dataAsString, options) => {
    const target = options.deployment
    if (!target) {
      output('No deployment target specified. Aborting.')
      process.exit(1)
      return
    }

    const isMain = target === 'main'

    const domain = isMain ? mainRootDomain : `${target}.${previewRootDomain}`

    const endpoint = `https://${domain}/api/jobs`

    const result = await axios.post(
      endpoint,
      {
        name,
        data: JSON.parse(dataAsString ?? '') as unknown,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          [executeJobApiTokenHeader]: ServerWebAppConfig.internalApiPrivateKey,
        },
      },
    )

    if (!result.status.toString(10).startsWith('2')) {
      output('Job failed')
      output(result.status)
      output(result.statusText)
      output(result.data)
      process.exit(1)
      return
    }
    output('Job executed successfully')
    output(JSON.stringify(result.data, null, 2))
  })
