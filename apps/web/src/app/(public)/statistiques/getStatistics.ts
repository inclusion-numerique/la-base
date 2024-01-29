export type StatisticsTimeframe = 'semaine' | 'mois' | 'total'

// In french for query params
export type StatisticsParams = {
  recherche?: StatisticsTimeframe
  fonctionnalites?: StatisticsTimeframe
}

export const statisticsTimeframeLabels: {
  [key in StatisticsTimeframe]: string
} = {
  semaine: 'Par semaine',
  mois: 'Par mois',
  total: 'Cumulé',
}
export const getStatistics = (_params: StatisticsParams) =>
  Promise.resolve({
    kpi: {},
    search: {
      searchExecutions: [
        {
          name: 'Octobre',
          Recherches: 420,
        },
        {
          name: 'Novembre',
          Recherches: 550,
        },
        {
          name: 'Décembre',
          Recherches: 280,
        },
        {
          name: 'Janvier',
          Recherches: 770,
        },
      ],
    },
    features: {},
    difficulties: {},
  })

export type Statistics = Awaited<ReturnType<typeof getStatistics>>
