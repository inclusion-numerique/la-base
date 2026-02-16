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

const PROTECTED_BRANCHES = ['main', 'dev'] as const
const DEFAULT_SCW_REGION = 'fr-par'
const MAX_CONTAINER_NAME_LENGTH = 34
const STALE_AFTER_DAYS = 30

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

type NoGitBranchResource = {
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

  const scwRegion = region || DEFAULT_SCW_REGION
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
const getContainerNameForNamespace = (namespace: string) =>
  namespace.length > MAX_CONTAINER_NAME_LENGTH
    ? namespace.slice(0, MAX_CONTAINER_NAME_LENGTH)
    : namespace

const yesNo = (value: boolean) => (value ? pc.green('Yes') : pc.yellow('No'))

const formatStorageStatusCell = (
  sizeBytes: number | null,
  deployed: boolean,
) => {
  if (!deployed) return `${pc.yellow('not deployed')}\n${pc.yellow('-')}`
  if (sizeBytes == null)
    return `${pc.yellow('deployed')}\n${pc.yellow('unknown size')}`
  if (sizeBytes === 0) return `${pc.yellow('empty')}\n${pc.yellow('0 B')}`
  return `${pc.green('in use')}\n${pc.green(formatBytes(sizeBytes))}`
}

const bucketCell = (bucket: PreviewBucket | null) =>
  formatStorageStatusCell(bucket?.sizeBytes ?? null, Boolean(bucket))

const databaseCell = (database: PreviewDatabase | null) => {
  return formatStorageStatusCell(database?.sizeBytes ?? null, Boolean(database))
}

const containerStatusCell = (container: ScalewayContainer | null) => {
  if (!container) return `${pc.yellow('not deployed')}\n${pc.yellow('-')}`
  const normalizedStatus = container.status.toLowerCase()
  const runningAliases = ['ready', 'running']
  const status = runningAliases.includes(normalizedStatus)
    ? pc.green('running')
    : pc.yellow(normalizedStatus)
  return `${status}\n${formatDate(container.updated_at)}`
}

const isPromptExitError = (error: unknown) =>
  error instanceof Error &&
  (error.name === 'ExitPromptError' ||
    error.message.includes('User force closed the prompt with SIGINT'))

const hasValue = (value: string | undefined | null) =>
  Boolean(value && value.trim().length > 0)

const normalizeDatabaseInstanceId = (value: string) =>
  value.trim().split('/').filter(Boolean).pop() ?? value.trim()

const resolveDatabaseInstanceIdentifier = () => {
  const databaseInstanceId = process.env.DATABASE_INSTANCE_ID
  if (hasValue(databaseInstanceId)) {
    return {
      instanceId: normalizeDatabaseInstanceId(databaseInstanceId!),
      source: 'DATABASE_INSTANCE_ID' as const,
    }
  }

  if (hasValue(databaseInstanceName)) {
    return { instanceId: null, source: 'DATABASE_INSTANCE_NAME' as const }
  }

  return { instanceId: null, source: null }
}

const getMissingEnvValidationErrors = () => {
  const errors: string[] = []

  if (!hasValue(process.env.CIRCLE_CI_TOKEN)) {
    errors.push('CIRCLE_CI_TOKEN is required to trigger cleanup pipelines.')
  }

  const scwSecretConfigured = hasValue(process.env.SCW_SECRET_KEY)
  if (!scwSecretConfigured) {
    errors.push(
      'SCW_SECRET_KEY is required to query Scaleway container/database inventory.',
    )
  }

  const hasScwAccess = hasValue(process.env.SCW_ACCESS_KEY)
  const hasAwsAccess = hasValue(process.env.AWS_ACCESS_KEY_ID)
  const hasAwsSecret = hasValue(process.env.AWS_SECRET_ACCESS_KEY)
  const hasBucketCredentials =
    (hasScwAccess && scwSecretConfigured) || (hasAwsAccess && hasAwsSecret)
  if (!hasBucketCredentials) {
    errors.push(
      'S3 credentials are required for bucket inventory (either SCW_ACCESS_KEY+SCW_SECRET_KEY or AWS_ACCESS_KEY_ID+AWS_SECRET_ACCESS_KEY).',
    )
  }

  const databaseInstance = resolveDatabaseInstanceIdentifier()
  if (!databaseInstance.source) {
    errors.push(
      'Set DATABASE_INSTANCE_ID or DATABASE_INSTANCE_NAME to query preview databases.',
    )
  }

  return errors
}

const assertRequiredEnvForInventory = () => {
  const errors = getMissingEnvValidationErrors()
  if (errors.length === 0) return true

  outputError(
    'Cannot start infrastructure inventory: missing required environment variables. (check your .env file)',
  )
  for (const error of errors) {
    outputError(`  - ${error}`)
  }
  return false
}

const formatBranchFlags = (branch: BranchDetail) => {
  const flags = [
    branch.isProtected ? pc.green('protected') : null,
    branch.mergedInDev ? pc.green('merged-in-dev') : null,
    !branch.isProtected && !branch.mergedInDev ? pc.yellow('not merged') : null,
    branch.stale ? pc.yellow('stale') : null,
  ].filter(Boolean)
  return flags.length > 0 ? flags.join('\n') : '-'
}

const toCommitTimestamp = (lastCommitDate: string) => {
  if (lastCommitDate === 'unknown') return Number.POSITIVE_INFINITY
  const timestamp = new Date(lastCommitDate).getTime()
  return Number.isFinite(timestamp) ? timestamp : Number.POSITIVE_INFINITY
}

const sortByLastCommitAsc = <T extends { lastCommitDate: string }>(
  left: T,
  right: T,
) =>
  toCommitTimestamp(left.lastCommitDate) -
  toCommitTimestamp(right.lastCommitDate)

const getContainerForNamespace = (
  containerByName: Map<string, ScalewayContainer>,
  namespace: string,
) => containerByName.get(getContainerNameForNamespace(namespace)) ?? null

const hasEnvironmentResources = ({
  deployedContainer,
  database,
  bucket,
}: {
  deployedContainer: boolean
  database: PreviewDatabase | null
  bucket: PreviewBucket | null
}) => Boolean(deployedContainer || database || bucket)

const isProtectedBranch = (branchName: string) =>
  PROTECTED_BRANCHES.includes(branchName as (typeof PROTECTED_BRANCHES)[number])

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

  const scwRegion =
    region || process.env.AWS_DEFAULT_REGION || DEFAULT_SCW_REGION
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

  const databaseInstance = resolveDatabaseInstanceIdentifier()
  if (!databaseInstance.source) {
    outputError(
      'Missing DATABASE_INSTANCE_ID/DATABASE_INSTANCE_NAME env variable, skipping preview databases check',
    )
    return []
  }

  const scwRegion = region || DEFAULT_SCW_REGION
  const client = axios.create({
    baseURL: `https://api.scaleway.com/rdb/v1/regions/${scwRegion}`,
    headers: { 'X-Auth-Token': secretKey },
  })

  try {
    let instanceId = databaseInstance.instanceId
    if (!instanceId) {
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
      instanceId = instance.id
    }

    const { data: databasesData } = await client.get<{
      databases: { name: string; size?: number | null }[]
    }>(`/instances/${instanceId}/databases`)
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

export const infrastructureInventory = new Command()
  .command('infrastructure:inventory')
  .description(
    'Show infrastructure inventory and allow interactive cleanup actions',
  )
  .action(async () => {
    try {
      if (!assertRequiredEnvForInventory()) {
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
          const containerName = getContainerNameForNamespace(namespace)

          branchNamespaceToGitBranch.set(namespace, branch.name)

          const deployedContainer = containerByName.has(containerName)
          const bucket = bucketByNamespace.get(namespace) ?? null
          const isProtected = isProtectedBranch(branch.name)
          const days =
            lastCommitDate !== 'unknown' ? daysAgo(lastCommitDate) : 0
          const stale = days > STALE_AFTER_DAYS

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

      const noGitBranchContainers = containers.filter((container) => {
        return !branchNamespaceToGitBranch.has(container.name)
      })
      const noGitBranchBuckets = previewBuckets.filter((bucket) => {
        return !branchNamespaceToGitBranch.has(bucket.namespace)
      })

      const noGitBranchByNamespace = new Map<string, NoGitBranchResource>()
      for (const container of noGitBranchContainers) {
        noGitBranchByNamespace.set(container.name, {
          namespace: container.name,
          container,
          bucket: null,
        })
      }
      for (const bucket of noGitBranchBuckets) {
        const existing = noGitBranchByNamespace.get(bucket.namespace)
        noGitBranchByNamespace.set(bucket.namespace, {
          namespace: bucket.namespace,
          container: existing?.container ?? null,
          bucket,
        })
      }
      const noGitBranchResources = [...noGitBranchByNamespace.values()].sort(
        (a, b) => a.namespace.localeCompare(b.namespace),
      )

      // Sort: oldest first for review
      branchDetails.sort(sortByLastCommitAsc)

      const nonProtected = branchDetails.filter((b) => !b.isProtected)
      const deletable = nonProtected.filter((b) => b.deletable)
      const deletableNames = new Set(deletable.map((branch) => branch.name))

      // Overview
      const knownBucketSizeTotal = previewBuckets.reduce((sum, bucket) => {
        return bucket.sizeBytes == null ? sum : sum + bucket.sizeBytes
      }, 0)

      const inventorySummaryTable = new Table()
      inventorySummaryTable.push(
        { 'Total branches': String(branches.length) },
        {
          Protected: `${branchDetails.filter((b) => b.isProtected).length} (${PROTECTED_BRANCHES.join(', ')})`,
        },
        { 'With open PR': String(nonProtected.filter((b) => b.pr).length) },
        { Deletable: String(deletable.length) },
        { 'Deployed containers': String(containers.length) },
        { 'Deployed preview buckets': String(previewBuckets.length) },
        { 'No git branch containers': String(noGitBranchContainers.length) },
        { 'No git branch buckets': String(noGitBranchBuckets.length) },
        { 'Preview buckets size (total)': formatBytes(knownBucketSizeTotal) },
      )
      output('SUMMARY:')
      output(inventorySummaryTable.toString())

      const inventoryTable = new Table({
        head: [
          'Target',
          'Container status',
          'Database status',
          'Bucket status',
          'PR',
          'Flags',
        ],
        wordWrap: true,
      })

      const addBranchRow = (branch: BranchDetail) => {
        inventoryTable.push([
          `${pc.bold(branch.name)}\n${toDatabaseName(branch.namespace)}`,
          containerStatusCell(
            getContainerForNamespace(containerByName, branch.namespace),
          ),
          databaseCell(databaseByNamespace.get(branch.namespace) ?? null),
          bucketCell(branch.bucket),
          branch.pr ? `#${branch.pr.number}` : '-',
          formatBranchFlags(branch),
        ])
      }

      const mainBranch = branchDetails.find((branch) => branch.name === 'main')
      const devBranch = branchDetails.find((branch) => branch.name === 'dev')
      const nonCandidateBranches = branchDetails
        .filter(
          (branch) =>
            branch.name !== 'main' &&
            branch.name !== 'dev' &&
            !deletableNames.has(branch.name),
        )
        .sort(sortByLastCommitAsc)
      const cleanupCandidateBranches = [...deletable].sort(sortByLastCommitAsc)

      if (mainBranch) addBranchRow(mainBranch)
      if (devBranch) addBranchRow(devBranch)
      for (const branch of nonCandidateBranches) {
        addBranchRow(branch)
      }

      if (
        cleanupCandidateBranches.length > 0 ||
        noGitBranchResources.length > 0
      ) {
        inventoryTable.push([
          pc.cyan('----- Cleanup candidates -----'),
          '',
          '',
          '',
          '',
          '',
        ])
      }

      for (const branch of cleanupCandidateBranches) {
        addBranchRow(branch)
      }

      for (const noGitBranchResource of noGitBranchResources) {
        inventoryTable.push([
          `${pc.red('no git branch')}\n${noGitBranchResource.namespace}\n${toDatabaseName(noGitBranchResource.namespace)}`,
          containerStatusCell(noGitBranchResource.container),
          databaseCell(
            databaseByNamespace.get(noGitBranchResource.namespace) ?? null,
          ),
          bucketCell(noGitBranchResource.bucket),
          '-',
          pc.red('no-git-branch'),
        ])
      }

      if (inventoryTable.length > 0) {
        output('\nINVENTORY:')
        output(inventoryTable.toString())
      }

      if (deletable.length === 0 && noGitBranchResources.length === 0) {
        output('\nNothing to clean up.')
        return
      }

      output(
        `\nReviewing ${deletable.length} deletable branch(es) and ${noGitBranchResources.length} no-git-branch target(s)...\n`,
      )

      let envDeletedCount = 0
      let branchDeletedCount = 0
      let skippedCount = 0

      // Iterate through deletable branches
      for (const [index, branch] of deletable.entries()) {
        const days = daysAgo(branch.lastCommitDate)
        const database = databaseByNamespace.get(branch.namespace) ?? null
        const canDeleteEnvironment = hasEnvironmentResources({
          deployedContainer: branch.deployedContainer,
          database,
          bucket: branch.bucket,
        })
        const staleStatus = branch.stale
          ? pc.yellow(`stale (${days}d ago)`)
          : pc.green('fresh')
        const coloredCommitDate =
          branch.lastCommitDate === 'unknown'
            ? pc.yellow('-')
            : branch.stale
              ? pc.yellow(formatDate(branch.lastCommitDate))
              : pc.green(formatDate(branch.lastCommitDate))

        const statusTable = new Table()
        statusTable.push(
          { Branch: pc.bold(branch.name) },
          { Namespace: branch.namespace },
          {
            'Database status': `${toDatabaseName(branch.namespace)}\n${databaseCell(database)}`,
          },
          {
            'Container status': containerStatusCell(
              getContainerForNamespace(containerByName, branch.namespace),
            ),
          },
          { 'Bucket status': bucketCell(branch.bucket) },
          { 'Merged in dev': yesNo(branch.mergedInDev) },
          {
            'Last commit': `${coloredCommitDate} by ${branch.lastCommitAuthor}\n${staleStatus}`,
          },
        )

        output(`\n--- Branch ${index + 1}/${deletable.length} ---`)
        output(statusTable.toString())

        const choices: { name: string; value: CleanupAction }[] =
          canDeleteEnvironment
            ? [
                { name: 'Do nothing', value: 'skip' },
                {
                  name: 'Delete environment + git branch',
                  value: 'env_and_branch',
                },
                { name: 'Delete environment only', value: 'env_only' },
                { name: 'Delete git branch only', value: 'branch_only' },
              ]
            : [
                { name: 'Do nothing', value: 'skip' },
                { name: 'Delete git branch', value: 'branch_only' },
              ]

        const defaultAction: CleanupAction = canDeleteEnvironment
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

      // Iterate through resources with no git branch (no git branch to delete)
      for (const [
        index,
        noGitBranchResource,
      ] of noGitBranchResources.entries()) {
        const databaseName = toDatabaseName(noGitBranchResource.namespace)
        const database =
          databaseByNamespace.get(noGitBranchResource.namespace) ?? null
        const statusTable = new Table()
        statusTable.push(
          { Namespace: noGitBranchResource.namespace },
          { Database: `${databaseName}\n${databaseCell(database)}` },
          { Container: containerStatusCell(noGitBranchResource.container) },
          { Bucket: bucketCell(noGitBranchResource.bucket) },
          { 'Git branch': pc.red('No git branch') },
        )

        output(
          `\n--- No git branch target ${index + 1}/${noGitBranchResources.length} ---`,
        )
        output(statusTable.toString())

        const action = await select<'env_only' | 'skip'>({
          message: `What to do with no-git-branch namespace "${noGitBranchResource.namespace}"?`,
          default: 'env_only',
          choices: [
            {
              name: 'Do nothing',
              value: 'skip',
            },
            {
              name: 'Delete environment',
              value: 'env_only',
            },
          ],
        })

        if (action === 'env_only') {
          output(
            `  Triggering environment deletion for "${noGitBranchResource.namespace}"...`,
          )
          const success = await triggerEnvDeletion(
            noGitBranchResource.namespace,
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
