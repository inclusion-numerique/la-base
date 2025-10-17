'use client'

import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { SessionUser } from '@app/web/auth/sessionUser'
import BaseCard from '@app/web/components/Base/Card/BaseCard'
import ProfileCard from '@app/web/components/Profile/Card/ProfileCard'
import {
  NewsFeedBases,
  NewsFeedProfiles,
} from '@app/web/features/fil-d-actualite/db/getNewsFeedPageContext'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { useState } from 'react'
import styles from './NewsFeedFollowlistPreferences.module.css'

export const NewsFeedFollowListPreferences = ({
  followedBases,
  followedProfiles,
  user,
}: {
  followedBases: NewsFeedBases
  followedProfiles: NewsFeedProfiles
  user: SessionUser
}) => {
  const [showAllBases, setShowAllBases] = useState(false)
  const [showAllProfiles, setShowAllProfiles] = useState(false)

  const displayedBases = showAllBases
    ? followedBases
    : followedBases.slice(0, 4)

  const displayedProfiles = showAllProfiles
    ? followedProfiles
    : followedProfiles.slice(0, 4)

  const hasMoreBases = followedBases.length > 4
  const hasMoreProfiles = followedProfiles.length > 4

  return (
    <>
      <hr className="fr-pt-4w fr-pb-0 fr-mt-4w" />
      <div className="fr-flex fr-direction-column fr-flex-gap-2v">
        <span className="fr-h6 fr-text-default--grey fr-mb-0">
          {followedBases.length} base
          {sPluriel(followedBases.length)} suivie
          {sPluriel(followedBases.length)}
        </span>
        {displayedBases.map((fBase) => (
          <BaseCard
            className={styles.noBorder}
            user={user}
            base={fBase.base}
            key={fBase.id}
            compact
            titleAs="h4"
          />
        ))}
        {followedBases.length === 0 && (
          <div className="fr-border fr-border-radius--8 fr-py-4w fr-px-6w fr-text--center fr-mt-4v">
            <span className="fr-text--md fr-text--bold fr-text-mention--grey fr-mb-0">
              Vous ne suivez pas de bases.
            </span>
          </div>
        )}
        {hasMoreBases && (
          <Button
            priority="tertiary no outline"
            onClick={() => setShowAllBases((prev) => !prev)}
          >
            {showAllBases ? 'Voir moins' : 'Voir toutes'}
            <span
              className={classNames(
                'fr-ml-1w',
                !showAllBases ? 'ri-arrow-down-s-line' : 'ri-arrow-up-s-line',
              )}
            />
          </Button>
        )}
      </div>
      <hr className="fr-pt-4w fr-pb-0 fr-mt-4w" />
      <div className="fr-flex fr-direction-column fr-flex-gap-2v">
        <span className="fr-h6 fr-text-default--grey fr-mb-0">
          {followedProfiles.length} profil
          {sPluriel(followedProfiles.length)} suivi
          {sPluriel(followedProfiles.length)}
        </span>
        {displayedProfiles.map((fProfile) => (
          <ProfileCard
            className={styles.noBorder}
            key={fProfile.id}
            profile={fProfile.profile}
            user={user}
            titleAs="h4"
          />
        ))}
        {followedProfiles.length === 0 && (
          <div className="fr-border fr-border-radius--8 fr-py-4w fr-px-6w fr-text--center fr-mt-4v">
            <span className="fr-text--md fr-text--bold fr-text-mention--grey fr-mb-0">
              Vous ne suivez pas de bases.
            </span>
          </div>
        )}

        {hasMoreProfiles && (
          <Button
            priority="tertiary no outline"
            onClick={() => setShowAllProfiles((prev) => !prev)}
          >
            {showAllProfiles ? 'Voir moins' : 'Voir tous'}
            <span
              className={classNames(
                'fr-ml-1w',
                !showAllProfiles
                  ? 'ri-arrow-down-s-line'
                  : 'ri-arrow-up-s-line',
              )}
            />
          </Button>
        )}
      </div>
    </>
  )
}
