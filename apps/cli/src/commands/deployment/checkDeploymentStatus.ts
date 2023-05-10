import axios from 'axios'
import axiosRetry from 'axios-retry'
import { Command } from '@commander-js/extra-typings'
import { output } from '@app/cli/output'
import { projectTitle } from '@app/config/config'

export const checkDeploymentStatus = new Command()
  .command('deployment:check-status')
  .argument('<url>', 'deployment url')
  .action(async (url) => {
    const client = axios.create({
      baseURL: url,
      headers: {
        Accept: 'text/html',
      },
    })
    axiosRetry(client, {
      retries: 3,
      retryDelay: (retryCount) => retryCount * 3000,
    })

    const statusResponse = await client.get<{ status: string }>('/health')
    output(`Status is ${statusResponse.data.status}`)

    const homePageResponse = await client.get<string>('/')
    if (!homePageResponse.data.startsWith('<!DOCTYPE html>')) {
      throw new Error('Home page is not valid html')
    }

    if (!homePageResponse.data.includes(projectTitle)) {
      throw new Error(
        `Project title "${projectTitle}" is not present on the homepage`,
      )
    }

    output(`Homepage looks like valid html`)
  })
