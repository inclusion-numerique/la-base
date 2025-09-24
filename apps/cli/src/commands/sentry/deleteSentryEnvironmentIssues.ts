import { output, outputError } from '@app/cli/output'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { Command } from '@commander-js/extra-typings'
import {
  createSentryHttpClient,
  deleteIssuesByIds,
  listEnvironmentsWithIssues,
  listIssueIdsForEnvironment,
  listProjectEnvironments,
  type SentryConfig,
  updateProjectEnvironmentVisibility,
} from './sentry-utils'

export const deleteSentryEnvironmentIssues = new Command()
  .command('sentry:delete-environment-issues')
  .argument('<environment>', 'environment')
  .action(async (environmentArgument) => {
    // We copy from computeBranchNamespace but keep digits for sentry env names
    const environment = environmentArgument
      // Replace special characters with hyphen
      .replaceAll(/[./@_]/g, '-')
      // When digits are removed, there might be multiple hyphens in a row
      .replaceAll(/--+/g, '-')
      // Remove prefix hyphen
      .replace(/^-/, '')
      // Namespace should be shorter than 32 chars to ensure all resources can be deployed
      .slice(0, 32)
      // Remove suffix hyphen
      .replace(/-$/, '')
      .toLowerCase()

    if (environment === 'main') {
      output('You are trying to delete issues for the main environment')
      output('This is not allowed')
      process.exit(1)
      return
    }

    const config: SentryConfig = {
      url: ServerWebAppConfig.Sentry.url,
      org: ServerWebAppConfig.Sentry.org,
      project: ServerWebAppConfig.Sentry.project,
      authToken: ServerWebAppConfig.Sentry.authToken,
    }
    const http = createSentryHttpClient(config)

    // First, list all environments that currently have issues
    const envsWithIssues = await listEnvironmentsWithIssues(
      http,
      config.org,
      config.project,
    )
    const allEnvsRaw = await listProjectEnvironments(
      http,
      config.org,
      config.project,
    )

    const allEnvs = [
      ...new Set([...allEnvsRaw, ...envsWithIssues.map((e) => e.environment)]),
    ]

    const envWithCount = new Map(
      envsWithIssues.map((e) => [e.environment, e.count]),
    )
    const zeroEnvs = allEnvs.filter((e) => !envWithCount.has(e))

    if (envsWithIssues.length > 0) {
      output('Environments with issues:')
      for (const e of envsWithIssues) output(`- ${e.environment}: ${e.count}`)
    } else {
      output('No environments with issues found in Sentry')
    }

    if (zeroEnvs.length > 0) {
      output('Environments with 0 issues:')
      for (const name of zeroEnvs) output(`- ${name}`)
    }

    // If environment is not present in allEnvs, no-op
    if (!allEnvs.includes(environment)) {
      output(`Environment "${environment}" is not present in Sentry`)
      return
    }

    output(
      `Fetching issues in Sentry environment "${environment}" for project ${config.org}/${config.project}...`,
    )
    const issueIds = await listIssueIdsForEnvironment(
      http,
      config.org,
      config.project,
      environment,
    )
    output(`Found ${issueIds.length} issue(s) to delete`)

    if (issueIds.length > 0) {
      output('Deleting issues...')
      const { deletedCount, failedCount } = await deleteIssuesByIds(
        http,
        issueIds,
      )
      output(`Deleted ${deletedCount} issue(s)`)
      if (failedCount > 0)
        outputError(`Failed to delete ${failedCount} issue(s)`)
    }

    try {
      const result = await updateProjectEnvironmentVisibility(
        http,
        config.org,
        config.project,
        environment,
        true,
      )
      output(`Environment "${result.name}" has been hidden from Sentry UI`)
    } catch {
      outputError('Failed to hide environment via Sentry API')
    }
  })
