import React, { PropsWithChildren } from 'react'
import Link from 'next/link'
import { ProfilePageData } from '@app/web/server/profiles/getProfile'
import { ProfilePrivacyTag } from '@app/web/components/PrivacyTags'
import { FilteredProfile } from '@app/web/server/profiles/authorization'
import ViewsAndMetadata from './ViewsAndMetadata'
import styles from './ProfileInformations.module.css'

const ProfileInformations = ({
  profile,
  resourcesCount,
  children,
  editMode,
}: {
  profile: ProfilePageData | FilteredProfile
  resourcesCount: number
  editMode?: boolean
} & PropsWithChildren) => (
  <div
    className={editMode ? styles.profileEditionHeader : styles.profileHeader}
  >
    <div className={styles.logos}>
      <div className={styles.logo} />
      {editMode && (
        <Link href="/" className={styles.pictureModification}>
          <span className="fr-icon-camera-line" />
        </Link>
      )}
    </div>
    <div>
      <h2>{profile.name}</h2>
      <ProfilePrivacyTag isPublic={profile.isPublic} />
      <ViewsAndMetadata resourcesCount={resourcesCount} />
      {children}
    </div>
  </div>
)

export default ProfileInformations
