import {
  type UsageStatisticsResult,
  targetAudiencesUsages,
  themesUsages,
} from './usageStatistics'

describe('Usage statistics', () => {
  it('should not get any themes when type is target_audiences', () => {
    const usageStatisticsResult: UsageStatisticsResult = [
      { type: 'target_audiences', key: 'personne_allophone', value: 2 },
    ]

    const usages = themesUsages(usageStatisticsResult)

    expect(usages).toStrictEqual([])
  })

  it('should get emploi_et_entrepreunariat themes', () => {
    const usageStatisticsResult: UsageStatisticsResult = [
      { type: 'themes', key: 'emploi_et_entrepreunariat', value: 5 },
    ]

    const usages = themesUsages(usageStatisticsResult)

    expect(usages).toStrictEqual([
      {
        label: 'Emploi & entrepreunariat',
        theme: 'EmploiEtEntrepreunariat',
        value: 5,
        progress: 100,
      },
    ])
  })

  it('should get multiple themes', () => {
    const usageStatisticsResult: UsageStatisticsResult = [
      { type: 'themes', key: 'intelligence_artificielle', value: 8 },
      { type: 'themes', key: 'emploi_et_entrepreunariat', value: 5 },
      { type: 'target_audiences', key: 'personne_allophone', value: 2 },
    ]

    const usages = themesUsages(usageStatisticsResult)

    expect(usages).toStrictEqual([
      {
        label: 'Intelligence artificielle',
        theme: 'IntelligenceArtificielle',
        value: 8,
        progress: 100,
      },
      {
        label: 'Emploi & entrepreunariat',
        theme: 'EmploiEtEntrepreunariat',
        value: 5,
        progress: 63,
      },
    ])
  })

  it('should not get any target_audiences when type is themes', () => {
    const usageStatisticsResult: UsageStatisticsResult = [
      { type: 'themes', key: 'emploi_et_entrepreunariat', value: 1 },
    ]

    const usages = targetAudiencesUsages(usageStatisticsResult)

    expect(usages).toStrictEqual([])
  })

  it('should get personne_allophone target_audiences', () => {
    const usageStatisticsResult: UsageStatisticsResult = [
      { type: 'target_audiences', key: 'personne_allophone', value: 2 },
    ]

    const usages = targetAudiencesUsages(usageStatisticsResult)

    expect(usages).toStrictEqual([
      {
        label: 'Personne allophone',
        targetAudience: 'PersonneAllophone',
        value: 2,
        progress: 100,
      },
    ])
  })

  it('should get multiple target_audiences', () => {
    const usageStatisticsResult: UsageStatisticsResult = [
      { type: 'themes', key: 'intelligence_artificielle', value: 8 },
      { type: 'target_audiences', key: 'personne_allophone', value: 2 },
      {
        type: 'target_audiences',
        key: 'personne_situation_handicap',
        value: 1,
      },
    ]

    const usages = targetAudiencesUsages(usageStatisticsResult)

    expect(usages).toStrictEqual([
      {
        label: 'Personne allophone',
        targetAudience: 'PersonneAllophone',
        value: 2,
        progress: 100,
      },
      {
        label: 'Personne en situation de handicap',
        targetAudience: 'PersonneSituationHandicap',
        value: 1,
        progress: 50,
      },
    ])
  })
})
