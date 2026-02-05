import ExternalLink from '@app/ui/components/ExternalLink'
import { licenceInformations } from '@app/web/features/resources/licence/licence-informations'
import { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'

const ResourceLicenceInformations = ({
  resource,
}: {
  resource: ResourceProjectionWithContext
}) => {
  const information = licenceInformations[resource.licence]
  return (
    <div className="fr-flex fr-direction-column fr-flex-gap-2v fr-mt-3w">
      {information.symbols}
      <div className="fr-flex fr-flex-gap-2v fr-text--xs fr-mb-0">
        {information.url ? (
          <ExternalLink href={information.url} className="fr-link fr-text--xs">
            {information.title}
          </ExternalLink>
        ) : (
          <span>{information.title}</span>
        )}
        <span className="fr-mb-0">· {information.hint}</span>
      </div>
    </div>
  )
}

export default ResourceLicenceInformations
