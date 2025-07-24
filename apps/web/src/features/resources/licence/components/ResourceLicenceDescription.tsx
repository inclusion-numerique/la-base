import ResourceLicenceCCSymbol from '@app/web/features/resources/licence/components/symbols/ResourceLicenceCCSymbol'
import { licenceDescriptionItems } from '@app/web/features/resources/licence/licence-description-items'
import { ResourceLicence } from '@prisma/client'
import classNames from 'classnames'
import Link from 'next/link'
import styles from './ResourceLicenceDescription.module.css'

const ResourceLicenceDescription = ({
  licence,
}: {
  licence: ResourceLicence
}) => {
  if (!licenceDescriptionItems[licence]) {
    return null
  }
  return (
    <div
      className={classNames(
        styles.container,
        'fr-border-radius--8 fr-px-3w fr-py-2w',
      )}
    >
      <div className="fr-flex fr-justify-content-space-between fr-align-items-center fr-flex-gap-2v fr-mb-2w">
        <div className="fr-flex fr-align-items-center fr-flex-gap-2v">
          <ResourceLicenceCCSymbol />
          <span className="fr-text--uppercase fr-text--bold fr-text--xs fr-mb-0">
            Détails sur la Licence {licenceDescriptionItems[licence].name}
          </span>
        </div>
        <Link
          target="_blank"
          className="fr-link fr-text--sm"
          href={licenceDescriptionItems[licence].link}
        >
          En savoir plus
        </Link>
      </div>
      <div className="fr-flex fr-direction-column fr-align-items-center fr-flex-gap-4v">
        {licenceDescriptionItems[licence].items.map((item) => (
          <div
            key={item.label}
            className="fr-flex fr-align-items-center fr-flex-gap-2v"
          >
            <div>{item.symbol}</div>
            <span className="fr-flex fr-flex-column fr-flex-gap-1v fr-text--xs fr-mb-0">
              <span className="fr-text--grey">
                <span className="fr-text--bold">{item.label}</span>
                {item.description}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResourceLicenceDescription
