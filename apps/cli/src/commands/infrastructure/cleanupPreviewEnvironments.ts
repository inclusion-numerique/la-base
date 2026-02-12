import { octokit, owner, repo } from '@app/cli/github'
import { output, outputError } from '@app/cli/output'
import {
  containerNamespaceName,
  databaseInstanceName,
  projectSlug,
  region,
} from '@app/config/config'
import {
  ListBucketsCommand,
  ListObjectsV2Command,
  S3Client,
} from '@aws-sdk/client-s3'
import { Command } from '@commander-js/extra-typings'
import { select } from '@inquirer/prompts'
import axios from 'axios'
import Table from 'cli-table3'
import { differenceInDays, format } from 'date-fns'
import { fr } from 'date-fns/locale'
import pc from 'picocolors'

const { computeBranchNamespace } = await import('@app/cdk/utils')

const protectedBranches = ['main', 'dev']

const formatDate = (dateString: string) =>
  format(new Date(dateString), "dd/MM/yyyy HH'h'mm", { locale: fr })

const daysAgo = (dateString: string) =>
  differenceInDays(new Date(), new Date(dateString))

type ScalewayContainer = {
  id: string
  name: string
  namespace_id: string
  status: string
  domain_name: string
  created_at: string
  updated_at: string
}

type ScalewayNamespace = {
  id: string
  name: string
}

type PreviewBucket = {
  name: string
  namespace: string
  sizeBytes: number | null
}

type PreviewDatabase = {
  name: string
  namespace: string
  sizeBytes: number | null
}

type BranchDetail = {
  name: string
  namespace: string
  isProtected: boolean
  pr: { number: number; title: string; createdAt: string } | null
  lastCommitDate: string
  lastCommitAuthor: string
  deployedContainer: boolean
  bucket: PreviewBucket | null
  stale: boolean
  mergedInDev: boolean
  deletable: boolean
}

type OrphanedResource = {
  namespace: string
  container: ScalewayContainer | null
  bucket: PreviewBucket | null
}

const fetchScalewayContainers = async () => {
  const secretKey = process.env.SCW_SECRET_KEY
  if (!secretKey) {
    outputError(
      'Missing SCW_SECRET_KEY env variable, skipping Scaleway containers check',
    )
    return []
  }

  const scwRegion = region || 'fr-par'
  const client = axios.create({
    baseURL: `https://api.scaleway.com/containers/v1beta1/regions/${scwRegion}`,
    headers: { 'X-Auth-Token': secretKey },
  })

  const { data: namespacesData } = await client.get<{
    namespaces: ScalewayNamespace[]
  }>('/namespaces', {
    params: { name: containerNamespaceName, page_size: 100 },
  })

  const namespace = namespacesData.namespaces.find(
    (ns) => ns.name === containerNamespaceName,
  )

  if (!namespace) {
    outputError(
      `Scaleway namespace "${containerNamespaceName}" not found, skipping containers check`,
    )
    return []
  }

  const { data: containersData } = await client.get<{
    containers: ScalewayContainer[]
  }>('/containers', {
    params: { namespace_id: namespace.id, page_size: 100 },
  })

  return containersData.containers
}

