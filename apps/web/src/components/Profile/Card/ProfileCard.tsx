import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { ProfileListItem } from '@app/web/server/profiles/getProfilesList'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import { SessionUser } from '@app/web/auth/sessionUser'
import { FollowButton } from '@app/web/components/Follows/FollowButton'
import ProfileMetadata from '@app/web/components/Profile/ProfileMetadata'
import { countProfileResources } from '@app/web/server/profiles/countProfileResources'
import styles from './ProfileCard.module.css'

const ProfileCard = ({
  profile,
  user,
  canFollow = true,
  titleAs: ProfileTitle = 'h2',
}: {
  profile: ProfileListItem
  user: SessionUser | null
  canFollow?: boolean
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}) => (
  <article className={styles.container} data-testid="profile-card">
    <div className={styles.content}>
      <Link className={styles.link} href={`/profils/${profile.slug}`}>
        <RoundProfileImage size={48} user={profile} />
      </Link>
      <div className={styles.info}>
        <Link
          className={classNames(styles.link)}
          href={`/profils/${profile.slug}`}
        >
          <ProfileTitle className="fr-text--md fr-text--medium fr-mb-0">
            {profile.name}
          </ProfileTitle>
        </Link>
        <ProfileMetadata
          className="fr-text-mention--grey"
          resourcesCount={countProfileResources(profile)}
          followedByCount={profile._count.followedBy}
        />
      </div>
    </div>
    {canFollow && profile.id !== user?.id ? (
      <FollowButton profile={profile} user={user} />
    ) : null}
  </article>
)

export default ProfileCard
