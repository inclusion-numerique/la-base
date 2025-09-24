'use client'

import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { SessionUser } from '@app/web/auth/sessionUser'
import { FollowButton } from '@app/web/components/Follows/FollowButton'
import { ProfilePrivacyTag } from '@app/web/components/PrivacyTags'
import ProfileMetadata from '@app/web/components/Profile/ProfileMetadata'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import type { ProfileFollowedByData } from '@app/web/server/profiles/getProfile'
import { numberToString } from '@app/web/utils/formatNumber'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import classNames from 'classnames'
import Link from 'next/link'
import styles from './ProfileFollowersModal.module.css'

const { Component: FollowersModal, open } = createModal({
  id: `profile-followers-modal`,
  isOpenedByDefault: false,
})

const ProfileFollowersModal = ({
  user,
  followedByData,
}: {
  user: SessionUser | null
  followedByData: ProfileFollowedByData
}) => {
  const { counts, followedBy } = followedByData

  const title = `Suivi par ${counts.total} profil${sPluriel(counts.total)}`

  return (
    <>
      <span className="fr-icon-user-heart-line fr-icon--sm fr-mr-1w" />
      <Link
        href="#"
        className={classNames(
          'fr-link--underline-on-hover fr-text--sm fr-mb-0',
          styles.feedbackLink,
        )}
        onClick={open}
      >
        <div>
          <b>{numberToString(counts.total)}</b>
          <span>&nbsp;Suivi{sPluriel(counts.total)}</span>
        </div>
      </Link>

      <FollowersModal title={title} className={styles.profileFollowersModal}>
        <>
          <div className="fr-flex fr-direction-column fr-direction-sm-row fr-flex-gap-2v fr-align-items-md-center fr-mb-4w">
            {counts.public > 0 && (
              <div className="fr-flex fr-flex-gap-2v fr-align-items-center">
                <ProfilePrivacyTag
                  isPublic
                  withLabel={false}
                  small
                  className={classNames('fr-tag--icon-left', styles.privacyTag)}
                />
                <span className="fr-text--sm fr-text--medium fr-text-mention--grey fr-mb-0">
                  {counts.public} profil
                  {sPluriel(counts.public)}
                  &nbsp;public{sPluriel(counts.public)}
                </span>
              </div>
            )}
            {counts.public > 0 && counts.private > 0 && (
              <span className="fr-hidden fr-unhidden-sm fr-text--sm fr-text--medium fr-text-mention--grey fr-mb-0">
                ·
              </span>
            )}
            {counts.private > 0 && (
              <div className="fr-flex fr-flex-gap-2v fr-align-items-center">
                <ProfilePrivacyTag
                  isPublic={false}
                  withLabel={false}
                  small
                  className={classNames('fr-tag--icon-left', styles.privacyTag)}
                />
                <span className="fr-text--sm fr-text--medium fr-text-mention--grey fr-mb-0">
                  {counts.private} profil
                  {sPluriel(counts.private)}
                  &nbsp;privé{sPluriel(counts.private)}
                </span>
              </div>
            )}
          </div>
          {counts.total === 0 && (
            <p className="fr-text--sm fr-text--medium fr-text-mention--grey fr-mb-0 fr-text--left">
              Aucun profil public
            </p>
          )}
          {followedBy.map((follower, index) => {
            const content = (
              <div className="fr-flex fr-py-2w fr-justify-content-space-between fr-align-items-center fr-width-full">
                <div className="fr-flex fr-flex-gap-6v fr-align-items-center fr-width-full">
                  <RoundProfileImage user={follower} />
                  <div
                    className={classNames(
                      'fr-flex fr-flex-gap-1v fr-align-items-baseline fr-text--start',
                      follower.isPublic && 'fr-direction-column',
                      !follower.isPublic &&
                        'fr-direction-row fr-justify-content-space-between fr-width-full',
                    )}
                  >
                    <span className="fr-text--bold">{follower.name}</span>
                    <div className="fr-flex fr-flex-gap-2v fr-align-items-center">
                      {follower.isPublic && (
                        <ProfileMetadata
                          user={user}
                          className="fr-text-mention--grey"
                          resourcesCount={follower._count.resources}
                          followedByCount={follower._count.followedBy}
                          context="card"
                        />
                      )}
                      {!follower.isPublic && (
                        <>
                          <ProfilePrivacyTag
                            isPublic={false}
                            small
                            className={classNames(
                              'fr-tag--icon-left',
                              styles.privacyTag,
                            )}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )

            return follower.isPublic ? (
              <div
                key={follower.id}
                className={classNames(
                  'fr-flex fr-justify-content-space-between fr-align-items-center fr-border-bottom',
                  index === 0 && 'fr-border-top',
                  follower.isPublic && styles.container,
                )}
              >
                <Link
                  key={follower.id}
                  className={styles.link}
                  href={`/profils/${follower.slug}`}
                >
                  {content}
                </Link>
                {follower.isPublic && (
                  <div>
                    <FollowButton
                      user={user}
                      profile={follower}
                      followPriority="secondary"
                      className={classNames(
                        styles.followButton,
                        'fr-justify-content-center',
                      )}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div
                key={follower.id}
                className={classNames(
                  'fr-flex fr-justify-content-space-between fr-align-items-center fr-border-bottom fr-width-full',
                  styles.privateContainer,
                )}
              >
                {content}
              </div>
            )
          })}
        </>
      </FollowersModal>
    </>
  )
}

export default ProfileFollowersModal
