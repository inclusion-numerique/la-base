import {
  getSearchStatistics,
  type StatisticsParams,
} from '@app/web/server/statistiques/getStatistics'
import { numberToString } from '@app/web/utils/formatNumber'
import StatisticsChart from './StatisticsChart'

const SearchUsageSection = async ({
  statisticsParams,
}: {
  statisticsParams: StatisticsParams
}) => {
  const search = await getSearchStatistics(statisticsParams)

  return (
    <div className="fr-grid-row fr-grid-row--gutters">
      <div className="fr-col-12">
        <StatisticsChart
          title="Nombre de vues de ressources"
          data={search.resourceViews.data}
          xAxisDataKey="start_date"
          tooltipLabelDataKey="period"
          dataKeys={['value']}
          legend="above"
          legends={[
            { label: 'Vues de ressources', key: 'value' },
            {
              label: 'Au total : ',
              total: numberToString(search.resourceViews.total),
            },
          ]}
        />
      </div>
      <div className="fr-col-12 fr-col-md-6">
        <StatisticsChart
          title="Nombre de recherches effectuées"
          data={search.searchExecutions.data}
          xAxisDataKey="start_date"
          tooltipLabelDataKey="period"
          dataKeys={['value']}
          legend="belowTitle"
          legends={[
            { label: 'Recherches effectuées', key: 'value' },
            {
              label: 'Au total : ',
              total: numberToString(search.searchExecutions.total),
            },
          ]}
        />
      </div>
      <div className="fr-col-12 fr-col-md-6">
        <StatisticsChart
          title="Nombre de ressources enregistrées"
          data={search.collectionResources.data}
          xAxisDataKey="start_date"
          tooltipLabelDataKey="period"
          dataKeys={['value']}
          legend="belowTitle"
          legends={[
            { label: 'Ressources enregistrées', key: 'value' },
            {
              label: 'Au total : ',
              total: numberToString(search.collectionResources.total),
            },
          ]}
        />
      </div>
    </div>
  )
}

export default SearchUsageSection
