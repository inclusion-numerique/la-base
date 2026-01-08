import Beneficiaries from '@app/web/app/(legal)/statistiques/Beneficiaries'
import ProfessionalSectors from '@app/web/app/(legal)/statistiques/ProfessionalSectors'
import ResourcesTypes from '@app/web/app/(legal)/statistiques/ResourcesTypes'
import {
  getUsageStatistics,
  type StatisticsParams,
} from '@app/web/server/statistiques/getStatistics'
import Thematiques from './Thematiques'

const ResourceContentSection = async ({
  statisticsParams,
}: {
  statisticsParams: StatisticsParams
}) => {
  const usage = await getUsageStatistics(statisticsParams)

  return (
    <div className="fr-grid-row fr-grid-row--gutters">
      <div className="fr-col-12 fr-col-lg-6">
        <ResourcesTypes resourceTypes={usage.usage.resourceTypes} />
      </div>
      <div className="fr-col-12 fr-col-lg-6">
        <ProfessionalSectors
          professionalSectors={usage.usage.professionalSectors}
        />
      </div>
      <div className="fr-col-12 fr-col-lg-6">
        <Thematiques thematiques={usage.usage.thematiques} />
      </div>
      <div className="fr-col-12 fr-col-lg-6">
        <Beneficiaries beneficiaries={usage.usage.beneficiaries} />
      </div>
    </div>
  )
}

export default ResourceContentSection
