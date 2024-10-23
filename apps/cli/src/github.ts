import { Octokit } from '@octokit/core'
import { restEndpointMethods } from '@octokit/plugin-rest-endpoint-methods'

export const owner = 'inclusion-numerique'
export const repo = process.env.NEXT_PUBLIC_APP_SLUG || ''

const token = process.env.GITHUB_TOKEN

if (!token) {
  throw new Error(
    'Missing GITHUB_TOKEN env variable for octokit authentication',
  )
}

const OctokitWithPlugins = Octokit.plugin(restEndpointMethods)

export const octokit = new OctokitWithPlugins({ auth: token })
