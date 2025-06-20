import { beneficiariesLabels } from '@app/web/themes/beneficiairies'
import { professionalSectorsLabels } from '@app/web/themes/professionalSectors'
import { themeLabels } from '@app/web/themes/themes'
import type { Beneficiary, ProfessionalSector, Theme } from '@prisma/client'
import { pascalCase } from 'change-case'
import { percentage } from './statistics'

export type UsageStatisticsResult = {
  type: 'beneficiaries' | 'themes' | 'professional_sectors'
  key: string
  value: number
}[]

const onlyThemes = ({
  type,
}: {
  type: 'beneficiaries' | 'themes' | 'professional_sectors'
}) => type === 'themes'

const onlyBeneficiaries = ({
  type,
}: {
  type: 'beneficiaries' | 'themes' | 'professional_sectors'
}) => type === 'beneficiaries'

const onlyProfessionalSectors = ({
  type,
}: {
  type: 'beneficiaries' | 'themes' | 'professional_sectors'
}) => type === 'professional_sectors'

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

  return professionalSectors.map((result) => {
    const professionalSector = pascalCase(result.key) as ProfessionalSector
    return {
      professionalSector,
      label: professionalSectorsLabels[professionalSector],
      value: result.value,
      // We assume first value is the max value
      progress: percentage(result.value, professionalSectors[0].value),
    }
  })
}
