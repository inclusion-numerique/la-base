import { octokit, owner, repo } from '@app/cli/github'

export const previewDeletionRunsUrl = `https://github.com/${owner}/${repo}/actions/workflows/remove-ephemeral-env.yml`

export const triggerPreviewDeletion = (branche: string) =>
  octokit.rest.actions.createWorkflowDispatch({
    owner,
    repo,
    workflow_id: 'remove-ephemeral-env.yml',
    ref: 'main',
    inputs: { branche },
  })
