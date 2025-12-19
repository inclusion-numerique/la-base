import { beneficiariesLabels } from '@app/web/themes/beneficiairies'
import { professionalSectorsLabels } from '@app/web/themes/professionalSectors'
import { resourceTypesLabels } from '@app/web/themes/resourceTypes'
import { themeLabels } from '@app/web/themes/themes'
import type {
  Beneficiary,
  ProfessionalSector,
  ResourceType,
  Theme,
} from '@prisma/client'
import { pascalCase } from 'change-case'
import { percentage } from './statistics'

export type UsageStatisticsResult = {
  type: 'beneficiaries' | 'themes' | 'professional_sectors' | 'resource_types'
  key: string
  value: number
}[]

const onlyThemes = ({
  type,
}: {
  type: 'beneficiaries' | 'themes' | 'professional_sectors' | 'resource_types'
}) => type === 'themes'

const onlyBeneficiaries = ({
  type,
}: {
  type: 'beneficiaries' | 'themes' | 'professional_sectors' | 'resource_types'
}) => type === 'beneficiaries'

const onlyProfessionalSectors = ({
  type,
}: {
  type: 'beneficiaries' | 'themes' | 'professional_sectors' | 'resource_types'
}) => type === 'professional_sectors'

const onlyResourceTypes = ({
  type,
}: {
  type: 'beneficiaries' | 'themes' | 'professional_sectors' | 'resource_types'
}) => type === 'resource_types'

export const themesUsages = (usageStatisticsResult: UsageStatisticsResult) => {
  const usageStatistics = usageStatisticsResult.filter(onlyThemes)

  if (usageStatistics.length === 0) return []

  return usageStatistics.map((result) => {
    const theme = pascalCase(result.key) as Theme

    return {
      theme,
      label: themeLabels[theme],
      value: result.value,
      // We assume first value is the max value
      progress: percentage(result.value, usageStatistics[0].value),
    }
  })
}

export const beneficiariesUsages = (
  usageStatisticsResult: UsageStatisticsResult,
) => {
  const beneficiaries = usageStatisticsResult.filter(onlyBeneficiaries)

  if (beneficiaries.length === 0) return []

  return beneficiaries.map((result) => {
    const beneficiary = pascalCase(result.key) as Beneficiary
    return {
      beneficiary,
      label: beneficiariesLabels[beneficiary],
      value: result.value,
      // We assume first value is the max value
      progress: percentage(result.value, beneficiaries[0].value),
    }
  })
}

export const professionalSectorsUsages = (
  usageStatisticsResult: UsageStatisticsResult,
) => {
  const professionalSectors = usageStatisticsResult.filter(
    onlyProfessionalSectors,
  )

  if (professionalSectors.length === 0) return []

  const total = professionalSectors.reduce(
    (acc, result) => acc + result.value,
    0,
  )

  return professionalSectors.map((result) => {
    const professionalSector = pascalCase(result.key) as ProfessionalSector
    return {
      professionalSector,
      label: professionalSectorsLabels[professionalSector],
      value: result.value,
      progress: percentage(result.value, total),
    }
  })
}

export const resourceTypesUsages = (
  usageStatisticsResult: UsageStatisticsResult,
) => {
  const resourceTypes = usageStatisticsResult.filter(onlyResourceTypes)

  if (resourceTypes.length === 0) return []

  const total = resourceTypes.reduce((acc, result) => acc + result.value, 0)

  return resourceTypes.map((result) => {
    const resourceType = pascalCase(result.key) as ResourceType
    return {
      resourceType,
      label: resourceTypesLabels[resourceType],
      value: result.value,
      progress: percentage(result.value, total),
    }
  })
}
