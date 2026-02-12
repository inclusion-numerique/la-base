import { randomBytes } from 'node:crypto'
import { output, outputError } from '@app/cli/output'
import {
  containerNamespaceName,
  databaseInstanceName,
  projectSlug,
  region,
} from '@app/config/config'
import { Command } from '@commander-js/extra-typings'
import axios from 'axios'

const { computeBranchNamespace } = await import('@app/cdk/utils')

type ResourceKind = 'database' | 'container'

type RdbInstance = {
  id: string
  name: string
}

type RdbDatabase = {
  name: string
}

type RdbUser = {
  name: string
}

type RdbPrivilege = {
  user_name: string
  database_name: string
  permission: string
}

type ScalewayNamespace = {
  id: string
  name: string
}

type ScalewayContainer = {
  id: string
  name: string
}

const maxContainerNameLength = 34

const formatApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return `${error.response?.status} ${error.response?.statusText ?? ''} - ${JSON.stringify(error.response?.data)}`
  }
  return error instanceof Error ? error.message : String(error)
}

const splitNames = (input: string) =>
  input
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)

const toNamespace = (value: string) => computeBranchNamespace(value)

const toNamespacedProjectResource = (value: string) => {
  const prefixed = `${projectSlug}-`
  if (value.startsWith(prefixed)) {
    const namespace = value.slice(prefixed.length)
    return {
      namespace,
      resourceName: value,
    }
  }

  const namespace = toNamespace(value)
  return {
    namespace,
    resourceName: `${projectSlug}-${namespace}`,
  }
}

const toContainerName = (value: string) => {
  const namespace = toNamespace(value)
  return namespace.slice(0, maxContainerNameLength).replace(/-$/, '')
}

const ensureScwSecretKey = () => {
  const token = process.env.SCW_SECRET_KEY
  if (!token) {
    outputError('Missing SCW_SECRET_KEY env variable for Scaleway API')
    process.exit(1)
    return null
  }
  return token
}

const getScwRegion = () => {
  const scwRegion = region || process.env.SCW_DEFAULT_REGION || 'fr-par'
  if (!scwRegion) {
    outputError('Missing Scaleway region (SCW_DEFAULT_REGION)')
    process.exit(1)
    return null
  }
  return scwRegion
}

const buildRdbClient = (scwRegion: string, token: string) =>
  axios.create({
    baseURL: `https://api.scaleway.com/rdb/v1/regions/${scwRegion}`,
    headers: { 'X-Auth-Token': token },
  })

const buildContainerClient = (scwRegion: string, token: string) =>
  axios.create({
    baseURL: `https://api.scaleway.com/containers/v1beta1/regions/${scwRegion}`,
    headers: { 'X-Auth-Token': token },
  })

const fetchRdbInstance = async (scwRegion: string, token: string) => {
  const client = buildRdbClient(scwRegion, token)
  const { data } = await client.get<{ instances: RdbInstance[] }>(
    '/instances',
    {
      params: { name: databaseInstanceName, page_size: 100 },
    },
  )
  const instance = data.instances.find(
    (candidate) => candidate.name === databaseInstanceName,
  )
  if (!instance) {
    throw new Error(`Database instance "${databaseInstanceName}" not found`)
  }
  return instance
}

const fetchContainerNamespace = async (scwRegion: string, token: string) => {
  const client = buildContainerClient(scwRegion, token)
  const { data } = await client.get<{ namespaces: ScalewayNamespace[] }>(
    '/namespaces',
    {
      params: { name: containerNamespaceName, page_size: 100 },
    },
  )
  const namespace = data.namespaces.find(
    (candidate) => candidate.name === containerNamespaceName,
  )
  if (!namespace) {
    throw new Error(`Container namespace "${containerNamespaceName}" not found`)
  }
  return namespace
}

const ensureDatabaseUserAndPrivilege = async ({
  scwRegion,
  token,
  instanceId,
  databaseName,
  userName,
  dryRun,
}: {
  scwRegion: string
  token: string
  instanceId: string
  databaseName: string
  userName: string
  dryRun: boolean
}) => {
  const client = buildRdbClient(scwRegion, token)

  const [dbs, users, privileges] = await Promise.all([
    client.get<{ databases: RdbDatabase[] }>(
      `/instances/${instanceId}/databases`,
    ),
    client.get<{ users: RdbUser[] }>(`/instances/${instanceId}/users`),
    client.get<{ privileges: RdbPrivilege[] }>(
      `/instances/${instanceId}/privileges`,
    ),
  ])

  const hasDatabase = dbs.data.databases.some((database) => {
    return database.name === databaseName
  })
  if (!hasDatabase) {
    if (dryRun) {
      output(`  [dry-run] Would create database "${databaseName}"`)
    } else {
      await client.post(`/instances/${instanceId}/databases`, {
        name: databaseName,
      })
      output(`  Created database "${databaseName}"`)
    }
  } else {
    output(`  Database "${databaseName}" already exists`)
  }

  const hasUser = users.data.users.some((user) => user.name === userName)
  if (!hasUser) {
    if (dryRun) {
      output(`  [dry-run] Would create database user "${userName}"`)
    } else {
      const password =
        process.env.DATABASE_PASSWORD ??
        `Temp1!${randomBytes(16).toString('hex')}`
      await client.post(`/instances/${instanceId}/users`, {
        name: userName,
        password,
      })
      output(`  Created database user "${userName}"`)
    }
  } else {
    output(`  Database user "${userName}" already exists`)
  }

  const existingPrivilege = privileges.data.privileges.find(
    (privilege) =>
      privilege.user_name === userName &&
      privilege.database_name === databaseName &&
      privilege.permission.toLowerCase() === 'all',
  )

  if (!existingPrivilege) {
    if (dryRun) {
      output(
        `  [dry-run] Would grant "all" privilege on "${databaseName}" to "${userName}"`,
      )
    } else {
      await client.put(`/instances/${instanceId}/privileges`, {
        database_name: databaseName,
        user_name: userName,
        permission: 'all',
      })
      output(`  Granted "all" privilege on "${databaseName}" to "${userName}"`)
    }
  } else {
    output(
      `  Privilege already set on "${databaseName}" for user "${userName}" (all)`,
    )
  }
}

