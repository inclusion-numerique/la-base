import { Metadata } from 'next'
import { metadataTitle } from '@app/web/app/metadataTitle'

export const metadata: Metadata = {
  title: metadataTitle('Vous avez refusé de rejoindre cette base'),
}

const DenyBaseInvitation = () => (
  <div
    className="fr-flex fr-direction-column fr-background-alt--blue-ecume"
    style={{ minHeight: '100%' }}
  >
    <div className="fr-container fr-container--slim fr-m-auto fr-background-default--grey fr-border-radius--16 fr-p-12v fr-text--center">
      <div
        className="fr-display-inline-block ri-group-2-line ri-2x fr-line-height-1 fr-text-label--blue-france fr-background-alt--blue-france fr-p-2w fr-m-0 fr-border-radius--8"
        aria-hidden="true"
      />
      <h1 className="fr-h3  fr-text-title--blue-france fr-mx-md-2v fr-my-12v">
        Vous avez refusé de rejoindre cette base.
      </h1>
      <p className="fr-text--xl fr-mb-0">
        Le membre qui vous a envoyé cette invitation sera informé par mail de
        votre refus.
      </p>
    </div>
  </div>
)
export default DenyBaseInvitation
