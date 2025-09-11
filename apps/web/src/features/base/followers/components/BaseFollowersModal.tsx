'use client'

import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { SessionUser } from '@app/web/auth/sessionUser'
import { FollowButton } from '@app/web/components/Follows/FollowButton'
import { ProfilePrivacyTag } from '@app/web/components/PrivacyTags'
import ProfileMetadata from '@app/web/components/Profile/ProfileMetadata'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import type { BaseFollowedByData } from '@app/web/server/bases/getBase'
import { numberToString } from '@app/web/utils/formatNumber'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import classNames from 'classnames'
import Link from 'next/link'
import styles from './BaseFollowersModal.module.css'

const { Component: FollowersModal, open } = createModal({
  id: `base-followers-modal`,
  isOpenedByDefault: false,
})

const BaseFollowersModal = ({
  user,
  followedByData,
}: {
  user?: SessionUser | null
  followedByData: BaseFollowedByData
}) => {
  const { counts, visible } = followedByData
  const title = `Base suivie par ${counts.total} profil${sPluriel(
    counts.total,
  )}`
  return (
    <>
      <div>·</div>
      <span className="fr-icon-user-heart-line fr-icon--sm" />
      <Link
        href="#"
        className={classNames(
          'fr-link--underline-on-hover fr-text--sm fr-mb-0',
          styles.feedbackLink,
        )}
        onClick={open}
        role="button"
      >
        <div>
          <b>{numberToString(counts.total)}</b>
          <span>&nbsp;Suivi{sPluriel(counts.total)}</span>
        </div>
      </Link>

      <FollowersModal title={title} className={styles.baseFollowersModal}>
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
          {counts.visible === 0 && (
            <p className="fr-text--sm fr-text--medium fr-text-mention--grey fr-mb-0 fr-text--left">
              Aucun profil public
            </p>
          )}
          {visible.map((follower, index) => (
            <div
              key={follower.id}
              className={classNames(
                'fr-flex fr-py-2w fr-justify-content-space-between fr-align-items-center fr-border-bottom',
                index === 0 && 'fr-border-top',
              )}
            >
              <div className="fr-flex fr-flex-gap-6v fr-align-items-center">
                <RoundProfileImage user={follower} />
                <div className="fr-flex fr-direction-column fr-flex-gap-1v fr-align-items-baseline">
                  <Link
                    className={styles.link}
                    href={`/profils/${follower.slug}`}
                  >
                    <span className="fr-text--bold">{follower.name}</span>
                  </Link>
                  <div className="fr-flex fr-flex-gap-2v fr-align-items-center">
                    <ProfileMetadata
                      className="fr-text-mention--grey"
                      resourcesCount={follower._count.resources}
                      followedByCount={follower._count.followedBy}
                      context="base"
                    />
                    {!follower.isPublic && (
                      <>
                        <div>·</div>
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
              {!!user && follower.isPublic && (
                <div>
                  <FollowButton
                    user={user}
                    profile={follower}
                    followPriority="secondary"
                    className="fr-width-full fr-justify-content-center"
                  />
                </div>
              )}
            </div>
          ))}
        </>
      </FollowersModal>
    </>
  )
}

export default BaseFollowersModal