const formatBytes = (value: number | null) => {
  if (value == null) return 'unknown'
  if (value === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const exponent = Math.min(
    Math.floor(Math.log(value) / Math.log(1024)),
    units.length - 1,
  )
  const normalized = value / 1024 ** exponent
  const digits = normalized >= 10 || exponent === 0 ? 0 : 1
  return `${normalized.toFixed(digits)} ${units[exponent]}`
}

const bucketPrefix = `${projectSlug}-uploads-`
const toDatabaseName = (namespace: string) => `${projectSlug}-${namespace}`
const databasePrefix = `${projectSlug}-`

const yesNo = (value: boolean) => (value ? pc.green('Yes') : pc.yellow('No'))

const bucketCell = (bucket: PreviewBucket | null) => {
  if (!bucket) return pc.yellow('No')
  const sizeBytes = bucket.sizeBytes
  const size = formatBytes(sizeBytes)
  const sizeColored =
    sizeBytes == null || sizeBytes === 0 ? pc.yellow(size) : pc.green(size)
  return `${pc.green('Yes')} - ${sizeColored}`
}

const databaseCell = (database: PreviewDatabase | null) => {
  if (!database) return pc.yellow('No')
  const sizeBytes = database.sizeBytes
  const size = formatBytes(sizeBytes)
  const sizeColored =
    sizeBytes == null || sizeBytes === 0 ? pc.yellow(size) : pc.green(size)
  return `${pc.green('Yes')} - ${sizeColored}`
}

const containerStatusCell = (container: ScalewayContainer | null) => {
  if (!container) return pc.yellow('No')
  const status =
    container.status.toLowerCase() === 'ready'
      ? pc.green(container.status)
      : pc.yellow(container.status)
  return `${pc.green('Yes')} - ${status} - ${formatDate(container.created_at)}`
}

const isPromptExitError = (error: unknown) =>
  error instanceof Error &&
  (error.name === 'ExitPromptError' ||
    error.message.includes('User force closed the prompt with SIGINT'))

const parsePreviewBucketNamespace = (bucketName: string) => {
  if (!bucketName.startsWith(bucketPrefix)) return null
  const namespace = bucketName.slice(bucketPrefix.length)
  return namespace || null
}

const fetchBucketSizeBytes = async (client: S3Client, bucketName: string) => {
  let continuationToken: string | undefined
  let totalSize = 0

  do {
    const response = await client.send(
      new ListObjectsV2Command({
        Bucket: bucketName,
        ContinuationToken: continuationToken,
        MaxKeys: 1000,
      }),
    )

    for (const item of response.Contents ?? []) {
      totalSize += item.Size ?? 0
    }

    continuationToken = response.IsTruncated
      ? response.NextContinuationToken
      : undefined
  } while (continuationToken)

  return totalSize
}

const fetchPreviewBuckets = async (): Promise<PreviewBucket[]> => {
  const accessKey =
    process.env.SCW_ACCESS_KEY ?? process.env.AWS_ACCESS_KEY_ID ?? ''
  const secretKey =
    process.env.SCW_SECRET_KEY ?? process.env.AWS_SECRET_ACCESS_KEY ?? ''

  if (!accessKey || !secretKey) {
    outputError(
      'Missing SCW_ACCESS_KEY/SCW_SECRET_KEY env variables, skipping preview buckets check',
    )
    return []
  }

  const scwRegion = region || process.env.AWS_DEFAULT_REGION || 'fr-par'
  const s3Host = process.env.S3_HOST || `s3.${scwRegion}.scw.cloud`

  const client = new S3Client({
    region: scwRegion,
    endpoint: `https://${s3Host}`,
    forcePathStyle: false,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    },
  })

  try {
    const listBucketsResponse = await client.send(new ListBucketsCommand({}))
    const bucketNames = (listBucketsResponse.Buckets ?? [])
      .map((bucket) => bucket.Name)
      .filter((bucketName): bucketName is string => Boolean(bucketName))

    const previewBucketNames = bucketNames.filter((bucketName) =>
      bucketName.startsWith(bucketPrefix),
    )

    const previewBuckets = await Promise.all(
      previewBucketNames.map(async (bucketName): Promise<PreviewBucket> => {
        const namespace = parsePreviewBucketNamespace(bucketName)
        if (!namespace) {
          return { name: bucketName, namespace: '', sizeBytes: null }
        }

        try {
          const sizeBytes = await fetchBucketSizeBytes(client, bucketName)
          return { name: bucketName, namespace, sizeBytes }
        } catch (error) {
          outputError(
            `Could not compute size for bucket "${bucketName}": ${error instanceof Error ? error.message : String(error)}`,
          )
          return { name: bucketName, namespace, sizeBytes: null }
        }
      }),
    )

    return previewBuckets.filter((bucket) => bucket.namespace)
  } catch (error) {
    outputError(
      `Failed to list S3 buckets: ${error instanceof Error ? error.message : String(error)}`,
    )
    return []
  }
}

const parsePreviewDatabaseNamespace = (databaseName: string) => {
  if (!databaseName.startsWith(databasePrefix)) return null
  const namespace = databaseName.slice(databasePrefix.length)
  return namespace || null
}

