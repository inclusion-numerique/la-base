import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import classNames from 'classnames'
import React from 'react'

const ProfileMetadata = ({
  resourcesCount,
  followedByCount,
  className,
}: {
  resourcesCount: number
  followedByCount: number
  className?: string
}) => (
  <div className={classNames('fr-flex-md fr-text--sm fr-mb-0', className)}>
    <span className="fr-icon-file-text-line fr-icon--sm fr-pr-1w" />
    <span>
      <b>{resourcesCount}</b>
      <span className="fr-hidden fr-display-inline-md">
        {' '}
        Ressource{sPluriel(resourcesCount)}
      </span>
    </span>
    <span className="fr-px-1w">·</span>
    <span className="fr-icon-user-heart-line fr-icon--sm fr-pr-1w" />
    <span>
      <b>{followedByCount}</b>
      <span className="fr-hidden fr-display-inline-md">
        {' '}
        Suivi{sPluriel(followedByCount)}
      </span>
    </span>
  </div>
)
export default ProfileMetadata
