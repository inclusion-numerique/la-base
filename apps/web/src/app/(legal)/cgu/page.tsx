import { metadataTitle } from '@app/web/app/metadataTitle'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { CurrentCguContent } from '@app/web/features/cgu/components/CurrentCgu'
import type { Metadata } from 'next'

export const revalidate = 0
export const metadata: Metadata = {
  title: metadataTitle(`Conditions générales d'utilisation`),
}

const ContentPolicyPage = () => (
  <div className="fr-container">
    <Breadcrumbs currentPage="Conditions générales d'utilisation" />
    <SkipLinksPortal />

    <div className="fr-container landing-main-container fr-my-8w">
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-md-8">
          <CurrentCguContent />
        </div>
      </div>
    </div>
  </div>
)
export default ContentPolicyPage
