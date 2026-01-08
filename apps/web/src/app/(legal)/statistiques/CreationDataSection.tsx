import {
  getCreationsStatistics,
  type StatisticsParams,
} from '@app/web/server/statistiques/getStatistics'
import { numberToString } from '@app/web/utils/formatNumber'
import StatisticsChart from './StatisticsChart'

const CreationDataSection = async ({
  statisticsParams,
}: {
  statisticsParams: StatisticsParams
}) => {
  const creation = await getCreationsStatistics(statisticsParams)

  return (
    <div className="fr-grid-row fr-grid-row--gutters">
      <div className="fr-col-12">
        <StatisticsChart
          title="Nombre de ressources publiées"
          data={creation.data}
          xAxisDataKey="start_date"
          tooltipLabelDataKey="period"
          dataKeys={['private_resources', 'public_resources']}
          legends={[
            {
              label: 'Ressources privées : ',
              value: `${creation.proportions.privateResources}%`,
              total: numberToString(creation.totals.privateResources),
              key: 'private_resources',
            },
            {
              label: 'Ressources publiques : ',
              value: `${creation.proportions.publicResources}%`,
              total: numberToString(creation.totals.publicResources),
              key: 'public_resources',
            },
            {
              label: 'Au total : ',
              total: numberToString(creation.totalCount),
            },
          ]}
          legend="above"
        />
      </div>
      <div className="fr-col-12 fr-col-md-6">
        <StatisticsChart
          title="Nombre de profils créés"
          data={creation.data}
          xAxisDataKey="start_date"
          tooltipLabelDataKey="period"
          dataKeys={['private_users', 'public_users']}
          legends={[
            {
              label: 'Profils privés',
              value: `${creation.proportions.privateUsers}%`,
              total: numberToString(creation.totals.privateUsers),
              key: 'private_users',
            },
            {
              label: 'Profils publics',
              value: `${creation.proportions.publicUsers}%`,
              total: numberToString(creation.totals.publicUsers),
              key: 'public_users',
            },
          ]}
          legend="below"
        />
      </div>
      <div className="fr-col-12 fr-col-md-6">
        <StatisticsChart
          title="Nombre de bases créées"
          data={creation.data}
          xAxisDataKey="start_date"
          tooltipLabelDataKey="period"
          dataKeys={['private_bases', 'public_bases']}
          legends={[
            {
              label: 'Bases privées',
              value: `${creation.proportions.privateBases}%`,
              total: numberToString(creation.totals.privateBases),
              key: 'private_bases',
            },
            {
              label: 'Bases publiques',
              value: `${creation.proportions.publicBases}%`,
              total: numberToString(creation.totals.publicBases),
              key: 'public_bases',
            },
          ]}
          legend="below"
        />
      </div>
    </div>
  )
}

export default CreationDataSection
