import ResourceLicenceLogo from '@app/web/features/resources/licence/components/ResourceLicenceLogo'
import { licenceWordings } from '@app/web/features/resources/licence/licence-wordings'
import { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import { ResourceLicence } from '@prisma/client'

const ResourceLicenceView = ({
  resource,
}: {
  resource: ResourceProjectionWithContext
}) => (
  <div className="fr-flex fr-align-items-center fr-justify-content-space-between">
    <div className="fr-flex fr-direction-column">
      <span>{licenceWordings[resource.licence].title}</span>
      <span className="fr-mb-0 fr-text--xs fr-hint-text">
        {licenceWordings[resource.licence].hint}
      </span>
    </div>

    <ResourceLicenceLogo licence={resource.licence} />
  </div>
)

export default ResourceLicenceView
