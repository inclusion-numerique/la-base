import {
  type UsageStatisticsResult,
  beneficiariesUsages,
  professionalSectorsUsages,
  themesUsages,
} from './usageStatistics'

describe('Usage statistics', () => {
  it('should not get any themes when type is beneficiaries', () => {
    const usageStatisticsResult: UsageStatisticsResult = [
      { type: 'beneficiaries', key: 'seniors_personnes_agees', value: 2 },
    ]

    const usages = themesUsages(usageStatisticsResult)

    expect(usages).toStrictEqual([])
  })

  it('should not get any themes when type is professional_sectors', () => {
    const usageStatisticsResult: UsageStatisticsResult = [
      {
        type: 'professional_sectors',
        key: 'acteurs_publics',
        value: 2,
      },
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
      {
        type: 'beneficiaries',
        key: 'personne_allophone_ou_refugies_demandeurs_asile',
        value: 2,
      },
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

  it('should not get any beneficiaries when type is themes', () => {
    const usageStatisticsResult: UsageStatisticsResult = [
      { type: 'themes', key: 'emploi_et_entrepreunariat', value: 1 },
    ]

    const usages = beneficiariesUsages(usageStatisticsResult)

    expect(usages).toStrictEqual([])
  })

  it('should not get any professional_sectors when type is themes', () => {
    const usageStatisticsResult: UsageStatisticsResult = [
      { type: 'themes', key: 'emploi_et_entrepreunariat', value: 1 },
    ]

    const usages = professionalSectorsUsages(usageStatisticsResult)

    expect(usages).toStrictEqual([])
  })

  it('should get personne_allophone_ou_refugies_demandeurs_asile beneficiaries', () => {
    const usageStatisticsResult: UsageStatisticsResult = [
      {
        type: 'beneficiaries',
        key: 'personne_allophone_ou_refugies_demandeurs_asile',
        value: 2,
      },
    ]

    const usages = beneficiariesUsages(usageStatisticsResult)

    expect(usages).toStrictEqual([
      {
        label: 'Personne allophone / Réfugiés / demandeurs d’asile',
        beneficiary: 'PersonneAllophoneOuRefugiesDemandeursAsile',
        value: 2,
        progress: 100,
      },
    ])
  })

  it('should get multiple beneficiaries', () => {
    const usageStatisticsResult: UsageStatisticsResult = [
      { type: 'themes', key: 'intelligence_artificielle', value: 8 },
      {
        type: 'beneficiaries',
        key: 'personne_allophone_ou_refugies_demandeurs_asile',
        value: 2,
      },
      {
        type: 'beneficiaries',
        key: 'personnes_en_insertion_sociale_ou_professionnelle',
        value: 1,
      },
    ]

    const usages = beneficiariesUsages(usageStatisticsResult)

    expect(usages).toStrictEqual([
      {
        label: 'Personne allophone / Réfugiés / demandeurs d’asile',
        beneficiary: 'PersonneAllophoneOuRefugiesDemandeursAsile',
        value: 2,
        progress: 100,
      },
      {
        label: 'Personnes en insertion sociale et/ou professionnelle',
        beneficiary: 'PersonnesEnInsertionSocialeOuProfessionnelle',
        value: 1,
        progress: 50,
      },
    ])
  })
})
