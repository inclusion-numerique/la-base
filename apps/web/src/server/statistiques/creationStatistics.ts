import { percentage, sum } from './statistics'

export type CreationStatisticsResult = {
  period: string
  start_date: string
  end_date: string
  private_resources: number
  public_resources: number
  public_users: number
  private_users: number
  public_bases: number
  private_bases: number
}[]

export type CreationStatistics = {
  publicResources: number
  privateResources: number
  publicUsers: number
  privateUsers: number
  publicBases: number
  privateBases: number
}

export const EMPTY_PROPORTIONS: CreationStatistics = {
  publicResources: 0,
  privateResources: 0,
  publicUsers: 0,
  privateUsers: 0,
  publicBases: 0,
  privateBases: 0,
}

const getTotalResources = (total: CreationStatistics) =>
  [total.publicResources, total.privateResources].reduce(sum)

const getTotalUsers = (total: CreationStatistics) =>
  [total.publicUsers, total.privateUsers].reduce(sum, 0)

const getTotalBases = (total: CreationStatistics) =>
  [total.publicBases, total.privateBases].reduce(sum, 0)

const resourcesProportions = (total: CreationStatistics) => {
  const totalResources = getTotalResources(total)
  return {
    publicResources: percentage(total.publicResources, totalResources),
    privateResources: percentage(total.privateResources, totalResources),
  }
}

const usersProportions = (total: CreationStatistics) => {
  const totalUsers = getTotalUsers(total)
  return {
    publicUsers: percentage(total.publicUsers, totalUsers),
    privateUsers: percentage(total.privateUsers, totalUsers),
  }
}

const basesProportions = (total: CreationStatistics) => {
  const totalBases = getTotalBases(total)
  return {
    publicBases: percentage(total.publicBases, totalBases),
    privateBases: percentage(total.privateBases, totalBases),
  }
}

export const computeCreationProportions = (
  creationStatisticsResult: CreationStatisticsResult,
): CreationStatistics => {
  const total: CreationStatistics = creationStatisticsResult.reduce(
    (mergedResults: CreationStatistics, result) => ({
      publicResources: mergedResults.publicResources + result.public_resources,
      privateResources:
        mergedResults.privateResources + result.private_resources,
      publicUsers: mergedResults.publicUsers + result.public_users,
      privateUsers: mergedResults.privateUsers + result.private_users,
      publicBases: mergedResults.publicBases + result.public_bases,
      privateBases: mergedResults.privateBases + result.private_bases,
    }),
    EMPTY_PROPORTIONS,
  )

  return {
    ...resourcesProportions(total),
    ...usersProportions(total),
    ...basesProportions(total),
  }
}
