import { TargetAudience, Theme } from '@prisma/client'
import { pascalCase } from 'change-case'
import { targetAudienceLabels } from '@app/web/themes/targetAudiences'
import { themeLabels } from '@app/web/themes/themes'
import { percentage } from './statistics'

export type UsageStatisticsResult = {
  type: 'target_audiences' | 'themes'
  key: string
  value: number
}[]

const onlyThemes = ({ type }: { type: 'target_audiences' | 'themes' }) =>
  type === 'themes'

const onlyTargetAudiences = ({
  type,
}: {
  type: 'target_audiences' | 'themes'
}) => type === 'target_audiences'

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

export const targetAudiencesUsages = (
  usageStatisticsResult: UsageStatisticsResult,
) => {
  const targetAudiences = usageStatisticsResult.filter(onlyTargetAudiences)

  if (targetAudiences.length === 0) return []

  return targetAudiences.map((result) => {
    const targetAudience = pascalCase(result.key) as TargetAudience

    return {
      targetAudience,
      label: targetAudienceLabels[targetAudience],
      value: result.value,
      // We assume first value is the max value
      progress: percentage(result.value, targetAudiences[0].value),
    }
  })
}
