import ResourceLicenceInformations from '@app/web/features/resources/licence/components/ResourceLicenceInformations'
import ResourceLicenceView from '@app/web/features/resources/licence/components/ResourceLicenceView'
import type { Resource } from '@app/web/server/resources/getResource'
import ResourceIndexationView from './ResourceIndexationView'

const ResourceInformations = ({ resource }: { resource: Resource }) => (
  <>
    <h2
      id="informations"
      className="fr-my-2w fr-pt-2w fr-border-top--slim-grey fr-h6"
    >
      Informations sur la ressource
    </h2>
    <ResourceIndexationView
      resource={resource}
      withLink
      resourceTypes
      themes
      beneficiaries
      professionalSectors
      titleClassName="fr-text--sm fr-text--medium"
      tagsClassName="fr-mt-1v"
    />
    <ResourceLicenceInformations resource={resource} />
  </>
)

export default ResourceInformations
