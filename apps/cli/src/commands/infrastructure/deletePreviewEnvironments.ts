import { output, outputError } from '@app/cli/output'
import {
  previewDeletionRunsUrl,
  triggerPreviewDeletion,
} from '@app/cli/triggerPreviewDeletion'
import { Command } from '@commander-js/extra-typings'

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

    output(
      `Triggering preview environment deletion for ${branches.length} branch(es)...`,
    )

    for (const branch of branches) {
      output(`\nTriggering deletion for branch "${branch}"...`)

      try {
        await triggerPreviewDeletion(branch)
        output(
          `Successfully triggered deletion for "${branch}": ${previewDeletionRunsUrl}`,
        )
      } catch (error) {
        outputError(
          `Failed to trigger deletion for "${branch}": ${error instanceof Error ? error.message : String(error)}`,
        )
      }
    }
  })
