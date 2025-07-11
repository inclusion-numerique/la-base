import type { SessionUser } from '@app/web/auth/sessionUser'
import BaseImage from '@app/web/components/BaseImage'
import BaseMetadata from '@app/web/features/base/components/BaseMetadata'
import ProfileBaseMemberRoleCard from '@app/web/features/profil/base/components/ProfileBaseMemberRoleCard'
import type { BaseProfileListItemWithAllFields } from '@app/web/server/bases/getBasesList'
import { ProfilePageData } from '@app/web/server/profiles/getProfile'
import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
import styles from './ProfileBaseCard.module.css'

const ProfileBaseCard = ({
  profile,
  base,
  user,
  titleAs: BaseTitle = 'h2',
  isOwner,
}: {
  profile?: ProfilePageData
  base: BaseProfileListItemWithAllFields
  user: SessionUser | null
  compact?: boolean
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  isOwner: boolean
}) => (
  <article className={styles.container} data-testid="base-card">
    <div className="fr-flex fr-direction-column fr-direction-sm-row fr-flex-gap-3v">
      <Link
        href={`/bases/${base.slug}`}
        className={classNames(
          styles.imageLink,
          'fr-flex fr-align-items-center',
        )}
      >
        <BaseImage base={base} size={48} />
      </Link>
      <div className="fr-flex fr-direction-column fr-flex-gap-3v fr-flex-gap-md-1v">
        <Link href={`/bases/${base.slug}`} className={styles.imageLink}>
          <BaseTitle className="fr-mb-0 fr-h6">{base.title}</BaseTitle>
        </Link>
        <BaseMetadata
          className="fr-text-mention--grey"
          base={base}
          smallBadge
          context="profile"
        />
      </div>
    </div>
    {!!profile && (
      <ProfileBaseMemberRoleCard
        profile={profile}
        user={user}
        base={base}
        isOwner={isOwner}
      />
    )}
  </article>
)

export default ProfileBaseCard
