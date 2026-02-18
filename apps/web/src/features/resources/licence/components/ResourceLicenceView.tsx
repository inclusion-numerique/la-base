import ResourceLicenceLogo from '@app/web/features/resources/licence/components/ResourceLicenceLogo'
import { licenceWordings } from '@app/web/features/resources/licence/licence-wordings'
import { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'

const ResourceLicenceView = ({
  resource,
}: {
  resource: ResourceProjectionWithContext
}) => (
  <div className="fr-flex fr-align-items-center fr-justify-content-space-between">
    <p className="fr-flex fr-direction-column fr-mb-0">
      {licenceWordings[resource.licence].title}
      <span className="fr-mb-0 fr-text--xs fr-hint-text">
        {licenceWordings[resource.licence].hint}
      </span>
    </p>

    <ResourceLicenceLogo licence={resource.licence} />
  </div>
)

export default ResourceLicenceView
