import React, { PropsWithChildren } from 'react'
import { ProfilePageData } from '@app/web/server/profiles/getProfile'
import { ProfilePrivacyTag } from '@app/web/components/PrivacyTags'
import { FilteredProfile } from '@app/web/server/profiles/authorization'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import ProfileMetadata from './ProfileMetadata'
import styles from './ProfileInformations.module.css'
import ImageEdition from './Edition/ProfileImageEdition'

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
      <div className="fr-flex fr-direction-column fr-direction-md-row fr-align-items-center fr-width-full fr-flex-gap-4v">
        <h2>{profile.name}</h2>
        <ProfilePrivacyTag isPublic={profile.isPublic} />
      </div>
      <ProfileMetadata
        resourcesCount={resourcesCount}
        followedByCount={profile._count.followedBy}
      />
      {children}
    </div>
  </div>
)

export default ProfileInformations
