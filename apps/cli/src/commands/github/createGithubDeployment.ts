import { Command } from '@commander-js/extra-typings'
import { computeBranchNamespace } from '@app/cdk/utils'
import { octokit, owner, repo } from '@app/cli/github'
import { output } from '@app/cli/output'

export const createGithubDeployment = new Command()
  .command('github:deployment:create')
  .argument('<branch>', 'branch target')
  .action(async (branch) => {
    const environment = computeBranchNamespace(branch)
    const isMain = branch === 'main'

    const result = await octokit.rest.repos.createDeployment({
      owner,
      repo,
      auto_merge: false,
      ref: branch,
      environment,
      task: 'deploy',
      transient_environment: !isMain,
      production_environment: !!isMain,
      required_contexts: [],
    })

    if (!('id' in result.data)) {
      throw new Error(
        `Deployment creation failed: "${
          result.data.message ?? 'Unknown error'
        }"`,
      )
    }

    output(result.data.id)
  })
