import { output, outputError } from '@app/cli/output'
import { projectSlug } from '@app/config/config'
import { Command } from '@commander-js/extra-typings'
import axios from 'axios'

const protectedBranches = ['main', 'dev']

export const deletePreviewEnvironments = new Command()
  .command('infrastructure:delete-preview')
  .argument(
    '<branches>',
    'Comma-separated list of branch names to delete preview environments for',
  )
  .action(async (branchesArgument) => {
    const branches = branchesArgument
      .split(',')
      .map((branch) => branch.trim())
      .filter(Boolean)

    if (branches.length === 0) {
      outputError('No branch names provided')
      process.exit(1)
      return
    }

    const protectedFound = branches.filter((branch) =>
      protectedBranches.includes(branch),
    )

    if (protectedFound.length > 0) {
      outputError(
        `Cannot delete preview environments for protected branches: ${protectedFound.join(', ')}`,
      )
      outputError(`Protected branches are: ${protectedBranches.join(', ')}`)
      process.exit(1)
      return
    }

    const circleCiToken = process.env.CIRCLE_CI_TOKEN

    if (!circleCiToken) {
      outputError(
        'Missing CIRCLE_CI_TOKEN env variable for CircleCI authentication',
      )
      process.exit(1)
      return
    }

    const circleCiApiUrl = `https://circleci.com/api/v2/project/gh/inclusion-numerique/${projectSlug}/pipeline`

    output(
      `Triggering preview environment deletion for ${branches.length} branch(es)...`,
    )

    for (const branch of branches) {
      output(`\nTriggering deletion for branch "${branch}"...`)

      try {
        const response = await axios.post(
          circleCiApiUrl,
          {
            branch: 'dev',
            parameters: {
              trigger_workflow: 'web_app_preview_deletion',
              preview_deletion_branch: branch,
            },
          },
          {
            headers: {
              'Circle-Token': circleCiToken,
              'Content-Type': 'application/json',
            },
          },
        )

        const pipelineUrl = `https://app.circleci.com/pipelines/github/inclusion-numerique/${projectSlug}/${response.data.number}`
        output(
          `Successfully triggered deletion pipeline for "${branch}": ${pipelineUrl}`,
        )
      } catch (error) {
        if (axios.isAxiosError(error)) {
          outputError(
            `Failed to trigger deletion for "${branch}": ${error.response?.status} ${error.response?.statusText ?? ''} - ${JSON.stringify(error.response?.data)}`,
          )
        } else {
          outputError(
            `Failed to trigger deletion for "${branch}": ${error instanceof Error ? error.message : String(error)}`,
          )
        }
      }
    }
  })
