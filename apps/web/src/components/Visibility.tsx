import React from 'react'
import { PrivacyTag } from './PrivacyTags'

const Visibility = ({
  isPublic,
  publicTitle,
  privateTitle,
  publicHint,
  privateHint,
}: {
  isPublic: boolean
  publicTitle: string
  privateTitle: string
  publicHint: string
  privateHint: string
}) => (
  <div className="fr-flex fr-align-items-center">
    <div className="fr-flex-grow-1 fr-mr-1w">
      <span className="fr-text-label--grey">
        {isPublic ? publicTitle : privateTitle}
      </span>
      <p className="fr-text--xs fr-hint-text fr-mb-0" data-testid="visibility">
        {isPublic ? publicHint : privateHint}
      </p>
    </div>
    <div className="fr-ml-3w">
      <PrivacyTag isPublic={isPublic} />
    </div>
  </div>
)

export default Visibility
