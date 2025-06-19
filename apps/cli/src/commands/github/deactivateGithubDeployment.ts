import { octokit, owner, repo } from '@app/cli/github'
import { output } from '@app/cli/output'
import { Command } from '@commander-js/extra-typings'

const { computeBranchNamespace } = await import('@app/cdk/utils')

export const deactivateGithubDeployment = new Command()
  .command('github:deployment:deactivate')
  .argument('<branch>', 'branch target')
  .action(async (branch) => {
    const environment = computeBranchNamespace(branch)

    const { data: deployments } = await octokit.rest.repos.listDeployments({
      owner,
      repo,
      environment,
    })

    const deploymentIds = deployments.map(({ id }) => id)

    output(
      `Found ${deploymentIds.length} deployment${
        deploymentIds.length === 1 ? '' : 's'
      } to deactivate`,
    )
    if (deploymentIds.length === 0) {
      return
    }
    output('Deactivating ...')

    await Promise.all(
      deploymentIds.map(async (deployment_id) => {
        // It is only possible to delete inactive deployments
        // First we change deployment statuses
        await octokit.rest.repos.createDeploymentStatus({
          owner,
          repo,
          deployment_id,
          state: 'inactive',
        })
      }),
    )

    output(
      `Deactivated ${deploymentIds.length} deployment${
        deploymentIds.length === 1 ? '' : 's'
      }`,
    )
  })
