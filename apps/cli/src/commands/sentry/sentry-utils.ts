import { outputError } from '@app/cli/output'
import axios, { type AxiosInstance } from 'axios'

export type SentryConfig = {
  url: string
  org: string
  project: string
  authToken: string
}

export const readSentryConfigFromEnv = (): SentryConfig => {
  const url = (process.env.SENTRY_URL ?? 'https://sentry.io').replace(
    /\/+$/,
    '',
  )
  const org = process.env.SENTRY_ORG ?? ''
  const project = process.env.SENTRY_PROJECT ?? ''
  const authToken = process.env.SENTRY_AUTH_TOKEN ?? ''

  if (!org || !project || !authToken) {
    outputError(
      'Missing Sentry configuration. Please set SENTRY_ORG, SENTRY_PROJECT, and SENTRY_AUTH_TOKEN.',
    )
    process.exit(1)
  }

  return { url, org, project, authToken }
}

export const createSentryHttpClient = (config: SentryConfig): AxiosInstance => {
  return axios.create({
    baseURL: `${config.url}/api/0`,
    headers: {
      Authorization: `Bearer ${config.authToken}`,
      'Content-Type': 'application/json',
    },
    timeout: 30000,
  })
}

export const parseNextCursorFromLinkHeader = (
  linkHeader: string | undefined,
): string | undefined => {
  if (!linkHeader) return undefined
  const parts = linkHeader.split(',')
  for (const part of parts) {
    const segment = part.trim()
    const isNext = /rel="next"/.test(segment)
    const hasResults = /results="true"/.test(segment)
    if (isNext && hasResults) {
      const match = segment.match(/cursor="([^"]+)"/)
      if (match && match[1]) return match[1]
    }
  }
  return undefined
}

export const listIssueIdsForEnvironment = async (
  http: AxiosInstance,
  org: string,
  project: string,
  environment: string,
): Promise<string[]> => {
  const collectedIssueIds: string[] = []
  let cursor: string | undefined
  do {
    // Per Sentry docs: GET /projects/{org_slug}/{project_slug}/issues/
    // Filter by environment via the 'query' search param
    const response = await http.get(
      `/projects/${encodeURIComponent(org)}/${encodeURIComponent(project)}/issues/`,
      {
        params: {
          query: `environment:${environment}`,
          limit: 100,
          cursor,
          // Optionally ensure only unresolved
          // query: `environment:${environment}`,
        },
      },
    )
    const issues = Array.isArray(response.data) ? response.data : []
    for (const issue of issues) {
      if (issue && typeof issue.id === 'string')
        collectedIssueIds.push(issue.id)
    }
    const linkHeader: string | undefined =
      typeof (response.headers as any).get === 'function'
        ? (response.headers as any).get('link')
        : (response.headers as Record<string, string | undefined>).link
    cursor = parseNextCursorFromLinkHeader(linkHeader)
  } while (cursor)
  return collectedIssueIds
}

export const deleteIssuesByIds = async (
  http: AxiosInstance,
  issueIds: string[],
): Promise<{ deletedCount: number; failedCount: number }> => {
  let deletedCount = 0
  let failedCount = 0
  for (const issueId of issueIds) {
    try {
      // Per Sentry docs: DELETE /issues/{issue_id}/
      await http.delete(`/issues/${issueId}/`)
      deletedCount += 1
    } catch (error) {
      failedCount += 1
      const message = axios.isAxiosError(error)
        ? `${error.response?.status} ${error.response?.statusText}`
        : String(error)
      outputError(`Failed to delete issue ${issueId}: ${message}`)
    }
  }
  return { deletedCount, failedCount }
}

export type SentryEnvironmentWithCount = {
  environment: string
  count: number
}

// Uses Sentry tags API to list environments that appear on issues (by events count)
// GET /api/0/projects/{org_slug}/{project_slug}/tags/environment/values/
export const listEnvironmentsWithIssues = async (
  http: AxiosInstance,
  org: string,
  project: string,
): Promise<SentryEnvironmentWithCount[]> => {
  const aggregated = new Map<string, number>()
  let cursor: string | undefined
  do {
    const response = await http.get(
      `/projects/${encodeURIComponent(org)}/${encodeURIComponent(project)}/tags/environment/values/`,
      {
        params: { limit: 100, cursor },
      },
    )
    const values = Array.isArray(response.data) ? response.data : []
    for (const v of values) {
      const env = typeof v.value === 'string' ? v.value : undefined
      const count = typeof v.count === 'number' ? v.count : 0
      if (!env) continue
      aggregated.set(env, (aggregated.get(env) ?? 0) + count)
    }
    const linkHeader: string | undefined =
      typeof (response.headers as any).get === 'function'
        ? (response.headers as any).get('link')
        : (response.headers as Record<string, string | undefined>).link
    cursor = parseNextCursorFromLinkHeader(linkHeader)
  } while (cursor)

  return Array.from(aggregated.entries())
    .map(([environment, count]) => ({ environment, count }))
    .sort((a, b) => b.count - a.count)
}

export const listProjectEnvironments = async (
  http: AxiosInstance,
  org: string,
  project: string,
): Promise<string[]> => {
  const environments = new Set<string>()
  let cursor: string | undefined
  do {
    const response = await http.get(
      `/projects/${encodeURIComponent(org)}/${encodeURIComponent(project)}/environments/`,
      {
        params: { limit: 100, cursor },
      },
    )
    const values = Array.isArray(response.data) ? response.data : []
    for (const v of values) {
      const name = typeof v.name === 'string' ? v.name : undefined
      if (name) environments.add(name)
    }
    const linkHeader: string | undefined =
      typeof (response.headers as any).get === 'function'
        ? (response.headers as any).get('link')
        : (response.headers as Record<string, string | undefined>).link
    cursor = parseNextCursorFromLinkHeader(linkHeader)
  } while (cursor)

  return Array.from(environments).sort((a, b) => a.localeCompare(b))
}

export const updateProjectEnvironmentVisibility = async (
  http: AxiosInstance,
  org: string,
  project: string,
  environment: string,
  isHidden: boolean,
): Promise<{ name: string; isHidden: boolean }> => {
  const response = await http.put(
    `/projects/${encodeURIComponent(org)}/${encodeURIComponent(project)}/environments/${encodeURIComponent(environment)}/`,
    { isHidden },
  )
  const name =
    typeof response.data?.name === 'string' ? response.data.name : environment
  const hidden = Boolean(response.data?.isHidden)
  return { name, isHidden: hidden }
}
