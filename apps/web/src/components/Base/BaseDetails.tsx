import ExternalLink from '@app/ui/components/ExternalLink'
import { BaseDetailsDescription } from '@app/web/components/Base/BaseDetailsDescription'
import type { BasePageData } from '@app/web/server/bases/getBase'
import Link from 'next/link'
import styles from './BaseDetails.module.css'

const BaseDetails = ({ base }: { base: BasePageData }) => {
  const displayedUrl = base.website
    ?.replace('https://', '')
    .replace('https://www.', '')
    .replace('www.', '')

  return (
    <div className="fr-width-full">
      <div className="fr-grid-row fr-grid-row--gutters fr-mb-7v">
        <div className="fr-col-12 fr-col-lg-8 fr-mt-3w">
          <h3 className="fr-h6">Description</h3>
          <div>
            <BaseDetailsDescription description={base.description} />
          </div>
        </div>
        <div className="fr-col-12 fr-col-lg-4 fr-mt-3w">
          <h3 className="fr-mb-2w fr-h6">Contact</h3>
          <div>
            <p className="fr-mb-0">Adresse mail de contact</p>
            <Link href={`mailto:${base.email}`} className="fr-link">
              {base.email}
            </Link>
          </div>
          {base.website && (
            <div className="fr-mt-2w">
              <p className="fr-mb-0">Site internet</p>
              <ExternalLink href={base.website} className="fr-link">
                {displayedUrl}
              </ExternalLink>
            </div>
          )}
          {(base.facebook || base.twitter || base.linkedin) && (
            <>
              <h3 className="fr-mt-3w fr-mb-2w fr-h6">Nous suivre</h3>
              <div className={styles.websites}>
                {base.twitter && (
                  <ExternalLink href={base.twitter} className="fr-link">
                    <span className="fr-icon--sm fr-icon-twitter-fill fr-mr-1w" />
                    Twitter
                  </ExternalLink>
                )}
                {base.linkedin && (
                  <ExternalLink href={base.linkedin} className="fr-link">
                    <span className="fr-icon--sm fr-icon-linkedin-box-fill fr-mr-1w" />
                    LinkedIn
                  </ExternalLink>
                )}
                {base.facebook && (
                  <ExternalLink href={base.facebook} className="fr-link">
                    <span className="fr-icon--sm fr-icon-facebook-circle-fill fr-mr-1w" />
                    Facebook
                  </ExternalLink>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default BaseDetails
