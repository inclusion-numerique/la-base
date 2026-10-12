import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { getDirname } from '@app/config/dirname'

export type InfrastructureOutput = {
  webBaseUrl: string
  containerDomainName: string
  databaseName: string
  databaseUrl: string
  databasePassword: string
  databaseUser: string
  databaseHost: string
  databasePort: number
  webContainerId: string
  webContainerImage: string
  webContainerStatus: 'ready' | 'error'
}

type TofuOutput = Record<string, { value: unknown }>

export const valuesOfTofuOutput = (
  tofuOutput: TofuOutput,
): InfrastructureOutput =>
  Object.fromEntries(
    Object.entries(tofuOutput).map(([name, { value }]) => [name, value]),
  ) as InfrastructureOutput

export const infrastructureOutputFile = path.resolve(
  getDirname(import.meta.url),
  '../../../../../infrastructure/outputs.json',
)

export const readInfrastructureOutput =
  async (): Promise<InfrastructureOutput> =>
    valuesOfTofuOutput(
      JSON.parse(
        await readFile(infrastructureOutputFile, 'utf8'),
      ) as TofuOutput,
    )
