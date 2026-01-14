import { metadataTitle } from '@app/web/app/metadataTitle'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: metadataTitle('Demande refusée'),
}

const DeclineBaseJoinRequest = () => (
  <div
    className="fr-flex fr-direction-column fr-background-alt--blue-ecume"
    style={{ minHeight: '100%' }}
  >
    <div className="fr-container fr-container--slim fr-m-auto fr-background-default--grey fr-border-radius--16 fr-p-12v fr-text--center">
      <div
        className="fr-display-inline-block ri-close-line ri-2x fr-line-height-1 fr-text-label--red-marianne fr-background-alt--red-marianne fr-p-2w fr-m-0 fr-border-radius--8"
        aria-hidden="true"
      />
      <h1 className="fr-h3 fr-text-title--red-marianne fr-mx-md-2v fr-my-12v">
        Vous avez refusé cette demande.
      </h1>
      <p className="fr-text--xl fr-mb-0">
        Le demandeur sera informé par email de ce refus.
      </p>
    </div>
  </div>
)

export default DeclineBaseJoinRequest
