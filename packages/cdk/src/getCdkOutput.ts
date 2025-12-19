import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { outputPrefix } from '@app/cdk/output'
import { getDirname } from '@app/config/dirname'

export type WebCdkOutput = {
  webBaseUrl: string
  containerDomainName: string
  databaseName: string
  databaseUrl: string
  databasePassword: string
  databaseUser: string
  databaseHost: string
  databasePort: number
  uploadsBucketEndpoint: string
  uploadsBucketName: string
  webContainerId: string
  webContainerImage: string
  webContainerStatus: 'ready' | 'error'
}

export type ProjectCdkOutput = {
  databaseInstanceId: string
  databaseEndpointIp: string
  databaseEndpointPort: number
  cockpitId: string
  mainDomainZoneId: string
  transactionalEmailDomainStatus: string
  webContainersId: string
  uploadsCdnPipelineId: string
  uploadsS3BackendStageId: string
  uploadsHostName: string
  maildevWebUrl: string
  maildevSmtp: string
}

export type CdkOutput = {
  web: WebCdkOutput
  project: ProjectCdkOutput
}

// output_uploadsBucketName -> uploadsBucketName
export const normalizeCdkOutputKey = (key: string): string =>
  key.startsWith(outputPrefix) ? key.slice(outputPrefix.length) : key

export async function getCdkOutput(stack: 'web'): Promise<WebCdkOutput>
export async function getCdkOutput(stack: 'project'): Promise<ProjectCdkOutput>
export async function getCdkOutput(
  stack: 'web' | 'project',
): Promise<WebCdkOutput | ProjectCdkOutput> {
  const outputFile = path.resolve(
    getDirname(import.meta.url),
    '../cdk.out.json',
  )
  const outputContents = await readFile(outputFile, 'utf8')
  const rawOutput = JSON.parse(outputContents) as {
    [key in keyof CdkOutput]: Record<string, unknown>
  }

  const output = Object.fromEntries(
    Object.entries(rawOutput[stack]).map(([key, value]) => [
      normalizeCdkOutputKey(key),
      value,
    ]),
  )

  return output as WebCdkOutput
}
