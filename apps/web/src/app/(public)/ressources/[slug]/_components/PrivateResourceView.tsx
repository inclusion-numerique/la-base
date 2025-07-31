import OwnershipInformation from '@app/web/components/OwnershipInformation'
import PrivateBox from '@app/web/components/PrivateBox'
import type { Resource } from '@app/web/server/resources/getResource'
import styles from './ResourceView.module.css'

const PrivateResourceView = ({ resource }: { resource: Resource }) => (
  <div className="fr-grid-row fr-pb-20v">
    <div className="fr-col-12 fr-col-md-4 fr-col-lg-3 fr-hidden fr-unhidden-md">
      <div className={styles.leftColumn} />
    </div>
    <div className="fr-col-12 fr-col-md-7 fr-col-md-6 fr-pb-20v">
      <div className="fr-container--slim fr-mx-auto">
        {/* This div is used for top anchor */}
        <div id={resource.slug} className="fr-width-full">
          <OwnershipInformation
            user={resource.createdBy}
            base={resource.base}
            attributionWording={
              resource.published ? 'resource' : 'draft-resource'
            }
          />
          <hr className="fr-separator-4v fr-separator-md-6v" />
          <PrivateBox type="Ressource" />
        </div>
      </div>
    </div>
  </div>
)

export default PrivateResourceView
