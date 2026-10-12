import { octokit, owner, repo } from '@app/cli/github'

export const previewDeletionRunsUrl = `https://github.com/${owner}/${repo}/actions/workflows/preview-deletion.yml`

export const triggerPreviewDeletion = (branche: string) =>
  octokit.rest.actions.createWorkflowDispatch({
    owner,
    repo,
    workflow_id: 'preview-deletion.yml',
    ref: 'dev',
    inputs: { branche },
  })