const fetchPreviewDatabases = async (): Promise<PreviewDatabase[]> => {
  const secretKey = process.env.SCW_SECRET_KEY
  if (!secretKey) {
    outputError(
      'Missing SCW_SECRET_KEY env variable, skipping preview databases check',
    )
    return []
  }

  if (!databaseInstanceName) {
    outputError(
      'Missing DATABASE_INSTANCE_NAME env variable, skipping preview databases check',
    )
    return []
  }

  const scwRegion = region || 'fr-par'
  const client = axios.create({
    baseURL: `https://api.scaleway.com/rdb/v1/regions/${scwRegion}`,
    headers: { 'X-Auth-Token': secretKey },
  })

  try {
    const { data: instancesData } = await client.get<{
      instances: { id: string; name: string }[]
    }>('/instances', {
      params: { name: databaseInstanceName, page_size: 100 },
    })

    const instance = instancesData.instances.find(
      (candidate) => candidate.name === databaseInstanceName,
    )
    if (!instance) {
      outputError(
        `Database instance "${databaseInstanceName}" not found, skipping preview databases check`,
      )
      return []
    }

    const { data: databasesData } = await client.get<{
      databases: { name: string; size?: number | null }[]
    }>(`/instances/${instance.id}/databases`)

    return databasesData.databases
      .map((database): PreviewDatabase | null => {
        const namespace = parsePreviewDatabaseNamespace(database.name)
        if (!namespace) return null
        return {
          name: database.name,
          namespace,
          sizeBytes: database.size ?? null,
        }
      })
      .filter((database): database is PreviewDatabase => Boolean(database))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      outputError(
        `Failed to list preview databases: ${error.response?.status} ${error.response?.statusText ?? ''} - ${JSON.stringify(error.response?.data)}`,
      )
    } else {
      outputError(
        `Failed to list preview databases: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
    return []
  }
}

const triggerEnvDeletion = async (
  branch: string,
  circleCiToken: string,
): Promise<boolean> => {
  const circleCiApiUrl = `https://circleci.com/api/v2/project/gh/inclusion-numerique/${projectSlug}/pipeline`

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
    output(`  Env deletion pipeline triggered: ${pipelineUrl}`)
    return true
  } catch (error) {
    if (axios.isAxiosError(error)) {
      outputError(
        `  Env deletion failed: ${error.response?.status} ${error.response?.statusText ?? ''} - ${JSON.stringify(error.response?.data)}`,
      )
    } else {
      outputError(
        `  Env deletion failed: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
    return false
  }
}

const deleteGitBranch = async (branch: string): Promise<boolean> => {
  try {
    await octokit.rest.git.deleteRef({
      owner,
      repo,
      ref: `heads/${branch}`,
    })
    output(`  Git branch "${branch}" deleted`)
    return true
  } catch (error) {
    outputError(
      `  Failed to delete git branch "${branch}": ${error instanceof Error ? error.message : String(error)}`,
    )
    return false
  }
}

type CleanupAction = 'env_and_branch' | 'env_only' | 'branch_only' | 'skip'

export const cleanupPreviewEnvironments = new Command()
  .command('infrastructure:cleanup-preview')
  .description(
    'Interactive cleanup: review each deletable branch, delete its preview environment and/or git branch',
  )
  .action(async () => {
    try {
      const circleCiToken = process.env.CIRCLE_CI_TOKEN
      if (!circleCiToken) {
        outputError(
          'Missing CIRCLE_CI_TOKEN env variable for CircleCI authentication',
        )
        process.exit(1)
        return
      }

      output(
        'Fetching branches, pull requests, Scaleway containers, and preview buckets...\n',
      )

    const [branches, openPRs, containers, previewBuckets, previewDatabases] =
      await Promise.all([
        octokit.rest.repos
          .listBranches({ owner, repo, per_page: 100 })
          .then((r) => r.data),
        octokit.rest.pulls
          .list({ owner, repo, state: 'open', per_page: 100 })
          .then((r) => r.data),
        fetchScalewayContainers(),
        fetchPreviewBuckets(),
      fetchPreviewDatabases(),
    ])

    const prByBranch = new Map(openPRs.map((pr) => [pr.head.ref, pr]))
    const containerByName = new Map(containers.map((c) => [c.name, c]))
    const bucketByNamespace = new Map(
      previewBuckets.map((bucket) => [bucket.namespace, bucket]),
    )
    const databaseByNamespace = new Map(
      previewDatabases.map((database) => [database.namespace, database]),
    )
    const branchNamespaceToGitBranch = new Map<string, string>()

    const branchDetails: BranchDetail[] = await Promise.all(
      branches.map(async (branch) => {
        const { data: commit } = await octokit.rest.repos.getCommit({
          owner,
          repo,
          ref: branch.commit.sha,
        })

        const lastCommitDate =
          commit.commit.committer?.date ??
          commit.commit.author?.date ??
          'unknown'

        const pr = prByBranch.get(branch.name)
        const namespace = computeBranchNamespace(branch.name)
        const containerName =
          namespace.length > 34 ? namespace.slice(0, 34) : namespace

        branchNamespaceToGitBranch.set(namespace, branch.name)

        const deployedContainer = containerByName.has(containerName)
        const bucket = bucketByNamespace.get(namespace) ?? null
        const isProtected = protectedBranches.includes(branch.name)
        const days = lastCommitDate !== 'unknown' ? daysAgo(lastCommitDate) : 0
        const stale = days > 30

        let mergedInDev = false
        if (!isProtected) {
          try {
            const { data: comparison } =
              await octokit.rest.repos.compareCommits({
                owner,
                repo,
                base: 'dev',
                head: branch.name,
              })
            mergedInDev = comparison.ahead_by === 0
          } catch {
            // If comparison fails, assume not merged
          }
        }

        const deletable =
          !isProtected && ((!pr && stale) || (!pr && mergedInDev))

        return {
          name: branch.name,
          isProtected,
          pr: pr
            ? { number: pr.number, title: pr.title, createdAt: pr.created_at }
            : null,
          namespace,
          lastCommitDate,
          lastCommitAuthor:
            commit.commit.author?.name ?? commit.author?.login ?? 'unknown',
          deployedContainer,
          bucket,
          stale,
          mergedInDev,
          deletable,
        }
      }),
    )

    const orphanedContainers = containers.filter((container) => {
      return !branchNamespaceToGitBranch.has(container.name)
    })
    const orphanedBuckets = previewBuckets.filter((bucket) => {
      return !branchNamespaceToGitBranch.has(bucket.namespace)
    })

    const orphanedByNamespace = new Map<string, OrphanedResource>()
    for (const container of orphanedContainers) {
      orphanedByNamespace.set(container.name, {
        namespace: container.name,
        container,
        bucket: null,
      })
    }
    for (const bucket of orphanedBuckets) {
      const existing = orphanedByNamespace.get(bucket.namespace)
      orphanedByNamespace.set(bucket.namespace, {
        namespace: bucket.namespace,
        container: existing?.container ?? null,
        bucket,
      })
    }
    const orphanedResources = [...orphanedByNamespace.values()].sort((a, b) =>
      a.namespace.localeCompare(b.namespace),
    )

    // Sort: oldest first for review
    branchDetails.sort(
      (a, b) =>
        new Date(a.lastCommitDate).getTime() -
        new Date(b.lastCommitDate).getTime(),
    )

    const nonProtected = branchDetails.filter((b) => !b.isProtected)
    const deletable = nonProtected.filter((b) => b.deletable)

    // Overview
    const knownBucketSizeTotal = previewBuckets.reduce((sum, bucket) => {
      return bucket.sizeBytes == null ? sum : sum + bucket.sizeBytes
    }, 0)

    const overviewTable = new Table()
    overviewTable.push(
      { 'Total branches': String(branches.length) },
      {
        Protected: `${branchDetails.filter((b) => b.isProtected).length} (${protectedBranches.join(', ')})`,
      },
      { 'With open PR': String(nonProtected.filter((b) => b.pr).length) },
      { Deletable: String(deletable.length) },
      { 'Deployed containers': String(containers.length) },
      { 'Deployed preview buckets': String(previewBuckets.length) },
      { 'Orphaned containers': String(orphanedContainers.length) },
      { 'Orphaned buckets': String(orphanedBuckets.length) },
      { 'Preview buckets size (total)': formatBytes(knownBucketSizeTotal) },
    )
    output('OVERVIEW:')
    output(overviewTable.toString())

    const reviewTable = new Table({
      head: ['Target', 'Container', 'Database', 'Bucket', 'PR', 'Flags'],
      wordWrap: true,
    })

    for (const branch of deletable) {
      const flags = [
        branch.mergedInDev ? 'merged-in-dev' : null,
        branch.stale ? 'stale' : null,
      ]
        .filter(Boolean)
        .join(', ')

      reviewTable.push([
        `${branch.name}\n${toDatabaseName(branch.namespace)}`,
        yesNo(branch.deployedContainer),
        databaseCell(databaseByNamespace.get(branch.namespace) ?? null),
        bucketCell(branch.bucket),
        branch.pr ? `#${branch.pr.number}` : '-',
        flags || '-',
      ])
    }

    for (const orphan of orphanedResources) {
      reviewTable.push([
        `${pc.yellow('orphan')}\n${orphan.namespace}\n${toDatabaseName(orphan.namespace)}`,
        yesNo(Boolean(orphan.container)),
        databaseCell(databaseByNamespace.get(orphan.namespace) ?? null),
        bucketCell(orphan.bucket),
        '-',
        'no-git-branch',
      ])
    }

    if (reviewTable.length > 0) {
      output('\nCLEANUP CANDIDATES:')
      output(reviewTable.toString())
    }

    if (deletable.length === 0 && orphanedResources.length === 0) {
      output('\nNothing to clean up.')
      return
    }

    output(
      `\nReviewing ${deletable.length} deletable branch(es) and ${orphanedResources.length} orphaned target(s)...\n`,
    )

    let envDeletedCount = 0
    let branchDeletedCount = 0
    let skippedCount = 0

    // Iterate through deletable branches
    for (const [index, branch] of deletable.entries()) {
      const days = daysAgo(branch.lastCommitDate)
      const database = databaseByNamespace.get(branch.namespace) ?? null

      const statusTable = new Table()
      statusTable.push(
        { Branch: branch.name },
        { Namespace: branch.namespace },
        {
          Database: `${toDatabaseName(branch.namespace)}\n${databaseCell(database)}`,
        },
        { 'Container deployed': branch.deployedContainer ? 'Yes' : 'No' },
        { 'Bucket deployed': branch.bucket ? 'Yes' : 'No' },
        { 'Bucket size': formatBytes(branch.bucket?.sizeBytes ?? null) },
        { 'Merged in dev': branch.mergedInDev ? 'Yes' : 'No' },
        { Stale: branch.stale ? `Yes (${days}d ago)` : 'No' },
        {
          'Last commit': `${branch.lastCommitDate !== 'unknown' ? formatDate(branch.lastCommitDate) : '-'} by ${branch.lastCommitAuthor}`,
        },
      )

      output(`\n--- Branch ${index + 1}/${deletable.length} ---`)
      output(statusTable.toString())

      const choices: { name: string; value: CleanupAction }[] =
        branch.deployedContainer
          ? [
              {
                name: 'Delete environment + git branch',
                value: 'env_and_branch',
              },
              { name: 'Delete environment only', value: 'env_only' },
              { name: 'Delete git branch only', value: 'branch_only' },
              { name: 'Do nothing', value: 'skip' },
            ]
          : [
              { name: 'Delete git branch', value: 'branch_only' },
              { name: 'Do nothing', value: 'skip' },
            ]

      const defaultAction: CleanupAction = branch.deployedContainer
        ? branch.mergedInDev
          ? 'env_and_branch'
          : 'skip'
        : branch.mergedInDev
          ? 'branch_only'
          : 'skip'

      const action = await select<CleanupAction>({
        message: `What to do with "${branch.name}"?`,
        default: defaultAction,
        choices,
      })

      if (action === 'skip') {
        output('  Skipped.')
        skippedCount++
        continue
      }

      if (action === 'env_and_branch' || action === 'env_only') {
        output(`  Triggering environment deletion for "${branch.name}"...`)
        const success = await triggerEnvDeletion(branch.name, circleCiToken)
        if (success) envDeletedCount++
      }

      if (action === 'env_and_branch' || action === 'branch_only') {
        output(`  Deleting git branch "${branch.name}"...`)
        const success = await deleteGitBranch(branch.name)
        if (success) branchDeletedCount++
      }
    }

    // Iterate through orphaned resources (no git branch to delete)
    for (const [index, orphan] of orphanedResources.entries()) {
      const databaseName = toDatabaseName(orphan.namespace)
      const database = databaseByNamespace.get(orphan.namespace) ?? null
      const statusTable = new Table()
      statusTable.push(
        { Namespace: orphan.namespace },
        { Database: `${databaseName}\n${databaseCell(database)}` },
        { Container: containerStatusCell(orphan.container) },
        { Bucket: bucketCell(orphan.bucket) },
        { 'Git branch': 'None (orphaned)' },
      )

      output(
        `\n--- Orphaned target ${index + 1}/${orphanedResources.length} ---`,
      )
      output(statusTable.toString())

      const action = await select<'env_only' | 'skip'>({
        message: `What to do with orphaned namespace "${orphan.namespace}"?`,
        default: 'env_only',
        choices: [
          {
            name: 'Delete environment',
            value: 'env_only',
          },
          {
            name: 'Do nothing',
            value: 'skip',
          },
        ],
      })

      if (action === 'env_only') {
        output(`  Triggering environment deletion for "${orphan.namespace}"...`)
        const success = await triggerEnvDeletion(
          orphan.namespace,
          circleCiToken,
        )
        if (success) envDeletedCount++
      } else {
        output('  Skipped.')
        skippedCount++
      }
    }

    // Final summary
      output('')
      const summaryTable = new Table()
      summaryTable.push(
        { 'Env deletions triggered': String(envDeletedCount) },
        { 'Git branches deleted': String(branchDeletedCount) },
        { Skipped: String(skippedCount) },
      )
      output('CLEANUP COMPLETE:')
      output(summaryTable.toString())
    } catch (error) {
      if (isPromptExitError(error)) {
        output('\nInterrupted by user.')
        process.exit(130)
        return
      }
      throw error
    }
  })