const ensureContainer = async ({
  scwRegion,
  token,
  namespaceId,
  containerName,
  dryRun,
}: {
  scwRegion: string
  token: string
  namespaceId: string
  containerName: string
  dryRun: boolean
}) => {
  const client = buildContainerClient(scwRegion, token)

  const { data } = await client.get<{ containers: ScalewayContainer[] }>(
    '/containers',
    {
      params: {
        namespace_id: namespaceId,
        name: containerName,
        page_size: 100,
      },
    },
  )

  const existing = data.containers.find(
    (container) => container.name === containerName,
  )
  if (existing) {
    output(`  Container "${containerName}" already exists`)
    return
  }

  const registryImage = process.env.WEB_CONTAINER_IMAGE
  if (!registryImage) {
    if (dryRun) {
      outputError(
        '  [dry-run] WEB_CONTAINER_IMAGE is missing; real run would fail for container creation',
      )
      return
    }
    throw new Error(
      'Missing WEB_CONTAINER_IMAGE env variable to create a Scaleway container',
    )
  }

  if (dryRun) {
    output(`  [dry-run] Would create container "${containerName}"`)
    return
  }

  await client.post('/containers', {
    name: containerName,
    namespace_id: namespaceId,
    registry_image: registryImage,
    min_scale: 0,
    max_scale: 1,
    cpu_limit: 70,
    memory_limit: 128,
    deploy: false,
  })
  output(`  Created container "${containerName}"`)
}

export const createInfrastructureResources = new Command()
  .command('infrastructure:create')
  .description(
    'Create missing Scaleway resources for a stack (database+user+privilege or container)',
  )
  .argument('<resource>', 'database|container')
  .argument(
    '<names>',
    'Comma-separated names (branch/namespace/resource names)',
  )
  .option('--dry-run', 'Show what would be created without creating anything')
  .action(async (resource, namesArgument, { dryRun }) => {
    const isDryRun = Boolean(dryRun)
    const kind = resource as ResourceKind
    if (!['database', 'container'].includes(kind)) {
      outputError(
        `Invalid resource "${resource}". Expected: database or container`,
      )
      process.exit(1)
      return
    }

    const rawNames = splitNames(namesArgument)
    if (rawNames.length === 0) {
      outputError('No names provided')
      process.exit(1)
      return
    }

    const token = ensureScwSecretKey()
    const scwRegion = getScwRegion()
    if (!token || !scwRegion) return

    output(
      `${isDryRun ? '[dry-run] ' : ''}Creating "${kind}" resources for ${rawNames.length} name(s)...`,
    )

    if (kind === 'database') {
      const instance = await fetchRdbInstance(scwRegion, token)
      output(`Using database instance "${instance.name}" (${instance.id})`)

      for (const rawName of rawNames) {
        const { resourceName, namespace } = toNamespacedProjectResource(rawName)
        output(`\n[database] source="${rawName}" namespace="${namespace}"`)
        try {
          await ensureDatabaseUserAndPrivilege({
            scwRegion,
            token,
            instanceId: instance.id,
            databaseName: resourceName,
            userName: resourceName,
            dryRun: isDryRun,
          })
        } catch (error) {
          outputError(`  Failed for "${rawName}": ${formatApiError(error)}`)
        }
      }
      return
    }

    const namespace = await fetchContainerNamespace(scwRegion, token)
    output(`Using container namespace "${namespace.name}" (${namespace.id})`)

    for (const rawName of rawNames) {
      const containerName = toContainerName(rawName)
      if (!containerName) {
        outputError(`  Skipping "${rawName}": empty normalized container name`)
        continue
      }

      output(`\n[container] source="${rawName}" name="${containerName}"`)
      try {
        await ensureContainer({
          scwRegion,
          token,
          namespaceId: namespace.id,
          containerName,
          dryRun: isDryRun,
        })
      } catch (error) {
        outputError(`  Failed for "${rawName}": ${formatApiError(error)}`)
      }
    }
  })
