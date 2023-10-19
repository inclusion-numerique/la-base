import React, { PropsWithChildren } from 'react'
import { ProfilePageData } from '@app/web/server/profiles/getProfile'
import { ProfilePrivacyTag } from '@app/web/components/PrivacyTags'
import { FilteredProfile } from '@app/web/server/profiles/authorization'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import ViewsAndMetadata from './ViewsAndMetadata'
import styles from './ProfileInformations.module.css'
import ImageEdition from './Edition/ImageEdition'

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
    <div className={styles.profileImageContainer}>
      <RoundProfileImage user={profile} size={128} borderWidth={1} />
      {editMode && <ImageEdition profile={profile} />}
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
